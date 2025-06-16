import React from "react";

interface EcommerceSignupEmailProps {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  businessType: string;
  industry: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  website: string;
  businessSize: string;
  annualRevenue: string;
  productsDescription: string;
  expectedMonthlyOrders: string;
  shippingRequirements: string;
  preferredPaymentMethods: string;
  existingPlatforms: string;
  additionalRequirements: string;
}

export const EcommerceSignupEmailTemplate: React.FC<
  EcommerceSignupEmailProps
> = ({
  businessName,
  contactName,
  email,
  phone,
  businessType,
  industry,
  address,
  city,
  state,
  country,
  pincode,
  website,
  businessSize,
  annualRevenue,
  productsDescription,
  expectedMonthlyOrders,
  shippingRequirements,
  preferredPaymentMethods,
  existingPlatforms,
  additionalRequirements,
}) => (
  <div className="font-sans max-w-2xl mx-auto p-6 bg-white">
    <h1 className="text-2xl font-bold text-gray-800 mb-6">
      New Kappal E-Commerce Signup
    </h1>

    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Business Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Business Name</p>
          <p className="text-gray-800">{businessName}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Contact Person</p>
          <p className="text-gray-800">{contactName}</p>
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
          <p className="text-sm font-medium text-gray-500">Industry</p>
          <p className="text-gray-800">{industry}</p>
        </div>
      </div>
    </div>

    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Business Address
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
            <a
              className="text-blue-600 hover:underline"
              href={website}
              rel="noopener noreferrer"
              target="_blank"
            >
              {website}
            </a>
          </p>
        )}
      </div>
    </div>

    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Business Metrics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Business Size</p>
          <p className="text-gray-800">{businessSize}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Annual Revenue</p>
          <p className="text-gray-800">{annualRevenue}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">
            Expected Monthly Orders
          </p>
          <p className="text-gray-800">{expectedMonthlyOrders}</p>
        </div>
      </div>
    </div>

    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Product Information
      </h2>
      <p className="text-gray-800 whitespace-pre-line">{productsDescription}</p>
    </div>

    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        E-Commerce Requirements
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-500">
            Shipping Requirements
          </p>
          <p className="text-gray-800 whitespace-pre-line">
            {shippingRequirements || "Not specified"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">
            Preferred Payment Methods
          </p>
          <p className="text-gray-800 capitalize">
            {preferredPaymentMethods?.replace("_", " ") || "Not specified"}
          </p>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm font-medium text-gray-500">
            Existing Platforms
          </p>
          <p className="text-gray-800 whitespace-pre-line">
            {existingPlatforms || "None"}
          </p>
        </div>
      </div>
    </div>

    {additionalRequirements && (
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Additional Requirements
        </h2>
        <p className="text-gray-800 whitespace-pre-line">
          {additionalRequirements}
        </p>
      </div>
    )}

    <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-4">
      <a
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        href={`mailto:${email}`}
      >
        Contact Business
      </a>
      <a
        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        href={`tel:${phone}`}
      >
        Call Now
      </a>
      {website && (
        <a
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          href={website}
          rel="noopener noreferrer"
          target="_blank"
        >
          Visit Website
        </a>
      )}
    </div>
  </div>
);
