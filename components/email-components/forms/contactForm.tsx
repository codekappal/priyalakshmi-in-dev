"use client";
import { Button, Card, Input, Textarea } from "@heroui/react";
import axios from "axios";
import React, { FormEvent, useState } from "react";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/contact-email", formData);

      if (response.status === 200) {
        setSuccessMessage(response.data.message);
        setErrorMessage(null);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.error ||
          "An error occurred while submitting your message. Please try again.",
      );
      setSuccessMessage("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 my-10">
      <div className="text-2xl font-bold mb-6">Contact Us</div>

      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
          {successMessage}
        </div>
      )}

      {!successMessage && (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              required
              className="col-span-1 md:col-span-4"
              label="Name *"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />

            <Input
              required
              className="col-span-1 md:col-span-2"
              label="Email *"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />

            <Input
              required
              className="col-span-1 md:col-span-2"
              label="Phone *"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
            />

            <Input
              required
              className="col-span-1 md:col-span-4"
              label="Subject *"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
            />
          </div>

          <Textarea
            required
            className="mt-4"
            label="Message *"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
          />

          <Button className="w-full" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Sending..." : "Send Message"}
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

export default ContactForm;
