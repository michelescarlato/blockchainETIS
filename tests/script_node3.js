const driver = require('bigchaindb-driver')

const API_PATH = 'http://192.86.139.75:9984/api/v1/'

//var date = new Date();
//var timestamp = date.getTime();

let fs = require('fs')

let filename_pubkey = "chris.pubkey"
let chris_pubkey = fs.readFileSync(process.cwd() + "/" + filename_pubkey).toString()
//console.log("Public key " + chris_pubkey)

let filename_privkey = "chris.privkey"
let chris_privkey = fs.readFileSync(process.cwd() + "/" + filename_privkey).toString()
//console.log("Private key " + chris_privkey)

//let createTxId
/*const assetdata = { "What is your country and city of residence?": "Germany", "City": "Berlin", "Gender": "Male", "Age": "50-64", "overnight": true, "how many nights": "4", "did you from:": "Home", "Purpose": [ "In transit" ], "how many:": "Alone", "primary transport:": [ "Caravan" ], "method transport here:": [ "Caravan" ], "first time here:": false, "If No, how many times:": "3", "When last visit:": "Last 12 months", "Interesting Features": [ "Beach facilities", "Peace and quiet" ], "kind of accomodation:": "Own property", "spend per day:": "< 25 €", "expenses:": "Within what was planned", "disability or reduced mobility:": false, "special needs:": "Neutral", "sustainability efforts": false, "Overall Satisfaction": "Slightly Agree", "Disability considerations": "Neither Agree Nor Disagree ", "Highest Degree": "High school graduate", "Professional Status": "Retired", "Annual Household": "Medium (from 30.000 to 60.000 euros)", "Timestamp" : ""+timestamp+""}//, "Survey Type": "visitors" }*/

const assetdata = { "Vote": "White", "Token" : "213456098123475"}
//const assetdata = { "What is your country and city of residence?": "France" }
//console.log(assetdata)

const metadata = {"what": "My first bigchaindb transaction TEST"}
// Construct a transaction payload
const txCreateChrisSimple = driver.Transaction.makeCreateTransaction(
        assetdata,
        metadata,
        // A transaction needs an output
        [ driver.Transaction.makeOutput(
                        driver.Transaction.makeEd25519Condition(chris_pubkey))
        ],
        chris_pubkey
)
// Sign the transaction with private keys of Chris to fulfill it
const txCreateChrisSimpleSigned = driver.Transaction.signTransaction(txCreateChrisSimple, chris_privkey)
// Send the transaction off to driver
let conn = new driver.Connection(API_PATH)
conn.postTransactionCommit(txCreateChrisSimpleSigned)
