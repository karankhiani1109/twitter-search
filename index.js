var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

const config=require('./config');
const twit=require('twit');
const T=new twit(config);
// console.log(path);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) =>{	

	res.render('page');
});
app.post("/", (req, res, next) => {
	console.log();
	let params={
    q:req.body.search,
    count:20
}
T.get('search/tweets',params,(err,data,response)=>{
let tweets=data.statuses;
 res.render('index',{title:tweets,searched:req.body.search});

});

    
    });
 




app.listen(3000, () => {
 console.log("Server running on port 3000");
});
