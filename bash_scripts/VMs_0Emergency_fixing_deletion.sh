#!/bin/bash
# creare il ciclo dove si setta il numero di VM da creare

#function used to generate the IPs
source VMs_parameters.sh

start_minutes=`date +%s`

PASSWORD="changeme"
old_HOSTNAME="bigchaindb_209"


NUMBER=1
sed -i "/^NUMBER=/c\NUMBER=$NUMBER" VMs_parameters.sh

read -p "Insert the number of the machine you want to create address number:" -n 1 -r
echo $'\n\n'
NumberMachine=$REPLY

read -p "Insert last octet of the IP address number:" -n 3 -r
echo $'\n\n'
IP=192.168.100.$REPLY
echo "$IP will be created on $SERVER server."



echo $'\n\n'

cd ..

HOSTNAME=$VM_ROOT-$NumberMachine
#netplan_yaml_file
echo "$IP $HOSTNAME"
pwd

ssh $USERNAME@$SERVER "VBoxManage controlvm $HOSTNAME poweroff soft"
echo "VM $HOSTNAME poweroff signal sent"

for i in {0..5}; do echo -ne "$i seconds"'\r'; sleep 1; done; echo
echo "List of running virtual machines on $SERVER"
ssh $USERNAME@$SERVER "vboxmanage list runningvms"
echo $'\n\n\n\n\n'


ssh $USERNAME@$SERVER "VBoxManage unregistervm --delete $HOSTNAME; VBoxManage list vms"
echo "VM $HOSTNAME deleted"
echo $'\n\n'


echo "Boom!"

end_minutes=`date +%s`

runtime=$((end_minutes-start_minutes))
hours=$((runtime / 3600));
minutes=$(( (runtime % 3600) / 60 ));
seconds=$(( (runtime % 3600) % 60 ));
echo "Runtime: $hours:$minutes:$seconds (hh:mm:ss)"
