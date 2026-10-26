/**
 * GROOVESTREET - Smoke Tests
 * Verifies the site loads, renders key sections, and contains expected content.
 * Run with: npx jest tests/smoke.test.ts
 */

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3030";

const fetchOk = async (path) => {
  const res = await fetch(`${BASE_URL}${path}`);
  return { res, html: await res.text() };
};

describe("GROOVESTREET Site", () => {
  describe("Homepage", () => {
    it("loads without error", async () => {
      const { res, html } = await fetchOk("/en");
      expect(res.status).toBe(200);
      expect(html).toContain("GROOVESTREET");
      // next-intl throws these when a message key is missing or a non-string
      // value (e.g. a numeric rating) is passed to t(). Neither may reach the page.
      expect(html).not.toContain("MISSING_MESSAGE");
      expect(html).not.toContain("INVALID_MESSAGE");
    });

    it("renders hero with the Build indicator", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("GROOVE");
      expect(html).toContain("STREET");
      expect(html).toContain("DESIGN");
      expect(html).toContain("Build");
      expect(html).not.toContain("Scroll");
    });

    it("renders animated stats below the hero", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("30+");
      expect(html).toContain("200+");
      expect(html).toContain("50+");
      expect(html).toContain("90%");
    });

    it("renders the Live Sample section", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("Live Sample");
      expect(html).toContain("https://hotel-groovestreet-live.netlify.app/");
      expect(html).toContain("Open Live Preview");
    });

    it("renders the View All Samples CTA", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("View All Samples");
      expect(html).toContain('href="/en/samples"');
    });

    it("renders features section", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("features");
      expect(html).toContain("Website Design");
    });

    it("features cards carry images but no prices", async () => {
      const { html } = await fetchOk("/en");
      const section = html.slice(
        html.indexOf('id="features"'),
        html.indexOf('id="samples"')
      );
      expect(section).toContain("/hotel-assets/");
      expect(section).not.toContain("UGX 500,000");
      expect(section).not.toContain("UGX 200,000");
    });

    it("renders pricing without a foreign currency symbol", async () => {
      const { html } = await fetchOk("/en");
      const pricing = html.slice(
        html.indexOf('id="pricing"'),
        html.indexOf('id="contact"')
      );
      expect(pricing).toContain("UGX");
      expect(pricing).not.toContain("$1,900");
      expect(pricing).toContain("Landing Page");
      expect(pricing).toContain("Custom Website");
      expect(pricing).toContain("Signature");
    });

    it("has a currency converter on the pricing section", async () => {
      const { html } = await fetchOk("/en");
      const pricing = html.slice(
        html.indexOf('id="pricing"'),
        html.indexOf('id="contact"')
      );
      expect(pricing).toContain("USD");
      expect(pricing).toContain("aria-pressed");
    });

    it("has no annual/monthly plan toggle", async () => {
      const { html } = await fetchOk("/en");
      const pricing = html.slice(
        html.indexOf('id="pricing"'),
        html.indexOf('id="contact"')
      );
      expect(pricing).not.toContain("Annual");
      expect(pricing).not.toContain("Monthly");
      expect(pricing).not.toContain("(Save 20%)");
    });

    it("pricing cards do not mention maintenance", async () => {
      const { html } = await fetchOk("/en");
      const pricing = html.slice(
        html.indexOf('id="pricing"'),
        html.indexOf('id="contact"')
      );
      expect(pricing.toLowerCase()).not.toContain("maintenance");
    });

    it("includes a Graphic Design pricing card", async () => {
      const { html } = await fetchOk("/en");
      const pricing = html.slice(
        html.indexOf('id="pricing"'),
        html.indexOf('id="contact"')
      );
      expect(pricing).toContain("Graphic Design");
      expect(pricing).toContain("48 hours");
    });

    it("pricing section has a currency toggle instead of a UGX subtitle", async () => {
      const { html } = await fetchOk("/en");
      const pricing = html.slice(
        html.indexOf('id="pricing"'),
        html.indexOf('id="contact"')
      );
      expect(pricing).not.toContain("Fixed<br");
      expect(pricing).not.toContain("Fixed UGX");
      // UGX/USD are the toggle's option labels, not a price subtitle.
      expect(pricing).toContain('aria-label="Show in"');
      expect(pricing).toContain(">UGX</button>");
      expect(pricing).toContain(">USD</button>");
      expect(pricing).toContain('aria-pressed="true"');
    });

    it("renders contact section with real data", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("Kampala");
    });

    it("includes WhatsApp contact channel", async () => {
      const { html } = await fetchOk("/en");
      expect(html.toLowerCase()).toContain("whatsapp");
    });

    it("has a static bottom nav with email, call and WhatsApp", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain('aria-label="Quick contact"');
      expect(html).toContain("wa.me/256774778164");
      expect(html).toContain("mailto:groovestreetsoftware@gmail.com");
      expect(html).toContain("tel:+256774778164");
    });

    it("has a footer", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("Privacy Policy");
      expect(html).toContain("Terms of Service");
    });
  });

  describe("Testimonials", () => {
    it("renders six reviews", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("Sarah Nakato");
      expect(html).toContain("Michael Okello");
      expect(html).toContain("Emily Achieng");
      expect(html).toContain("David Ssemwanga");
      expect(html).toContain("Grace Mukasa");
      expect(html).toContain("Peter Kigozi");
    });

    it("shows a 6/6 position indicator", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("1 / 6");
    });

    it("renders the star rating design", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("out of 5 stars");
    });

    it("resolves the rating to a number, not an unresolved message", async () => {
      const { html } = await fetchOk("/en");
      // A numeric rating in the catalog makes t() throw INVALID_MESSAGE, which
      // would leave the stars unrated. The label must carry a real 1-5 value.
      expect(html).toMatch(/aria-label="[1-5] out of 5 stars"/);
    });
  });

  describe("Social links", () => {
    it("every social icon has a resolved accessible label", async () => {
      for (const locale of ["en", "fr", "de"]) {
        const { html } = await fetchOk(`/${locale}`);
        expect(html).not.toContain("MISSING_MESSAGE");
        expect(html).toContain('aria-label="WhatsApp"');
      }
    });
  });

  describe("Samples Page", () => {
    it("samples page loads with footer", async () => {
      const { res, html } = await fetchOk("/en/samples");
      expect(res.status).toBe(200);
      expect(html).toContain("Template Previews");
      expect(html).toContain("Privacy Policy");
    });

    it("samples page lists all templates", async () => {
      const { html } = await fetchOk("/en/samples");
      expect(html).toContain("Hotel GrooveStreet");
      expect(html).toContain("Juicy");
      expect(html).toContain("SAASPRO");
      expect(html).toContain("Tech Landing");
    });

    it("every linked preview file resolves", async () => {
      const { html } = await fetchOk("/en/samples");
      const hrefs = [
        ...html.matchAll(/href="(\/samples\/[^"]+\.html)"/g),
      ].map((m) => m[1]);
      expect(hrefs.length).toBeGreaterThan(0);

      for (const href of [...new Set(hrefs)]) {
        const { res } = await fetchOk(href);
        expect(`${res.status} ${href}`).toBe(`200 ${href}`);
      }
    });
  });

  describe("About Page", () => {
    it("about page loads with footer", async () => {
      const { res, html } = await fetchOk("/en/about");
      expect(res.status).toBe(200);
      expect(html).toContain("About");
      expect(html).toContain("Privacy Policy");
    });

    it("about page features three team members", async () => {
      const { html } = await fetchOk("/en/about");
      expect(html).toContain("Atigo Paul Odoch");
      expect(html).toContain("Okello Josh");
      expect(html).toContain("Achieng Emily");
      expect(html).toContain("Team Lead");
    });

    it("team members have images, motivation and links", async () => {
      const { html } = await fetchOk("/en/about");
      expect(html).toContain("/team/atigo.jpg");
      expect(html).toContain("/team/josh.svg");
      expect(html).toContain("/team/emily.svg");
      expect(html).toContain("Why we do it");
      expect(html).toContain("https://atigo.netlify.app");
    });

    it("links a dialable phone number", async () => {
      const { html } = await fetchOk("/en/about");
      expect(html).toContain("tel:+256774778164");
      expect(html).not.toContain("****");
    });
  });

  describe("Contact Page", () => {
    it("contact page loads with footer", async () => {
      const { res, html } = await fetchOk("/en/contact");
      expect(res.status).toBe(200);
      expect(html).toContain("Contact");
      expect(html).toContain("Privacy Policy");
    });

    it("contact page has email link", async () => {
      const { html } = await fetchOk("/en/contact");
      expect(html).toContain("groovestreetsoftware@gmail.com");
    });

    it("contact page has WhatsApp link", async () => {
      const { html } = await fetchOk("/en/contact");
      expect(html).toContain("wa.me/256774778164");
    });

    it("contact page has a dialable phone link", async () => {
      const { html } = await fetchOk("/en/contact");
      expect(html).toContain("tel:+256774778164");
      expect(html).not.toContain("****");
    });
  });

  describe("Legal Pages", () => {
    it("privacy policy loads with footer", async () => {
      const { res, html } = await fetchOk("/en/privacy");
      expect(res.status).toBe(200);
      expect(html).toContain("Privacy Policy");
      expect(html).toContain("Terms of Service");
    });

    it("terms of service loads with footer", async () => {
      const { res, html } = await fetchOk("/en/terms");
      expect(res.status).toBe(200);
      expect(html).toContain("Terms of Service");
      expect(html).toContain("Privacy Policy");
    });

    it("footer links to both legal pages with the locale prefix", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain('href="/en/privacy"');
      expect(html).toContain('href="/en/terms"');
      expect(html).not.toContain('href="#"');
    });
  });

  describe("Navigation", () => {
    it("navbar Contact control navigates instead of being a dead button", async () => {
      const { html } = await fetchOk("/en");
      // The Contact CTA sits next to the nav list inside the header.
      const header = html.slice(html.indexOf("<header"), html.indexOf("</header>"));
      expect(header).toContain('href="/en/contact"');
      expect(header).not.toContain('href="/contact"');
    });

    it("language switcher is a dropdown with flags and shorthand", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain('aria-haspopup="listbox"');
      expect(html).toContain(">EN<");
      // Menu items are client-rendered, so their labels ship in the payload.
      expect(html).toContain("Français");
      expect(html).toContain("Deutsch");
      expect(html).toContain("viewBox=\"0 0 60 30\"");
    });
  });

  describe("Locale Support", () => {
    it("English locale loads (default)", async () => {
      const { res } = await fetchOk("/en");
      expect(res.status).toBe(200);
    });

    it("French locale loads", async () => {
      const { res, html } = await fetchOk("/fr");
      expect(res.status).toBe(200);
      expect(html).toContain("GROOVESTREET");
    });

    it("German locale loads", async () => {
      const { res, html } = await fetchOk("/de");
      expect(res.status).toBe(200);
      expect(html).toContain("GROOVESTREET");
    });

    it("Arabic locale is gone", async () => {
      const { res } = await fetchOk("/ar");
      expect(res.status).toBe(404);
    });

    it("all locales render the samples page", async () => {
      for (const locale of ["en", "fr", "de"]) {
        const { res, html } = await fetchOk(`/${locale}/samples`);
        expect(`${res.status} /${locale}/samples`).toBe(
          `200 /${locale}/samples`
        );
        expect(html).toContain("Hotel GrooveStreet");
      }
    });
  });

  describe("Content Quality", () => {
    it("has no lorem ipsum", async () => {
      const { html } = await fetchOk("/en");
      expect(html).not.toContain("Lorem ipsum");
    });

    it("has no TODO markers", async () => {
      const { html } = await fetchOk("/en");
      expect(html).not.toContain("TODO");
    });

    it("contains fixed pricing claim", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("Fixed");
    });

    it("contains geo context (Kampala)", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("Kampala");
    });

    it("contains process section", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("Discovery");
      expect(html).toContain("Launch");
    });

    it("has no masked placeholder characters in contact details", async () => {
      for (const path of ["/en", "/en/contact", "/en/about"]) {
        const { html } = await fetchOk(path);
        expect(html).not.toContain("****");
      }
    });
  });

  describe("Contact API", () => {
    it("rejects an incomplete payload", async () => {
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "", email: "bad", message: "" }),
      });
      expect(res.status).toBe(422);
    });
  });

  describe("Component Integrity", () => {
    it("has navigation menu", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("Services");
      expect(html).toContain("Samples");
      expect(html).toContain("Process");
      expect(html).toContain("Pricing");
    });

    it("has language switcher", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("English");
    });
  });
});
