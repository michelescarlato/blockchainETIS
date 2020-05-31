const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const urlMongo = 'mongodb://localhost:27017/bigchain'

var express = require('express');
var app = express();
var str = "";

var queryMongo = function(query1, query2, callback) {
	MongoClient.connect(urlMongo, query1, query2, function(err, db) {
    if (err) throw err;
	  console.log("Connected successfully to server")


		executeAggregateQuery(query1, query2, db, function(err, data) {
			callback(err, data);
				db.close();
		});
	})
}

var executeAggregateQuery = function(query1, query2, db, callback) {
		const client = db.db();
		const collection = client.collection('assets');
				collection.aggregate([query1, query2]).toArray(function(err, docs) {
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


		queryVisitors = {$match: {'data.Survey Type' : 'visitors' }};
		/*other three types of surveys*/

		queryCity = {$sortByCount :"$data.City"};
		queryAge = {$sortByCount:"$data.Age"};
		queryGender = {$sortByCount:"$data.Gender"};
		querySatisfaction = {$sortByCount:"$data.Overall Satisfaction"};
		queryDisabilityConsiderations = {$sortByCount:"$data.Disability considerations"};
		queryPurpose = {$sortByCount:"$data.Purpose"}; // is an array the response
		queryHighestDegree = {$sortByCount:"$data.Highest Degree"};
		queryProfessionalStatus = {$sortByCount:"$data.Professional Status"};
		queryAnnualHousehold = {$sortByCount:"$data.Annual Household"};
		queryInterestingFeatures = {$sortByCount:"$data.Interesting Features"};

//definire una if (req.parameter == 'value'){esegui queryMongo con determinate parametri}
    queryMongo(query1, query2, function(err, data) {
        if(err)
            res.status(500).json({error: err});
        else
						res.json(data);
    })
})
