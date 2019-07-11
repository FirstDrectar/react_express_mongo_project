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

router.post("/file", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.sendStatus(HttpStatus.BAD_REQUEST);
    }
    const data = req.file.buffer.toString();
    const dataArr = data.split("\n").filter(word => !/^\s*$/.test(word));
    let parsedData = [];
    for (let x = 0; x < dataArr.length; x++) {
      const newFilm = {
        name: parseStr(dataArr[x]).trim(),
        releaseDate: parseStr(dataArr[x + 1]).trim(),
        format: parseStr(dataArr[x + 2]).trim(),
        actorList: parseActorList(parseStr(dataArr[x + 3]))
      };
      x += 3;
      parsedData.push(newFilm);

    }
    // console.log(parsedData);

    return res.json(await Film.uploadMany(parsedData));
  }
  catch (err) {
    console.log(err.message);
  }
});
router.get('/pagination', async (req, res) => {

  try {
    const { totalDocs, docs } = await Film.getPart(+req.query.page + 1, +req.query.limit, req.query.searchstr, req.query.search, req.query.sort);
    res.json({ totalDocs, docs });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
  }
});
function parseStr(str) {
  const index = str.indexOf(":");
  return str.slice(index + 1);
}
function parseActorList(str) {
  const actorObjectList = [];
  str.split(",").forEach(string => {
    const parsedData = string.trim().split(" ");
    for (let i = 0; i < parsedData.length; i++) {
      actorObjectList.push({ name: parsedData[i], surname: parsedData[i + 1] });
      i++;
    }
  });
  return actorObjectList;
}

