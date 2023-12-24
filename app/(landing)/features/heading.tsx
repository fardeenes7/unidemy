import Link from "next/link";

type link = {
  title: string;
  href: string;
};
export default function Heading({
  title,
  description,
  link1,
  link2,
}: {
  title: string;
  description: string;
  link1: link;
  link2: link;
}) {
  return (
    <div className="z-10 w-full max-w-2xl px-5 xl:px-0">
      <h1
        className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        {title}
      </h1>
      <p
        className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        {description}
      </p>
      <div
        className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
        style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
      >
        <Link
          className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
          href={link1.href}
        >
          <p>{link1.title}</p>
        </Link>
        <Link
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
          href={link2.href}
        >
          <p>{link2.title}</p>
        </Link>
      </div>
    </div>
  );
}
