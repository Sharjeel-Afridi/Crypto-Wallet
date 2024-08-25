import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58"; 

export default function useCreateWallet(){

    function createWallet(phrase, count){
        console.log(phrase, count);
        console.log('function call');
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

    return {createWallet}
}
