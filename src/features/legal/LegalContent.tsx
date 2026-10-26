import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui";
import { Footer } from "@/layouts";
import { contactDetails, mailtoUrl } from "@/lib";

interface LegalContentProps {
  /** Message namespace: "pages.privacy" or "pages.terms". */
  namespace: string;
  /** Hard date so the policy shows when it was last revised. */
  updatedLabel: string;
}

export async function LegalContent({ namespace, updatedLabel }: LegalContentProps) {
  const t = await getTranslations(namespace);
  const sections = t.raw("sections") as { h: string; p: string }[];

  return (
    <main className="bg-black text-white min-h-screen flex flex-col">
      <div className="container mx-auto py-24 flex-1">
        <SectionHeader label={t("label")} title={t("heading")} />

        <div className="max-w-3xl mx-auto space-y-10">
          <p className="text-neutral-500 text-sm">{updatedLabel}</p>

          {sections.map((section) => (
            <section key={section.h} className="space-y-3">
              <h2 className="text-xl font-bold">{section.h}</h2>
              <p className="text-neutral-400 leading-relaxed">{section.p}</p>
            </section>
          ))}

          <p className="text-neutral-400 leading-relaxed border-t border-neutral-800 pt-8">
            Reach us at{" "}
            <a
              href={mailtoUrl}
              className="text-white hover:text-brand-foreground transition-colors"
              dir="ltr"
            >
              {contactDetails.email}
            </a>
            .
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
