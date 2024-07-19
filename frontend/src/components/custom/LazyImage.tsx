import { useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function LazyImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        className={cn("aspect-video w-full", className, {
          hidden: isLoading,
        })}
      />
      {isLoading && (
        <Skeleton className={cn("aspect-video w-full", className)} />
      )}
    </>
  );
}
