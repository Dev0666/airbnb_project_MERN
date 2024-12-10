const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require ("../utils/ExpressError.Js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isreviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js")

//Reviews 
router.post("/",
  isLoggedIn,
    validateReview, 
    wrapAsync(reviewController.createReview)
);
  
  //delete review
  router.delete("/:reviewId",
    isLoggedIn,
    isreviewAuthor,
     wrapAsync(reviewController.destroyReview)
  );


  module.exports = router;