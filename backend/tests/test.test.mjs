
import chai from "chai";
import chaiHttp from "chai-http";
import app from '../index';
import { Film } from "../models/film.mjs"
import HttpStatus from 'http-status-codes';

let should = chaiHttp.should;
let assert = chai.assert;
const expect = chai.expect;
chai.use(chaiHttp);
const myRequest = chai.request(app).keepOpen();


describe("TEST API", () => {
  it('GET /api/pagination', () => {
    return myRequest.get('/api/pagination?page=0&limit=5&searchstr=q&sort=asc&search=actor')
      .then(res => {
        expect(res).have.status(HttpStatus.OK);
        expect(res).have.property('body');
        expect(res).have.nested.property('body.totalDocs');
        expect(res).have.nested.property('body.docs');
      });
  });

  it('upload user', () => {
    return myRequest.post('/api')
      .send({
        data: {
          "name": "name",
          "releaseDate": "1992",
          "format": "VHS",
          "actorList": [{
            "name": "name",
            "surname": "surname"
          }
            , {
            "name": "name2",
            "surname": "surname2"
          }]
        }
      })
      .then(res => {
        console.log(res.body);
        expect(res).have.status(HttpStatus.OK);
        expect(res).have.property('body');
        expect(res).have.nested.property('body.data');
        expect(res.body.data).have.property('_id');
        expect(res.body.data).have.property('name', 'name');
        expect(res.body.data).have.property('actorList');
        expect(res.body.data.actorList).to.be.a('array');


      });
  });
  it('remove user by id', () => {
    const film = {
      "name": "name",
      "releaseDate": "1992",
      "format": "VHS",
      "actorList": [
        {
          "name": "name",
          "surname": "surname"
        }
        , {
          "name": "name2",
          "surname": "surname2"
        }]
    }
    return Film.addNewFilm(film)
      .then(f => {
        // console.log(f);
        return myRequest.delete('/api')
          .send({
            
              _id: f._id
            
          })
          .then(res => {
            // console.log(res.body);
            expect(res).have.status(HttpStatus.OK);
            expect(res).have.property('body');
            expect(res.body).have.property('data');
            expect(res.body.data).have.property('_id');
            expect(res.body.data).have.property('name', 'name');
            expect(res.body.data).have.property('actorList');
            expect(res.body.data.actorList).to.be.a('array');
      
          });
      })


  });
  // it('upload file', () => {
  //   const formdata = new FormData();
  //   formdata.append("file", fs.readFileSync('./tests/test_movies.txt'));
  //   // console.log(formdata)
  //   return myRequest.post("/api/file")
  //     .set('content-type', 'multipart/form-data')
  //     .send({ file: formdata })
  //     .then(res => {
  //       // expect(res).have.status(200);
  //       console.log(res);
  //     });
  // })
});
