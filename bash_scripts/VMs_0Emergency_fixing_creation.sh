#!/bin/bash
# creare il ciclo dove si setta il numero di VM da creare

#function used to generate the IPs
source VMs_parameters.sh

start_minutes=`date +%s`

PASSWORD="changeme"
old_HOSTNAME="bigchaindb_209"


NUMBER=1
sed -i "/^NUMBER=/c\NUMBER=$NUMBER" VMs_parameters.sh

read -p "Insert the number of the machine you want to create address number:" -n 2 -r
echo $'\n\n'
NumberMachine=$REPLY

read -p "Insert last octet of the IP address number:" -n 3 -r
echo $'\n\n'
IP=192.168.100.$REPLY
echo "$IP will be created on $SERVER server."



echo $'\n\n'

cd ..

rm log.txt
touch log.txt
rm logs/hosts_output.log
echo "logs cleared"
touch hostname_backup$SERVER hostname$SERVER
cp hostname_backup$SERVER hostname$SERVER
echo "hostname file restored"
touch hosts_backup$SERVER hosts$SERVER
cp hosts_backup$SERVER hosts$SERVER
echo "hosts file restored"
touch 01-network-manager-all$SERVER.yaml.backup 01-network-manager-all$SERVER.yaml
cp 01-network-manager-all$SERVER.yaml.backup 01-network-manager-all$SERVER.yaml
echo "executing cp 01-network-manager-all$SERVER.yaml.backup 01-network-manager-all.yaml"
echo "01-network-manager-all.yaml file restored"
#start with the last not usable IP


echo "Copying id_rsa.pub on $SERVER server"
ssh-copy-id -i ~/.ssh/id_rsa.pub $USERNAME@$SERVER >> log.txt


HOSTNAME=$VM_ROOT-$NumberMachine
echo $HOSTNAME >> log.txt
#hostname file
echo $HOSTNAME > hostname$SERVER

#hosts file
sed -i "s/${old_HOSTNAME}/${HOSTNAME}/g" hosts$SERVER

#netplan_yaml_file
echo "$IP $HOSTNAME"
pwd
sed -i "s/${STARTING_IP}/${IP}/g" 01-network-manager-all$SERVER.yaml
cat 01-network-manager-all$SERVER.yaml

ssh $USERNAME@$SERVER "VBoxManage controlvm $HOSTNAME poweroff soft"
echo "VM $HOSTNAME poweroff signal sent"
for i in {5..0}; do echo -ne "$i seconds"'\r'; sleep 1; done; echo

ssh $USERNAME@$SERVER "VBoxManage unregistervm --delete $HOSTNAME; VBoxManage list vms"
echo "VM $HOSTNAME deleted"

# create the VM
#Linked clone, created with the --options=Link parameter. Mandatory is to use the snapshot parameter
#ssh $USERNAME@$SERVER "VBoxManage clonevm $VMtoClone --name=$HOSTNAME --register --snapshot=Snapshot2 --options=Link"
#Full clone
ssh $USERNAME@$SERVER "VBoxManage clonevm $VMtoClone --name=$HOSTNAME --register"
echo "VM $HOSTNAME created with $IP IP address"

ssh $USERNAME@$SERVER "VBoxManage startvm $HOSTNAME"
echo "VM $HOSTNAME started"

echo "BASH Script to change IP and hostname will be executed on $HOSTNAME in "
for i in {30..0}; do echo -ne "$i seconds"'\r'; sleep 1; done; echo

ssh $USERNAME@$SERVER "VBoxManage guestcontrol $HOSTNAME run --exe /root/bash_script_hostname_ip_address.sh --username root --password $PASSWORD --wait-stdout --wait-stderr > $HOSTNAME.bash_script.log" > logs/$HOSTNAME.root_bash_script.log
echo "BASH Script to change IP and hostname executed on $HOSTNAME"
for i in {5..0}; do echo -ne "$i seconds"'\r'; sleep 1; done; echo

ssh $USERNAME@$SERVER "VBoxManage startvm $HOSTNAME"
echo "VM $HOSTNAME started"

echo "Boom!"

end_minutes=`date +%s`

runtime=$((end_minutes-start_minutes))
hours=$((runtime / 3600));
minutes=$(( (runtime % 3600) / 60 ));
seconds=$(( (runtime % 3600) % 60 ));
echo "Runtime: $hours:$minutes:$seconds (hh:mm:ss)"
