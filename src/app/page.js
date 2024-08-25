import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen ">
      <Navbar />

      <div className="flex flex-col px-4 pt-[10vh] gap-4">
        <h1 className="text-5xl font-bold">Secret Recovery Phrase</h1>
        <p className="text-xl font-medium text-gray-400 ">Save these words in a safe place.</p>
        <div className="flex gap-5 items-center">

          <input 
            className="bg-transparent h-fit border-[1px] border-white/20 px-2 py-3  w-[80%] rounded-md font-normal text-sm"
            placeholder="Enter you secret phrase here (or leave blank to generate)"
          />
          <button className="bg-white/90 hover:bg-white/80 transition-all rounded-md text-black px-6 py-3">
            Generate Wallet
          </button>

        </div>
      </div>
    </main>
  );
}
