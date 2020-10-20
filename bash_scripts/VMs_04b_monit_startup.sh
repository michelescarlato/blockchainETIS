#!/bin/bash
# creare il ciclo dove si setta il numero di VM da creare

#function used to generate the IPs


start_minutes=`date +%s`

source VMs_parameters.sh

nextip(){
    IP=$1
    IP_HEX=$(printf '%.2X%.2X%.2X%.2X\n' `echo $IP | sed -e 's/\./ /g'`)
    NEXT_IP_HEX=$(printf %.8X `echo $(( 0x$IP_HEX + 1 ))`)
    NEXT_IP=$(printf '%d.%d.%d.%d\n' `echo $NEXT_IP_HEX | sed -r 's/(..)/0x\1 /g'`)
    echo "$NEXT_IP"
}


IP=$STARTING_IP
IP=$(nextip $IP)

#mkdir tendermint_script_output

for (( c=1; c<=$NUMBER; c++ ))
do
	echo -n "-$c "
	sleep 0.2
  HOSTNAME=$VM_ROOT-$c

  #################################
  # Files distribution            #
  #################################
  sudo scp rc.local root@$IP:/etc
  ssh root@$IP "chmod +x /etc/rc.local; systemctl restart rc-local; systemctl status rc-local"
  #sudo scp monit_start.sh root@$IP:/etc/init.d
  #ssh root@$IP "chmod +x /etc/init.d/monit_start.sh; update-rc.d monit_start.sh defaults; reboot"
  IP=$(nextip $IP)


done

echo
echo "Boom!"



end_minutes=`date +%s`

runtime=$((end_minutes-start_minutes))
hours=$((runtime / 3600));
minutes=$(( (runtime % 3600) / 60 ));
seconds=$(( (runtime % 3600) % 60 ));
echo "Runtime: $hours:$minutes:$seconds (hh:mm:ss)"
