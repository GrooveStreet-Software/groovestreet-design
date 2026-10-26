interface IconProps {
  className?: string;
}

export function UgandaFlag({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 30 20"
      role="img"
      aria-label="Uganda flag"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="30" height="20" fill="#000" />
      <rect y="3.33" width="30" height="3.33" fill="#FCDC04" />
      <rect y="6.66" width="30" height="3.34" fill="#D90000" />
      <rect y="10" width="30" height="3.33" fill="#000" />
      <rect y="13.33" width="30" height="3.33" fill="#FCDC04" />
      <rect y="16.66" width="30" height="3.34" fill="#D90000" />
      <circle cx="15" cy="10" r="4.1" fill="#fff" />
      <path
        d="M12.6 11.2c.7-.7 1.5-1 2.4-1l1.5-1.1.2.5-1.1.9c.5.1.9.4 1.2.8l1.3-.2-.1.6-1.2.2c-.3.4-.7.7-1.2.8l-.4 1h-.6l.3-1c-.7-.1-1.4-.5-1.9-1l-.4-.5Z"
        fill="#000"
      />
    </svg>
  );
}
