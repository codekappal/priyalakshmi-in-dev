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

const ECommerceRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    businessType: "",
    industry: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    website: "",
    businessSize: "",
    annualRevenue: "",
    productsDescription: "",
    expectedMonthlyOrders: "",
    shippingRequirements: "",
    preferredPaymentMethods: "",
    existingPlatforms: "",
    additionalRequirements: "",
    acceptTerms: false,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/ecommerce-signup", formData);

      if (response.status === 200) {
        setSuccessMessage(
          "Thank you for signing up with Kappal E-Commerce! Your account is being set up and we'll contact you shortly.",
        );
        setErrorMessage(null);
        // Reset form
        setFormData({
          businessName: "",
          contactName: "",
          email: "",
          phone: "",
          businessType: "",
          industry: "",
          address: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
          website: "",
          businessSize: "",
          annualRevenue: "",
          productsDescription: "",
          expectedMonthlyOrders: "",
          shippingRequirements: "",
          preferredPaymentMethods: "",
          existingPlatforms: "",
          additionalRequirements: "",
          acceptTerms: false,
        });
      }
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.error ||
          "An error occurred while processing your signup. Please try again.",
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
    const { name, value, type } = e.target as HTMLInputElement;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <Card className="max-w-5xl mx-auto p-6 my-10">
      <div className="text-2xl font-bold mb-6">Kappal E-Commerce Signup</div>

      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
          {successMessage}
        </div>
      )}

      {!successMessage && (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Business Information */}
            <div>
              <div className="text-lg font-semibold mb-4">
                Business Information
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  required
                  label="Business Name *"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                />
                <Input
                  required
                  label="Contact Name *"
                  name="contactName"
                  value={formData.contactName}
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
                <Select
                  required
                  label="Business Type *"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                >
                  <SelectItem key="retail">Retail</SelectItem>
                  <SelectItem key="wholesale">Wholesale</SelectItem>
                  <SelectItem key="manufacturer">Manufacturer</SelectItem>
                  <SelectItem key="dropshipper">Dropshipper</SelectItem>
                  <SelectItem key="service">Service Provider</SelectItem>
                  <SelectItem key="other">Other</SelectItem>
                </Select>
                <Select
                  required
                  label="Industry *"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                >
                  <SelectItem key="fashion">Fashion & Apparel</SelectItem>
                  <SelectItem key="electronics">Electronics</SelectItem>
                  <SelectItem key="home">Home & Garden</SelectItem>
                  <SelectItem key="beauty">Beauty & Cosmetics</SelectItem>
                  <SelectItem key="food">Food & Beverage</SelectItem>
                  <SelectItem key="health">Health & Wellness</SelectItem>
                  <SelectItem key="sports">Sports & Outdoors</SelectItem>
                  <SelectItem key="other">Other</SelectItem>
                </Select>
              </div>
            </div>

            <Divider />

            {/* Business Address */}
            <div>
              <div className="text-lg font-semibold mb-4">Business Address</div>
              <div className="grid grid-cols-2 gap-4">
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
                  label="State/Province *"
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
                  label="Postal/ZIP Code"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                />
                <Input
                  label="Website (if any)"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <Divider />

            {/* Business Details */}
            <div>
              <div className="text-lg font-semibold mb-4">Business Details</div>
              <div className="grid grid-cols-2 gap-4">
                <Select
                  required
                  label="Business Size *"
                  name="businessSize"
                  value={formData.businessSize}
                  onChange={handleInputChange}
                >
                  <SelectItem key="startup">Startup (1-5 employees)</SelectItem>
                  <SelectItem key="small">Small (6-20 employees)</SelectItem>
                  <SelectItem key="medium">
                    Medium (21-100 employees)
                  </SelectItem>
                  <SelectItem key="large">Large (100+ employees)</SelectItem>
                </Select>
                <Select
                  required
                  label="Annual Revenue *"
                  name="annualRevenue"
                  value={formData.annualRevenue}
                  onChange={handleInputChange}
                >
                  <SelectItem key="under50k">Under $50K</SelectItem>
                  <SelectItem key="50k-100k">$50K - $100K</SelectItem>
                  <SelectItem key="100k-500k">$100K - $500K</SelectItem>
                  <SelectItem key="500k-1m">$500K - $1M</SelectItem>
                  <SelectItem key="over1m">Over $1M</SelectItem>
                </Select>
                <Input
                  required
                  className="col-span-2"
                  label="Expected Monthly Orders *"
                  name="expectedMonthlyOrders"
                  placeholder="Estimated number of orders per month"
                  value={formData.expectedMonthlyOrders}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <Divider />

            {/* Product Information */}
            <div>
              <div className="text-lg font-semibold mb-4">
                Product Information
              </div>
              <Textarea
                required
                label="Describe Your Products/Services *"
                name="productsDescription"
                placeholder="What products or services will you be selling?"
                rows={3}
                value={formData.productsDescription}
                onChange={handleInputChange}
              />
            </div>

            <Divider />

            {/* E-Commerce Requirements */}
            <div>
              <div className="text-lg font-semibold mb-4">
                E-Commerce Requirements
              </div>
              <Textarea
                label="Shipping Requirements"
                name="shippingRequirements"
                placeholder="Do you have specific shipping needs or partners?"
                rows={2}
                value={formData.shippingRequirements}
                onChange={handleInputChange}
              />
              <div className="mt-4">
                <div className="block text-sm font-medium mb-2">
                  Preferred Payment Methods *
                </div>
                <div className="space-y-2">
                  <RadioGroup
                    defaultValue="multiple"
                    name="preferredPaymentMethods"
                    value={formData.preferredPaymentMethods}
                    onChange={handleInputChange}
                  >
                    <Radio value="credit_card">Credit/Debit Cards</Radio>
                    <Radio value="digital_wallet">
                      Digital Wallets (PayPal, etc.)
                    </Radio>
                    <Radio value="bank_transfer">Bank Transfers</Radio>
                    <Radio value="multiple">Multiple Options</Radio>
                    <Radio value="other">Other</Radio>
                  </RadioGroup>
                </div>
              </div>
              <Textarea
                className="mt-4"
                label="Existing Platforms (if any)"
                name="existingPlatforms"
                placeholder="Are you currently using any other e-commerce platforms?"
                rows={2}
                value={formData.existingPlatforms}
                onChange={handleInputChange}
              />
              <Textarea
                className="mt-4"
                label="Additional Requirements"
                name="additionalRequirements"
                placeholder="Any special features or integrations you need?"
                rows={3}
                value={formData.additionalRequirements}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <Checkbox
            required
            checked={formData.acceptTerms}
            name="acceptTerms"
            onChange={handleInputChange}
          >
            I agree to Kappal&apos;s Terms of Service and Privacy Policy *
          </Checkbox>

          <Button className="w-full" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Processing..." : "Complete Signup"}
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

export default ECommerceRegistrationForm;
