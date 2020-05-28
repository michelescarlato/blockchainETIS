const driver = require('bigchaindb-driver')

const API_PATH = 'http://192.168.100.125:9984/api/v1/'

const alice = new driver.Ed25519Keypair()

alice_pubkey = alice.publicKey;
alice_privkey = alice.privateKey;

//let createTxId
//const assetdata = {"What is your country and city of residence?": "italy", "Postcode": "09100"}
const assetdata = { "What is your country and city of residence?": "Spain", "City": "Sevilla", "Gender": "Female", "Age": "25-49", "overnight": false, "If No, how many hours:": "5", "did you from:": "Home", "Purpose": [ "Visiting relatives and friends" ], "how many:": "Alone", "primary transport:": [ "Car" ], "method transport here:": [ "Walk" ], "first time here:": false, "If No, how many times:": "3", "When last visit:": "Last 12 months", "Interesting Features": [ "A particular event", "Peace and quiet", "Scenery and countryside", "Historic interest" ], "kind of accomodation:": "Friend's / Relative's home", "spend per day:": "25 - 50 €", "expenses:": "Within what was planned", "disability or reduced mobility:": false, "special needs:": "Agree", "sustainability efforts": true, "initiatives aware:": "Differentiate garbage collection", "Overall Satisfaction": "Agree", "Disability considerations": "Agree", "Highest Degree": "Master’s degree", "Professional Status": "Part-time employed for wages", "Annual Household": "Low (under 30.000 euros)" }

const metadata = {"what": "My first bigchaindb transaction TEST"}
// Construct a transaction payload
const txCreateAliceSimple = driver.Transaction.makeCreateTransaction(
        assetdata,
        metadata,
        // A transaction needs an output
        [ driver.Transaction.makeOutput(
                        driver.Transaction.makeEd25519Condition(alice_pubkey))
        ],
        //alert('waiting for Alice public key: '),
        alice_pubkey
)
// Sign the transaction with private keys of Alice to fulfill it
const txCreateAliceSimpleSigned = driver.Transaction.signTransaction(txCreateAliceSimple, alice_privkey)
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
