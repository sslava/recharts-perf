import React from 'react';
import express from 'express';
import cors from 'cors';
import { renderToString } from 'react-dom/server';
import { decorateRechartSvg, Chart } from './ChartPreview.jsx';

function random(min = 0, max = 200) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const types = ['line', 'bar', 'area'];

const charts = Array.from({ length: 200 }, (_, i) => ({
  id: i,
  type: types[random(0, types.length - 1)],
}));

const chartsData = {};

function getChartData(id) {
  if (!chartsData[id]) {
    chartsData[id] = Array.from({ length: random(5, 10) }, (_, i) => ({
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
  await delay(400);
  const start = page ? page * 40 : 0;
  const end = page ? start + 40 : undefined;
  res.json(charts.slice(start, end));
});

app.get('/api/charts/:id', async (req, res) => {
  await delay(55);
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
