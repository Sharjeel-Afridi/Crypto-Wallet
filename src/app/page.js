"use client"
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import useCreateWallet from "@/utils/wallet";

export default function Home() {

  const [ clicked, setClicked ] = useState(false);
  const [wallet, setWallet] = useState({ mnemonic: "", publicKey: "", privateKey: "" });
  const [inputValue, setInputValue] = useState('');


  const {createWallet} = useCreateWallet();
  let count = 0;

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update input value state on change
  };

  const handleGenerate = () => {
    setClicked(true);
    
    const {mnemonic, publicKey, privateKey} = createWallet(inputValue, count);
    setWallet({ mnemonic, publicKey, privateKey });
    count += 1;
  }

  return (
    <main className="min-h-screen ">
      <Navbar />

      <div className="flex flex-col px-4 pt-[10vh] gap-4">
        <h1 className="text-5xl font-bold">Secret Recovery Phrase</h1>
        <p className="text-xl font-medium text-gray-400 ">Save these words in a safe place.</p>
        <div className="flex gap-5 items-center">

          <input 
            value={inputValue}
            onChange={handleInputChange}
            className="bg-transparent h-fit border-[1px] border-white/20 px-2 py-3  w-[80%] rounded-md font-normal text-sm"
            placeholder="Enter you secret phrase here (or leave blank to generate)"
          />
          <button 
            className="bg-white/90 hover:bg-white/80 transition-all rounded-md text-black px-6 py-3"
            onClick={handleGenerate}  
          >
            Generate Wallet
          </button>


        </div>
          {clicked && (
            <div>
              <h1>Seed: {wallet.mnemonic}</h1>
              <h1>Public Key: {wallet.publicKey}</h1>
              <h1>Private Key: {wallet.privateKey}</h1>
            </div>
          )}
      </div>
    </main>
  );
}
