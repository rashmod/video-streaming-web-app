import { useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";

export default function LazyImage({ src, alt }: { src: string; alt?: string }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        className="aspect-video w-full"
      />
      {isLoading && <Skeleton className="aspect-video w-full" />}
    </>
  );
}
