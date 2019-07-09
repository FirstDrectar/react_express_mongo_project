
import express from "express";
export const router = express.Router();
import { Film } from "../models/film.mjs"
// this is our get method
// this method fetches all available data in our database
var Data = {};
router.route("/")
  .get(async (req, res) => {
    try {
      const data = await Film.getAll();
      // console.log(data);
      return res.json({
        success: true,
        data
      });
    } catch (err) {
      console.log(err.message);
      return res.status(404).json({
        success: false,
        err: err.message
      });
    }

  })
  .post(async (req, res) => {
    try {
      console.log(req.body);
      const film = {
        name: req.body.data.name,
        releaseDate: req.body.data.releaseDate,
        format: req.body.data.format,
        actorList: req.body.data.actorList
      }
      const data = await Film.addNewFilm(film)
      return res.json({
        success: true,
        data
      });
    } catch (err) {
      console.log(err.message);
      return res.status(404).json({
        success: false,
        err: err.message
      });
    }
  }).delete(async (req, res) => {
    console.dir(req.body);
    try {
      if (req.body._id) {
        const id = req.body._id;
        const data = await Film.deleteById(id);
        return res.json({
          success: true,
          data
        });
      }
      return res.json({
        success: false,
        err: `id is undefined`
      });
    } catch (err) {
      console.log(err.message);
      return res.status(404).json({
        success: false,
        err: err.message
      });
    }
  })


router.get('/pagination', async (req, res) => {
  console.log(req.query);

  try {
    const { totalDocs, docs } = await Film.getPart(+req.query.page + 1, +req.query.limit, req.query.searchstr, req.query.search, req.query.sort);
    res.json({ totalDocs, docs });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

