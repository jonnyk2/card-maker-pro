
import { CardField } from "@/types";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface DraggableFieldProps {
  field: CardField;
  onUpdate: (field: CardField) => void;
  onSelect: (field: CardField) => void;
  isSelected: boolean;
}

export default function DraggableField({
  field,
  onUpdate,
  onSelect,
  isSelected,
}: DraggableFieldProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef({ x: 0, y: 0 });
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    onSelect(field);
    
    // Record starting positions
    startPosRef.current = { 
      x: e.clientX, 
      y: e.clientY 
    };
    
    // Add event listeners for dragging
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !fieldRef.current) return;
    
    const parentRect = fieldRef.current.parentElement?.getBoundingClientRect();
    if (!parentRect) return;
    
    // Calculate new positions
    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;
    
    // Convert to percentage based on parent dimensions
    const deltaXPercent = (deltaX / parentRect.width) * 100;
    const deltaYPercent = (deltaY / parentRect.height) * 100;
    
    // Update position
    const newX = Math.max(0, Math.min(100 - field.width, field.x + deltaXPercent));
    const newY = Math.max(0, Math.min(100 - field.height, field.y + deltaYPercent));
    
    // Update field position
    onUpdate({
      ...field,
      x: newX,
      y: newY,
    });
    
    // Update start position for next move
    startPosRef.current = { x: e.clientX, y: e.clientY };
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  
  return (
    <div
      ref={fieldRef}
      className={cn(
        "absolute cursor-move",
        isSelected && "ring-2 ring-primary ring-offset-1",
        isDragging && "opacity-70"
      )}
      style={{
        left: `${field.x}%`,
        top: `${field.y}%`,
        width: `${field.width}%`,
        height: `${field.height}%`,
      }}
      onMouseDown={handleMouseDown}
      onClick={() => onSelect(field)}
    >
      {field.type === "text" ? (
        <div 
          className="w-full h-full overflow-hidden break-words p-1"
          style={{
            fontSize: field.fontSize ? `${field.fontSize}px` : '16px',
            fontFamily: field.fontFamily || 'inherit',
            color: field.color || 'white',
          }}
        >
          {field.content || "Text field"}
        </div>
      ) : (
        <div className="w-full h-full bg-muted/30 flex items-center justify-center rounded">
          {field.content ? (
            <img 
              src={field.content} 
              alt="Card field" 
              className="w-full h-full object-contain pointer-events-none" 
            />
          ) : (
            <span className="text-xs text-muted-foreground pointer-events-none">Image field</span>
          )}
        </div>
      )}
    </div>
  );
}
