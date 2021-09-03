/**
 * API Cake testing
 * @author Khadime Diakhate
 */
let should = require("should");
let chai = require("chai");
let expect = chai.expect;
let urlBase = "http://localhost:5000";
const request = require("supertest")(urlBase);
const cakeModel = require("../models/cakes");

/**
 * Test for the cakes endpoint that returns all the cakes
 */
describe("cakeFactory API test", () => {
  let newCake = {
    name: "hdm-cake-128",
    comment: "My awesome cake recipe..",
    yumFactor: 4,
  };

  const _id = "61262935c804cd158c9a7ea3";

    /**
    * Returns all the cakes
     */
  it('Get all Cakes', (done) => {
        request
        .get('/cakes')
        .expect(200)
        .end((err, resp) => {
            let allCakes = {};
            try {
                allCakes = resp.body;
            } catch (e) {
                allCakes = {};
            }

            expect(resp.statusCode).to.equal(200);
            if (allCakes[0].should.have.property("_id")) {
              expect(allCakes[0]._id).to.be.a('string');
            }
            done();
            
        })
    })

  /**
   * Test creating a single cake
   */
  it("Should POST/CREATE a single cake", async () => {
    const base64Img =
      "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";

    let imageUrl = {
      filename: "Gateau de SN",
      filetype: "image/jpg",
      value: base64Img,
    };
    newCake.imageUrl = imageUrl;
    const data = {
      cake: JSON.stringify(newCake),
    };

    await request
      .post("/cakes")
      .send(data)
      .set("Accept", "application/json")
      .expect(201)
      .then(async (response) => {
        expect(response.body.success).to.be.true;
        expect(response.body.data.name).to.equal(newCake.name);
        expect(response.body.data.comment).to.equal(newCake.comment);
      });
  });


      /**
   * Test for a single cake
   */
   it('Get a single Cake', (done) => {
        request
        .get('/cakes/' + newCake.name)
        .expect(200)
        .end((err, responded) => {
            let _cake = {};
            try {
                _cake = responded.body;
            } catch (e) {
                _cake = {};
            }

            expect(responded.statusCode).to.equal(200);
            if (_cake.data.should.have.property("_id")) {
              expect(_cake.data._id).to.be.a('string');
            }
            done();
            
        })
    })
    
  /**
   * Test deleting a single cake
   */
  it("Delete a cake record", (done) => {
    request
      .delete("/cakes/" + newCake.name)
      .end((err, res) => {
        if (res.body.should.have.property("success")) {
            expect(res.body.success).to.be.true;
        }
        done();
      });
  });
});
