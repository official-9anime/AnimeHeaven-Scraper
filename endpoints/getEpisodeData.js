const axios = require('axios');
const cheerio = require('cheerio');

async function getEpisodeData(pageUrl) {
    try {
        const response = await axios.get(pageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            },
        });

        const html = response.data;
        const $ = cheerio.load(html);
        const episodes = [];

        // Extract episode links and numbers
        $('.listing-chapters_wrap ul.main li.wp-manga-chapter a').each((index, element) => {
            const permalink = $(element).attr('href')?.trim();
            const chapterText = $(element).text().trim();
            const chapterMatch = chapterText.match(/Chapter\s*([\d.]+)/i);

            if (permalink && chapterMatch) {
                episodes.push({
                    permalink,
                    chapter_number: chapterMatch[1],
                });
            }
        });

        return episodes.length > 0
            ? { success: true, episodes }
            : { success: false, message: 'No episodes found on the page.' };
    } catch (error) {
        console.error('Error fetching episode data:', error);
        return { success: false, message: 'An error occurred while fetching episode data.' };
    }
}

module.exports = getEpisodeData;
