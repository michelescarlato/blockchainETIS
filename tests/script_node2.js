const driver = require('bigchaindb-driver')

const API_PATH = 'http://192.168.100.126:9984/api/v1/'


var date = new Date();
var timestamp = date.getTime();

let fs = require('fs')

let filename_pubkey = "bob.pubkey"
let bob_pubkey = fs.readFileSync(process.cwd() + "/" + filename_pubkey).toString()
//console.log("Public key " + bob_pubkey)

let filename_privkey = "bob.privkey"
let bob_privkey = fs.readFileSync(process.cwd() + "/" + filename_privkey).toString()
//console.log("Private key " + bob_privkey)


const assetdata = { "What is your country and city of residence?": "France", "City": "Nice", "Gender": "Male", "Age": "25-49", "overnight": true, "how many nights": "3", "did you from:": "Home", "Purpose": [ "Holiday" ], "how many:": "Alone", "primary transport:": [ "Motorcycle" ], "method transport here:": [ "Motorcycle" ], "first time here:": true, "Interesting Features": [ "Beach facilities" ], "kind of accomodation:": "Hotel / Resort / Motel", "spend per day:": "25 - 50 €", "expenses:": "Within what was planned", "disability or reduced mobility:": false, "special needs:": "Agree", "sustainability efforts": false, "Overall Satisfaction": "Agree", "Disability considerations": "Slightly Agree", "Highest Degree": "Bachelor’s degree", "Professional Status": "Self-employed", "Annual Household": "Medium (from 30.000 to 60.000 euros)", "Timestamp" : ""+timestamp+"" }

const metadata = {"what": "My first bigchaindb transaction TEST"}
// Construct a transaction payload
const txCreateBobSimple = driver.Transaction.makeCreateTransaction(
        assetdata,
        metadata,
        // A transaction needs an output
        [ driver.Transaction.makeOutput(
                        driver.Transaction.makeEd25519Condition(bob_pubkey))
        ],
        bob_pubkey
)
// Sign the transaction with private keys of Bob to fulfill it
const txCreateBobSimpleSigned = driver.Transaction.signTransaction(txCreateBobSimple, bob_privkey)
// Send the transaction off to driver
let conn = new driver.Connection(API_PATH)
conn.postTransactionCommit(txCreateBobSimpleSigned)
