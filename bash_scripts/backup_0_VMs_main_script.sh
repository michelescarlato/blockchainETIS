#!/bin/bash
# Script for running machines
source VMs_parameters.sh
SCRIPTS_NUMBER=3

for (( c=1; c<=$SCRIPTS_NUMBER; c++ ))
do
	echo -n "$c "
	bash VMs_0$c*.sh
done

ssh $USERNAME@$SERVER "vboxmanage startvm $VM_ROOT-clone_series_Ansible"
sleep 30
scp VMs_parameters.sh root@$AnsibleVMAddress:/root/scripts/
ssh root@$AnsibleVMAddress
