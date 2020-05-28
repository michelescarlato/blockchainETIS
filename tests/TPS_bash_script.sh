#!/bin/bash
nodes=4
x=1
COUNT=50

node keypair_creation.js

start=`date +%s.%N`
while [ $x -le $COUNT ]
do
  node script_node1.js &
  node script_node2.js &
  node script_node3.js
  echo "Executed $x times"
  x=$(( $x + 1 ))
done
end=`date +%s.%N`
#timestamp
runtime=$( echo "$end - $start" | bc -l )
RESULT=$(echo "$runtime/($COUNT*3)" | bc -l)
echo "Number of nodes: "$nodes
echo "Elapsed time: "$runtime
TRANSACTIONS=$(($COUNT*3))
echo "Number of transactions: "$TRANSACTIONS
echo "Throughput in terms of transactions per second: "$RESULT
echo " "
