import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { 
    Connection,
    PublicKey,
    SystemProgram,
    Keypair, 
    Transaction,
    sendAndConfirmTransaction,
   } from "@solana/web3.js";
import bs58 from "bs58"; 

export default function useCreateWallet(){

    function createWallet(phrase, count){
        
        let mnemonic;
        if(phrase === ''){
            mnemonic = generateMnemonic();
        }else{
            mnemonic = phrase;
        }

        
        const seed = mnemonicToSeedSync(mnemonic);
            
        const path = `m/44'/501'/${count}'/0'`; // This is the derivation path
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        
        const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58()
        const privateKey = bs58.encode(secret);
        
        return {mnemonic, publicKey, privateKey}  
    }

    async function sendSol(recipientPublicKey, senderPrivateKey, amount){
        
      const privateKeyArray = bs58.decode(senderPrivateKey);
      const senderKeypair = Keypair.fromSecretKey(privateKeyArray);
      

        const connection = new Connection(
            "https://api.devnet.solana.com",
            "confirmed",
          );
        
          const transaction = new Transaction().add(
            SystemProgram.transfer({
              fromPubkey: senderKeypair.publicKey,
              toPubkey: new PublicKey(recipientPublicKey),
              lamports: parseFloat(amount) * 1e9,
            })
          );
        try{
          const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);
          return signature;
        } catch (error) {
          return error.message;
        } 
    }

    return {createWallet, sendSol}
}
