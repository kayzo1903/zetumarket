"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";

const businessTypes = [
  "Laptops & Notebooks",
  "Desktop Computers",
  "Computer Components",
  "Gaming Consoles",
  "Gaming Accessories",
  "Televisions",
  "Smart Home Devices",
  "Audio Systems",
  "Cameras & Photography",
  "Printers & Office Electronics",
  "Networking Devices",
  "Mobile Phones & Tablets",
];

export default function BusinessTypeSelect({ value, onChange }: { 
  value: string[]; 
  onChange: (v: string[]) => void;
}) {
  const [open, setOpen] = useState(false);

  const toggleSelect = (item: string) => {
    if (value.includes(item)) {
      onChange(value.filter((i) => i !== item));
    } else {
      onChange([...value, item]);
    }
  };

  return (
    <div className="space-y-2">
      <div
        className="border rounded-md p-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {value.length === 0 ? (
          <span className="text-muted-foreground">Select business type(s)</span>
        ) : (
          <div className="flex flex-wrap gap-2">
            {value.map((item) => (
              <Badge key={item} variant="secondary" className="flex items-center gap-1">
                {item}
                <X
                  size={14}
                  className="cursor-pointer"
                  onClick={() => toggleSelect(item)}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>

      {open && (
        <div className="border rounded-md">
          <Command>
            <CommandList>
              <CommandGroup heading="Electronics Categories">
                {businessTypes.map((item) => (
                  <CommandItem
                    key={item}
                    onSelect={() => toggleSelect(item)}
                  >
                    <input
                      type="checkbox"
                      checked={value.includes(item)}
                      readOnly
                      className="mr-2"
                    />
                    {item}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}
