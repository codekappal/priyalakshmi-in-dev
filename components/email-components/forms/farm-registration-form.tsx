"use client";

import React from "react";
import {
  ArrowRightIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
  MailIcon,
  TractorIcon,
} from "lucide-react";
import {
  Button,
  Card,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { useState } from "react";
import axios from "axios";

const FarmRegistrationForm = (): React.JSX.Element => {
  const [formData, setFormData] = useState({
    name: "",
    farmName: "",
    email: "",
    phone: "",
    country: "",
    farmSize: "",
    farmType: "",
    primaryCrops: "",
    challenges: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/farm-demo", formData);

      if (response.status === 200) {
        setSuccessMessage(
          "Thank you for your interest in Kappal Farm! Our agricultural specialist will contact you shortly to schedule your demonstration.",
        );
        setFormData({
          name: "",
          farmName: "",
          email: "",
          phone: "",
          country: "",
          farmSize: "",
          farmType: "",
          primaryCrops: "",
          challenges: "",
          message: "",
        });
      }
    } catch (error) {
      setErrorMessage(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold mb-6">Tell us about yourself</h2>
      {successMessage ? (
        <div className="p-4 mb-6 bg-green-100 text-green-800 rounded-lg">
          {successMessage}
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              required
              label="Your Name"
              name="name"
              startContent={<UserIcon className="h-5 w-5" />}
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              label="Farm Name"
              name="farmName"
              startContent={<TractorIcon className="h-5 w-5" />}
              value={formData.farmName}
              onChange={handleChange}
            />
            <Input
              required
              label="Email"
              name="email"
              startContent={<MailIcon className="h-5 w-5" />}
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Phone"
              name="phone"
              startContent={<PhoneIcon className="h-5 w-5" />}
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
            <Select
              className="md:col-span-2"
              label="Country/Region"
              name="country"
              startContent={<MapPinIcon className="h-5 w-5" />}
              value={formData.country}
              onChange={handleChange}
            >
              <SelectItem key="india">India</SelectItem>
              <SelectItem key="usa">United States</SelectItem>
              <SelectItem key="uk">United Kingdom</SelectItem>
              <SelectItem key="canada">Canada</SelectItem>
              <SelectItem key="australia">Australia</SelectItem>
              <SelectItem key="uae">UAE</SelectItem>
              <SelectItem key="singapore">Singapore</SelectItem>
              <SelectItem key="other">Other</SelectItem>
            </Select>
            <Select
              required
              className="md:col-span-2"
              label="Farm Size"
              name="farmSize"
              value={formData.farmSize}
              onChange={handleChange}
            >
              <SelectItem key="small">Small (Under 10 acres)</SelectItem>
              <SelectItem key="medium">Medium (10-50 acres)</SelectItem>
              <SelectItem key="large">Large (50-200 acres)</SelectItem>
              <SelectItem key="xlarge">Very Large (200+ acres)</SelectItem>
            </Select>
            <Select
              required
              className="md:col-span-2"
              label="Farm Type"
              name="farmType"
              value={formData.farmType}
              onChange={handleChange}
            >
              <SelectItem key="arable">Arable Crops</SelectItem>
              <SelectItem key="horticulture">Horticulture</SelectItem>
              <SelectItem key="livestock">Livestock</SelectItem>
              <SelectItem key="mixed">Mixed Farming</SelectItem>
              <SelectItem key="organic">Organic</SelectItem>
              <SelectItem key="greenhouse">Greenhouse</SelectItem>
            </Select>
            <Select
              required
              className="md:col-span-2"
              label="Primary Crops/Livestock"
              name="primaryCrops"
              value={formData.primaryCrops}
              onChange={handleChange}
            >
              <SelectItem key="cereals">Cereals (Wheat, Rice, etc.)</SelectItem>
              <SelectItem key="pulses">Pulses</SelectItem>
              <SelectItem key="vegetables">Vegetables</SelectItem>
              <SelectItem key="fruits">Fruits</SelectItem>
              <SelectItem key="dairy">Dairy</SelectItem>
              <SelectItem key="poultry">Poultry</SelectItem>
              <SelectItem key="other">Other</SelectItem>
            </Select>
            <Select
              className="md:col-span-2"
              label="Main Challenges"
              name="challenges"
              value={formData.challenges}
              onChange={handleChange}
            >
              <SelectItem key="yield">Yield Optimization</SelectItem>
              <SelectItem key="cost">Cost Management</SelectItem>
              <SelectItem key="labor">Labor Management</SelectItem>
              <SelectItem key="irrigation">Irrigation</SelectItem>
              <SelectItem key="pest">Pest/Disease Control</SelectItem>
              <SelectItem key="market">Market Access</SelectItem>
            </Select>
          </div>
          <Textarea
            label="Tell us about your farm and what you'd like to achieve"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
          />
          <Checkbox required>
            I agree to Kappal&apos;s Terms of Service and Privacy Policy
          </Checkbox>
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Sending..." : "Enquire Now"}
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Button>
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}
        </form>
      )}
    </Card>
  );
};

export default FarmRegistrationForm;
