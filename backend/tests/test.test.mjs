
import chai from "chai";
import chaiHttp from "chai-http";
import app from '../index';
import request from "supertest";
let except = chai.expect;
let should = chaiHttp.should;
let assert = chai.assert;

chai.use(chaiHttp);



describe('GET /api', function () {
  it('should return 5 films', () => {
    request("http://localhost:3030")
      .get('/api/pagination?page=0&limit=5&searchstr=q&sort=asc&search=actor')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        assert(1,2);
        done();
      });
  })
});
describe('GET /user', function () {
  it('responds with json', function (done) {
    request(app)
      .get('')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
describe("Users Test", function () {
  it("should do basic testing", function (done) {
    except(2).equals(2);
    except(2).not.equals(1);
  });
});

