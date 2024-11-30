const search = require("./endpoints/search");
const info = require("./endpoints/info");
const popular = require("./endpoints/popular");
const watch = require("./endpoints/watch");
const download = require("./endpoints/download");

const express = require('express');
const app = express();

//JJK
//const query = 'ot32w';
//Dandadan
//const query = 'j2np5';

app.get('', async (req, res) => {
    return res.status(400).json({ welcome: 'Docs coming soon :)' });
});

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


const port = process.env.PORT || 4000;  // Vercel provides the PORT environment variable
module.exports = app;

// app.listen(port, () => {
//     const env = process.env.VERCEL_URL || `http://localhost:${port}`;
//     console.log(`Server running at: ${env}`);
// });