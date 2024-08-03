import React from 'react';
import express from 'express';
import cors from 'cors';
import { renderToString } from 'react-dom/server';
import { decorateRechartSvg, Preview } from './ChartPreview.jsx';

const chartTypes = ['line', 'bar', 'area'];

const cache = { charts: null, data: {} };

function random(max = 1000) {
  return Math.floor(Math.random() * max);
}

function getData(id) {
  if (cache.data[id]) {
    return cache.data[id];
  }
  // generate random data
  const data = Array.from({ length: 7 }, (_, i) => ({
    name: `Day ${i + 1}`,
    uv: random(),
    pv: random(),
  }));
  cache.data[id] = data;
  return data;
}

const app = express();
app.use(cors());

app.get('/api/charts', async (_, res) => {
  if (cache.charts) {
    return res.json(cache.charts);
  }
  cache.charts = Array.from({ length: 250 }, (_, i) => ({
    id: i,
    type: chartTypes[random(chartTypes.length)],
  }));

  res.json(cache.charts);
});

app.get('/api/data/:id', async (req, res) => {
  res.json(getData(req.params.id));
});

app.get('/api/preview/:id', async (req, res) => {
  const data = getData(req.params.id);
  const svg = renderToString(<Preview type={req.query.type} data={data} />);
  res.setHeader('Content-Type', 'image/svg+xml').send(decorateRechartSvg(svg));
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
