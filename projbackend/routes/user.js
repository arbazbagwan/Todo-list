const express = require("express");
const router = express.Router();

const {Signup, Signin, isAuthenticated, isSignedIn, signout} = require('../controller/user')

router.post("/signup", Signup);
router.post("/signin", Signin);
router.get("/das",isSignedIn,(req, res)=>{
    res.write("dasad");
    res.end();
})
router.get("/signout", signout);

module.exports = router;
