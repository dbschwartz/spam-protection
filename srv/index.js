import express from "express";
const fs = require("fs").promises;
const path = require("path");
const cors = require("cors");

const getReports = async (next) => {
  try {
    const unparsedJSON = await fs.readFile(
      path.resolve(__dirname, "../data/reports.json"),
      "utf8"
    );
    return JSON.parse(unparsedJSON);
  } catch (error) {
    next(error);
  }
};

export default async (app) => {
  app.use(cors())
  app.use(express.json());

  app.get("/reports", async (req, res, next) => {
    const reports = await getReports(next);
    res.json(
      reports.elements.map(({ id, state, payload }) => ({
        id,
        state,
        type: payload.reportType,
        message: payload.message
      }))
    );
  });

  app.post("/reports/:id", async (req, res, next) => {
    const reports = await getReports(next);
    const element = reports.elements.find(({ id }) => id === req.params.id);
    element.state = req.body.ticketState;
    try {
      await fs.writeFile(
        path.resolve(__dirname, "../data/reports.json"),
        JSON.stringify(reports, null, 4),
        "utf8"
      );
      res.send("Succesfully updated reports!");
    } catch (error) {
      next(error);
    }
  });
};
