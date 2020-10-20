#!/bin/bash
# creare il ciclo dove si setta il numero di VM da creare

#function used to generate the IPs
source VMs_parameters.sh

start_minutes=`date +%s`



nextip(){
    IP=$1
    IP_HEX=$(printf '%.2X%.2X%.2X%.2X\n' `echo $IP | sed -e 's/\./ /g'`)
    NEXT_IP_HEX=$(printf %.8X `echo $(( 0x$IP_HEX + 1 ))`)
    NEXT_IP=$(printf '%d.%d.%d.%d\n' `echo $NEXT_IP_HEX | sed -r 's/(..)/0x\1 /g'`)
    echo "$NEXT_IP"
}

PASSWORD="changeme"
old_HOSTNAME="bigchaindb_209"


echo "$NUMBER VMs will be created on $SERVER server, having root name $VM_ROOT,"
read -p " is that correct? (Y/n)" -n 1 -r
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
  echo "How many VMs do you want to create?"
  read -p "Insert a number:" -n 2 -r
  echo $'\n\n'
  echo "$REPLY VMs will be created on $SERVER server, having root name $VM_ROOT,"
  NUMBER=$REPLY
  sed -i "/^NUMBER=/c\NUMBER=$NUMBER" VMs_parameters.sh
fi

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
FIRST_IP=$STARTING_IP
IP=$FIRST_IP

echo "Copying id_rsa.pub on $SERVER server"
ssh-copy-id -i ~/.ssh/id_rsa.pub $USERNAME@$SERVER >> log.txt

for (( c=1; c<=$NUMBER; c++ ))
do
	echo -n "$c " >> log.txt
	sleep 0.2
  HOSTNAME=$VM_ROOT-$c
  echo $HOSTNAME >> log.txt
  #hostname file
  echo $HOSTNAME > hostname$SERVER

  #hosts file
  sed -i "s/${old_HOSTNAME}/${HOSTNAME}/g" hosts$SERVER

  #netplan_yaml_file
  old_IP=$IP
  IP=$(nextip $IP)
  echo "$IP $HOSTNAME"
  pwd
  sed -i "s/${old_IP}/${IP}/g" 01-network-manager-all$SERVER.yaml
  cat 01-network-manager-all$SERVER.yaml

  # create the VM
  #Linked clone, created with the --options=Link parameter. Mandatory is to use the snapshot parameter
  ssh $USERNAME@$SERVER "VBoxManage clonevm $VMtoClone --name=$HOSTNAME --register --snapshot=Snapshot3 --options=Link"
  #Full clone
  #ssh $USERNAME@$SERVER "VBoxManage clonevm $VMtoClone --name=$HOSTNAME --register"
  echo "VM $HOSTNAME created with $IP IP address"

  ssh $USERNAME@$SERVER "VBoxManage startvm $HOSTNAME"
  echo "VM $HOSTNAME started"

  echo "BASH Script to change IP and hostname will be executed on $HOSTNAME in "
  for i in {30..0}; do echo -ne "$i seconds"'\r'; sleep 1; done; echo

  ssh $USERNAME@$SERVER "VBoxManage guestcontrol $HOSTNAME run --exe /root/bash_script_hostname_ip_address.sh --username root --password $PASSWORD --wait-stdout --wait-stderr > $HOSTNAME.bash_script.log" > logs/$HOSTNAME.root_bash_script.log
  echo "BASH Script to change IP and hostname executed on $HOSTNAME"

  old_HOSTNAME=$HOSTNAME
  old_IP=$IP
  cat hosts >> logs/hosts_output.log
  echo $'\n\n\n\n\n'

done

echo "Boom!"

end_minutes=`date +%s`

runtime=$((end_minutes-start_minutes))
hours=$((runtime / 3600));
minutes=$(( (runtime % 3600) / 60 ));
seconds=$(( (runtime % 3600) % 60 ));
echo "Runtime: $hours:$minutes:$seconds (hh:mm:ss)"
