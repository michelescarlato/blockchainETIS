const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const urlMongo = 'mongodb://localhost:27017/bigchain'

var express = require('express');
var app = express();
var str = "";
//queryMongo()

var queryAge = {$sortByCount:"$data.Age"}
var query = {$sortByCount:"$data.City"}


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
				//collection.aggregate([{$match: {'data.Survey Type' : 'visitors' }},{$sortByCount :"$data.City"}]).toArray(function(err, docs) {
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
app.get('/Cities', function(req, res, next) {
    console.log("Someone connected.")
		query1 = {$match: {'data.Survey Type' : 'visitors' }};
		query2 = {$sortByCount :"$data.City"};

    queryMongo(query1, query2, function(err, data) {
        if(err)
            res.status(500).json({error: err});
        else
						res.json(data);
    })
})

app.get('/Age', function(req, res, next) {
    console.log("Someone connected.")
		query1 = {$match: {'data.Survey Type' : 'visitors' }};
		query2 = {$sortByCount:"$data.Age"};
		queryMongo(query1, query2, function(err, data) {
				if(err)
						res.status(500).json({error: err});
				else
						res.json(data);
		})
})

app.get('/Gender', function(req, res, next) {
    console.log("Someone connected.")
		query1 = {$match: {'data.Survey Type' : 'visitors' }};
		query2 = {$sortByCount:"$data.Gender"};
		queryMongo(query1, query2, function(err, data) {
				if(err)
						res.status(500).json({error: err});
				else
						res.json(data);
		})
})

app.get('/OverallSatisfaction', function(req, res, next) {
    console.log("Someone connected.")
		query1 = {$match: {'data.Survey Type' : 'visitors' }};
		query2 = {$sortByCount:"$data.Overall Satisfaction"};
		queryMongo(query1, query2, function(err, data) {
				if(err)
						res.status(500).json({error: err});
				else
						res.json(data);
		})
})

app.get('/DisabilityConsiderations', function(req, res, next) {
    console.log("Someone connected.")
		query1 = {$match: {'data.Survey Type' : 'visitors' }};
		query2 = {$sortByCount:"$data.Disability considerations"};
		queryMongo(query1, query2, function(err, data) {
				if(err)
						res.status(500).json({error: err});
				else
						res.json(data);
		})
})

app.get('/Purpose', function(req, res, next) {
    console.log("Someone connected.")
		query1 = {$match: {'data.Survey Type' : 'visitors' }};
		query2 = {$sortByCount:"$data.Purpose"};
		queryMongo(query1, query2, function(err, data) {
				if(err)
						res.status(500).json({error: err});
				else
						res.json(data);
		})
})

app.get('/HighestDegree', function(req, res, next) {
    console.log("Someone connected.")
		query1 = {$match: {'data.Survey Type' : 'visitors' }};
		query2 = {$sortByCount:"$data.Highest Degree"};
		queryMongo(query1, query2, function(err, data) {
				if(err)
						res.status(500).json({error: err});
				else
						res.json(data);
		})
})

app.get('/ProfessionalStatus', function(req, res, next) {
    console.log("Someone connected.")
		query1 = {$match: {'data.Survey Type' : 'visitors' }};
		query2 = {$sortByCount:"$data.Professional Status"};
		queryMongo(query1, query2, function(err, data) {
				if(err)
						res.status(500).json({error: err});
				else
						res.json(data);
		})
})

app.get('/AnnualHousehold', function(req, res, next) {
    console.log("Someone connected.")
		query1 = {$match: {'data.Survey Type' : 'visitors' }};
		query2 = {$sortByCount:"$data.Annual Household"};
		queryMongo(query1, query2, function(err, data) {
				if(err)
						res.status(500).json({error: err});
				else
						res.json(data);
		})
})

app.get('/InterestingFeatures', function(req, res, next) {
    console.log("Someone connected.")
		query1 = {$match: {'data.Survey Type' : 'visitors' }};
		query2 = {$sortByCount:"$data.Interesting Features"};
		queryMongo(query1, query2, function(err, data) {
				if(err)
						res.status(500).json({error: err});
				else
						res.json(data);
		})
})

var server = app.listen(3000, function() {});
