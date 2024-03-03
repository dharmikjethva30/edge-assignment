const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());


let subscriptions = {};

app.post('/subscribe', (req, res) => {
    const { userId, stockSymbol, threshold } = req.body;
    subscriptions[userId] = { stockSymbol, threshold };
    res.status(200).send('Subscribed successfully');
});


function checkStockPrices() {

    const stockPrices = {
        'AAPL': 150.25,
        'GOOGL': 2700.50,
        'MSFT': 320.75,
    };

    Object.entries(subscriptions).forEach(([userId, { stockSymbol, threshold }]) => {
        const currentPrice = stockPrices[stockSymbol];
        if (currentPrice && currentPrice >= threshold) {
            console.log(`Sending webhook notification to user ${userId} - ${stockSymbol} price exceeds ${threshold}: ${currentPrice}`);
        }
    });
}

setInterval(checkStockPrices, 5000); 

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
