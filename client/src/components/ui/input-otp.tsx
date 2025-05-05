
import * as React from "react"
import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string;
    onChange: (value: string) => void;
    maxLength: number;
  }
>(({ className, value, onChange, maxLength, ...props }, ref) => {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  const handleInputChange = (index: number, inputValue: string) => {
    const newValue = value.split('')
    newValue[index] = inputValue
    const nextValue = newValue.join('')
    onChange(nextValue)

    // Move to next input if value entered
    if (inputValue && index < maxLength - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div 
      ref={ref}
      className={cn("flex gap-2", className)} 
      {...props}
    >
      {Array.from({ length: maxLength }).map((_, index) => (
        <input
          key={index}
          ref={el => inputRefs.current[index] = el}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={value[index] || ''}
          onChange={e => handleInputChange(index, e.target.value)}
          onKeyDown={e => handleKeyDown(index, e)}
          className={cn(
            "h-10 w-10 rounded-md border text-center text-base",
            "focus:outline-none focus:ring-2 focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        />
      ))}
    </div>
  )
})
InputOTP.displayName = "InputOTP"

export { InputOTP }
