
import { CardField } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface FieldPropertyEditorProps {
  field: CardField;
  onUpdate: (field: CardField) => void;
}

const fontFamilies = [
  "Arial",
  "Times New Roman",
  "Courier New",
  "Georgia",
  "Verdana",
  "Helvetica",
];

const colorOptions = [
  { name: "White", value: "white" },
  { name: "Light Gray", value: "#e2e8f0" },
  { name: "Light Blue", value: "#93c5fd" },
  { name: "Light Purple", value: "#d8b4fe" },
  { name: "Light Pink", value: "#fbcfe8" },
  { name: "Yellow", value: "#fde68a" },
];

export default function FieldPropertyEditor({
  field,
  onUpdate,
}: FieldPropertyEditorProps) {
  const [content, setContent] = useState(field.content);

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleContentBlur = () => {
    onUpdate({
      ...field,
      content,
    });
  };

  return (
    <div className="space-y-4 p-4 border border-border rounded-md bg-card/60">
      <h3 className="font-medium text-sm text-primary">Field Properties</h3>

      {/* Content Input */}
      <div className="space-y-2">
        <Label htmlFor="field-content">Content</Label>
        <Input
          id="field-content"
          value={content}
          onChange={handleContentChange}
          onBlur={handleContentBlur}
          className="bg-muted/50"
        />
      </div>

      {/* Position Controls */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="field-x" className="text-xs">X Position (%)</Label>
          <Input
            id="field-x"
            type="number"
            min={0}
            max={100}
            value={Math.round(field.x)}
            onChange={(e) =>
              onUpdate({ ...field, x: Number(e.target.value) })
            }
            className="bg-muted/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="field-y" className="text-xs">Y Position (%)</Label>
          <Input
            id="field-y"
            type="number"
            min={0}
            max={100}
            value={Math.round(field.y)}
            onChange={(e) =>
              onUpdate({ ...field, y: Number(e.target.value) })
            }
            className="bg-muted/50"
          />
        </div>
      </div>

      {/* Size Controls */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="field-width" className="text-xs">Width (%)</Label>
          <Input
            id="field-width"
            type="number"
            min={5}
            max={100}
            value={Math.round(field.width)}
            onChange={(e) =>
              onUpdate({ ...field, width: Number(e.target.value) })
            }
            className="bg-muted/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="field-height" className="text-xs">Height (%)</Label>
          <Input
            id="field-height"
            type="number"
            min={5}
            max={100}
            value={Math.round(field.height)}
            onChange={(e) =>
              onUpdate({ ...field, height: Number(e.target.value) })
            }
            className="bg-muted/50"
          />
        </div>
      </div>

      {/* Text-specific controls */}
      {field.type === "text" && (
        <>
          {/* Font Size */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="font-size" className="text-xs">Font Size</Label>
              <span className="text-xs text-muted-foreground">{field.fontSize || 16}px</span>
            </div>
            <Slider
              id="font-size"
              min={8}
              max={72}
              step={1}
              value={[field.fontSize || 16]}
              onValueChange={(value) =>
                onUpdate({ ...field, fontSize: value[0] })
              }
            />
          </div>

          {/* Font Family */}
          <div className="space-y-2">
            <Label htmlFor="font-family" className="text-xs">Font Family</Label>
            <Select
              value={field.fontFamily || fontFamilies[0]}
              onValueChange={(value) => onUpdate({ ...field, fontFamily: value })}
            >
              <SelectTrigger id="font-family" className="bg-muted/50">
                <SelectValue placeholder="Select Font" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {fontFamilies.map((font) => (
                    <SelectItem key={font} value={font}>
                      {font}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Text Color */}
          <div className="space-y-2">
            <Label htmlFor="text-color" className="text-xs">Text Color</Label>
            <Select 
              value={field.color || "white"}
              onValueChange={(value) => onUpdate({ ...field, color: value })}
            >
              <SelectTrigger id="text-color" className="bg-muted/50">
                <SelectValue placeholder="Select Color" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {colorOptions.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: color.value }}
                        />
                        {color.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </div>
  );
}
