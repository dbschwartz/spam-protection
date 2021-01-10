import express from 'express';
const fs = require('fs').promises;
const path = require("path");


const getReports = async (next) => {
  try {

    const unparsedJSON = await fs.readFile(path.resolve(__dirname,'./reports.json'), 'utf8');
    return JSON.parse(unparsedJSON);
    //const reports = require("./reports.json")
    //return reports;
  } catch (error) {
    next(error)
  }
}

export default async (app) => {
  app.use(express.json());

  app.get('/reports', async(req, res, next) => {
    const reports = await getReports(next);
    res.json(reports.elements.map(({id, state}) => ({id, state})));
  });

  app.put('/reports/:id', async (req, res, next) => {
    const reports = await getReports(next);
    const element = reports.elements.find( ({ id }) => id === req.params.id );
    element.state = req.body.ticketState;
    try {
      await fs.writeFile('./srv/reports.json', JSON.stringify(reports, null, 4), 'utf8'); 
      //fsSync.writeFileSync('student-2.json', JSON.stringify(reports, null, 4));
      res.send('Succesfully updated reports!')
    } catch (error) {
      next(error)
    }
  });
    
}
