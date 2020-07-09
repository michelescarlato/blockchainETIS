# Tests

To perform the tests for the calculcation of the throughput in Transactions Per Second (TPS), we used BASH to cycle JavaScript code towards different nodes.
The bash script is [TPS_bash_script.sh](https://github.com/michelescarlato/blockchainETIS/blob/master/tests/TPS_bash_script.sh). This script mainly run JavaScript code using node.js 
and calculate the time elapsed to perform its execution.
The number of repetition is set using the $COUNT variable. During each repetition 3 transactions are sent to 3 differents nodes, through the JavaScript code (script_node1.js)[https://github.com/michelescarlato/blockchainETIS/blob/master/tests/script_node1.js], 
[script_node2.js](https://github.com/michelescarlato/blockchainETIS/blob/master/tests/script_node2.js) and [script_node3.js](https://github.com/michelescarlato/blockchainETIS/blob/master/tests/script_node3.js).
Three different pairs of cryptography keys are used, associated to Alice, Bob and Chris.
Each 


Here is some videos of the experiments:


[5 nodes](https://youtu.be/iTG-pQst41w)

<iframe width="560" height="315" src="https://www.youtube.com/embed/iTG-pQst41w" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


[10_nodes](https://youtu.be/Hq1FEb7H77E)

