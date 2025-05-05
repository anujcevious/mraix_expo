
import React from "react";
import Icons from "./Icons";
import { cn } from "@/lib/utils";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
  iconName?: string;
  iconPosition?: "left" | "right";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = "primary", 
    size = "default", 
    isLoading,
    iconName,
    iconPosition = "left",
    children,
    ...props 
  }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md text-xs transition-colors focus:outline-none disabled:opacity-50";

    const variants = {
      primary: "bg-primary text-white hover:bg-primary/90",
      secondary: "border border-outlinecolor hover:bg-gray-50",
      outline: "border border-input bg-white hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground"
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-8 px-3 py-1",
      lg: "h-12 px-6 py-3",
      icon: "h-10 w-10"
    };

    const renderIcon = () => {
      if (!iconName) return null;
      return (
        <Icons
          name={iconName}
          onClick={() => {}}
          size={16}
          className={cn(
            "inline-block",
            children ? (iconPosition === "left" ? "mr-2" : "ml-2") : ""
          )}
        />
      );
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {iconPosition === "left" && renderIcon()}
        {children}
        {iconPosition === "right" && renderIcon()}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
