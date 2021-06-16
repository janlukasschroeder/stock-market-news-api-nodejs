const { queryApi } = require('./index');

queryApi.setApiKey('YOUR_API_KEY');

const query = {
  queryString: 'symbols:TSLA',
  from: 0,
  size: 10,
  type: 'filterArticles',
};

// uncomment to test
// queryApi.getNews(query).then(console.log);

const { streamApi } = require('./index');

// uncomment to test
// streamApi.connect('YOUR_API_KEY');
// streamApi.on('articles', (a) => console.log(a));
