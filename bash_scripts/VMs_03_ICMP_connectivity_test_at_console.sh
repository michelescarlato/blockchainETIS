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



for (( c=1; c<=$NUMBER; c++ ))
do
	echo -n "-$c "
	sleep 0.2
  HOSTNAME=$VM_ROOT-$c

  #ping -c 3 $(nextip $IP)


  ping -c 3 $IP
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
