import { cn } from "@/lib/utils"
import { ElementType, ComponentPropsWithoutRef, memo } from "react"

interface StarBorderProps<T extends ElementType> {
  as?: T
  color?: string
  speed?: string
  className?: string
  children: React.ReactNode
}

/**
 * A button with animated star border effect
 * @param as - The element type to render as
 * @param className - Additional class names
 * @param color - The color of the stars
 * @param speed - The animation speed
 * @param children - The button content
 */
export const StarBorder = memo(function StarBorder<T extends ElementType = "button">({
  as,
  className,
  color,
  speed = "6s",
  children,
  ...props
}: StarBorderProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof StarBorderProps<T>>) {
  const Component = as || "button"
  const defaultColor = color || "hsl(var(--foreground))"
  return (
    <Component 
      className={cn(
        "relative inline-block py-[1px] overflow-hidden rounded-[20px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className
      )} 
      {...props}
    >
      <div
        className={cn(
          "absolute w-[300%] h-[50%] bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0",
          "opacity-20 dark:opacity-70" 
        )}
        style={{
          background: `radial-gradient(circle, ${defaultColor}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className={cn(
          "absolute w-[300%] h-[50%] top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0",
          "opacity-20 dark:opacity-70"
        )}
        style={{
          background: `radial-gradient(circle, ${defaultColor}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className={cn(
        "relative z-1 border text-foreground text-center text-base py-3 px-5 rounded-xl",
        "bg-gradient-to-b from-background/80 to-muted/80 border-border/30 transition-all duration-300",
        "hover:from-background hover:to-background/90 hover:border-primary/40 hover:shadow-sm",
        "dark:from-background/80 dark:to-muted/80 dark:border-border/40 dark:hover:border-primary/50"
      )}>
        {children}
      </div>
    </Component>
  )
})