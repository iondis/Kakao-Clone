import chai, { expect } from "chai";
import http from "chai-http";

chai.use(http);

const url = "http://localhost:5000";
const user = {
    platformName: "google",
    socialId: "tjdans174@gmail.com"
};

const ErrorProcess = err => console.log(err);

const resCheack = res => {
    expect(res.body).have.property("success");
    expect(res.body).have.property("message");
    return res;
};

const getToken = new Promise((resolve, reject) => {
    chai.request(url)
        .post("/user")
        .send({ user })
        .then(resCheack)
        .then(res => {
            expect(res.body.success).to.be.equal(true);
            expect(res.body.message).have.property("token");
            return res.body.message.token;
        })
        .then(resolve)
        .catch(reject);
});
