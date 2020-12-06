//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//________________________GET REQUEST_________________________________________//

app.get("/", function (req, res) {
  res.render("home", {
    pOne: homeStartingContent,
    postArray: posts
  });

});

app.get("/about", function (req, res) {
  res.render("about", {
    pAbout: aboutContent
  });

});

app.get("/contact", function (req, res) {
  res.render("contact", {
    pContact: contactContent
  });

});

app.get("/portfolio", function (req, res) {
  res.render("portfolio");

});

app.get('/post/:postId', function (req, res) { //this is route parameter a
  //function of expres. http://expressjs.com/en/guide/routing.html#route-parameters
  const newComposeTitle = req.params.postId;
  
  
  // for (var i = 0; i < posts.length; i++) {
  //   if (newComposeTitle == posts[i].title) {
  //     console.log('match found');
  //   }
  // }

  posts.forEach(element => {
    const LCelementTitle = _.lowerCase(element.title);//converting the title into lower caps
    const LCurlTitle = _.lowerCase(newComposeTitle);
    
    if(LCelementTitle==LCurlTitle){
     // console.log(element.title+"_________"+ element.body);
      res.render("post",{
        titlePost : element.title,
        contentPost : element.body
      });
    };
   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach 
  
  });
});

//________________________POST REQUEST_________________________________________//

app.post("/portfolio", function (req, res) {
  console.log(req.body.compMsg);
  const newPost = {
    title: req.body.compTitle,
    body: req.body.compMsg //compMsg is name attribute in text box of compose.ejs
  };
  posts.push(newPost);
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});