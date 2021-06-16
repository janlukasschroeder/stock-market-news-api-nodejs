# Stock Market News API

- Get the latest stock market news from all relevant sources, covering all US listed companies
- Query API to search the entire stock market news corpus
- Real-time stream API to receive news as soon as they are published
- New articles are indexed in real-time in less than 500 milliseconds after publication
- Used by institutions, traders and investors in over 50 countries

See full API documentation at: https://developers.newsfilter.io/

# News Query API Examples

You can get your API key from https://newsfilter.io/api-plans.

The below example fetches the 10 most recently published news articles from all sources covering Tesla and Apple.

```js
const { queryApi } = require('stock-market-news-api');

queryApi.setApiKey('YOUR_API_KEY');

const query = {
  queryString: 'symbols:TSLA, AAPL', // most recent news from all sources covering TSLA and AAPL
  from: 0, // start with the first. used for pagination
  size: 10, // return 10 most recent articles, sorted by publishedAt
};

const news = await queryApi.getArticles(query);
```

You can narrow down the search by only fetching specific news sources, such as GlobeNewsWire, BusinessWire and PR Newswire.

```js
const query = {
  queryString:
    'symbols:TSLA, AAPL AND source.id:prNewswire, globenewswire, businesswire',
  from: 0,
  size: 10,
};

const news = await queryApi.getArticles(query);
```

## Response Example

```json
{
  "total": { "value": 10000, "relation": "gte" },
  "from": 0,
  "size": 10,
  "sort": [{ "publishedAt": { "order": "desc" } }],
  "articles": [
    {
      "source": {
        "id": "cnbc",
        "name": "CNBC"
      },
      "symbols": ["GM", "TSLA", "VOW3-DE", "F"],
      "title": "GM ups spending on EVs and autonomous vehicles by 30% to $35 billion by 2025 on higher profits",
      "description": "GM, America's largest automaker, is racing to catch up to Tesla on EVs and become a leader in the space against other well-established automakers such as VW.",
      "url": "https://newsfilter.io/articles/gm-ups-spending-on-evs-and-autonomous-vehicles-by-30-to-35-billion-by-2025-on-higher-profits-34bd42f1c936c9a56c9bdf1914fadd5a",
      "imageUrl": "https://image.cnbcfm.com/api/v1/image/106424520-1583341306047gmevbarra01.jpg?v=1583353549",
      "publishedAt": "2021-06-16T13:00:23+0000",
      "id": "34bd42f1c936c9a56c9bdf1914fadd5a",
      "industries": ["Auto Manufacturers"],
      "sectors": ["Consumer Cyclical"]
    },
    {
      "source": {
        "id": "reuters",
        "name": "Reuters"
      },
      "symbols": ["TSLA"],
      "title": "Polestar to make electric SUV at U.S. Volvo plant, starting in 2022",
      "description": "Polestar, the premium electric vehicle maker owned by China's Geely and Volvo Cars, will build its Polestar 3 electric SUV at Volvo's U.S. plant in South Carolina starting in the second half of 2022, the brand's chief executive said.",
      "url": "https://newsfilter.io/articles/polestar-to-make-electric-suv-at-us-volvo-plant-starting-in-2022-27a0cb71fd98d2a011e9b188341172af",
      "imageUrl": "",
      "publishedAt": "2021-06-16T10:00:15Z",
      "id": "27a0cb71fd98d2a011e9b188341172af",
      "industries": ["Auto Manufacturers"],
      "sectors": ["Consumer Cyclical"]
    },
    {
      "source": {
        "id": "cnbc",
        "name": "CNBC"
      },
      "symbols": ["F", "GM", "TSLA"],
      "title": "Ford's luxury Lincoln brand aims for half of sales to be electric vehicles by 2026",
      "description": "Lincoln expects about half of its sales to be all-electric models by 2026, as it plans to offer new EVs across its portfolio of vehicles within the next decade.",
      "url": "https://newsfilter.io/articles/fords-luxury-lincoln-brand-aims-for-half-of-sales-to-be-electric-vehicles-by-2026-5f8bbcab3905d371cfe66b988f72b22c",
      "imageUrl": "https://image.cnbcfm.com/api/v1/image/106361970-1580317286365lincolnstar_electricblue.jpg?v=1623792027",
      "publishedAt": "2021-06-16T10:00:01+0000",
      "id": "5f8bbcab3905d371cfe66b988f72b22c",
      "industries": ["Auto Manufacturers"],
      "sectors": ["Consumer Cyclical"]
    },
    {
      "source": {
        "id": "benzinga",
        "name": "Benzinga"
      },
      "symbols": ["TSLA"],
      "title": "Elon Musk Says New HVAC Firmware Coming 'Soon' In Tesla EVs That Will Be 'Quieter'",
      "description": "Tesla Inc’s (NASDAQ: TSLA) CEO Elon Musk on Tuesday said cabin noise for its mid-size sedan Model 3 is set to get even \"quieter\" soon. What Happened: Musk tweeted in response to a video to say Tesla is working on new HVAC firmware - heating, ventilation and air conditioning -...",
      "url": "https://newsfilter.io/articles/elon-musk-says-new-hvac-firmware-coming-soon-in-tesla-evs-that-will-be-quieter-0b5cc8d5a92cc8f081d694e1c6ca7587",
      "imageUrl": "",
      "publishedAt": "2021-06-16T05:16:00-04:00",
      "id": "0b5cc8d5a92cc8f081d694e1c6ca7587",
      "industries": ["Auto Manufacturers"],
      "sectors": ["Consumer Cyclical"]
    }
  ]
}
```

