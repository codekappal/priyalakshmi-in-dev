"use client";
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import axios from "axios";
import React, { FormEvent, useState } from "react";

const DealerRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    website: "",
    businessType: "",
    productInterest: "kappal-ads",
    yearsInBusiness: "",
    annualTurnover: "",
    previousExperience: "",
    taxId: "",
    references: "",
    marketingPlan: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/partner-enquiry", formData);

      if (response.status === 200) {
        setSuccessMessage(
          "Thank you for registering with Kappal Partners Programme! We'll review your details and contact you shortly.",
        );
        setErrorMessage(null);
        setFormData({
          companyName: "",
          contactPerson: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
          website: "",
          businessType: "",
          productInterest: "kappal-ads",
          yearsInBusiness: "",
          annualTurnover: "",
          previousExperience: "",
          taxId: "",
          references: "",
          marketingPlan: "",
        });
      }
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.error ||
          "An error occurred while submitting your application. Please try again.",
      );
      setSuccessMessage("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Card className="max-w-5xl mx-auto p-6 my-10 ">
      <div className="text-2xl font-bold mb-6">
        Kappal Partners Programme Registration
      </div>

      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
          {successMessage}
        </div>
      )}

      {!successMessage && (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Company Information */}
            <div>
              <div className="text-lg font-semibold mb-4">
                Company Information
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
                <Input
                  required
                  label="Contact Person *"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                />
                <Input
                  required
                  label="Email *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <Input
                  required
                  label="Phone *"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <Input
                  required
                  className="col-span-2"
                  label="Address *"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                <Input
                  required
                  label="City *"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <Input
                  required
                  label="State *"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
                <Input
                  required
                  label="Country *"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
                <Input
                  label="Pincode/ZIP"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                />
                <Input
                  className="col-span-2"
                  label="Website (if any)"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <Divider />

            {/* Business Information */}
            <div>
              <div className="text-lg font-semibold mb-4">
                Business Information
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Select
                  required
                  className="col-span-2 md:col-span-1"
                  label="Type of Business *"
                  name="businessType"
                  value={formData.businessType}
                  onChange={(e) => handleInputChange(e)}
                >
                  <SelectItem key="sole_proprietor">
                    Individual / Sole Proprietor
                  </SelectItem>
                  <SelectItem key="partnership">Partnership</SelectItem>
                  <SelectItem key="llc">
                    LLC (Limited Liability Company)
                  </SelectItem>
                  <SelectItem key="private_limited">
                    Private Limited Company (Pvt Ltd)
                  </SelectItem>
                  <SelectItem key="public_limited">
                    Public Limited Company (PLC)
                  </SelectItem>
                  <SelectItem key="corporation">Corporation / Inc.</SelectItem>
                  <SelectItem key="non_profit">Non-Profit / NGO</SelectItem>
                  <SelectItem key="cooperative">Cooperative</SelectItem>
                  <SelectItem key="government">Government Entity</SelectItem>
                  <SelectItem key="other">Other</SelectItem>
                </Select>

                <Select
                  required
                  className="col-span-2 md:col-span-1"
                  label="Business Size"
                  name="businessSize"
                  value={formData.annualTurnover}
                  onChange={(e) => handleInputChange(e)}
                >
                  <SelectItem key="solo">Solo / Freelancer</SelectItem>
                  <SelectItem key="small">Small (1-10 Employees)</SelectItem>
                  <SelectItem key="medium">Medium (11-50 Employees)</SelectItem>
                  <SelectItem key="large">Large (50+ Employees)</SelectItem>
                </Select>

                <Input
                  required
                  label="Years in Business *"
                  min="0"
                  name="yearsInBusiness"
                  type="number"
                  value={formData.yearsInBusiness}
                  onChange={handleInputChange}
                />

                <div className="col-span-2 md:col-span-1">
                  <div className="block text-sm font-medium mb-2 text-white ">
                    Product Interest *
                  </div>
                  <div className="space-y-2">
                    <RadioGroup
                      className="text-xs "
                      defaultValue="both"
                      label="Select your product interest"
                    >
                      <Radio
                        checked={formData.productInterest === "kappal-ads"}
                        id="kappal-ads"
                        name="productInterest"
                        value="kappal-ads"
                        onChange={handleInputChange}
                      >
                        {" "}
                        Kappal ads
                      </Radio>
                      <Radio
                        checked={
                          formData.productInterest === "kappal-ecommerce"
                        }
                        id="kappal-ecommerce"
                        name="productInterest"
                        value="kappal-ecommerce"
                        onChange={handleInputChange}
                      >
                        Kappal E-Commerce
                      </Radio>
                      <Radio
                        checked={formData.productInterest === "both"}
                        id="both"
                        name="productInterest"
                        value="both"
                        onChange={handleInputChange}
                      >
                        Both
                      </Radio>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              <Textarea
                className="mt-4"
                label="Previous Experience with Similar Products"
                name="previousExperience"
                rows={3}
                value={formData.previousExperience}
                onChange={handleInputChange}
              />

              <Input
                className="mt-4"
                label="Tax ID/VAT Number/GSTIN"
                name="taxId"
                value={formData.taxId}
                onChange={handleInputChange}
              />

              <Textarea
                className="mt-4"
                label="Business References (if any)"
                name="references"
                rows={3}
                value={formData.references}
                onChange={handleInputChange}
              />

              <Textarea
                className="mt-4"
                label="Your Marketing/Sales Plan for Kappal Products"
                name="marketingPlan"
                rows={4}
                value={formData.marketingPlan}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <Checkbox required id="terms" name="terms">
            I agree to the terms and conditions of joining a Kappal Partners
            Programme
          </Checkbox>

          <Button className="w-full" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>

          {errorMessage && (
            <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">
              {errorMessage}
            </div>
          )}
        </form>
      )}
    </Card>
  );
};

export default DealerRegistrationForm;
