import useCreateWallet from '@/utils/wallet';
import { useState } from 'react';


export default function SendSol({wallets, selectedIndex}){
    const [ recipientPublicKey, setRecipientPublicKey] = useState('');
    const [ amount, setAmount] = useState(0);

    const {sendSol} = useCreateWallet();

    const handleSend = async () => {
        const signature = await sendSol(recipientPublicKey, wallets[selectedIndex].privateKey, amount)
        console.log(signature);
    }

    return(
        <div className="flex flex-col items-center w-full gap-5 p-6">              
            <input
            value={recipientPublicKey}
            onChange={(e) => setRecipientPublicKey(e.target.value)}
            className="bg-[#151515] p-4 rounded-md w-full text-lg"
            placeholder="Reciepents Solana Address"
            />
            <div className="flex justify-between bg-[#151515] p-4 rounded-md w-full">

            <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg bg-transparent w-full focus:outline-none"
                placeholder="Amount"
                />
                <h1 className="text-white/40">SOL</h1>
            </div>
            <button onClick={handleSend} className="bg-white text-black w-fit px-10 py-2 rounded-md">
            Send
            </button>
        </div>

    )
}