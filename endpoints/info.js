const axios = require('axios');
const cheerio = require('cheerio');

async function Info(id) {
    const url = `https://animeheaven.me/anime.php?${id}`;
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            },
        });
        const html = response.data;
        const $ = cheerio.load(html);

        // Declare variables for extracted data
        let banner = null;
        let poster = null;
        let name = null;
        let desc = null;

        // Extract banner
        const bannerElement = $('.bannerimg').attr('src');
        if (bannerElement) {
            banner = "https://animeheaven.me/" + bannerElement;
        }

        // Extract poster
        const posterElement = $('.posterimg').attr('src');
        if (posterElement) {
            poster = posterElement;
        }

        // Extract name
        name = $('.infotitlejp').text();
        if(!name) {
            name = $('.infotitle').text();
        }

        // Extract description
        desc = $('.infodes').text();

        // Combine data into an object
        const data = {
            banner: banner || null,
            poster: poster || null,
            title: name || null,
            desc: desc || null,
        };

        return data; // Return the extracted data
    } catch (error) {
        console.error('Error fetching info:', error);
        return null;
    }
}

module.exports = Info;
