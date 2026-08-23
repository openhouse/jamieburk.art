import Image from "next/image";

export type WorkCoverPresentation = "browser-window";

type WorkCoverMediaProps = {
  alt: string;
  fit?: "cover" | "contain";
  height: number;
  interactive?: boolean;
  objectPosition?: string;
  preload?: boolean;
  presentation?: WorkCoverPresentation;
  sizes: string;
  src: string;
  width: number;
};

export function WorkCoverMedia({
  alt,
  fit = "cover",
  height,
  interactive = false,
  objectPosition,
  preload = false,
  presentation,
  sizes,
  src,
  width
}: WorkCoverMediaProps) {
  const isBrowserWindow = presentation === "browser-window";
  const interactionClasses = interactive
    ? "transition-[filter] duration-200 group-hover:brightness-95 motion-reduce:transition-none"
    : "";

  return (
    <div
      className={`relative overflow-hidden ${
        isBrowserWindow ? "aspect-[7/5] bg-white" : "aspect-[3/2] bg-jb-field"
      }`}
      data-media-presentation={presentation}
    >
      <Image
        alt={alt}
        className={
          isBrowserWindow
            ? `h-full w-full max-w-none object-cover object-top ${interactionClasses}`
            : `h-full w-full max-w-none ${
                fit === "contain" ? "object-contain" : "object-cover"
              } ${interactionClasses}`
        }
        height={height}
        preload={preload}
        sizes={sizes}
        src={src}
        style={isBrowserWindow ? undefined : { objectPosition }}
        width={width}
      />
    </div>
  );
}
