const puppeteer = require('puppeteer');

async function getChapters(seriesUrl) {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // Set a user-agent string to avoid detection
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');

        // Navigate to the page
        await page.goto(seriesUrl, { waitUntil: 'domcontentloaded' });

        // Wait for the chapter elements to load
        await page.waitForSelector('.grid-cols-2 a');

        // Extract chapters using page.evaluate
        const chapters = await page.evaluate(() => {
            const chapterElements = document.querySelectorAll('.grid-cols-2 a');
            const chapters = [];
            chapterElements.forEach((element) => {
                const chapterNumber = element.querySelector('h3:nth-child(2)')?.textContent.trim();
                const chapterName = element.querySelector('h3:nth-child(1)')?.textContent.trim();
                const permalink = element.getAttribute('href');

                if (chapterNumber && chapterName && permalink) {
                    chapters.push({
                        chapterNumber,
                        chapterName,
                        permalink
                    });
                }
            });
            return chapters;
        });

        await browser.close();

        return { chapters };
    } catch (error) {
        console.error('Error fetching chapters with Puppeteer:', error);
        return { error: 'An error occurred while fetching the chapters' };
    }
}

module.exports = getChapters;
