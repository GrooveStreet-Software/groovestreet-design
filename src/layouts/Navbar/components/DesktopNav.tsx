"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";
import { LocaleSwitcher } from "@/components";
import { useContactModal } from "@/providers";
import { sectionLinks } from "../../constants";

export function DesktopNav() {
  const t = useTranslations("navigation");
  const { open } = useContactModal();

  return (
    <>
      <nav className="hidden md:flex items-center gap-8">
        {sectionLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-widest"
          >
            {t(link.key)}
          </Link>
        ))}
      </nav>
      <div className="hidden md:flex items-center gap-4">
        <LocaleSwitcher />
        <Button
          variant="outline"
          className="px-5 py-2 transition-colors"
          onClick={open}
          aria-haspopup="dialog"
        >
          {t("contact")}
        </Button>
      </div>
    </>
  );
}
