import React from 'react';
import express from 'express';
import cors from 'cors';
import { renderToString } from 'react-dom/server';
import { decorateRechartSvg, Chart } from './ChartPreview.jsx';

function random(min = 0, max = 200) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const types = ['line', 'bar', 'area'];

const charts = Array.from({ length: 200 }, (_, i) => ({
  id: i,
  type: types[random(0, types.length - 1)],
}));

const chartsData = {};

function getChartData(id) {
  if (!chartsData[id]) {
    chartsData[id] = Array.from({ length: random(7, 20) }, (_, i) => ({
      name: `Day ${i + 1}`,
      uv: random(0, 1000),
      pv: random(0, 1000),
    }));
  }
  return chartsData[id];
}

const app = express();
app.use(cors());

app.get('/api/charts', async (req, res) => {
  const page = req.query.page;
  console.log('page', page);
  const start = page ? page * 20 : 0;
  const end = page ? start + 20 : undefined;
  res.json(charts.slice(start, end));
});

app.get('/api/charts/:id', async (req, res) => {
  res.json(getChartData(req.params.id));
});

const imMemoryCache = {};

app.get('/api/charts-svg/:id', async (req, res) => {
  const cacheKey = `${req.params.id}-${req.query.type}`;
  if (!imMemoryCache[cacheKey]) {
    const data = getChartData(req.params.id);
    const svg = renderToString(<Chart type={req.query.type} data={data} />);
    imMemoryCache[cacheKey] = decorateRechartSvg(svg);
  }
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(imMemoryCache[cacheKey]);
});

app.listen(8080);
