/**
 * API Cake testing
 * @author Khadime Diakhate
 */
require("dotenv").config({ path: __dirname + "/.env" });

let should = require("should");
let request = require("request");
let chai = require("chai");
let expect = chai.expect;
let urlBase = "http://localhost:5000";

/**
 * Test for the cakes endpoint that returns all the cakes
 */
describe("cakeFactory API test", () => {
  it("Should return all cakes", (done) => {
    request.get(
      {
        url: urlBase + "/cakes",
      },
      function (error, response, body) {
        let _body = {};
        let cake = {};
        try {
          _body = JSON.parse(body);
        } catch (e) {
          _body = {};
        }

        expect(response.statusCode).to.equal(200);
        cake = _body[0];
        // console.log(cake);
        if (cake.should.have.property("_id")) {
          expect(cake).to.have.property("yumFactor", 5);
        }
      }
    );
    done();
  });

  /**
   * Test for a single cake
   */
  it("Should return a single cake with ID #61262935c804cd158c9a7ea3", (done) => {
    const id = "61262935c804cd158c9a7ea3";
    request.get(
      {
        url: urlBase + "/cakes/" + id,
      },
      function (error, response, body) {
        let _body = {};
        try {
          _body = JSON.parse(body);
        } catch (e) {
          _body = {};
        }

        if (_body.should.have.property("data")) {
          expect(_body.success).to.be.true;

          // check the cake's property ID
          if (_body.data.should.have.property("_id")) {
            expect(_body.data._id).to.equal(id);
          }
        }
      }
    );
    done();
  });

  /**
   * Test creating a single cake
   */
  it("Should POST/CREATE a single cake", (done) => {
    //   ...
    done();
  });
});
