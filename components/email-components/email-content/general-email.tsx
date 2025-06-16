import * as React from "react";

export interface GeneralEmailTemplateProps {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export const GeneralEmailTemplate: React.FC<
  Readonly<GeneralEmailTemplateProps>
> = ({ ...props }) => (
  <div>
    <h1>Message from {props.name}!</h1>
    <div>
      <span>Email:</span>
      {props.email}
    </div>
    <div>
      <span>Phone Number:</span>
      {props.phone}
    </div>
    <div>{props.subject}</div>
    <div>{props.message}</div>
  </div>
);
