from web3 import Web3
import json

def create_web3_instance():
    w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))
    return w3

def check_connection(w3):
    if w3.isConnected():
        print("Connected to Blockchain Successfully!")
    else:
        print("Failed to Connect to Blockchain")

def main():
    w3 = create_web3_instance()
    check_connection(w3)
    with open('bin/contract_sol_MyContract.abi', 'r') as abi_file:
        abi = json.load(abi_file)
    contract_address = '0xYourContractAddressHere'
    contract = w3.eth.contract(address=contract_address, abi=abi)
    tx_hash = contract.functions.set(42).transact({'from': w3.eth.accounts[0]})
    w3.eth.waitForTransactionReceipt(tx_hash)
    stored_data = contract.functions.get().call()
    print(f"Stored data: {stored_data}")

if __name__ == "__main__":
    main()