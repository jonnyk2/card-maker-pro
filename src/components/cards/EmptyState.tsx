
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus, FileText } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  createButtonLabel: string;
  createButtonAction?: () => void;
  importButtonLabel?: string;
  importButtonAction?: () => void;
}

export default function EmptyState({
  title,
  description,
  createButtonLabel,
  createButtonAction,
  importButtonLabel,
  importButtonAction,
}: EmptyStateProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg border border-dashed border-border animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
        <div className="w-8 h-8 rounded-full bg-primary animate-pulse-subtle" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-center text-muted-foreground mb-6 max-w-md">{description}</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          onClick={createButtonAction || (() => navigate('/create'))}
        >
          <Plus className="w-4 h-4" />
          {createButtonLabel}
        </Button>
        
        {importButtonLabel && (
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-muted hover:bg-primary/20 hover:text-primary"
            onClick={importButtonAction || (() => navigate('/import'))}
          >
            <FileText className="w-4 h-4" />
            {importButtonLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
