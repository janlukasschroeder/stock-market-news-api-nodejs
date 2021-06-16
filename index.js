#!/usr/bin/env node

const io = require('socket.io-client');
const config = require('./config');
const events = require('events');
const axios = require('axios');

const store = { apiKey: '' };

const setApiKey = (apiKey) => {
  store.apiKey = apiKey;
};

/*
 * Query API
 */

/**
 * Query news
 *
 * @param {String} query The query string
 * @returns {Object}     The response from the API
 */
const getNews = async (query = {}) => {
  const payload = { ...query, type: 'filterArticles' };

  const options = {
    method: 'post',
    url: config.queryApi.endpoint,
    headers: { Authorization: store.apiKey },
    data: payload,
  };

  let { data } = await axios(options);

  data.articles = data.articles.map(
    ({ markets, categories, content, meta, ...rest }) => ({
      ...rest,
    })
  );

  return data;
};

/*
 * Stream API
 */
const streamApiStore = {};

const initSocket = (apiKey) => {
  const uri = config.streamApi.endpoint;
  const params = { query: { apiKey } };
  streamApiStore.socket = io(uri, params);
  streamApiStore.socket.on('connect', () =>
    console.log('Socket connected to', uri)
  );
  streamApiStore.socket.on('articles', handleNewArticles);
  streamApiStore.socket.on('error', console.error);
};

const handleNewArticles = (articles) => {
  console.log(articles);
  streamApiStore.eventEmitter.emit('articles', articles);
};

const close = () => {
  if (streamApiStore.socket.close) {
    streamApiStore.socket.close();
  }
};

const connect = (apiKey) => {
  setApiKey(apiKey);
  initSocket(apiKey);
  streamApiStore.eventEmitter = new events.EventEmitter();
  modules.streamApi.on = streamApiStore.eventEmitter.on;
  return streamApiStore.eventEmitter;
};

/**
 * Exports
 */
const modules = {
  setApiKey,
  queryApi: {
    setApiKey,
    getNews,
  },
  streamApi: {
    setApiKey,
    connect,
    close,
  },
};

module.exports = modules;
