import Heading from "../heading";
import Image from "next/image";

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
        title="National ID API"
        description=""
        link1={link1}
        link2={link2}
      />
      <section className="z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-4 pt-8 md:grid-cols-2 md:pt-12 lg:pt-16">
        <div className="flex flex-col items-center justify-center font-display text-4xl md:items-start md:text-6xl lg:text-7xl">
          National ID data for your project.
        </div>
        <div className="overflow-hidden rounded-2xl">
          <Image
            src="/images/features/screenshot.svg"
            alt="screenshot"
            width={1456}
            height={1080}
          />
        </div>
      </section>
    </>
  );
}
