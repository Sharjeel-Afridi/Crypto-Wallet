import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { 
    Connection,
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

    async function sendSol(publicKey, lamportsToSend){
        

        const connection = new Connection(
            "https://api.devnet.solana.com",
            "confirmed",
          );
        
        const transferTransaction = new Transaction().add(
            SystemProgram.transfer({
              fromPubkey: publicKey,
              toPubkey: publicKey,
              lamports: lamportsToSend,
            }),
          );
         
          await sendAndConfirmTransaction(connection, transferTransaction, [
            fromKeypair,
          ]);
    }

    return {createWallet, sendSol}
}
