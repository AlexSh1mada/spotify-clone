"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import  cn  from "clsx"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center group",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-[#4D4D4D]">
    <SliderPrimitive.Range className="absolute h-1 bg-white cursor-pointer group-hover:bg-green-500 peer-focus:bg-green-500" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block opacity-0 group-hover:opacity-100 size-3 rounded-full cursor-pointer bg-white transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
