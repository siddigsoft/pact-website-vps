import React, { forwardRef, useState, ChangeEvent } from 'react';
import { Input } from './input';

export interface ColorInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onColorChange?: (color: string) => void;
}

export const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>(
  ({ className, value, onChange, onColorChange, ...props }, ref) => {
    const [color, setColor] = useState<string>(value as string || '#000000');

    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newColor = e.target.value;
      setColor(newColor);
      
      if (onChange) {
        onChange(e);
      }
      
      if (onColorChange) {
        onColorChange(newColor);
      }
    };

    return (
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-md border border-input shadow-sm"
          style={{ backgroundColor: color }}
        />
        <Input
          ref={ref}
          type="text"
          value={color}
          onChange={handleColorChange}
          className={className}
          {...props}
        />
      </div>
    );
  }
); 