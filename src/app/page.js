"use client"
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import useCreateWallet from "@/utils/wallet";
import copy from "../../public/copy.png";
import eye from "../../public/eye-white.png";
import useBalance from "@/utils/accountDetails";


export default function Home() {

  const [ clicked, setClicked ] = useState(false);
  const [count, setCount] = useState(0);
  const [mnemonic, setMnemonic] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [wallets, setWallets] = useState([]);
  const [showKey, setShowKey] = useState(false);
  

  const {createWallet} = useCreateWallet();
  const {accountDetails} = useBalance();

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update input value state on change
  };
  let newbalance;
  const handleGenerate = async () => {
    setClicked(true);
    
    const {mnemonic, publicKey, privateKey} = createWallet(inputValue, count);
    setMnemonic(mnemonic);
    const{balance} = await accountDetails(publicKey);
    setWallets(prevWallets => [
      ...prevWallets, {'publicKey': publicKey, 'privateKey': privateKey, 'balance': balance}
    ]);
    
    setCount(count + 1);
  }

  const handleAdd = async () => {
    const {publicKey, privateKey} = createWallet(mnemonic, count);
    
    const{balance} = await accountDetails(publicKey);
    setWallets(prevWallets => [
      ...prevWallets, {'publicKey': publicKey, 'privateKey': privateKey, 'balance': balance}
    ]);
    setCount(count + 1);

  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(
      () => alert('Copied to clipboard!'),
      (err) => alert('Failed to copy: ', err)
    );
  };

  const handleClear = () => {
    setWallets([]);
    setCount(0);
    setMnemonic('');
    setClicked(false);
  }

  const handleShowKey = () => {
    setShowKey(!showKey);
  }

  return (
    <main className="min-h-screen ">
      <Navbar />
      {!clicked && (
      <div className="flex flex-col pt-[10vh] px-4 gap-4">
        
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
         </div>
        )}
          {clicked && (
            <div className="flex flex-col px-2">
              <div className="p-10 mx-2 pb-20 rounded-md border-[1px] border-white/20 shadow-white">
                <div className="flex items-center justify-between mb-10">
                  <h1 className="font-bold text-3xl ">Your secret phrase</h1>
                  <Image 
                    src={copy} 
                    alt="copy" 
                    onClick={() => handleCopy(mnemonic)}
                    className="w-[40px] h-fit hover:bg-gray-600 rounded-md cursor-pointer p-2"/>
                </div>
                <div className="grid grid-cols-4 gap-2 ">
                  {mnemonic.split(' ').map((element, index)=>(
                    <h1 key={index} className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center items-center text-lg font-[300] p-4 rounded-lg bg-[#151515] hover:bg-white/10 transition-all">{element}</h1>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-4xl py-10">Solana Wallet</h1>
                <div>  
                  <button 
                    onClick={handleAdd}
                    className="text-black bg-white/90 px-4 py-2 rounded-md"
                  >
                    Add Wallet
                  </button>
                  <button 
                    onClick={handleClear}
                    className="bg-red-700/90 px-4 py-2 rounded-md ml-4"
                  >
                    Clear Wallets
                  </button>
                </div>
              </div>

              {wallets.map((element,index)=>(
                <div key={index} className="mb-10 rounded-3xl border-[1px] border-white/20 shadow-white">
                  <h1 className="p-6 font-medium text-3xl mb-5">Wallet {index+1}</h1>
                  <div className="bg-[#151515] p-6 rounded-3xl">
                    <div className="flex items-center gap-5">
                      <h1 className="font-medium text-2xl">Public Key</h1>
                      <Image 
                        src={copy} 
                        alt="copy" 
                        onClick={() => handleCopy(element.publicKey)}
                        className="w-[20px] h-fit rounded-md cursor-pointer "/>
                    </div>
                    <p className="text-[1rem] mt-3 mb-5 text-gray-400 tracking-wide">{element.publicKey}</p>
                    <div className="flex items-center gap-5">
                      <h1 className="font-medium text-2xl">Private Key</h1>
                      <Image 
                        src={copy} 
                        alt="copy" 
                        onClick={() => handleCopy(element.privateKey)}
                        className="w-[20px] h-fit rounded-md cursor-pointer "/>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[1rem] mt-3 mb-5 text-gray-400 tracking-wide">{showKey ? element.privateKey : '•'.repeat(element.privateKey.length)}</p>
                      <Image
                        src={eye}
                        alt="eye"
                        onClick={handleShowKey}
                        className="w-[20px] h-fit rounded-full cursor-pointer"
                      />

                    </div>
                    <p className="text-white text-3xl">{element.balance}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
     
    </main>
  );
}
