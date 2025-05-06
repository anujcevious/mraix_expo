
import { useState, useEffect } from "react";
import { Building2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setActiveCompany, getAllCompany } from "../../../../store/silce/companySlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CompanySelect = () => {
  const dispatch = useDispatch();
  const { companies, activeCompany } = useSelector(
    (state: RootState) => state.company,
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user?.email && !companies.length) {
      dispatch(getAllCompany(user.email));
    }
  }, [dispatch, user?.email, companies.length]);

  const handleCompanySelect = (company: any) => {
    dispatch(setActiveCompany(company));
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center w-[13rem] cursor-pointer hover:text-primary transition-colors">
          <div className="bg-primary rounded-full h-8 w-8 flex items-center justify-center text-white font-semibold">
            {activeCompany?.name?.[0] || "M"}
          </div>
          <div className="ml-2 flex justify-between w-full items-center">
            <span className="font-semibold text-primarytext truncate">
              {(activeCompany?.name || "MrAix Expo").length > 15 
                ? `${(activeCompany?.name || "MrAix Expo").slice(0, 15)}...` 
                : (activeCompany?.name || "MrAix Expo")}
            </span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Company</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-6">
          <div className="space-y-2">
            {companies?.map((company: any) => (
              <button
                key={company.id}
                className={`w-full flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors ${
                  company.id === activeCompany?.id ? "bg-gray-50" : ""
                }`}
                onClick={() => handleCompanySelect(company)}
              >
                <Building2
                  className={`mr-3 h-5 w-5 ${
                    company.id === activeCompany?.id ? "text-primary" : "text-gray-500"
                  }`}
                />
                <span
                  className={`text-sm ${
                    company.id === activeCompany?.id
                      ? "text-primary font-medium"
                      : "text-gray-700"
                  }`}
                  title={company.name}
                >
                  {company.name}
                </span>
              </button>
            ))}
            <button
              className="w-full p-3 text-sm text-primary hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => {
                setIsOpen(false);
                window.location.href = "/company/create";
              }}
            >
              + Add New Company
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompanySelect;
