"use client";

interface SocialIconProps {
  href: string;
  label: string;
  children: React.ReactNode;
  /** Opens the link in a new tab with rel="noopener noreferrer". */
  external?: boolean;
}

export function SocialIcon({ href, label, children, external }: SocialIconProps) {
  return (
    <a
      href={href}
      className="text-neutral-400 hover:text-white transition-colors"
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
