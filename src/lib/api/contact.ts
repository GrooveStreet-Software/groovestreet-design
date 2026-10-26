import type { ApiResponse, ContactPayload } from "@/types";
import { apiRequest, isApiConfigured } from "./client";

export const contactApi = {
  async send(payload: ContactPayload): Promise<ApiResponse> {
    // Prefer a self-hosted endpoint when no external API base is configured:
    // /api/contact forwards to Web3Forms (free tier).
    if (!isApiConfigured) {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const body = (await response.json().catch(() => null)) as ApiResponse | null;

        if (!response.ok) {
          return { success: false, error: body?.error ?? response.statusText };
        }

        return body ?? { success: true };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Network error",
        };
      }
    }

    return apiRequest("/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
