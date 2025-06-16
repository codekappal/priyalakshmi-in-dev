import React from "react";

interface PartnerRegistrationEmailProps {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  website: string;
  businessType: string;
  productInterest: string;
  yearsInBusiness: string;
  annualTurnover: string;
  previousExperience: string;
  taxId: string;
  references: string;
  marketingPlan: string;
}

export const PartnerRegistrationEmailTemplate: React.FC<
  PartnerRegistrationEmailProps
> = ({
  companyName,
  contactPerson,
  email,
  phone,
  address,
  city,
  state,
  country,
  pincode,
  website,
  businessType,
  productInterest,
  yearsInBusiness,
  annualTurnover,
  previousExperience,
  taxId,
  references,
  marketingPlan,
}) => (
  <div className="font-sans max-w-2xl mx-auto p-6 bg-white">
    <h1 className="text-2xl font-bold text-gray-800 mb-6">
      New Kappal Partners Programme Application
    </h1>

    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Company Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Company Name</p>
          <p className="text-gray-800">{companyName}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Contact Person</p>
          <p className="text-gray-800">{contactPerson}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Email</p>
          <p className="text-gray-800">{email}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Phone</p>
          <p className="text-gray-800">{phone}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Business Type</p>
          <p className="text-gray-800">{businessType}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Years in Business</p>
          <p className="text-gray-800">{yearsInBusiness}</p>
        </div>
      </div>
    </div>

    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Address Information
      </h2>
      <div className="space-y-2">
        <p className="text-gray-800">{address}</p>
        <p className="text-gray-800">
          {city}, {state}
        </p>
        <p className="text-gray-800">
          {country} - {pincode}
        </p>
        {website && (
          <p className="text-gray-800">
            Website:{" "}
            <a className="text-blue-600" href={website}>
              {website}
            </a>
          </p>
        )}
      </div>
    </div>

    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Product Interest
      </h2>
      <p className="text-gray-800 font-medium">{productInterest}</p>
    </div>

    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Financial Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Company Size</p>
          <p className="text-gray-800">{annualTurnover || "Not provided"}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Tax ID</p>
          <p className="text-gray-800">{taxId}</p>
        </div>
      </div>
    </div>

    {previousExperience && (
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Previous Experience
        </h2>
        <p className="text-gray-800 whitespace-pre-line">
          {previousExperience}
        </p>
      </div>
    )}

    {references && (
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">References</h2>
        <p className="text-gray-800 whitespace-pre-line">{references}</p>
      </div>
    )}

    {marketingPlan && (
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Marketing Plan
        </h2>
        <p className="text-gray-800 whitespace-pre-line">{marketingPlan}</p>
      </div>
    )}

    <div className="mt-8 pt-6 border-t border-gray-200">
      <a
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        href={`mailto:${email}`}
      >
        Contact Applicant
      </a>
    </div>
  </div>
);
