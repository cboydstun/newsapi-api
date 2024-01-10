const express = require('express');
require('dotenv').config()
const cors = require('cors');

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;

app.get('/top-headlines', async (req, res) => {
    try {
        // Get 'from', 'to' and 'q' from query parameters
        const fromDate = req.query.from;
        const toDate = req.query.to;
        const query = req.query.q;

        // Convert dates to ISO string format
        const fromISO = new Date(fromDate).toISOString();
        const toISO = new Date(toDate).toISOString();

        const response = await newsapi.v2.everything({
            q: query,
            sources: 'bbc-news,the-verge',
            domains: 'bbc.co.uk,techcrunch.com',
            from: fromISO,
            to: toISO,
            language: 'en',
            sortBy: 'relevancy'
        });

        res.json(response);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
