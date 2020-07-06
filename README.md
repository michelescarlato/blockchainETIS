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

### Bigchaindb
To install BigchainDB please follow the steps indicated [here](http://docs.bigchaindb.com/projects/server/en/latest/simple-deployment-template/index.html), avoiding the usage of NGINX.

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
sudo mv tenderming  /usr/local/bin
```


### Monit

Monit is used to run and monitor tendermint and bigchaindb. It will restart them if they crashed.

```bash
sudo apt install monit
```

As explained [here](http://docs.bigchaindb.com/projects/server/en/latest/simple-deployment-template/network-setup.html), you will be able to run the bigchaindb-monit-config script, which will be in your PATH. Running the script is required to build a configuration file for Monit:

```bash
bigchaindb-monit-config  
```


