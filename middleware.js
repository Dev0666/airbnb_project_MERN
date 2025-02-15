const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require ("./utils/ExpressError.Js");
const {listingSchema,reviewSchema  } = require("./schema.Js");


module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
      // console.log(req.path, "..", req.originalUrl);
      req.session.redirectUrl = req.originalUrl; 
      req.flash("error", "You must be logged in to create listings!");
      return res.redirect("/login");
  }
  next();
};


module.exports.saveRedirectUrl = (req,res,next) =>{
    if (req.session.redirectUrl){
     // console.log('Saved Redirect URL:', req.session.redirectUrl);
        res.locals.redirectUrl = req.session.redirectUrl;
         delete req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async(req,res,next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id))  {
     req.flash("error","you are the not owner of this listings")
    return res.redirect(`/listings/${ id}`);
    }
    next();
};


module.exports.validateListing = (req, res, next) => {
  console.log("Listing Data:", req.body);
    let {error} = listingSchema.validate(req.body);
  if(error) {
    let errMsg = error.details.map((el) => el.message).join(","); 
  throw new ExpressError(400, errMsg);
  } else {
    next();
  }
   };

   module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        // console.log(error);
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
  };

  module.exports.isreviewAuthor = async(req,res,next) =>{
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id))  {
     req.flash("error","you are the not author of this Review")
    return res.redirect(`/listings/${ id}`);
    }
    next();
};