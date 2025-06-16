// components/email-templates/cloud-signup.tsx
import React from "react";

interface CloudSignupEmailProps {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  country: string;
  projectType: string;
  hostingNeeds: string;
  message?: string;
}

export const CloudSignupEmailTemplate: React.FC<CloudSignupEmailProps> = ({
  name,
  company,
  email,
  phone,
  country,
  projectType,
  hostingNeeds,
  message,
}) => (
  <div className="font-sans max-w-2xl mx-auto p-6 bg-white">
    <h1 className="text-2xl font-bold text-gray-800 mb-6">
      New Cloud Hosting Signup
    </h1>

    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Contact Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Name</p>
          <p className="text-gray-800">{name}</p>
        </div>
        {company && (
          <div>
            <p className="text-sm font-medium text-gray-500">Company</p>
            <p className="text-gray-800">{company}</p>
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-gray-500">Email</p>
          <p className="text-gray-800">
            <a className="text-blue-600" href={`mailto:${email}`}>
              {email}
            </a>
          </p>
        </div>
        {phone && (
          <div>
            <p className="text-sm font-medium text-gray-500">Phone</p>
            <p className="text-gray-800">
              <a className="text-blue-600" href={`tel:${phone}`}>
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
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Project Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Project Type</p>
          <p className="text-gray-800">{projectType}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Hosting Needs</p>
          <p className="text-gray-800">{hostingNeeds}</p>
        </div>
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
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
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
