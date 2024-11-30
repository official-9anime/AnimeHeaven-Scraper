const axios = require('axios');
const cheerio = require('cheerio');

async function tags(tag) {
    const url = `https://animeheaven.me/tags.php?tag=${tag}`;
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
        
        // Extract image covers
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

        // Extract names (prefer English title, fall back to Japanese)
        $('.similarname.c a').each((index, element) => {
            const name = $(element).text().trim();
            if (name) {
                names.push(name);
            }
        });
        console.log(covers);
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
        console.error('Error fetching tags:', error);
        return { error: 'An error ocured, possibly due to an invalid tag' };
    }
}

module.exports = tags; // Export the function
