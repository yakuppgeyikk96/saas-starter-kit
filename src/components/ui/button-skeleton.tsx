import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button";

interface ButtonSkeletonProps extends VariantProps<typeof buttonVariants> {
  className?: string;
}

export function ButtonSkeleton({
  size = "default",
  className,
}: ButtonSkeletonProps) {
  if (size === "icon") {
    return <Skeleton className={cn("size-9 rounded-md", className)} />;
  }

  if (size === "icon-sm") {
    return <Skeleton className={cn("size-8 rounded-md", className)} />;
  }

  if (size === "icon-lg") {
    return <Skeleton className={cn("size-10 rounded-md", className)} />;
  }

  const sizeClasses = {
    default: "h-9 w-20",
    sm: "h-8 w-16",
    lg: "h-10 w-24",
  };

  return (
    <Skeleton
      className={cn("rounded-md", sizeClasses[size || "default"], className)}
    />
  );
}
