import type { ApiResponse, ContactPayload } from "@/types";
import { apiRequest, isApiConfigured } from "./client";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_CONTACT_ACCESS_KEY;

async function sendViaWeb3Forms(payload: ContactPayload): Promise<ApiResponse> {
  if (!WEB3FORMS_ACCESS_KEY) {
    return {
      success: false,
      error: "Contact form is not configured. Add NEXT_PUBLIC_CONTACT_ACCESS_KEY.",
    };
  }

  const formData = new FormData();
  formData.append("access_key", WEB3FORMS_ACCESS_KEY);
  formData.append("subject", `New enquiry from ${payload.name}`);
  formData.append("from_name", "GROOVESTREET Website");
  formData.append("name", payload.name);
  formData.append("email", payload.email);
  formData.append("message", payload.message);
  formData.append("replyto", payload.email);

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Could not send the message (${response.status}).`,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}

export const contactApi = {
  async send(payload: ContactPayload): Promise<ApiResponse> {
    if (isApiConfigured) {
      return apiRequest("/contact", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    return sendViaWeb3Forms(payload);
  },
};
