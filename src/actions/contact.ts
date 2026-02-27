"use server";

import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export type ContactState = {
  success?: boolean;
  message?: string;
  errors?: {
    errors: string[];
    properties?: {
      name?: { errors: string[] };
      email?: { errors: string[] };
      message?: { errors: string[] };
    };
  };
};

export async function submitContact(
  prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  await new Promise((resolve) => setTimeout(resolve, 1500)); // delay to prevent spam

  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: z.treeifyError(validatedFields.error),
      message: "Please fix the errors below.",
    };
  }

  const { name, email, message } = validatedFields.data;

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL as string,
      subject: `New message in your Portfolio from: ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Resend Error:", error);
      return {
        success: false,
        message: "An error occurred while sending the email. Please try again.",
      };
    }

    return {
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    };
  } catch {
    return {
      success: false,
      message: "Server error. Please try again later.",
    };
  }
}
