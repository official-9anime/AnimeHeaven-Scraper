const axios = require('axios');
const cheerio = require('cheerio');

async function watch(id) {
    const url = `https://animeheaven.me/episode.php?${id}`; // Replace with the actual page containing the video
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            },
        });

        const html = response.data;
        const $ = cheerio.load(html);

        // Extract the first video link from the <source> tag
        const firstVideoLink = $('video > source').first().attr('src');

        if (firstVideoLink) {
            return { videoLink: firstVideoLink };
        } else {
            return { error: 'No video link found' };
        }
    } catch (error) {
        console.error('Error fetching search results:', error);
        return { error: 'An error occurred while fetching the video link' };
    }
}

module.exports = watch; // Export the function
