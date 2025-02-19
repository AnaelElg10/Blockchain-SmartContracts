import { ethers } from "ethers";
import identiFi from "./Identifi.json";

export const contract = async () => {

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const {ethereum} = window;
  if (ethereum) {
    const signer = provider.getSigner()
    const contractReader = new ethers.Contract('0x2c599300d403da9148Ad2d4525c48706267a94f9', identiFi.abi, signer);
    return contractReader;
  }
}