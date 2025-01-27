const axios = require('axios');
const cheerio = require('cheerio');

async function getChapterImages(chapterUrl) {
    try {
        const response = await axios.get(chapterUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            },
        });

        const html = response.data;
        const $ = cheerio.load(html);
        const results = [];

        $('.reading-content .page-break img').each((index, element) => {
            const imageUrl = $(element).attr('src')?.trim();
            if (imageUrl) {
                results.push(imageUrl);
            }
        });

        return results.length > 0
            ? { status: 200, results }
            : { status: 404, message: 'No images found in the chapter.' };
    } catch (error) {
        console.error('Error fetching chapter images:', error);
        return { status: 500, message: 'An error occurred while fetching chapter images.' };
    }
}

module.exports = getChapterImages;
