import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main>
        <section className="text-center py-40">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">welcome to shopmart</h1>
          <p className=" text-xl mx-auto max-w-4xl text-gray-600">Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.</p>
          <div className="flex gap-4 justify-center items-center mt-10">
            <div className="md:flex md:justify-center md:gap-3 ">
              <div className="mb-3">
                <Button className="px-10 py-6 text-sm rounded-lg border border-transparent  hover:border-black hover:bg-white hover:text-black" asChild>
                  <Link href="/product">Shop Now</Link>
                </Button>
              </div>
              <div>
                <Button variant="outline" className="px-10 py-6 text-sm rounded-lg border-black text-black hover:bg-black hover:text-white" asChild>
                  <Link href="/Categories">Browse Categories</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
