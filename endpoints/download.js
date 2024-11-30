const axios = require('axios');
const cheerio = require('cheerio');

async function download(id) {
    const url = `https://animeheaven.me/episode.php?${id}`;
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            },
        });

        const html = response.data;
        const $ = cheerio.load(html);

        // Extract all download links with the class 'linetitle2'
        const downloadLinks = [];
        $('.linetitle2.c a').each((index, element) => {
            const href = $(element).attr('href');
            if (href) {
                downloadLinks.push(href);
            }
        });

        // Example: Get the first link only
        const firstDownloadLink = downloadLinks[1] || null;

        if (downloadLinks.length > 0) {
            return { download: firstDownloadLink };
        } else {
            return { error: 'No download links found' };
        }
    } catch (error) {
        console.error('Error fetching search results:', error);
        return { error: 'An error occurred while fetching the download links' };
    }
}

module.exports = download; // Export the function
