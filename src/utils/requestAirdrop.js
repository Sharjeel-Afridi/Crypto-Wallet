import {
    Connection, 
    LAMPORTS_PER_SOL, 
    clusterApiUrl, 
    PublicKey
} from '@solana/web3.js';

export default function useAirdrop(){

    const connection = new Connection(clusterApiUrl('devnet'));

    async function airdrop(publicKey, amount=LAMPORTS_PER_SOL) {
        console.log("in airdrop");
        const airdropSignature = await connection.requestAirdrop(new PublicKey(publicKey), amount);
        await connection.confirmTransaction({signature: airdropSignature})
    }

    return {airdrop};
    // airdrop("GokppTzVZi2LT1MSTWoEprM4YLDPy7wQ478Rm3r77yEw", LAMPORTS_PER_SOL).then(signature => {
    //     console.log('Airdrop signature:', signature);
    // });
}