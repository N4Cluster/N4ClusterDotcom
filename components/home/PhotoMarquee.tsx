import Image from "next/image";

const photos: [string, number][] = [
  ["ramen-shrimp.jpg", 220], ["salmon-lemon.jpg", 300], ["egg-toast.jpg", 220], ["coffee-cups-overhead.jpg", 300],
  ["squash-soup.jpg", 220], ["sandwich-carrot.jpg", 300], ["noodle-bowl-egg.jpg", 290], ["french-toast-raspberry.jpg", 300],
];

function Track({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex gap-4 pr-4" aria-hidden={hidden || undefined}>
      {photos.map(([src, w]) => (
        <Image key={src} src={`/images/stock/${src}`} alt="" width={w} height={290} className="h-[290px] rounded-[22px] object-cover" style={{ width: w }} />
      ))}
    </div>
  );
}

export function PhotoMarquee() {
  return (
    <section aria-labelledby="regulars" className="overflow-hidden pb-[104px] pt-24">
      <div className="mx-auto mb-12 max-w-[1280px] px-6">
        <h2 id="regulars" className="font-display max-w-[980px] text-[clamp(36px,5.2vw,72px)] font-extrabold leading-[1.02] tracking-[-0.035em]">
          Your regulars already love you. Give them a better way to order <span className="text-red">from you.</span>
        </h2>
      </div>
      <div className="n4-track flex w-max">
        <Track />
        <Track hidden />
      </div>
    </section>
  );
}
