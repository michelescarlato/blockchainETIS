# A Blockchain based Tourism Indicator System


This is an early version of a demonstrator of BigchainDB based architecture, which is used as a permissioned blockchain.

The data entry is performed by connecting [SurveyJS](https://surveyjs.io/) to the blockchain.

The data visualization is provided via web browser using Plotly library.

The plotted graph are retrieved by querying MongoDB.

The graphic representation is provided through a Node.js application, which makes use of Express.js as a middleware web framework to allow the communication between web browser and database.

The following components are required:
- BigchainDB 2.2.1,
- MongoDB 3.4 or newer,
- Tendermint 0.31.5 ,
- Node.js. 

This demonstrator has been developed using Ubuntu 18.04.

## 1.Backend

### Bigchaindb
To install BigchainDB please follow the steps indicated in [1], avoiding the usage of NGINX.

These are the steps performed to install the version 2.2.1:

1.Installing pip for python3:
```bash

sudo apt install python3-pip
```
2. use pip3 to install bigchaindb

```bash

sudo pip3 install bigchaindb==2.2.1
```
 configure bigchaindb running:
 

```bash

bigchaindb configure
```


### MongoDB
To check if the version in the repository is correct:

```bash

apt-cache policy mongodb
```
After verifying that is the correct one, to install it:
To install MongoDB:
```bash

sudo apt install mongodb
```

To check if mongodb is running:

```bash
systemctl status mongodb
```



### Tendermint 

To install tendermint we also installed unzip.
```bash
sudo apt install unzip
```

then we used wget to download the tendermint zip file.
```bash
unzip tendermint_v0.31.5_linux_amd64.zip
```
mv the directory to /usr/local/bin

```bash
sudo mv tendermint  /usr/local/bin
```
Initialize it with
```bash
tendermint init
```

To allow members to connect each other is fundamental to configure the file config.toml as explained in [1]

### Monit

Monit is used to run and monitor tendermint and bigchaindb. It will restart them if they crashed.

```bash
sudo apt install monit
```

As explained [here](http://docs.bigchaindb.com/projects/server/en/latest/simple-deployment-template/network-setup.html), you will be able to run the bigchaindb-monit-config script, which will be in your PATH. Running the script is required to build a configuration file for Monit:

```bash
bigchaindb-monit-config  
```

To run monit:

```bash
monit -d 1
```


## 2.Frontend

### Data entry: survey compilation

To complete the Survey we create our forms on [SurveyJS.io](https://surveyjs.io), and we use the related SurveyID.

In [data_entry/survey_and_transaction.js](https://github.com/michelescarlato/blockchainETIS/blob/master/data_entry/survey_and_transaction.js) it is shown the  surveyID value that identify our survey administered to Tourists.

The Javascript code shown [here](https://github.com/michelescarlato/blockchainETIS/blob/master/data_entry/survey_and_transaction.js) is called inside [data_entry/index.html](https://github.com/michelescarlato/blockchainETIS/blob/master/data_entry/index.html), and through that code the data are inserted in the blockchain in JSON format.

### Graphical visualization

To visualize the data inserted in the blockchain, we used a node.js application installed on one of the nodes.

To install node.js:
```bash
sudo apt install npm
```

These packages are required by our application:

```bash
npm install bigchaindb-driver@4.1.0
npm install base-x@3.0.4
npm install bip39@2.5.0
npm install mongodb@3.0.4
npm install express -–save
npm install jquery
```

This is the [package.json](https://github.com/michelescarlato/blockchainETIS/blob/master/visualization/package.json) file.


The code of our node.js application can be found [here](https://github.com/michelescarlato/blockchainETIS/blob/master/visualization/server_data_visualization_single_endpoint_switch_case.js).


To interact with the node.js application there are 2 Javascripts files, [calculate.js](https://github.com/michelescarlato/blockchainETIS/blob/master/visualization/calculate_mod.js) and [myFunctions.js](https://github.com/michelescarlato/blockchainETIS/blob/master/visualization/myFunctions_mod.js), that are loaded into a [html page](https://github.com/michelescarlato/blockchainETIS/blob/master/visualization/graph_mod.html).


# References
1. [How to Set Up a BigchainDB Network](http://docs.bigchaindb.com/projects/server/en/latest/simple-deployment-template/index.html)
