import HttpStatus from 'http-status-codes';
import multer from 'multer';
const upload = multer();
import express from "express";
export const router = express.Router();
import { Film } from "../models/film.mjs"
// this is our get method
// this method fetches all available data in our database
router.route("/")
  .get(async (req, res) => {
    try {
      const data = await Film.getAll();
      // console.log(data);
      return res.json({
        data
      });
    } catch (err) {
      console.log(err.message);
      return res.status(HttpStatus.NOT_FOUND).json({
        err: err.message
      });
    }

  })
  .post(async (req, res) => {
    try {
      console.log(req.body);
      const date = parseInt(req.body.data.releaseDate);

      if (isNaN(date) || date > 2020 || date < 1000) {
        return res.sendStatus(HttpStatus.BAD_REQUEST);
      }
      const film = {
        name: req.body.data.name,
        releaseDate: req.body.data.releaseDate,
        format: req.body.data.format,
        actorList: req.body.data.actorList
      }

      const data = await Film.addNewFilm(film)
      return res.json({
        data
      });
    } catch (err) {
      console.log(err.message);
      return res.status(HttpStatus.NOT_FOUND).json({
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
          data
        });
      }
      return res.json({
        err: `id is undefined`
      });
    } catch (err) {
      console.log(err.message);
      return res.status(HttpStatus.NOT_FOUND).json({
        err: err.message
      });
    }
  })

router.post("/file", upload.single("file"), (req, res) => {
  console.dir(req.file);
  if (!req.file)
    res.sendStatus(HttpStatus.BAD_REQUEST);
  const data = req.file.buffer.toString();
  
  console.log(data);
  res.sendStatus(HttpStatus.OK);
});
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

