import { useState, useEffect } from "react";
import { Building2, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import {
  setActiveCompany,
  getAllCompany,
} from "../../../../store/silce/companySlice";
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
  const { companies, activeCompany } = useSelector(
    (state: RootState) => state.company,
  );
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user?.email && !companies.length) {
      dispatch(getAllCompany(user.email));
    }
  }, [dispatch, user?.email, companies.length]);

  const handleCompanySelect = (company: any) => {
    dispatch(setActiveCompany(company));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center w-[13rem] cursor-pointer hover:text-primary transition-colors">
          <div className="bg-primary rounded-full h-8 w-8 flex items-center justify-center text-white font-semibold">
            {activeCompany?.name?.[0] || "M"}
          </div>
          <div className="ml-2 flex justify-between items-center">
            <span className="font-semibold text-primarytext truncate">
              {(activeCompany?.name || "MrAix Expo").length > 10
                ? `${(activeCompany?.name || "MrAix Expo").slice(0, 14)}...`
                : activeCompany?.name || "MrAix Expo"}
            </span>
            <ChevronDown className="ml-1 h-4 w-4" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 absolute top-0 max-h-[300px] overflow-y-auto">
        <DropdownMenuLabel className="sticky top-0 bg-white z-10">
          Your Companies
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {companies?.map((company: any) => (
          <DropdownMenuItem
            key={company.id}
            className={`flex items-center hover:bg-gray-100 ${company.id === activeCompany?.id ? "bg-gray-50" : ""}`}
            onClick={() => handleCompanySelect(company)}
          >
            <Building2
              className={`mr-2 h-4 w-4 ${company.id === activeCompany?.id ? "text-primary" : "text-gray-500"}`}
            />
            <span className={`text-xs`} title={company.name}>
              {company.name}
            </span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => (window.location.href = "/company/create")}
        >
          <span className="text-xs text-primary">+ Add New Company</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CompanySelect;
