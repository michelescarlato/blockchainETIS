#!/bin/bash

nextip(){
    IP=$1
    IP_HEX=$(printf '%.2X%.2X%.2X%.2X\n' `echo $IP | sed -e 's/\./ /g'`)
    NEXT_IP_HEX=$(printf %.8X `echo $(( 0x$IP_HEX + 1 ))`)
    NEXT_IP=$(printf '%d.%d.%d.%d\n' `echo $NEXT_IP_HEX | sed -r 's/(..)/0x\1 /g'`)
    echo "$NEXT_IP"
}

FIRST_IP=192.168.100.125
IP=$FIRST_IP

VM_ROOT="bigchaindb_server_"

NUMBER=10

for (( c=1; c<=$NUMBER; c++ ))
do
  HOSTNAME=$VM_ROOT$c
  sed -i -e 's/moniker = "[^"]*"/moniker = "'"$HOSTNAME"'"/g' config.toml
  cat config.toml | grep moniker
  echo "Sending genesis.JSON to $IP , $HOSTNAME"
  scp genesis.json $IP:/home/michelescarlato/.tendermint/config/
  echo "Sending config.toml to $IP , $HOSTNAME"
  scp config.toml $IP:/home/michelescarlato/.tendermint/config/
  ssh $IP "sed -i -e 's/\"bind\": \"localhost:9984\"/\"bind\": \"0.0.0.0:9984\"/g' .bigchaindb"
  ssh $IP "cat .bigchaindb | grep bind"
  ssh $IP "monit -d 1"
  IP=$(nextip $IP)
done
