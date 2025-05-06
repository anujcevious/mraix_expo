"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";

interface FinancialYear {
  id: string;
  period: string;
  shortPeriod: string;
}

export default function PeriodSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const financialYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2023;
    const years: FinancialYear[] = [];

    for (let year = startYear; year <= currentYear + 2; year++) {
      years.push({
        id: year.toString(),
        period: `${year}-${year + 1}`,
        shortPeriod: `${year.toString().slice(-2)}-${(year + 1).toString().slice(-2)}`,
      });
    }

    return years;
  }, []);

  const [selectedYear, setSelectedYear] = useState(financialYears[0]);

  return (
    <div className="relative w-[8rem]" ref={dropdownRef}>
      <div
        className="relative group cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative  space-x-2">
          <div className="flex justify-between items-center space-x-2 bg-secondary/5 px-3 py-1.5 rounded-full hover:bg-primary/5 w-full">
            <span className="text-xs text-gray-600">{selectedYear.period}</span>
            <div className="ml-auto">
              <FiChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
              />
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute w-full top-full left-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="max-h-48 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {financialYears.map((year) => (
              <div
                key={year.id}
                className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setSelectedYear(year);
                  setIsOpen(false);
                }}
              >
                <span className="text-xs text-gray-600">{year.period}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
