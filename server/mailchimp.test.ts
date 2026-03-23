import { describe, expect, it } from "vitest";

describe("Mailchimp API Key Validation", () => {
  it("should connect to Mailchimp API with the provided key", async () => {
    const apiKey = process.env.MAILCHIMP_API_KEY;
    expect(apiKey).toBeTruthy();

    // Extract the data center from the API key (e.g., "us21" from "xxx-us21")
    const dc = apiKey!.split("-").pop();
    expect(dc).toBeTruthy();

    const response = await fetch(`https://${dc}.api.mailchimp.com/3.0/ping`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.health_status).toBeDefined();
  });

  it("should have a valid audience ID", async () => {
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
    expect(audienceId).toBeTruthy();

    const dc = apiKey!.split("-").pop();
    const response = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    expect(response.status).toBe(200);
  });
});
