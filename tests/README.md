# Tests

To perform the tests for the calculcation of the throughput in Transactions Per Second (TPS), we used BASH to cycle JavaScript code towards different nodes.


The bash script is [TPS_bash_script.sh](https://github.com/michelescarlato/blockchainETIS/blob/master/tests/TPS_bash_script.sh). 

This script mainly run JavaScript code using node.js and calculate the time elapsed to perform its execution.

The number of repetition is set using the $COUNT variable. During each repetition 3 transactions are sent to 3 differents nodes, through the JavaScript code [script_node1.js](https://github.com/michelescarlato/blockchainETIS/blob/master/tests/script_node1.js),
[script_node2.js](https://github.com/michelescarlato/blockchainETIS/blob/master/tests/script_node2.js) and [script_node3.js](https://github.com/michelescarlato/blockchainETIS/blob/master/tests/script_node3.js).


Three different pairs of cryptography keys are used, associated to Alice, Bob and Chris.


Each JavaScript script is run using one of these key pairs.




Here are some videos of the experiments:

5 nodes experiment:


[![5 nodes](https://youtu.be/iTG-pQst41w)](https://youtu.be/iTG-pQst41w)


9 nodes shells:

[![10_nodes](https://i9.ytimg.com/vi/ygX3ZFwnJD0/mq2.jpg?sqp=CLjpmvgF&rs=AOn4CLD3n-Y-bLRU2ooQYXyo_j1dlEX-Xg)](https://www.youtube.com/watch?v=ygX3ZFwnJD0)



10 nodes experiment:


[![10_nodes](https://i9.ytimg.com/vi/Hq1FEb7H77E/mq1.jpg?sqp=CLTimvgF&rs=AOn4CLBT3zndUJgU9Bmib7Bnp4dDPMqQrQ)](https://youtu.be/Hq1FEb7H77E)


