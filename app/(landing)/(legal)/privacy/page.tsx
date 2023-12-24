import { allPages } from "contentlayer/generated";
import { Mdx } from "@/components/mdx-components";
import { notFound } from "next/navigation";

export default function Privacy() {
  let page = allPages.find((page) => page.slug === "/pages/privacy");
  if (!page) {
    notFound();
  }
  return (
    <>
      <div className="z-10 w-full max-w-2xl px-5 pb-20 pt-12 xl:px-0">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-5xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-6xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          Privacy Policy
        </h1>
      </div>
      <div className="z-10 my-10 grid w-full max-w-5xl animate-fade-up grid-cols-1 gap-5 px-5  xl:px-0">
        <Mdx code={page.body.code} />
      </div>
    </>
  );
}
