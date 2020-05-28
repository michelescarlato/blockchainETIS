const driver = require('bigchaindb-driver')

const API_PATH = 'http://192.168.100.127:9984/api/v1/'

const alice = new driver.Ed25519Keypair()

//let createTxId
//const assetdata = {"What is your country and city of residence?": "italy", "Postcode": "09100"}
const assetdata = { "What is your country and city of residence?": "Germany", "City": "Berlin", "Gender": "Male", "Age": "50-64", "overnight": true, "how many nights": "4", "did you from:": "Home", "Purpose": [ "In transit" ], "how many:": "Alone", "primary transport:": [ "Caravan" ], "method transport here:": [ "Caravan" ], "first time here:": false, "If No, how many times:": "3", "When last visit:": "Last 12 months", "Interesting Features": [ "Beach facilities", "Peace and quiet" ], "kind of accomodation:": "Own property", "spend per day:": "< 25 €", "expenses:": "Within what was planned", "disability or reduced mobility:": false, "special needs:": "Neutral", "sustainability efforts": false, "Overall Satisfaction": "Slightly Agree", "Disability considerations": "Neither Agree Nor Disagree ", "Highest Degree": "High school graduate", "Professional Status": "Retired", "Annual Household": "Medium (from 30.000 to 60.000 euros)" }

const metadata = {"what": "My first bigchaindb transaction TEST"}
// Construct a transaction payload
const txCreateAliceSimple = driver.Transaction.makeCreateTransaction(
        assetdata,
        metadata,
        // A transaction needs an output
        [ driver.Transaction.makeOutput(
                        driver.Transaction.makeEd25519Condition(alice.publicKey))
        ],
        //alert('waiting for Alice public key: '),
        alice.publicKey
)
// Sign the transaction with private keys of Alice to fulfill it
const txCreateAliceSimpleSigned = driver.Transaction.signTransaction(txCreateAliceSimple, alice.privateKey)
//alert('txCreateAliceSimpleSigned: ')
// Send the transaction off to driver
let conn = new driver.Connection(API_PATH)
//alert('connection ... : ')
conn.postTransactionCommit(txCreateAliceSimpleSigned)
/*.then(res => {
      createTxId = res.id
      //tokensLeft = nTokens
      document.body.innerHTML ='<h3>Transaction created</h3>';
      // txSigned.id corresponds to the asset id of the tokens
      document.body.innerHTML+=API_PATH
      document.body.innerHTML+='transactions/'
      document.body.innerHTML+=txCreateAliceSimpleSigned.id
      //document.body.innerhtml.href = API_PATH + 'transactions/' + txCreateAliceSimpleSigned.id

  })*/
