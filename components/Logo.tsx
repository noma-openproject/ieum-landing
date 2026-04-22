type LogoProps = {
  priority?: boolean;
  className?: string;
};

export function Logo({ priority: _priority, className }: LogoProps) {
  return (
    <span
      role="img"
      aria-label="이음"
      className={className ?? "block h-8 w-[60px]"}
      style={{
        backgroundColor: "#1E6FD9",
        WebkitMaskImage: "url('/logo-ieum.jpeg')",
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "left center",
        maskImage: "url('/logo-ieum.jpeg')",
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "left center",
        maskMode: "luminance",
      }}
    />
  );
}
