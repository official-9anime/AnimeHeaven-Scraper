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
        const movies = [];

        // Scrape Dramas
        $('.tab-content.left-tab-1 .switch-block.list-episode-item li').each((_, element) => {
            const link = $(element).find('a').attr('href');
            if (!link) return;

            const drama = {
                name: $(element).find('.title').text().trim(),
                episodeStatus: $(element).find('.type').text().trim(),
                episodeNumber: ($(element).find('.ep').text().trim().replace(/^EP\s+/i, '') || 'N/A'),
                link: link.startsWith('http') ? link : `https://dramacool.com.tr${link}`,
                updatedTime: $(element).find('.time').text().trim(),
            };
            dramas.push(drama);
        });

        // Scrape KShows
        $('.tab-content.left-tab-3 .switch-block.list-episode-item li').each((_, element) => {
            const link = $(element).find('a').attr('href');
            if (!link) return;

            const kshow = {
                name: $(element).find('.title').text().trim(),
                episodeStatus: $(element).find('.type').text().trim(),
                episodeNumber: ($(element).find('.ep').text().trim().replace(/^EP\s+/i, '') || 'N/A'),
                link: link.startsWith('http') ? link : `https://dramacool.com.tr${link}`,
                updatedTime: $(element).find('.time').text().trim(),
            };
            kshows.push(kshow);
        });

        // Scrape Movies
        $('.tab-content.left-tab-2 .switch-block.list-episode-item li').each((_, element) => {
            const link = $(element).find('a').attr('href');
            if (!link) return;

            const movie = {
                name: $(element).find('.title').text().trim(),
                episodeStatus: $(element).find('.type').text().trim(),
                episodeNumber: ($(element).find('.ep').text().trim().replace(/^EP\s+/i, '') || 'N/A'),
                link: link.startsWith('http') ? link : `https://dramacool.com.tr${link}`,
                updatedTime: $(element).find('.time').text().trim(),
                image: $(element).find('img').attr('data-original') || $(element).find('img').attr('src'), // Extract poster image
            };
            movies.push(movie);
        });

        return { dramas, kshows, movies };
    } catch (error) {
        console.error('Error fetching Dramacool:', error.message);
        return { error: 'Failed to fetch data.', details: error.message };
    }
}

// Export the function for use in server.js
module.exports = scrapeDramacool;
