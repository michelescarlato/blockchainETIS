#!/bin/bash
nodes=5
x=1
COUNT=50

node keypair_creation.js

start=`date +%s.%N`
while [ $x -le $COUNT ]
do
  node script_node1.js
  node script_node2.js
  node script_node3.js
  echo "Executed $x times"
  x=$(( $x + 1 ))
done
end=`date +%s.%N`
#timestamp
runtime=$( echo "$end - $start" | bc -l )
RESULT=$(echo "$runtime/($COUNT*3)" | bc -l)
touch TPS.log
echo "Number of nodes: "$nodes >> TPS.log
echo "Elapsed time: "$runtime >> TPS.log
TRANSACTIONS=$(($COUNT*3))
echo "Number of transactions: "$TRANSACTIONS >> TPS.log
echo "Throughput in terms of transactions per second: "$RESULT >> TPS.log
echo " " >> TPS.log
