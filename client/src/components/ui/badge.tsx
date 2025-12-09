import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border-2 px-3 py-1 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-[#1A3A5F] bg-[#1A3A5F] text-white hover:bg-[#142E4C]",
        secondary:
          "border-[#E96D1F] bg-[#E96D1F] text-white hover:bg-[#D35E16]",
        destructive:
          "border-red-600 bg-red-600 text-white hover:bg-red-700",
        outline: "border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
