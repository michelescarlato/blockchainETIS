#!/bin/bash
nodes=3
x=1
COUNT=333

node keypair_creation.js

start=`date +%s.%N`
while [ $x -le $COUNT ]
do
  # Alice key
  node script_node1.js &
  sleep 0.3
  # Bob key
  node script_node2.js &
  sleep 0.3
  # Chris key
  node script_node3.js &
  sleep 0.3
  echo "Executed $x times"
  x=$(( $x + 1 ))
done
end=`date +%s.%N`
#timestamp
runtime=$( echo "$end - $start" | bc -l )
RESULT=$(echo "$runtime/($COUNT*3)" | bc -l)
touch TPS_${nodes}_nodes.log
echo "Number of nodes: "$nodes >> TPS_${nodes}_nodes.log
echo "Elapsed time: "$runtime >> TPS_${nodes}_nodes.log
TRANSACTIONS=$(($COUNT*3))
echo "Number of transactions: "$TRANSACTIONS >> TPS_${nodes}_nodes.log
echo "Throughput in terms of transactions per second: "$RESULT >> TPS_${nodes}_nodes.log
echo " " >> TPS_${nodes}_nodes.log
