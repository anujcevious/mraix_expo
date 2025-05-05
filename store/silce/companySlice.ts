import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Types
interface Address {
  address: string;
  city: string;
  postalcode: string;
  state: string;
  country: string;
  isdefaultaddress?: boolean;
  addressid?: string;
  action?: {
    isactive: boolean;
    isdelete: boolean;
    ismodify: boolean;
  };
}

interface Payment {
  isinternationalpayment: boolean;
  transactioncode: string;
  iswebsite: boolean;
  isapp: boolean;
  isoffline: boolean;
}

interface BusinessRepresentative {
  firstname: string;
  lastname: string;
  emailaddress: string;
  jobtitle: string;
  address: string;
  city: string;
  postalcode: string;
  state: string;
  country: string;
  phonenumber: string;
  pan: string;
  ownerShipPercentage: string;
  dob: string;
}

interface PublicDetails {
  statementdescription: string;
  shorteneddescriptor: string;
  customersupportphonenumber: string;
}

interface GSTRegistration {
  registeredbusinessaddresses: Address;
  id: string;
  name: string;
  businesslocation: string;
  typeofbusiness: string;
  legalbusinessname: string;
  panno: string;
  tanno: string;
  gstidentificationnumber: string;
  createddate: string;
  companyidentificationnumber: string;
  group: string;
}

interface CompanyData {
  name: string;
  businesslocation: string;
  typeofbusiness: string;
  legalbusinessname: string;
  panno: string;
  tanno: string;
  description: string;
  gstidentificationnumber: string;
  companyidentificationnumber: string;
  payment: Payment;
  registeredbusinessaddresses: Address[];
  phonenumber: string;
  website: string;
  productdescription: string;
  businessrepresentative: BusinessRepresentative;
  termsofservicesurl: string;
  publicdetailsforcustomers: PublicDetails;
  industrialtype: string;
  supporturl: string;
  policyurl: string;
  cancelationndrefundpolicyurl: string;
  gstregistration: GSTRegistration[];
}

export type CompanyCreationStep =
  | "company-type"
  | "business-details"
  | "business-representative"
  | "public-details"
  | "review"
  | "complete";

interface CompanyState {
  user: any;
  companies: any[];
  activeCompany: any;
  loading: boolean;
  error: string | null;
  currentStep: CompanyCreationStep;
  companyData: Partial<CompanyData>;
  completedSteps: CompanyCreationStep[];
}

// Async Thunks
export const createCompany = createAsyncThunk(
  "company/create",
  async (body: CompanyData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://host.mraix.com/api/v2/company/create",
        {
          ...body,
          generalsetting: {
            gstRegistration: true,
            gstClassification: true,
            createAutoid: false,
            DateFormat: null,
            TimeFormat: null,
            discountViaPercentage: null,
            language: "English",
            timezone: null,
            currency: null,
            autoBilling: null,
            decimalPlace: 2,
          },
          region: [
            {
              country: "IN",
              countrycode: "CC",
              currency: "USD",
              default: true,
              action: {
                isactive: true,
                isdelete: false,
                ismodify: true,
              },
            },
          ],
        },
      );
      console.log(response, "ertwqlw,.");
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to create company",
      );
    }
  },
);

export const fetchUserByEmail = createAsyncThunk(
  "company/fetchUserByEmail",
  async (email: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/getUserByEmail/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch user");
    }
  },
);

export const getAllCompany = createAsyncThunk(
  "getAllCompany",
  async (email: string) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/company/getAllCompaniesByEmail?email=anujkumar@cevious.com
`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response?.data, "response>DM<D:A");
    return response.data;
  },
);

// Initial State
const initialState: CompanyState = {
  user: null,
  companies: [],
  activeCompany: null,
  loading: false,
  error: null,
  currentStep: "company-type",
  companyData: {},
  completedSteps: [],
};

// Slice
const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setActiveCompany: (state, action) => {
      state.activeCompany = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateCompanyData: (state, action) => {
      state.companyData = { ...state.companyData, ...action.payload };
      if (!state.completedSteps.includes(state.currentStep)) {
        state.completedSteps.push(state.currentStep);
      }
    },
    resetCompanyForm: (state) => {
      state.companyData = {};
      state.currentStep = "company-type";
      state.completedSteps = [];
      state.error = null;
    },
    goToNextStep: (state) => {
      const steps: CompanyCreationStep[] = [
        "company-type",
        "business-details",
        "business-representative",
        "public-details",
        "review",
      ];
      const currentIndex = steps.indexOf(state.currentStep);
      if (currentIndex < steps.length - 1) {
        state.currentStep = steps[currentIndex + 1];
      }
    },
    goToPreviousStep: (state) => {
      const steps: CompanyCreationStep[] = [
        "company-type",
        "business-details",
        "business-representative",
        "public-details",
        "review",
      ];
      const currentIndex = steps.indexOf(state.currentStep);
      if (currentIndex > 0) {
        state.currentStep = steps[currentIndex - 1];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = [...state.companies, action.payload.data];
        state.activeCompany = action.payload.data;
        state.currentStep = "complete";
      })
      .addCase(createCompany.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Failed to create company";
      })
      .addCase(getAllCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCompany.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data, "action.payload.data");
        console.log(action.payload, "action.payload.data");

        state.companies = action.payload?.companies || [];
      })
      .addCase(getAllCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch companies";
      })
      .addCase(fetchUserByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(fetchUserByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export const {
  setActiveCompany,
  setCurrentStep,
  updateCompanyData,
  resetCompanyForm,
  goToNextStep,
  goToPreviousStep,
} = companySlice.actions;

export default companySlice.reducer;
