import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { useAppSelector } from "../../../../store/store";
import { getAllCompany } from "store/silce/companySlice";

interface Company {
  _id: string;
  name: string;
}

const CompanySelect = () => {
  const { companies } = useAppSelector((state) => state.company);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  useEffect(() => {
    if (companies.length > 0 && !selectedCompany) {
      setSelectedCompany(companies[0]);
    }
  }, [companies, selectedCompany]);
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
  const [searchTerm, setSearchTerm] = useState("");

  const getFirstLetter = (name: string) => {
    return name?.charAt(0).toUpperCase();
  };

  const filteredCompanies = companies.filter((company) =>
    company?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative w-[12rem]" ref={dropdownRef}>
      <div
        className="relative group cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative flex items-center space-x-2">
          <div className="flex items-center space-x-2 bg-secondary/5 px-3 py-1.5 rounded-full hover:bg-primary/5 w-full">
            <div className="w-9 h-6 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold text-white">
                {getFirstLetter(selectedCompany?.name)}
              </span>
            </div>
            <span className="text-xs w-full justify-between text-gray-600 truncate ">
              {selectedCompany?.name || "IHJA"}
            </span>
            <div className="mr-auto">
              <FiChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
              />
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-2">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search companies..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-md focus:outline-none focus:border-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {filteredCompanies.map((company) => (
              <div
                key={company._id}
                className={`flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 cursor-pointer ${selectedCompany?._id === company?._id ? "bg-purple-50" : ""}`}
                onClick={() => {
                  setSelectedCompany(company);
                  setIsOpen(false);
                  setSearchTerm("");
                }}
              >
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">
                    {getFirstLetter(company?.name)}
                  </span>
                </div>
                <span className="text-xs text-gray-600">{company?.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanySelect;
