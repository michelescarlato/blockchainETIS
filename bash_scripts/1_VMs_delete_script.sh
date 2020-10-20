#!/bin/bash
# Script for running machines
SCRIPTS_NUMBER=6

for (( d=5; d<=$SCRIPTS_NUMBER; d++ ))
do
	echo -n "$d "
	bash VMs_0$d*.sh
done

#bash VMs_01*.sh
#bash VMs_02*.sh
#bash VMs_03*.sh
