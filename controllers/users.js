 const User = require("../models/user")

module.exports.renderSignupForm = (req, res) => {
    res.render("./users/signup.ejs");
}

module.exports.signup = async(req, res) => {
    try{

        let{ username, email, password } = req.body;
        const newUser = new User({email, username});
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.login(registerUser,(err) => {
            if (err){
                return next(err)
            }
            req.flash("success", "Welcome to ice!");
            res.redirect("/listings")
        });
       
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("./users/login.ejs");
}

module.exports.login =  async(req,res) => {
    // console.log('Redirecting to:', res.locals.redirectUrl); 
 req.flash("success", "Welcome back! You are logged in.");
 let redirectURL = res.locals.redirectUrl || "/listings";
// console.log('Final Redirect URL:', redirectURL); 
 res.redirect(redirectURL);
}

module.exports.logout = (req, res, next)=>{ 
    req.logout((err) => {
    if (err) {
    return next(err);
    }
    req.flash("success", "you are logged out!");
     return res.redirect("/listings");
    });  
}