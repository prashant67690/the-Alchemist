

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Looking for tech blogs to keep up with the latest technology trends? No worries! Your search ends here! Read on…People from different walks of life are intrigued by the way technology is progressing at a profuse rate, shaping our lives into the digital world!With new tech trends being introduced every quarter and information becoming obsolete as technology evolves, it’s now an obligation to stay relevant and learn about the newest technologies, digital industry, social media, and the web in general!";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// mongoose coneection is done here
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blogDB');

// creating model and schema for our database 
const dataSchema = new mongoose.Schema(
  {
    title: 'String',
    content: 'String'
  }
);

const blogPost = mongoose.model('blogPost',dataSchema);

//route for home page
app.get("/",function(req,res){

  blogPost.find({},function(err,posts){
    console.log(posts);
      res.render("home",{Firstcontent:homeStartingContent,posts:posts});
  });

});

//route for about page

app.get("/about",function(req,res){

   res.render("about",{aboutMessage:aboutContent});


});

//route for contact page

app.get("/contact",function(req,res){

    res.render("contact",{contactMessage:contactContent});

});

//route to compose page

app.get("/compose",function(req,res){

    res.render("compose");

});

//post request for Compose

app.post("/compose",function(req,res){

const post= new blogPost({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save((err)=>{
    if(!err){
    res.redirect("/");
    }
  });
});
// declaring constant for storing postid parameter value 



//checking about page path

app.get("/posts/:postid",function(req,res){
  const requestedPostId = req.params.postId;
  console.log(requestedPostId);
  blogPost.findOne({_id: requestedPostId}, function(err, post){

    res.render("post", {
 
      title: post.title,
 
      content: post.content
 
    });
 
  });

});

// port listen

app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
