import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex">
        <div className="w-9/12">
          <div className="bg-gray-200 p-4">
            <h1 className="text-2xl font-bold">Left Section</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        <div className="w-3/12">
          <div className="bg-gray-300 p-4">
            <h1 className="text-xl font-bold">Right Section</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
