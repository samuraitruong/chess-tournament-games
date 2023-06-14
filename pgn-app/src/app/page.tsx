import { PgnInputComponent } from "@/components/PgnInput";

export default function Home() {
  return (
    <main className="flex w-full  min-h-screen flex-row items-center justify-between p-12">
      <div className="w-9/12">
        <div className="bg-gray-200 p-4">
          <h1 className="text-2xl font-bold">Left Section</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
      <div className="w-3/12">
        <div className="bg-gray-300 p-4">
          <PgnInputComponent></PgnInputComponent>
        </div>
      </div>
    </main>
  );
}
