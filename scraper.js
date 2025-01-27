const search = require("./endpoints/search");
const info = require("./endpoints/info");
const popular = require("./endpoints/popular");
const watch = require("./endpoints/watch");
const download = require("./endpoints/download");
const tags = require("./endpoints/tags");
const recent = require("./endpoints/recent");  // Import the recent function

const getChapterImages = require('./endpoints/chapterImages');

const express = require('express');
const app = express();

//JJK
//const query = 'ot32w';
//Dandadan
//const query = 'j2np5';

app.get('', async (req, res) => {
    return res.status(200).json({   welcome: 'Here are some really basic docs! :)',
                                    popular: "To get the popular current animes, use the endpoint /api/popular, no parameters necessary",
                                    search: "To search for an anime, use the /api/search endpoint, and make sure to add a ?query= at the end",
                                    info: "Once you have an id, use the /api/info endpoint, and pass the id through the ?query= parameter",
                                    watch: "With the info endpoint, you can get the episode ids. These are in order from oldest (episode 1) to newest. Simply use /api/watch and add the ?query= parameter to fetch a link to watch the stream directly",
                                    download: "If you would rather download the episode, simply use the /api/download endpoint, and pass the episode ID to the ?query= parameter. This will return a Direct Download Link",
                                    tags: "If you'd like to search by a tag, simply go to /api/tags and add the ?query= parameter with the name of the tag EXACTLY as how its provided in the info, for example you'd use \"Based On A Manga\"",
                                    recent: "To get the most recent anime releases, use the /api/recent endpoint"
     });
});

//Popular endpoint
app.get('/api/popular', async (req, res) => {
    // Your web scraping logic goes here
    await popular()
        .then((results) => {
            res.json(results)
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error occurred while searching popular' });
            console.error('Error occurred while searching:', error);
        });
});

// Recent endpoint
app.get('/api/recent', async (req, res) => {
    await recent()
        .then((results) => {
            res.json(results);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error occurred while fetching recent anime' });
            console.error('Error occurred while fetching recent anime:', error);
        });
});

// Dynamic route for chapter images
app.get('/manga/:mangaTitle/chapter-:chapterNumber', async (req, res) => {
    const { mangaTitle, chapterNumber } = req.params;

    const chapterUrl = `https://www.mangaread.org/manga/${mangaTitle}/chapter-${chapterNumber}/`;

    try {
        const result = await getChapterImages(chapterUrl);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error occurred while fetching chapter images' });
        console.error('Error:', error);
    }
});



//Info endpoint
app.get('/api/info', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    info(query)
        .then((results) => {
            res.json(results)
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error occurred while fetching info' });
            console.error('Error occurred while searching:', error);
        });
});

//Search endpoint
app.get('/api/search', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    search(query)
        .then((results) => {
            res.json(results)
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error occurred while searching' });
            console.error('Error occurred while searching:', error);
        });
});

//Watch endpoint
app.get('/api/watch', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    watch(query)
        .then((results) => {
            res.json(results)
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error occurred while loading episode' });
            console.error('Error occurred while loading episode:', error);
        });
});

//Download endpoint
app.get('/api/download', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    download(query)
        .then((results) => {
            res.json(results)
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error occurred while loading episode' });
            console.error('Error occurred while loading episode:', error);
        });
});

//Tags endpoint
app.get('/api/tags', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    tags(query)
        .then((results) => {
            res.json(results)
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error occurred while loading tags' });
            console.error('Error occurred while loading tags:', error);
        });
});



const port = process.env.PORT || 3000;  // Vercel provides the PORT environment variable
module.exports = app;

// app.listen(port, () => {
//     const env = process.env.VERCEL_URL || `http://localhost:${port}`;
//     console.log(`Server running at: ${env}`);
// });
