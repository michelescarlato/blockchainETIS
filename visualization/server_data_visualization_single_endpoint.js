const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const urlMongo = 'mongodb://localhost:27017/bigchain'

var express = require('express');
var app = express();
var str = "";

var queryMongo = function(queryMatch, querySortByCount, callback) {
	MongoClient.connect(urlMongo, queryMatch, querySortByCount, function(err, db) {
    if (err) throw err;
	  console.log("Connected successfully to server")


		executeAggregateQuery(queryMatch, querySortByCount, db, function(err, data) {
			callback(err, data);
				db.close();
		});
	})
}

var executeAggregateQuery = function(queryMatch, querySortByCount, db, callback) {
		const client = db.db();
		const collection = client.collection('assets');
				collection.aggregate([queryMatch, querySortByCount]).toArray(function(err, docs) {
        callback(err, docs);
    });
};

//CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//routes
app.get('/', function(req, res, next) {
    console.log("Someone connected.")

		var queryMatch = req.query.queryMatch;
		console.log(req.query.queryMatch);


		var querySortByCount = req.query.querySortByCount;
		console.log(req.query.querySortByCount);

		if(queryMatch=="visitors")
		queryMatch = {$match: {'data.Survey Type' : 'visitors' }};
		/*other three types of surveys*/



		if(querySortByCount=="queryCity")
		{querySortByCount = {$sortByCount :"$data.City"};}

		if(querySortByCount=="queryAge")
		{querySortByCount = {$sortByCount:"$data.Age"};}

		if(querySortByCount=="queryGender")
		{querySortByCount = {$sortByCount:"$data.Gender"};}

		/*querySatisfaction = {$sortByCount:"$data.Overall Satisfaction"};
		queryDisabilityConsiderations = {$sortByCount:"$data.Disability considerations"};
		queryPurpose = {$sortByCount:"$data.Purpose"}; // is an array the response
		queryHighestDegree = {$sortByCount:"$data.Highest Degree"};
		queryProfessionalStatus = {$sortByCount:"$data.Professional Status"};
		queryAnnualHousehold = {$sortByCount:"$data.Annual Household"};
		queryInterestingFeatures = {$sortByCount:"$data.Interesting Features"};*/

//definire una if (req.parameter == 'value'){esegui queryMongo con determinate parametri}
    queryMongo(queryMatch, querySortByCount, function(err, data) {
        if(err)
            res.status(500).json({error: err});
        else
						res.json(data);
    })
})

var server = app.listen(3000, function() {});
