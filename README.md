# blockchainETIS


This is an early version of a demonstrator of an architecture based on BigchainDB 2.0 used as a permissioned blockchain.

BigchainDB is connected with a survey and form library called SurveyJS which provides the web interface for data entry.

The data visualization is provided via web browser using Plotly library.

The plotted graph are retrieved by querying MongoDB.

The demonstrator part related to the graphic represantation run on Node.js.

Express.js as a middleware web framework is used to allow the communication between web browser and database.

The following components are required:
- BigchainDB 2.2.1,
- MongoDB 3.4 or newer,
- Tendermint 0.31.5 ,
- Node.js 

This demonstrator has been developed using Ubuntu 18.04.

## 1.Backend
To install BigchainDB the steps indicated [here] (http://docs.bigchaindb.com/projects/server/en/latest/simple-deployment-template/index.html).

To install MongoDB:


