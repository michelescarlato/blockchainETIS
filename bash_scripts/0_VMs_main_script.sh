#!/bin/bash
# Script for running machines
start_minutes=`date +%s`

source VMs_parameters.sh
SCRIPTS_NUMBER=3

for (( c=1; c<=$SCRIPTS_NUMBER; c++ ))
do
	#echo -n "$c "
	bash VMs_0$c*.sh
done

ssh $USERNAME@$SERVER "vboxmanage startvm $VM_ROOT-clone_series_Ansible"
sleep 30

end_minutes=`date +%s`
runtime=$((end_minutes-start_minutes))
hours=$((runtime / 3600));
minutes=$(( (runtime % 3600) / 60 ));
seconds=$(( (runtime % 3600) % 60 ));
echo "Runtime: $hours:$minutes:$seconds (hh:mm:ss)"

scp VMs_parameters.sh root@$AnsibleVMAddress:/root/scripts/
ssh root@$AnsibleVMAddress
