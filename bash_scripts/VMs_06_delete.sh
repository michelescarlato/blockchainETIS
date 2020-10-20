#!/bin/bash
# creare il ciclo dove si setta il numero di VM da creare

#function used to generate the IPs
source VMs_parameters.sh
start_minutes=`date +%s`

for (( c=1; c<=$NUMBER; c++ ))
do
	echo -n "-$c "
	sleep 0.2
  HOSTNAME=$VM_ROOT-$c

  ssh $USERNAME@$SERVER "VBoxManage unregistervm --delete $HOSTNAME; VBoxManage list vms"
  echo "VM $HOSTNAME deleted"
	echo $'\n\n'


  #for i in {0..1}; do echo -ne "$i seconds"'\r'; sleep 1; done; echo

done

echo
echo "Boom!"


end_minutes=`date +%s`

runtime=$((end_minutes-start_minutes))
hours=$((runtime / 3600));
minutes=$(( (runtime % 3600) / 60 ));
seconds=$(( (runtime % 3600) % 60 ));
echo "Runtime: $hours:$minutes:$seconds (hh:mm:ss)"
