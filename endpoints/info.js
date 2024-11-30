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
        let episodes = null;
        let year = null;
        let score = null;
        let nextEp = null;
        var ongoing = false;
        const tags = [];
        const episodesID = [];

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
        if (!name) {
            name = $('.infotitle').text();
        }

        // Extract description
        desc = $('.infodes').text();

        // Extract tags
        $('.infotags .boxitem').each((index, element) => {
            const tag = $(element).text().trim();
            if (tag) {
                tags.push(tag);
            }
        });

        //extract data
        $('.infoyear .inline.c2').each((index, element) => {
            const text = $(element).text().trim();
            if (index === 0) {
                episodes = text;  // First element should be episodes
                if(episodes.includes("+")) {
                    ongoing = true;
                }
            } else if (index === 1) {
                year = text;      // Second element should be the year
            } else if (index === 2) {
                score = text;     // Third element should be the score
            }
        });

        // Extract episodes
        $('.linetitle2 a').each((index, element) => {
            const episode = $(element).attr('href');
            if (episode) {
                episodesID.push(episode.replace("episode.php?",""));
            }
        });

        //Extract next episode
        if(ongoing) {
            nextEp = $('.info2 .inline.c2').text().trim();
        }

        // Combine data into an object
        const data = {
            banner: banner || null,
            poster: poster || null,
            title: name || null,
            desc: desc || null,
            episodes: episodes || null,
            year: year || null,
            score: score || null,
            ongoing: ongoing || null,
            nextEp: nextEp || null,
            tags: tags.length > 0 ? tags : null, // Include tags if they exist
            episodeIds: episodesID.length > 0 ? episodesID.reverse() : null,
        };

        return data; // Return the extracted data
    } catch (error) {
        console.error('Error fetching info:', error);
        return null;
    }
}

module.exports = Info;
