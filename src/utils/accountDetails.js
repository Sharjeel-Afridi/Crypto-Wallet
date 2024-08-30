import {
    clusterApiUrl,
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL,
  } from "@solana/web3.js";
   
export default function useBalance(){

    
    async function accountDetails(publicKey){
        
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        
        let wallet = new PublicKey(publicKey);
        let balance = await connection.getBalance(wallet) / LAMPORTS_PER_SOL;
        
        // console.log(
        //     `${(await connection.getBalance(wallet)) / LAMPORTS_PER_SOL} SOL`,
        // );
        
        return balance;
    };
    return {accountDetails};
}