const axios = require('axios');
const cheerio = require('cheerio');

async function Search(query) {
    const url = `https://animeheaven.me/search.php?s=${query}`;
    try {
                const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            },
        });
        const html = response.data;
        const $ = cheerio.load(html);
        const data = [];

        const covers = [];
        const ids = [];
        const names = [];
        
        // Extract images
        $('.coverimg').each((index, element) => {
            const src = $(element).attr('src');
            if (src) {
                covers.push(`https://animeheaven.me/${src}`);
            }
        });

        // Extract IDs
        $('.similarname.c a').each((index, element) => {
            const href = $(element).attr('href');
            if (href) {
                ids.push(href.replace('anime.php?', ''));
            }
        });

        // Extract names
        $('.similarname.c a').each((index, element) => {
            const name = $(element).text().trim();
            if (name) {
                names.push(name);
            }
        });

        // Combine data into JSON objects
        for (let i = 0; i < names.length; i++) {
            data.push({
                name: names[i] || null,
                image: covers[i] || null,
                id: ids[i] || null,
            });
        }

        return data; // Return the combined data array
    } catch (error) {
        console.error('Error fetching search results:', error);
        return [];
    }
}

module.exports = Search; // Export the function
