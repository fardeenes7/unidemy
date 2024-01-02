import Heading from "../heading";
import Image from "next/image";
import Mfs from "./mfs.svg";
import CardImage from "./card.svg";
import ComponentGrid from "@/components/home/component-grid";

const link1 = {
  title: "View example",
  href: "#",
};
const link2 = {
  title: "View Documentation",
  href: "/docs/nid",
};

export default function Nid() {
  return (
    <>
      <Heading
        title="Payment Gateway For Academic Purpose"
        description=""
        link1={link1}
        link2={link2}
      />
      <section className="z-10 mx-auto mt-16 grid w-full max-w-7xl grid-cols-1 gap-4 px-4 pt-8 md:grid-cols-2 md:pt-12 lg:pt-16">
        <div className=" flex flex-col items-center justify-center font-display text-4xl md:items-start md:text-6xl lg:text-7xl">
          UniCash for MFS implementation.
        </div>
        <div className="flex flex-col items-center justify-center overflow-hidden rounded-2xl">
          <Image src={Mfs.src} alt="Mfs" width={300} height={280} />
        </div>
      </section>
      <section className="z-10 mx-auto mt-16 grid w-full max-w-7xl grid-cols-1 gap-4 px-4 pt-8 md:grid-cols-2 md:pt-12 lg:pt-16">
        <div className="flex flex-col items-center justify-center overflow-hidden rounded-2xl">
          <Image src={CardImage.src} alt="Card" width={300} height={280} />
        </div>
        <div className="flex w-full flex-col items-center justify-center font-display text-4xl md:items-end md:text-right md:text-6xl lg:text-7xl">
          Unicard for Card implementation.
        </div>
      </section>
      <section className="mt-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        <div className=""></div>
      </section>
    </>
  );
}
