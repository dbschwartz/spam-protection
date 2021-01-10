import express from 'express';
const fs = require('fs').promises;

export default (app) => {
  app.use(express.json());
  const reports = require('../data/reports.json')

  app.get('/reports', (req, res) => {
    res.json(reports)
  });

  app.put('/reports/:id', async (req, res, next) => {
    const element = reports.find( ({ id }) => id === req.params.id );
    element.status = req.body.ticketState;
    try {
      await fs.writeFile('../data/reports.json', JSON.stringify(reports, null, 4)); // need to be in an async function
      res.send('Succesfully updated reports!')
    } catch (error) {
      next(error)
    }
  });
  
  app.post('/bar', (req, res) => {
    res.json(req.body);
  });
  
}
