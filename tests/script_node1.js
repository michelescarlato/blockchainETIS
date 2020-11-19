const driver = require('bigchaindb-driver')

const API_PATH = 'http://128.163.232.67:9984/api/v1/'


var date = new Date();
var timestamp = date.getTime();


let fs = require('fs')

let filename_pubkey = "alice.pubkey"
let alice_pubkey = fs.readFileSync(process.cwd() + "/" + filename_pubkey).toString()
//console.log("Public key " + alice_pubkey)

let filename_privkey = "alice.privkey"
let alice_privkey = fs.readFileSync(process.cwd() + "/" + filename_privkey).toString()
//console.log("Private key " + alice_privkey)



const assetdata = { "What is your country and city of residence?": "Spain", "City": "Sevilla", "Gender": "Female", "Age": "25-49", "overnight": false, "If No, how many hours:": "5", "did you from:": "Home", "Purpose": [ "Visiting relatives and friends" ], "how many:": "Alone", "primary transport:": [ "Car" ], "method transport here:": [ "Walk" ], "first time here:": false, "If No, how many times:": "3", "When last visit:": "Last 12 months", "Interesting Features": [ "A particular event", "Peace and quiet", "Scenery and countryside", "Historic interest" ], "kind of accomodation:": "Friend's / Relative's home", "spend per day:": "25 - 50 €", "expenses:": "Within what was planned", "disability or reduced mobility:": false, "special needs:": "Agree", "sustainability efforts": true, "initiatives aware:": "Differentiate garbage collection", "Overall Satisfaction": "Agree", "Disability considerations": "Agree", "Highest Degree": "Master’s degree", "Professional Status": "Part-time employed for wages", "Annual Household": "Low (under 30.000 euros)", "Timestamp" : ""+timestamp+""}//, "Survey Type": "visitors" }
console.log(assetdata)

//const assetdata = { "Vote": "White" }
//const assetdata = { "What is your country and city of residence?": "France" }

const metadata = {"what": "My first bigchaindb transaction TEST"}
// Construct a transaction payload
const txCreateAliceSimple = driver.Transaction.makeCreateTransaction(
        assetdata,
        metadata,
        // A transaction needs an output
        [ driver.Transaction.makeOutput(
                        driver.Transaction.makeEd25519Condition(alice_pubkey))
        ],
        alice_pubkey
)
// Sign the transaction with private keys of Alice to fulfill it
const txCreateAliceSimpleSigned = driver.Transaction.signTransaction(txCreateAliceSimple, alice_privkey)
// Send the transaction off to driver
let conn = new driver.Connection(API_PATH)
conn.postTransactionCommit(txCreateAliceSimpleSigned)
