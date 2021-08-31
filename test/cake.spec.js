/**
 * API Cake testing
 * @author Khadime Diakhate
 */

var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "http://localhost:5000";

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
        var _body = {};
        try {
          _body = JSON.parse(body);
        } catch (e) {
          _body = {};
        }

        expect(response.statusCode).to.equal(200);

        if (_body[0].should.have.property("_id")) {
          expect(_body[0]).to.have.property("yumFactor", 5);
        }
      }
    );
    done();
  });

  /**
   * Test for a single cake
   */
  it("Should return a single cake with ID #61262935c804cd158c9a7ea3", (done) => {
    request.get(
      {
        url: urlBase + "/cakes/61262935c804cd158c9a7ea3",
      },
      function (error, response, body) {
        var _body = {};
        try {
          _body = JSON.parse(body);
        } catch (e) {
          _body = {};
        }

        if (_body.should.have.property("data")) {
          expect(_body.success).to.be.true;

          // check the cake's property ID
          if (_body.data.should.have.property("_id")) {
            expect(_body.data._id).to.equal("61262935c804cd158c9a7ea3");
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
