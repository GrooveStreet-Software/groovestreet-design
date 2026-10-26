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
      expect(html).toContain("More Samples");
    });

    it("renders the More Samples button", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("More Samples");
      expect(html).toContain('href="/en/samples"');
    });

    it("hero CTAs point to What We Do and pricing", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain('href="#features"');
      expect(html).toContain('href="#pricing"');
    });

    it("hero switches between the services offered", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("PREMIUM");
      expect(html).toContain("WEBSITES");
      expect(html).toContain("GRAPHICS");
      expect(html).toContain("DIGITAL TOOLS");
      expect(html).toContain("Serving Africa and beyond");
    });

    it("renders features section", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("features");
      expect(html).toContain("Website Design");
    });

    it("features cards carry images and a readable one-liner", async () => {
      const { html } = await fetchOk("/en");
      const section = html.slice(
        html.indexOf('id="features"'),
        html.indexOf('id="samples"')
      );
      expect(section).toContain("/service-assets/");
      expect(section).toContain("turns visitors into calls and bookings");
      expect(section).not.toContain("UGX 500,000");
      expect(section).not.toContain("UGX 200,000");
    });

    it("each service card links to its pricing plan", async () => {
      const { html } = await fetchOk("/en");
      const features = html.slice(
        html.indexOf('id="features"'),
        html.indexOf('id="samples"')
      );
      expect(features).toContain('href="#pricing-standard"');
      expect(features).toContain('href="#pricing-graphic"');
      expect(features).toContain('href="#pricing-seo"');
      expect(html).toContain('id="pricing-standard"');
      expect(html).toContain('id="pricing-graphic"');
      expect(html).toContain('id="pricing-seo"');
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
      expect(pricing).toContain("SEO Optimization");
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

    it("includes an SEO Optimization card starting from UGX 100,000", async () => {
      const { html } = await fetchOk("/en");
      const pricing = html.slice(
        html.indexOf('id="pricing"'),
        html.indexOf('id="contact"')
      );
      expect(pricing).toContain("SEO Optimization");
      expect(pricing).toContain("100,000");
      expect(pricing).toContain("Per month");
      expect(pricing).toContain("from");
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

    it("offers a WhatsApp button with an intro template", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("wa.me/256774778164?text=");
      expect(html).toContain("Hello%20GROOVESTREET");
      expect(html).toContain("Chat on WhatsApp");
    });

    it("has a footer with contact details and social links", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("Privacy Policy");
      expect(html).toContain("Terms of Service");
      expect(html).toContain("groovestreetsoftware@gmail.com");
      expect(html).toContain("+256 774 778 164");
      expect(html).toContain("wa.me/256774778164");
      expect(html).toContain("https://github.com/GrooveStreet-Software");
      expect(html).toContain("Built by Ugandans");
      expect(html).toContain('aria-label="Uganda flag"');
    });

    it("hero copy focuses on the work, not money or launch dates", async () => {
      const { html } = await fetchOk("/en");
      const hero = html.slice(html.indexOf("PREMIUM"), html.indexOf('id="features"'));
      expect(hero).not.toContain("UGX");
      expect(hero.toLowerCase()).not.toContain("launch date");
    });

    it("homepage keeps Contact and the contact marquee", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain('id="contact"');
      expect(html).not.toContain('id="about"');
      expect(html).toContain("Talk to a human");
      expect(html).toContain("Thank you for considering GROOVESTREET");
      expect(html).not.toContain("Where do messages go?");
      expect(html).not.toContain("Contact form messages are sent to");
    });

    it("opens contact through a dialog, not a contact page", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain('aria-haspopup="dialog"');
      expect(html).not.toContain('href="/en/contact"');
    });
  });

  describe("Testimonials", () => {
    it("renders the desktop grid and the mobile auto carousel", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("Sarah Nakato");
      expect(html).toContain("Michael Okello");
      expect(html).toContain("Emily Ashaba");
      expect(html).toContain("David Ssemwanga");
      expect(html).toContain("Grace Mukasa");
      expect(html).toContain("Peter Kigozi");
      expect(html).toContain("1 / 6");
      expect(html).toContain('aria-label="Previous"');
      expect(html).toContain('aria-label="Next"');
      expect(html).toContain("gs-testimonial-progress");
    });

    it("renders the page-edge marquees", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("marquee-y-track");
      expect(html).toContain("GROOVESTREET");
      expect(html).toContain("DESIGN");
      expect(html).toContain("BUILD");
      expect(html).toContain("SHIP");
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
        expect(html).toContain('aria-label="GitHub"');
        expect(html).toContain("https://github.com/GrooveStreet-Software");
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
      expect(html).toContain("Feane");
      expect(html).toContain("Sarab");
      expect(html).toContain("SAASPRO");
      expect(html).toContain("Tech Landing");
      expect(html).not.toContain("Juicy");
    });

    it("samples page shows the graphics marquee in both directions", async () => {
      const { html } = await fetchOk("/en/samples");
      expect(html).toContain("Graphic Design");
      expect(html).toContain("/graphics/graphic-01.jpg");
      expect(html).toContain("marquee-track");
      expect(html).toContain("marquee-track--reverse");
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
    it("loads as its own page with the team and contact means", async () => {
      const { res, html } = await fetchOk("/en/about");
      expect(res.status).toBe(200);
      expect(html).toContain('id="about"');
      expect(html).toContain("Atigo Paul Odoch");
      expect(html).toContain('id="contact"');
      expect(html).toContain("Talk to a human");
      expect(html).toContain("groovestreetsoftware@gmail.com");
      expect(html).not.toContain("wa.me/256774778164?text=");
      expect(html).toContain("Privacy Policy");
    });

    it("features three team members", async () => {
      const { html } = await fetchOk("/en/about");
      expect(html).toContain("Atigo Paul Odoch");
      expect(html).toContain("Okello Josh");
      expect(html).toContain("Ashaba Emily");
      expect(html).toContain("Team Lead");
    });

    it("team members have images, motivation and links", async () => {
      const { html } = await fetchOk("/en/about");
      expect(html).toContain("/team/atigo.jpg");
      expect(html).toContain("/team/josh.svg");
      expect(html).toContain("/team/emily.svg");
      expect(html).toContain("Why we do it");
      expect(html).toContain("https://atigo.netlify.app");
      expect(html).toContain("https://github.com/GrooveStreet-Software");
    });

    it("links a dialable phone number", async () => {
      const { html } = await fetchOk("/en/about");
      expect(html).toContain("tel:+256774778164");
      expect(html).not.toContain("****");
    });
  });

  describe("Contact Page", () => {
    it("redirects to the homepage Contact section", async () => {
      const { res, html } = await fetchOk("/en/contact");
      expect(res.status).toBe(200);
      expect(html).toContain('id="contact"');
      expect(html).toContain("Contact");
      expect(html).toContain("Privacy Policy");
    });

    it("homepage contact section has email link", async () => {
      const { html } = await fetchOk("/en/contact");
      expect(html).toContain("groovestreetsoftware@gmail.com");
    });

    it("homepage contact section has WhatsApp link", async () => {
      const { html } = await fetchOk("/en/contact");
      expect(html).toContain("wa.me/256774778164");
    });

    it("homepage contact section has a dialable phone link", async () => {
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
    it("every page has the top navigation", async () => {
      for (const path of [
        "/en",
        "/en/about",
        "/en/samples",
        "/en/privacy",
        "/en/terms",
      ]) {
        const { res, html } = await fetchOk(path);
        expect(`${res.status} ${path}`).toBe(`200 ${path}`);
        expect(html).toContain("<header");
        expect(html).toContain("Services");
        expect(html).toContain("Pricing");
      }
    });

    it("links About to its own page", async () => {
      const { html } = await fetchOk("/en");
      const header = html.slice(html.indexOf("<header"), html.indexOf("</header>"));
      expect(header).toContain('href="/en/about"');
      expect(header).not.toContain('href="/en/#about"');
    });

    it("links Samples to the samples page", async () => {
      const { html } = await fetchOk("/en");
      const header = html.slice(html.indexOf("<header"), html.indexOf("</header>"));
      expect(header).toContain('href="/en/samples"');
      expect(header).not.toContain('href="/en/#samples"');
    });

    it("navbar Contact opens the contact dialog", async () => {
      const { html } = await fetchOk("/en");
      const header = html.slice(html.indexOf("<header"), html.indexOf("</header>"));
      expect(header).toContain('aria-haspopup="dialog"');
      expect(header).not.toContain('href="/en/contact"');
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

    it("has a full-page loading screen", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("page-loader");
      expect(html).toContain('aria-label="Loading page"');
      expect(html).toContain("gs-loader-bar");
    });

    it("has language switcher", async () => {
      const { html } = await fetchOk("/en");
      expect(html).toContain("English");
    });
  });
});
