Survey
    .StylesManager
    .applyTheme("winter");

var json = {
    surveyId: '5570cd8a-8d5c-4496-a9bc-6e4d22e229b1'
};


window.survey = new Survey.Model(json);

const SurveyType = document.querySelector('meta[name="description"]').content;
console.log (SurveyType);

survey
    .onComplete
    .add(function risultato(result) {
        document
            .querySelector('#surveyResult')
            .textContent =JSON.stringify(result.data, null, 3);
            var contenutoSurvey1 = JSON.stringify(result.data);
            contenutoSurveyAddedField = contenutoSurvey1.replace("}",", \"Survey Type\":\""+SurveyType+"\" }")
            console.log(contenutoSurveyAddedField);
            contenutoSurvey = JSON.parse(contenutoSurvey1);
            sendTransatcionToBigChainDB(contenutoSurvey);
            return contenutoSurvey;
    }
  );

function sendTransatcionToBigChainDB (assetdata){
      // BigchainDB server instance or testnetwork (e.g. https://example.com/api/v1/)
      //const API_PATH = 'http://192.168.100.120:9984/api/v1/'
      const API_PATH = 'http://0.0.0.0:9984/api/v1/'
      // Create a new keypair for Alice and Bob
      const alice = new BigchainDB.Ed25519Keypair()
      let createTxId
      const metadata = {"Survey Type": ""+SurveyType+""}
      // Construct a transaction payload
      const txCreateAliceSimple = BigchainDB.Transaction.makeCreateTransaction(
              assetdata,
              metadata,
              // A transaction needs an output
              [ BigchainDB.Transaction.makeOutput(
                              BigchainDB.Transaction.makeEd25519Condition(alice.publicKey))
              ],
              alice.publicKey
      )

      // Sign the transaction with private keys of Alice to fulfill it
      const txCreateAliceSimpleSigned = BigchainDB.Transaction.signTransaction(txCreateAliceSimple, alice.privateKey)
      // Send the transaction off to BigchainDB
      let conn = new BigchainDB.Connection(API_PATH)
      conn.postTransactionCommit(txCreateAliceSimpleSigned)
      .then(res => {
            createTxId = res.id
            document.body.innerHTML ='<h3>Transaction created</h3>';
            document.body.innerHTML+=API_PATH
            document.body.innerHTML+='transactions/'
            document.body.innerHTML+=txCreateAliceSimpleSigned.id
            document.body.innerhtml.href = API_PATH + 'transactions/' + txCreateAliceSimpleSigned.id

        })
      return;
}


$("#surveyElement").Survey({
  model: survey
});
