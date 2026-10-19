/**
 * GROOVESTREET - Smoke Tests
 * Verifies the site loads, renders key sections, and contains expected content.
 * Run with: npx jest tests/smoke.test.ts
 */

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3030";

describe("GROOVESTREET Site", () => {
  describe("Homepage", () => {
    it("loads without error", async () => {
      const res = await fetch(`${BASE_URL}/en`);
      expect(res.status).toBe(200);
      const html = await res.text();
      expect(html).toContain("GROOVESTREET");
    });

    it("renders hero section", async () => {
      const res = await fetch(`${BASE_URL}/en`);
      const html = await res.text();
      expect(html).toContain("GROOVE");
      expect(html).toContain("STREET");
      expect(html).toContain("DESIGN");
    });

    it("renders features section", async () => {
      const res = await fetch(`${BASE_URL}/en`);
      const html = await res.text();
      expect(html).toContain("features");
      expect(html).toContain("Website Design");
    });

    it("renders pricing with UGX currency", async () => {
      const res = await fetch(`${BASE_URL}/en`);
      const html = await res.text();
      expect(html).toContain("UGX");
      expect(html).toContain("Landing Page");
      expect(html).toContain("Signature");
    });

    it("renders contact section with real data", async () => {
      const res = await fetch(`${BASE_URL}/en`);
      const html = await res.text();
      expect(html).toContain("Kampala");
    });

    it("includes WhatsApp contact channel", async () => {
      const res = await fetch(`${BASE_URL}/en`);
      const html = await res.text();
      expect(html.toLowerCase()).toContain("whatsapp");
    });

    it("includes email contact channel", async () => {
      const res = await fetch(`${BASE_URL}/en`);
      const html = await res.text();
      expect(html.toLowerCase()).toContain("email");
    });
  });

  describe("Locale Support", () => {
    it("English locale loads", async () => {
      const res = await fetch(`${BASE_URL}/en`);
      expect(res.status).toBe(200);
    });

    it("Arabic locale loads", async () => {
      const res = await fetch(`${BASE_URL}/ar`);
      expect(res.status).toBe(200);
      const html = await res.text();
      expect(html).toContain("GROOVESTREET");
    });

    it("French locale loads", async () => {
      const res = await fetch(`${BASE_URL}/fr`);
      expect(res.status).toBe(200);
      const html = await res.text();
      expect(html).toContain("GROOVESTREET");
    });

    it("Arabic locale renders RTL", async () => {
      const res = await fetch(`${BASE_URL}/ar`);
      const html = await res.text();
      expect(html).toContain('dir="rtl"');
    });

    it("English locale renders LTR", async () => {
      const res = await fetch(`${BASE_URL}/en`);
      const html = await res.text();
      expect(html).toContain('dir="ltr"');
    });
  });

  describe("Content Quality", () => {
    it("has no lorem ipsum", async () => {
      const res = await fetch(`${BASE_URL}/en`);
      const html = await res.text();
      expect(html).not.toContain("Lorem ipsum");
    });

    it("has no TODO markers", async () => {
      const res = await fetch(`${BASE_URL}/en`);
      const html = await res.text();
      expect(html).not.toContain("TODO");
    });

    it("contains fixed pricing claim", async () => {
      const res = await fetch(`${BASE_URL}/en`);
      const html = await res.text();
      expect(html).toContain("Fixed");
    });

    it("contains geo context (Kampala)", async () => {
      const res = await fetch(`${BASE_URL}/en`);
      const html = await res.text();
      expect(html).toContain("Kampala");
    });

    it("contains process section", async () => {
      const res = await fetch(`${BASE_URL}/en`);
      const html = await res.text();
      expect(html).toContain("Discovery");
      expect(html).toContain("Launch");
    });

    it("contains testimonials", async () => {
      const res = await fetch(`${BASE_URL}/en`);
      const html = await res.text();
      expect(html).toContain("Testimonials");
    });
  });

  describe("Component Integrity", () => {
    it("has navigation menu", async () => {
      const res = await fetch(`${BASE_URL}/en`);
      const html = await res.text();
      expect(html).toContain("Services");
      expect(html).toContain("Work");
      expect(html).toContain("Process");
      expect(html).toContain("Pricing");
    });

    it("has footer", async () => {
      const res = await fetch(`${BASE_URL}/en`);
      const html = await res.text();
      expect(html).toContain("GROOVESTREET");
    });

    it("has language switcher", async () => {
      const res = await fetch(`${BASE_URL}/en`);
      const html = await res.text();
      expect(html).toContain("English");
    });
  });
});
