import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Heading } from "@/components/ui/Heading";
import { Country, State } from "country-state-city";
import { toast } from 'react-hot-toast';
import { 
  businessTypeSchema, 
  businessDetailsSchema, 
  representativeSchema, 
  publicDetailsSchema 
} from '../../../../../shared/companyValidationSchema';
import SelectField from "@/components/ui/SelectField";
import { useLocation } from "wouter";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast";
import Icons from "@/components/ui/Icons";
import {
  createCompany,
  updateCompanyData,
} from "../../../../../store/silce/companySlice";

const Create = () => {
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  const dispatch = useDispatch();
  const [step, setStep] = useState("business-type");
  const steps = [
    "business-type",
    "business-details",
    "representative",
    "public-details",
    "review",
  ];
  const businessTypes = [
    { value: "sole-proprietor", label: "Sole Proprietor" },
    { value: "partnership", label: "Partnership" },
    { value: "private-limited", label: "Private Limited Company" },
    { value: "public-limited", label: "Public Limited Company" },
    { value: "llp", label: "Limited Liability Partnership (LLP)" },
  ];
  const GstTypes = [
    { value: "Regular", label: "Regular" },
    { value: "Composition", label: "Composition" },
    { value: "Regular SEZ", label: "Regular SEZ" },
  ];
  const [formData, setFormData] = useState({
    // Business Type
    businessType: "",
    businessLocation: "",
    typeOfBusiness: "",

    // Business Details
    legalBusinessName: "",
    gstRegistrationType: "",
    businessPAN: "",
    businessTAN: "",
    gstIN: "",
    companyIdentificationNumber: "",
    registeredAddress: "",
    businessPhone: "",
    industry: "",
    businessWebsite: "",
    customerSupportUrl: "",

    // Representative
    representativeName: "",
    representativeEmail: "",
    representativeJobTitle: "",
    representativeDOB: "",
    representativeAddress: "",
    representativePhone: "",
    representativePAN: "",
    representativeOwnership: "",
    companyName: "",
    registrationNumber: "",
    panNumber: "",
    gstNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    position: "",
    email: "",
    phone: "",
    website: "",
    socialMedia: "",
    supportEmail: "",
    supportPhone: "",
    description: "",
  });
  console.log(formData, "formData");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateStep = (currentStep: string) => {
    try {
      switch(currentStep) {
        case 'business-type':
          if (!formData.typeOfBusiness) {
            toast({
              variant: "destructive",
              description: "Please select a business type"
            });
            return false;
          }
          if (!formData.businessLocation) {
            toast({
              variant: "destructive",
              description: "Please select a business location"
            });
            return false;
          }
          businessTypeSchema.parse({
            typeOfBusiness: formData.typeOfBusiness,
            businessLocation: formData.businessLocation
          });
          break;
        case 'business-details':
          if (!formData.companyName) {
            toast({
              variant: "destructive",
              description: "Please enter company name"
            });
            return false;
          }
          if (!formData.gstRegistrationType) {
            toast({
              variant: "destructive",
              description: "Please select GST registration type"
            });
            return false;
          }
          if (!formData.registrationNumber) {
            toast({
              variant: "destructive",
              description: "Please enter registration number"
            });
            return false;
          }
          if (!formData.businessPAN) {
            toast({
              variant: "destructive",
              description: "Please enter business PAN"
            });
            return false;
          }
          if (!formData.businessTAN) {
            toast({
              variant: "destructive",
              description: "Please enter business TAN"
            });
            return false;
          }
          try {
            businessDetailsSchema.parse({
              companyName: formData.companyName,
              gstRegistrationType: formData.gstRegistrationType,
              registrationNumber: formData.registrationNumber,
              businessPAN: formData.businessPAN,
              businessTAN: formData.businessTAN,
              address: formData.address || "",
              country: formData.country || "",
              state: formData.state || "",
              city: formData.city || "",
              pincode: formData.pincode || ""
            });
          } catch (validationError: any) {
            if (validationError.errors) {
              toast({
                variant: "destructive",
                description: validationError.errors[0].message
              });
            }
            return false;
          }
          break;
        case 'representative':
          representativeSchema.parse({
            representativeName: formData.representativeName,
            position: formData.position,
            email: formData.email,
            phone: formData.phone
          });
          break;
        case 'public-details':
          publicDetailsSchema.parse({
            website: formData.website,
            supportEmail: formData.supportEmail,
            supportPhone: formData.supportPhone,
            description: formData.description
          });
          break;
      }
      return true;
    } catch (error: any) {
      if (error.errors) {
        error.errors.forEach((err: any) => {
          toast.error(err.message);
        });
      }
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateStep(step)) {
        return;
      }

      if (step === "review") {
        const apiData = {
          name: formData.companyName,
          email: formData.email,
          businesslocation: formData.businessLocation,
          typeofbusiness: formData.typeOfBusiness,
          legalbusinessname: formData.legalBusinessName,
          gstRegistrationType: formData.gstRegistrationType,
          panno: formData.businessPAN,
          tanno: formData.businessTAN,
          gstidentificationnumber: formData.gstNumber,
          companyidentificationnumber: formData.companyIdentificationNumber,
          registeredbusinessaddresses: [
            {
              address: formData.address,
              city: formData.city,
              postalcode: formData.pincode,
              state: formData.state,
              country: formData.country,
              isdefaultaddress: true,
              action: {
                isactive: true,
                isdelete: false,
                ismodify: true,
              },
            },
          ],
          businessrepresentative: {
            firstname: formData.representativeName,
            emailaddress: formData.email,
            jobtitle: formData.position,
            phonenumber: formData.phone,
            pan: formData.representativePAN,
          },
          publicdetailsforcustomers: {
            statementdescription: formData.description,
            customersupportphonenumber: formData.supportPhone,
          },
        };

        try {
          const res = await dispatch(createCompany(apiData)).unwrap();
          if (res?.status === 200) {
            toast.success("Company created successfully");
            setLocation("/");
          }
        } catch (error) {
          toast.error("Failed to create company. Please try again.");
        }
      } else {
        dispatch(updateCompanyData(formData));
        goToNextStep();
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        description: "An error occurred. Please try again."
      });
    }
  };

  const goToNextStep = () => {
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const goToPrevStep = () => {
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  return (
    <div className="relative h-[100vh] bg-gray-50">
      {/* Header */}
      <header className="fixed h-[20vh] top-0 left-0 w-full bg-white border-b px-4 py-2">
        <div
          className=" mx-auto flex justify-between 
          items-center border-b my-auto border-gray-200"
        >
          <span className="text-base font-semibold bg-gradient-to-r from-[#9552F3] to-[#7A56EE] bg-clip-text text-transparent">
            MrAix ERP
          </span>

          <div className="flex items-center space-x-4">
            <Button
              onClick={() => {
                window.history.back();
              }}
              variant="ghost"
              iconName={"logout"}
              iconPosition="left"
            >
              Logout
            </Button>
          </div>
        </div>
        <div className="my-auto">
          <div className="w-[80%] mx-auto pb-4 py-3">
            <div className="flex justify-between items-center">
              <h2 className="text-xs font-semibold">
                {step === "business-type" && "Business Type"}
                {step === "business-details" && "Business Details"}
                {step === "representative" && "Business Representative"}
                {step === "public-details" && "Public Details"}
                {step === "review" && "Review"}
              </h2>
              <p className="text-xxs text-secondarytext my-auto">
                Step {steps.indexOf(step) + 1} of {steps.length}
              </p>
            </div>
            <div className="w-full bg-primarygraycolor h-1.5 mt-3 rounded-full">
              <div
                className="bg-purple-600 h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((steps.indexOf(step) + 1) / steps.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto mt-[20vh] py-0.5">
        {/* Back */}
        <div className="my-4 px-4">
          <div className="mx-auto flex justify-between items-center">
            <Button
              variant="secondary"
              onClick={() => window.history.back()}
              className="text-xs flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Site Selection
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                // Save progress and redirect
                window.location.href = "/";
              }}
              className="text-xs"
            >
              Save & Exit
            </Button>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5   rounded-sm space-y-8"
        >
          {step === "business-type" && (
            <div className="space-y-6">
              <Heading
                title="Business Type"
                description="Tell us about your business entity"
              />
              <section className="">
                <h3 className="text-xs text-primarytext mb-4">
                  Select Business Type
                </h3>
                <div className="grid gap-4">
                  {businessTypes.map((type) => (
                    <label
                      key={type.value}
                      className="flex text-xs text-secondarygraycolor items-center space-x-3"
                    >
                      <input
                        type="radio"
                        name="typeOfBusiness"
                        value={type.value}
                        checked={formData.typeOfBusiness === type.value}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            typeOfBusiness: e.target.value,
                          })
                        }
                        className="h-4 w-4 text-secondary"
                      />
                      <span className="text-xs text-secondarygraycolor">
                        {type.label}
                      </span>
                    </label>
                  ))}
                </div>
              </section>
              <SelectField
                label="Business Location"
                name="businessLocation"
                value={formData.businessLocation}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    businessLocation: e.target.value,
                    state: "", // Reset state when country changes
                  });
                }}
                options={Country.getAllCountries().map((country) => ({
                  value: country.isoCode,
                  label: country.name,
                }))}
                required
              />
            </div>
          )}

          {step === "business-details" && (
            <div className="space-y-6">
              <Heading
                title="Business Details"
                description="Enter your company's basic information"
              />
              {/* Business Details Section */}
              <section className="">
                <h3 className="text-xs text-primarytext font-semibold mb-4">
                  Business Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    placeholder="Enter company name"
                    required
                  />
                  <SelectField
                    label="GST Registration Type"
                    name="gstRegistrationType"
                    value={formData.gstRegistrationType}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        gstRegistrationType: e.target.value,
                      });
                    }}
                    options={GstTypes.map((item) => ({
                      value: item.value,
                      label: item.label,
                    }))}
                    required
                  />
                  <InputField
                    label="Company identification number"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registrationNumber: e.target.value,
                      })
                    }
                    placeholder="Enter registration number"
                    required
                  />
                  <InputField
                    label="GST identification number"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, gstNumber: e.target.value })
                    }
                    placeholder="Enter GST number"
                  />
                  <InputField
                    label="PAN Number"
                    name="businessPAN"
                    value={formData.businessPAN}
                    onChange={(e) =>
                      setFormData({ ...formData, businessPAN: e.target.value })
                    }
                    placeholder="Enter PAN number"
                    required
                  />
                  <InputField
                    label="TAN Number"
                    name="businessTAN"
                    value={formData.businessTAN}
                    onChange={(e) =>
                      setFormData({ ...formData, businessTAN: e.target.value })
                    }
                    placeholder="Enter PAN number"
                    required
                  />
                </div>
              </section>

              {/* Address Section */}
              <section className="">
                <h3 className="text-xs text-primarytext font-semibold mb-4">
                  Address Details
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* SelectField components replacement */}
                    <SelectField
                      label="Country"
                      name="country"
                      value={formData.country}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          country: e.target.value,
                          state: "", // Reset state when country changes
                        });
                      }}
                      options={Country.getAllCountries().map((country) => ({
                        value: country.isoCode,
                        label: country.name,
                      }))}
                      required
                    />
                    <SelectField
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                      options={State.getStatesOfCountry(formData.country).map(
                        (state) => ({
                          value: state.isoCode,
                          label: state.name,
                        }),
                      )}
                      required
                    />
                    <InputField
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      placeholder="Enter city"
                    />
                    <InputField
                      label="Pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={(e) =>
                        setFormData({ ...formData, pincode: e.target.value })
                      }
                      placeholder="Enter pincode"
                    />
                  </div>
                  <InputField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Enter company address"
                  />
                </div>
              </section>
            </div>
          )}
          {step === "representative" && (
            <div className="space-y-6">
              <Heading
                title="Business representative"
                description="Enter your company's basic information"
              />
              <section className="">
                <h3 className="text-xs text-primarytext font-semibold mb-4">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Representative Name"
                    name="representativeName"
                    value={formData.representativeName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        representativeName: e.target.value,
                      })
                    }
                    placeholder="Enter representative name"
                    required
                  />
                  <InputField
                    label="Position"
                    name="position"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                    placeholder="Enter position"
                    required
                  />
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter email address"
                    required
                  />
                  <InputField
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </section>

              <section className="">
                <h3 className="text-xs text-primarytext font-semibold mb-4">
                  Address Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    placeholder="Enter country"
                  />
                  <InputField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    placeholder="Enter state"
                  />
                  <InputField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    placeholder="Enter city"
                  />
                  <InputField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Enter address"
                  />
                </div>
              </section>
            </div>
          )}
          {step === "public-details" && (
            <div className="space-y-6">
              <Heading
                title="Public details"
                description="Enter your company's basic information"
              />
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Website"
                  name="website"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  placeholder="Enter company website"
                />
                <InputField
                  label="Social Media"
                  name="socialMedia"
                  value={formData.socialMedia}
                  onChange={(e) =>
                    setFormData({ ...formData, socialMedia: e.target.value })
                  }
                  placeholder="Enter social media handles"
                />
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Support Email"
                  name="supportEmail"
                  type="email"
                  value={formData.supportEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, supportEmail: e.target.value })
                  }
                  placeholder="Enter support email"
                />
                <InputField
                  label="Support Phone"
                  name="supportPhone"
                  value={formData.supportPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, supportPhone: e.target.value })
                  }
                  placeholder="Enter support phone"
                />
              </section>

              <section>
                <InputField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter company description"
                  required
                />
              </section>
            </div>
          )}

          {step === "review" && (
            <div className="space-y-6">
              <Heading
                title="Review"
                description="Review your company information before final submission"
              />

              {/* Business Type Section */}
              <section className=" rounded-lg  shadow-sm">
                <div className="flex bg-secondary/5 p-3 rounded-tl-sm rounded-tr-sm justify-between items-center">
                  <h3 className="text-xs font-semibold">Business Type</h3>
                  <Icons onClick={() => setStep("business-type")} name="edit" />
                </div>
                <div className="grid gap-3 p-3">
                  <div className="grid grid-cols-2 gap-4">
                    <span className="text-xs text-primarytext font-medium">
                      Type of Business
                    </span>
                    <span className="text-xs text-primarytext">
                      {formData.typeOfBusiness || "-"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <span className="text-xs text-primarytext font-medium">
                      Business Location
                    </span>
                    <span className="text-xs text-primarytext">
                      {formData.businessLocation || "-"}
                    </span>
                  </div>
                </div>
              </section>

              {/* Business Details Section */}
              <section className=" rounded-sm shadow-sm">
                <div className="flex  bg-secondary/5 p-3 rounded-tl-sm rounded-tr-sm justify-between items-center">
                  <h3 className="text-xs font-semibold">Business Details</h3>
                  <Icons
                    onClick={() => setStep("business-details")}
                    name="edit"
                  />
                </div>
                <div className="grid gap-3 p-3">
                  {[
                    "companyName",
                    "registrationNumber",
                    "panNumber",
                    "gstNumber",
                    "address",
                    "city",
                    "state",
                    "country",
                    "pincode",
                  ].map((field) => (
                    <div key={field} className="grid grid-cols-2 gap-4">
                      <span className="text-xs text-primarytext font-medium">
                        {field.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="text-xs text-primarytext">
                        {formData[field] || "-"}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Representative Section */}
              <section className=" rounded-lg shadow-sm">
                <div className="flex justify-between items-center  bg-secondary/5 p-3 rounded-tl-sm rounded-tr-sm">
                  <h3 className="text-xs text-primarytext font-semibold">
                    Business Representative
                  </h3>
                  <Icons
                    onClick={() => setStep("representative")}
                    name="edit"
                  />
                </div>
                <div className="grid gap-3 p-3">
                  {["representativeName", "position", "email", "phone"].map(
                    (field) => (
                      <div key={field} className="grid grid-cols-2 gap-4">
                        <span className="text-xs text-primarytext font-medium">
                          {field.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <span className="text-xs text-primarytext">
                          {formData[field] || "-"}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </section>

              {/* Public Details Section */}
              <section className="rounded-lg shadow-sm">
                <div className="flex  bg-secondary/5 p-3 rounded-tl-sm rounded-tr-sm justify-between items-center">
                  <h3 className="text-xs text-primarytext font-semibold">
                    Public Details
                  </h3>
                  <Icons
                    onClick={() => setStep("public-details")}
                    name="edit"
                  />
                </div>
                <div className="grid gap-3 p-3">
                  {[
                    "website",
                    "socialMedia",
                    "supportEmail",
                    "supportPhone",
                    "description",
                  ].map((field) => (
                    <div key={field} className="grid grid-cols-2 gap-4">
                      <span className="text-xs text-primarytext font-medium">
                        {field.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="text-xs text-primarytext">
                        {formData[field] || "-"}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          <div
            className={`flex ${step === "business-type" ? "justify-end" : "justify-between"}`}
          >
            {step !== "business-type" && (
              <Button
                type="button"
                variant="outline"
                onClick={goToPrevStep}
                iconName="chevronLeft"
                iconPosition="left"
              >
                Previous
              </Button>
            )}
            <Button
              type="submit"
              iconName={step === "review" ? "plus" : "chevronRight"}
              iconPosition="right"
            >
              {step === "review" ? "Submit" : "Next"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Create;