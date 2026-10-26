/**
 * Single source of truth for the public contact details.
 *
 * `phoneDisplay` is what visitors read; `phoneTel` is the dialable `tel:` form.
 * Deriving both from one place is what keeps a masked/placeholder number from
 * ever reaching a `tel:` link again.
 */
export const contactDetails = {
  email: "groovestreetsoftware@gmail.com",
  phoneDisplay: "+256 774 778 164",
  phoneTel: "+256774778164",
  whatsapp: "256774778164",
  location: "Kampala, Uganda",
  hours: "Mon–Fri, 9:00–18:00 (EAT)",
} as const;

export const whatsappUrl = `https://wa.me/${contactDetails.whatsapp}`;
export const mailtoUrl = `mailto:${contactDetails.email}`;
export const telUrl = `tel:${contactDetails.phoneTel}`;
export const githubUrl = "https://github.com/GrooveStreet-Software";
