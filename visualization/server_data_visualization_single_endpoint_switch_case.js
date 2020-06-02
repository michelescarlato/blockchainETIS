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
		console.log(querySortByCount);

		switch(queryMatch){
			case 'visitors':
				queryMatch = {$match: {'data.Survey Type' : 'visitors' }};
				break;
			case 'residents':
				queryMatch = {$match: {'data.Survey Type' : 'residents' }};
				break;
			case 'enterprises':
				queryMatch = {$match: {'data.Survey Type' : 'enterprises' }};
				break;
			case 'municipalities':
				queryMatch = {$match: {'data.Survey Type' : 'municipalities' }};
				break;
		}
		//if(queryMatch=="visitors")
		//queryMatch = {$match: {'data.Survey Type' : 'visitors' }};
		/*other three types of surveys*/

		switch(querySortByCount){
			//ETIS
			case 'queryDisabilityConsiderations':
				querySortByCount = {$sortByCount:"$data.Disability considerations"};
				break;
			case 'querySatisfaction':
				querySortByCount = {$sortByCount:"$data.Overall Satisfaction"};
				break;

			//socio demographic
			case 'queryCity':
				querySortByCount = {$sortByCount :"$data.City"};
				break;
			case 'queryAge':
				querySortByCount = {$sortByCount :"$data.Age"};
				break;
			case 'queryGender':
				querySortByCount = {$sortByCount :"$data.Gender"};
				break;
			case 'queryHighestDegree':
				querySortByCount = {$sortByCount :"$data.Highest Degree"};
				break;
			case 'queryProfessionalStatus':
				querySortByCount = {$sortByCount :"$data.Purpose"};
				break;
			case 'queryAnnualHousehold':
				querySortByCount = {$sortByCount :"$data.Purpose"};
				break;

			//contributions
			case 'queryPurpose':
				querySortByCount = {$sortByCount :"$data.Purpose"};
				break;
			case 'queryInterestingFeatures':
				querySortByCount = {$sortByCount :"$data.Purpose"};
				break;
			}
		console.log(JSON.stringify(querySortByCount));
		queryMongo(queryMatch, querySortByCount, function(err, data) {
        if(err)
            res.status(500).json({error: err});
        else
						res.json(data);
    })
})

var server = app.listen(3000, function() {});
