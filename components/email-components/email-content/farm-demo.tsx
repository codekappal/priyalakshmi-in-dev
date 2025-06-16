// components/email-templates/farm-demo.tsx
import React from "react";

interface FarmDemoEmailProps {
  name: string;
  farmName?: string;
  email: string;
  phone?: string;
  country: string;
  farmSize: string;
  farmType: string;
  primaryCrops: string;
  challenges?: string;
  message?: string;
}

export const FarmDemoEmailTemplate: React.FC<FarmDemoEmailProps> = ({
  name,
  farmName,
  email,
  phone,
  country,
  farmSize,
  farmType,
  primaryCrops,
  challenges,
  message,
}) => (
  <div className="font-sans max-w-2xl mx-auto p-6 bg-white">
    <h1 className="text-2xl font-bold text-gray-800 mb-6">
      New Farm Management Demo Request
    </h1>

    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Farmer Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Name</p>
          <p className="text-gray-800">{name}</p>
        </div>
        {farmName && (
          <div>
            <p className="text-sm font-medium text-gray-500">Farm Name</p>
            <p className="text-gray-800">{farmName}</p>
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-gray-500">Email</p>
          <p className="text-gray-800">
            <a className="text-green-600" href={`mailto:${email}`}>
              {email}
            </a>
          </p>
        </div>
        {phone && (
          <div>
            <p className="text-sm font-medium text-gray-500">Phone</p>
            <p className="text-gray-800">
              <a className="text-green-600" href={`tel:${phone}`}>
                {phone}
              </a>
            </p>
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-gray-500">Country</p>
          <p className="text-gray-800">{country}</p>
        </div>
      </div>
    </div>

    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Farm Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Farm Size</p>
          <p className="text-gray-800">{farmSize}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Farm Type</p>
          <p className="text-gray-800">{farmType}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Primary Crops</p>
          <p className="text-gray-800">{primaryCrops}</p>
        </div>
        {challenges && (
          <div>
            <p className="text-sm font-medium text-gray-500">Main Challenges</p>
            <p className="text-gray-800">{challenges}</p>
          </div>
        )}
      </div>
    </div>

    {message && (
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Message</h2>
        <p className="text-gray-800 whitespace-pre-line">{message}</p>
      </div>
    )}

    <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4">
      <a
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
        href={`mailto:${email}`}
      >
        Reply to {name.split(" ")[0]}
      </a>
      {phone && (
        <a
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
          href={`tel:${phone}`}
        >
          Call {name.split(" ")[0]}
        </a>
      )}
    </div>
  </div>
);
