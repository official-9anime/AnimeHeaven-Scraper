const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

// Function to scrape Dramacool homepage
async function scrapeDramacool() {
    const url = 'https://dramacool.com.tr/';
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            },
        });

        const html = response.data;
        const $ = cheerio.load(html);
        const dramas = [];
        const kshows = [];

        // Scrape dramas
        $('.tab-content.left-tab-1.selected .switch-block.list-episode-item li').each((_, element) => {
            const drama = {
                name: $(element).find('h2.title').text().trim(),
                episodeStatus: $(element).find('.type').text().trim(),
                episodeNumber: $(element).find('.ep').text().trim(),
                link: $(element).find('a.img').attr('href'),
                updatedTime: $(element).find('.time').text().trim(),
            };
            dramas.push(drama);
        });

        // Scrape KShows
        $('.tab-content.left-tab-3 .switch-block.list-episode-item li').each((_, element) => {
            const kshow = {
                name: $(element).find('h2.title').text().trim(),
                episodeStatus: $(element).find('.type').text().trim(),
                episodeNumber: $(element).find('.ep').text().trim(),
                link: $(element).find('a.img').attr('href'),
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

// API route
app.get('/api/recent', async (req, res) => {
    const data = await scrapeDramacool();
    res.json(data);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