# News Stream API Examples

Our real-time stream API allows you to receive new articles as soon as they are published. The below example illustrates how to connect to the stream API.

```js
const { streamApi } = require('stock-market-news-api');

streamApi.connect('YOUR_API_KEY');

streamApi.on('articles', (articles) => console.log(articles));
```

# News Topics

We cover topics such as analyst ratings, earnings releases, press releases, M&A announcements, FDA drug approvals, clinical trial results, offerings, IPOs, SPACs, earnings call transcripts, patent approvals, SEC filings, government contract awards, insider trades, class action law suits, market research reports.

# News Source Coverage

Supported news sources include:

| News Provider               |                                 Source ID |
| --------------------------- | ----------------------------------------: |
| Analyst Ratings             |                           analystUpgrades |
| Bloomberg                   |                                 bloomberg |
| Reuters                     |                                   reuters |
| CNBC                        |                                      cnbc |
| Wall Street Journal         |                       wall-street-journal |
| Barrons                     |                                   barrons |
| PR Newswire                 |                                prNewswire |
| Globe Newswire              |                             globenewswire |
| BusinessWire                |                              businesswire |
| AccessWire                  |                                accesswire |
| SeekingAlpha                |                              seekingAlpha |
| Benzinga                    |                                  benzinga |
| S&P Global                  |                               sandpGlobal |
| Earnings Call Transcripts   |                   earningsCallTranscripts |
| **US:**                     |                                           |
| ClinicalTrials.gov          |                            clinicaltrials |
| SAM.gov                     |                                     usSam |
| SEC Filings                 |                                   sec-api |
| SEC Press Releases          |                          secPressReleases |
| FCC Filings                 |                                fccFilings |
| Patent Database (USPTO)     |                                     uspto |
| Patent Trial & Appeal Board |                       usptoTrialAndAppeal |
| Department of Defense       |                                     usDod |
| FDA Drug Approvals          |      usFda (`usFdaType` = `drugApproval`) |
| FDA Press Releases          | usFda (`usFdaType` = `pressAnnouncement`) |
| Economic Indicators         |                      usEconomicIndicators |

Please contact us at support@newsfilter.io if you like us to add more sources.

# Companies & Exchanges

All companies listed on the following stock exchanges are supported:

- NASDAQ
- NYSE
- AMEX/NYSE American

# Contact

Website: https://newsfilter.io
