const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeChapterImages(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            },
        });

        const html = response.data;
        const $ = cheerio.load(html);
        const imageUrls = [];

        // Select all <img> elements within the chapter content
        $('.py-8 .center img').each((_, element) => {
            const imgUrl = $(element).attr('src');
            if (imgUrl && imgUrl.startsWith('https://gg.asuracomic.net/storage/media/')) {
                imageUrls.push(imgUrl);
            }
        });

        return { images: imageUrls };
    } catch (error) {
        console.error('Error fetching chapter images:', error.message);
        return { error: 'Failed to fetch images.', details: error.message };
    }
}

module.exports = scrapeChapterImages;
