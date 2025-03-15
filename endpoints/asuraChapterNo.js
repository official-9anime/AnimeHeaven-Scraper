const axios = require('axios');
const cheerio = require('cheerio');

async function getChapters(seriesUrl) {
    try {
        const response = await axios.get(seriesUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            },
        });

        const html = response.data;
        const $ = cheerio.load(html);

        // Extract chapters
        const chapters = [];
        $('.grid-cols-2 a').each((index, element) => {
            const chapterNumber = $(element).find('h3').eq(1).text().trim(); // Extracting the chapter number
            const chapterName = $(element).find('h3').eq(0).text().trim(); // Extracting the chapter name
            const permalink = $(element).attr('href'); // Extracting the permalink

            if (chapterNumber && chapterName && permalink) {
                chapters.push({
                    chapterNumber,
                    chapterName,
                    permalink,
                });
            }
        });

        return { chapters };
    } catch (error) {
        console.error('Error fetching chapters:', error);
        return { error: 'An error occurred while fetching the chapters' };
    }
}

module.exports = getChapters; // Export the function
