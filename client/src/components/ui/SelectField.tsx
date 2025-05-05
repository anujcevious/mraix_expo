
import React, { useState } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";

interface Option {
  value: string;
  label: string;
}

interface SimpleSelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  required?: boolean;
}

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}: SimpleSelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (selectedValue: string) => {
    const event = {
      target: {
        name,
        value: selectedValue,
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange(event);
    setIsOpen(false);
    setSearchTerm("");
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || `Select ${label}`;

  return (
    <div className="mb-4 relative">
      <label className="block text-xs font-normal text-secondarygraycolor mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        className="w-full px-3 py-2 border border-outlinecolor rounded-md text-xs cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xs text-blackcolor">{selectedLabel}</span>
        <FiChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-outlinecolor rounded-md shadow-md">
          <div className="p-2 border-b border-outlinecolor">
            <div className="relative">
              <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-outlinecolor rounded-md focus:outline-none focus:border-primary"
                placeholder={`Search ${label.toLowerCase()}...`}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          <div className="py-1 max-h-48 overflow-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-xs text-gray-500">No results found</div>
            ) : (
              <>
                <div
                  className="px-3 py-2 hover:bg-secondary/10 text-xs cursor-pointer"
                  onClick={() => handleSelect("")}
                >
                  Select {label}
                </div>
                {filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className="px-3 py-2 hover:bg-secondary/5 text-xs cursor-pointer"
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
