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


read -p "How many VMs did you create?" -n 2 -r
echo $'\n\n'
echo "$REPLY VMs will be tested on $SERVER server, having root name $VM_ROOT,"
NUMBER=$REPLY
sed -i "/^NUMBER=/c\NUMBER=$NUMBER" VMs_parameters.sh


echo $'\n\n'

IP=$STARTING_IP
#echo $(nextip $IP)
retval=$?

for (( c=1; c<=$NUMBER; c++ ))
do
	echo -n "-$c "
	sleep 0.2
  HOSTNAME=$VM_ROOT-$c

  ssh -oStrictHostKeyChecking=no root@$(nextip $IP) "touch ip_configuration_successful.txt" $retval
  if [ $retval -ne 0 ]; then
	    echo "Return code for the SSH connection on $HOSTNAME was not zero but $retval"
	else
			echo "SSH connection on $HOSTNAME successfull"
	fi

  for i in {0..1}; do echo -ne "$i seconds"'\r'; sleep 1; done; echo
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
