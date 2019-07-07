
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
      // console.log(req.body);
      const film = {
        name: req.body.name,
        releaseDate: req.body.releaseDate,
        format: req.body.format,
        actorList: req.body.actorList
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
    try {
      if (req.body.id) {
        const id = req.body.id;
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



// this is our update method
// this method overwrites existing data in our database


// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.message = message;
  data.id = id;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});
