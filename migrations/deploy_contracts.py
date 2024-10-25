from web3 import Web3
import json

def deploy_contract(w3, abi, bytecode):
    contract = w3.eth.contract(abi=abi, bytecode=bytecode)
    tx_hash = contract.constructor().transact({'from': w3.eth.accounts[0]})
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    return tx_receipt.contractAddress

def main():
    w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))
    with open('bin/contract_sol_MyContract.abi', 'r') as abi_file:
        abi = json.load(abi_file)
    with open('bin/contract_sol_MyContract.bin', 'r') as bin_file:
        bytecode = bin_file.read()
    contract_address = deploy_contract(w3, abi, bytecode)
    print(f"Contract deployed at address: {contract_address}")

if __name__ == "__main__":
    main()