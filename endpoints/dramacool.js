const axios = require('axios');
const cheerio = require('cheerio');

const DRAMACOOL_URL = 'https://dramacool.com.tr/';

async function scrapeDramacool() {
    try {
        const response = await axios.get(DRAMACOOL_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            },
        });

        const html = response.data;
        const $ = cheerio.load(html);
        const dramas = [];
        const kshows = [];

        // Scrape dramas (Verify the class name)
        $('.tab-content.left-tab-1.selected .switch-block.list-episode-item li').each((_, element) => {
            const link = $(element).find('a.img').attr('href');
            const drama = {
                name: $(element).find('h2.title').text().trim(),
                episodeStatus: $(element).find('.type').text().trim(),
                episodeNumber: $(element).find('.ep').text().trim(),
                link: link ? `https://dramacool.com.tr${link}` : null, // Fix relative URL
                updatedTime: $(element).find('.time').text().trim(),
            };
            dramas.push(drama);
        });

        // Scrape KShows (Verify the class name)
        $('.tab-content.left-tab-3 .switch-block.list-episode-item li').each((_, element) => {
            const link = $(element).find('a.img').attr('href');
            const kshow = {
                name: $(element).find('h2.title').text().trim(),
                episodeStatus: $(element).find('.type').text().trim(),
                episodeNumber: $(element).find('.ep').text().trim(),
                link: link ? `https://dramacool.com.tr${link}` : null, // Fix relative URL
                updatedTime: $(element).find('.time').text().trim(),
            };
            kshows.push(kshow);
        });

        return { dramas, kshows };
    } catch (error) {
        console.error('Error fetching Dramacool:', error);
        return { error: 'Failed to fetch data.' };
    }
}

// Export the function for use in server.js
module.exports = scrapeDramacool;
