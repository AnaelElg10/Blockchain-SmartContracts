from web3 import Web3

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

if __name__ == "__main__":
    main()