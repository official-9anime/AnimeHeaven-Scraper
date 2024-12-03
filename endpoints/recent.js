const axios = require('axios');
const cheerio = require('cheerio');

async function recent() {
    const url = `https://animeheaven.me/`; // URL of the homepage
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            },
        });
        const html = response.data;
        const $ = cheerio.load(html);
        const data = [];

        // Extract recent anime information
        $('.chart.bc1').each((index, element) => {
            const animeId = $(element).find('.chartimg a').attr('href')?.replace('anime.php?', '');
            const animeName = $(element).find('.charttitle.c a').text().trim();
            const releaseStatus = $(element).find('.charttimer.c2').text().trim();
            const episodeNumber = $(element).find('.chartep.c2').text().trim(); // Get the episode number

            // Store the extracted data
            if (animeId && animeName) {
                data.push({
                    id: animeId,
                    name: animeName,
                    releaseStatus: releaseStatus || 'Status unknown', // Handle empty status
                    episodeNumber: episodeNumber || 'N/A', // Handle empty or missing episode number
                });
            }
        });

        return data; // Return the combined data array
    } catch (error) {
        console.error('Error fetching recent anime:', error);
        return { error: 'An error occurred while fetching recent anime.' };
    }
}

module.exports = recent; // Export the function
