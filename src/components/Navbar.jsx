import Image from "next/image"
import Wallet from "../../public/wallet-90.png";


export default function  Navbar(){
    return(
        <nav className="flex justify-between p-6  h-fit w-full">
            <div className="flex items-center gap-5">
                <Image src={Wallet} alt="wallet" className="w-[30px] h-fit"/>
                <h1 className="font-bold text-3xl">Ba2अ</h1>
            </div>
        </nav>
    )
}