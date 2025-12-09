export const Marquee = () => {
  const text = "NEW ARRIVALS — FREE SHIPPING OVER $150 — EXCLUSIVE DROPS — ";
  const repeatedText = text.repeat(6);

  return (
    <div className="bg-foreground text-background py-3 overflow-hidden">
      <div className="marquee">
        <span className="text-xs tracking-[0.3em] uppercase whitespace-nowrap">
          {repeatedText}
        </span>
        <span className="text-xs tracking-[0.3em] uppercase whitespace-nowrap">
          {repeatedText}
        </span>
      </div>
    </div>
  );
};
