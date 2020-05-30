#!/bin/bash

ssh-copy-id -i ~/.ssh/id_rsa.pub 192.168.100.124
scp 01-network-manager-all.yaml 192.168.100.124:/etc/netplan/
scp hostname 192.168.100.124:/etc/
scp hosts 192.168.100.124:/etc/
ssh 192.168.100.124 "reboot"


#scp genesis.json bigchaindb_server_4:/home/michelescarlato/.tendermint/config/
#scp config.toml bigchaindb_server_4:/home/michelescarlato/.tendermint/config/
