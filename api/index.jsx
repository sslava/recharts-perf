import React from 'react';
import express from 'express';
import cors from 'cors';
import { renderToString } from 'react-dom/server';
import { decorateRechartSvg, Preview } from './ChartPreview.jsx';

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

app.get('/api/data/:id', async (req, res) => {
  res.json(getChartData(req.params.id));
});

app.get('/api/preview/:id', async (req, res) => {
  const data = getChartData(req.params.id);
  const svg = renderToString(<Preview type={req.query.type} data={data} />);
  res.setHeader('Content-Type', 'image/svg+xml').send(decorateRechartSvg(svg));
});

app.listen(8080);
