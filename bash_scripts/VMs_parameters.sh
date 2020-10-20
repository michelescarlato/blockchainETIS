#Server 20 GB params
#SERVER="20GB"
#VM_ROOT="bigchaindb_20"
#NUMBER=7
#STARTING_IP=192.168.100.159
#AnsibleVMAddress=192.168.100.109

#Server 32 GB params
SERVER="32GB"
VM_ROOT="bigchaindb_32"
NUMBER=4
#STARTING_IP=192.168.100.200
STARTING_IP=192.168.100.124
#AnsibleVMAddress=192.168.100.110


#__________Common Parameters__________

VMtoClone="$VM_ROOT-clone_series"
USERNAME="michelescarlato"


export SERVER
export VM_ROOT
export NUMBER
export USERNAME
export STARTING_IP
export VMtoClone
export AnsibleVMAddress
