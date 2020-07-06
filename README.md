# blockchainETIS


This is an early version of a demonstrator of BigchainDB based architecture, which is used as a permissioned blockchain.

The data entry is performed by connecting [SurveyJS] (https://surveyjs.io/) to the blockchain.

The data visualization is provided via web browser using Plotly library.

The plotted graph are retrieved by querying MongoDB.

The graphic representation is provided through a Node.js application, which makes use of Express.js as a middleware web framework to allow the communication between web browser and database.

The following components are required:
- BigchainDB 2.2.1,
- MongoDB 3.4 or newer,
- Tendermint 0.31.5 ,
- Node.js 

This demonstrator has been developed using Ubuntu 18.04.

## 1.Backend
To install BigchainDB the steps indicated [here](http://docs.bigchaindb.com/projects/server/en/latest/simple-deployment-template/index.html), avoiding the usage of NGINX.

To install MongoDB:

```bash

sudo apt install mongodb
```

To check if mongodb is running:

systemctl status mongodb


