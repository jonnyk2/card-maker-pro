
import { Card } from "@/types";
import { cn } from "@/lib/utils";

interface CardPreviewProps {
  card: Card;
  className?: string;
  onClick?: () => void;
}

export default function CardPreview({ card, className, onClick }: CardPreviewProps) {
  return (
    <div 
      className={cn(
        "aspect-[3/4] relative rounded-lg overflow-hidden border border-border bg-gradient-to-br from-theme-purple-dark to-theme-purple-muted",
        "transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-primary/20",
        className
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 p-3">
        <div className="w-full h-full relative rounded bg-theme-purple-dark/70">
          {card.fields.map((field) => (
            <div
              key={field.id}
              className="absolute"
              style={{
                left: `${field.x}%`,
                top: `${field.y}%`,
                width: `${field.width}%`,
                height: `${field.height}%`,
              }}
            >
              {field.type === "text" ? (
                <div 
                  className="w-full h-full overflow-hidden break-words"
                  style={{
                    fontSize: field.fontSize ? `${field.fontSize}px` : '16px',
                    fontFamily: field.fontFamily || 'inherit',
                    color: field.color || 'white',
                  }}
                >
                  {field.content}
                </div>
              ) : (
                <div className="w-full h-full bg-muted/30 flex items-center justify-center rounded">
                  {field.content ? (
                    <img 
                      src={field.content} 
                      alt="Card field" 
                      className="w-full h-full object-contain" 
                    />
                  ) : (
                    <span className="text-xs text-muted-foreground">Image</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2 text-center">
        <span className="text-xs font-medium">{card.name}</span>
      </div>
    </div>
  );
}
