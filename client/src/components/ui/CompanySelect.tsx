
import { useState, useEffect } from "react";
import { Building2, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setActiveCompany } from "../../../../store/silce/companySlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CompanySelect = () => {
  const dispatch = useDispatch();
  const { companies, activeCompany } = useSelector((state: RootState) => state.company);

  const handleCompanySelect = (company: any) => {
    dispatch(setActiveCompany(company));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center w-[11rem] cursor-pointer hover:text-primary transition-colors">
          <div className="bg-primary rounded-full h-8 w-8 flex items-center justify-center text-white font-semibold">
            {activeCompany?.name?.[0] || "M"}
          </div>
          <div className="ml-2 flex justify-between w-full items-center">
            <span className="font-semibold text-primarytext truncate">
              {activeCompany?.name || "Select Company"}
            </span>
            <ChevronDown className="ml-1 h-4 w-4" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Your Companies</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {companies?.map((company: any) => (
          <DropdownMenuItem
            key={company.id}
            className="flex items-center"
            onClick={() => handleCompanySelect(company)}
          >
            <Building2 className={`mr-2 h-4 w-4 ${company.id === activeCompany?.id ? 'text-primary' : ''}`} />
            <span className={`${company.id === activeCompany?.id ? 'font-medium' : ''}`}>
              {company.name}
            </span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => window.location.href = '/company/create'}>
          <span className="text-primary">+ Add New Company</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CompanySelect;
