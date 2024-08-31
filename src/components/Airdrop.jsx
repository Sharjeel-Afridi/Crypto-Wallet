import useAirdrop from "@/utils/requestAirdrop";

export default function Airdrop({wallets, selectedIndex}){

    const {airdrop} = useAirdrop();

    const handleAirdrop = async (publickey) => {
        await airdrop(publickey)
    }
    
    return(
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
    )
}