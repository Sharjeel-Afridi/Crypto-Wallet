"use client"
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import useCreateWallet from "@/utils/wallet";
import copy from "../../public/copy.png";
import eye from "../../public/eye-white.png";
import useBalance from "@/utils/accountDetails";
import Wallet from "../../public/wallet-white.png";
import useAirdrop from "@/utils/requestAirdrop";


export default function Home() {

  const [ clicked, setClicked ] = useState(false);
  const [count, setCount] = useState(0);
  const [mnemonic, setMnemonic] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [wallets, setWallets] = useState([]);
  const [showKey, setShowKey] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [option, setOption] = useState('keys');

  const {createWallet} = useCreateWallet();
  const {accountDetails} = useBalance();
  const {airdrop} = useAirdrop();

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update input value state on change
  };
  
  const handleGenerate = async () => {
    
    
    const {mnemonic, publicKey, privateKey} = createWallet(inputValue, count);
    setMnemonic(mnemonic);

    accountDetails(publicKey)
    .then(balance => {
      
      setWallets(prevWallets => [
        ...prevWallets,
        { 'publicKey': publicKey, 'privateKey': privateKey, 'balance': balance }
      ]);
      setClicked(true);
    })
    console.log(wallets);
    
    setCount(count + 1);
  }

  const handleAdd = async () => {
    const {publicKey, privateKey} = createWallet(mnemonic, count);
    
    accountDetails(publicKey)
    .then(balance => {
      
      setWallets(prevWallets => [
        ...prevWallets,
        { 'publicKey': publicKey, 'privateKey': privateKey, 'balance': balance }
      ]);
      setClicked(true);
    })
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

  const handleIndex = (index) => {
    setSelectedIndex(index);
  }

  const handleAirdrop = async (publickey) => {
    await airdrop(publickey)
  }

  return (
    <main className="min-h-screen ">
      {!clicked ? (
      <>
      <Navbar />
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
        <h1 className="text-lg pb-10 font-medium fixed bottom-0">Developed by <a className="font-normal" href="https://github.com/sharjeel-afridi/crypto-wallet" target="_blank">Sharjeel Afridi</a></h1>
         </div>
        </>
        ) :
          (<>
            <div className="h-screen fixed flex flex-col gap-2 left-0  w-[10vw] pt-[5vh] border-r-[1px] border-white/20">
                {/* <h1 className="font-bold text-2xl text-center">Ba2अ</h1> */}
                <Image src={Wallet} alt="wallet" className="w-[30px] h-fit mx-auto"/>
                <div className="overflow-y-scroll scrollbar">
                  {wallets.map((element,index)=> (
                    <h1 key={index} onClick={() => setSelectedIndex(index)} className="cursor-pointer hover:bg-[#151515] font-medium h-fit w-full text-center border-b-[1px] border-white py-4">Account {index+1}</h1>
                  ))}
                </div>
                
                <div className="flex flex-col items-center gap-5 mt-10 mb-5">  
                  <button 
                    onClick={handleAdd}
                    className="w-[90%] text-black bg-white/90 px-4 py-2 rounded-md"
                  >
                    Add Wallet
                  </button>
                  <button 
                    onClick={handleClear}
                    className="w-[90%] bg-red-700/90 px-4 py-2 rounded-md"
                  >
                    Clear
                  </button>
                </div>
        </div>

        <div className="flex flex-col items-center w-[90vw] pl-[15vw]">
            
            <div className="w-[80vw] p-10 mt-10 pb-20 rounded-md border-[1px] border-white/20 shadow-white">
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
                      <h1 key={index} className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center items-center text-lg font-[300] p-4 rounded-lg bg-[#151515] hover:bg-white/40 transition-all">{element}</h1>
                    ))}
                </div>
              </div>
            <div className="flex flex-col items-center w-[80vw] my-10 rounded-3xl border-[1px] border-white/20">
                    <div className="flex flex-col h-[20vh] justify-center items-center w-full bg-[#151515] rounded-t-3xl">
                        <p className="text-white text-3xl font-bold">${wallets[selectedIndex].balance} SOL</p>
                        <p className="text-gray-400">Account {selectedIndex+1}</p>
                    </div>

                    <div className="flex justify-center w-full gap-10 py-2 mt-5">
                      <h1 
                        className={`${option === 'keys' ? 'bg-white font-medium rounded-sm': 'font-normal bg-white/90 rounded-xl'} text-black px-4 py-2 rounded-xl cursor-pointer`}
                        onClick={()=> setOption('keys')}> 
                        Keys
                      </h1>
                      <h1 
                        className={`${option === 'send' ? 'bg-white font-medium rounded-sm': 'font-normal bg-white/90 rounded-xl'} text-black px-4 py-2 rounded-xl cursor-pointer`}
                        onClick={()=> setOption('send')}> 
                        Send
                      </h1>
                      <h1 
                        className={`${option === 'airdrop' ? 'bg-white font-medium rounded-sm': 'font-normal bg-white/90 rounded-xl'} text-black px-4 py-2 border-[1px] border-black/50  cursor-pointer`}
                        onClick={()=> setOption('airdrop')}
                      > 
                        Request Airdrop
                      </h1>
                    </div>

                  {/* Keys */}
                  {option === 'keys' ? (
                    <div className="flex flex-col w-full p-6">
                      <div className="flex items-center gap-5">
                        <h1 className="font-medium text-2xl">Public Key</h1>
                        <Image 
                          src={copy} 
                          alt="copy" 
                          onClick={() => handleCopy(element.publicKey)}
                          className="w-[20px] h-fit rounded-md cursor-pointer "/>
                      </div>
                      <p className="text-[1rem] mt-3 mb-5 text-gray-400 tracking-wide">{wallets[selectedIndex].publicKey}</p>
                      <div className="flex items-center gap-5">
                        <h1 className="font-medium text-2xl">Private Key</h1>
                        <Image 
                          src={copy} 
                          alt="copy" 
                          onClick={() => handleCopy(element.privateKey)}
                          className="w-[20px] h-fit rounded-md cursor-pointer "/>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[1rem] mt-3 mb-5 text-gray-400 tracking-wide">{showKey ? wallets[selectedIndex].privateKey : '•'.repeat(wallets[selectedIndex].privateKey.length)}</p>
                        <Image
                          src={eye}
                          alt="eye"
                          onClick={()=> setShowKey(!showKey)}
                          className="w-[20px] h-fit rounded-full cursor-pointer"
                          />

                      </div>
                      
                    </div>
                  ): option === 'send' ? (
                    <div className="flex flex-col items-center w-full gap-5 p-6">
                      
                      <input
                        className="bg-[#151515] p-4 rounded-md w-full text-lg"
                        placeholder="Reciepents Solana Address"
                      />
                      <div className="flex justify-between bg-[#151515] p-4 rounded-md w-full">

                        <input
                          className="text-lg bg-transparent w-full focus:outline-none"
                          placeholder="Amount"
                          />
                          <h1 className="text-white/40">SOL</h1>
                        </div>
                      <button className="bg-white text-black w-fit px-10 py-2 rounded-md">
                        Send
                      </button>
                    </div>

                  ) : (
                    <div className="flex flex-col items-center w-full gap-5 p-6">
                      <div className="flex justify-between bg-[#151515] p-4 rounded-md w-full">
                        <input
                          className="text-lg bg-transparent w-full focus:outline-none"
                          placeholder="Amount"
                          />
                        <h1 className="text-white/40">SOL</h1>
                      </div>
                      <button 
                        className="bg-white text-black w-fit px-10 py-2 rounded-md"
                        onClick={() => {
                          handleAirdrop(wallets[selectedIndex].publicKey);
                          
                        }}>
                        Request
                      </button>
                    </div>
                  )}
                  

                  
                </div>
                <h1 className="text-lg pb-10 font-medium">Developed by <a className="font-normal" href="https://github.com/sharjeel-afridi/crypto-wallet" target="_blank">Sharjeel Afridi</a></h1>
        </div>
        </>
          )}

    </main>
  );
}
