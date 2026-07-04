type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export function ImageIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.6" />
      <path d="M21 16l-5-5L5 20" />
    </svg>
  );
}

export function DocIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  );
}

export function TelegramIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M21.5 4.3 2.9 11.4c-1 .4-1 1.8.1 2.1l4.6 1.4 1.8 5.3c.3.8 1.3 1 1.9.4l2.5-2.4 4.6 3.4c.7.5 1.7.1 1.9-.7L23 5.6c.2-1-.7-1.7-1.5-1.3z" />
      <path d="M7.6 14.9 17 8.2l-6.6 7" />
    </svg>
  );
}

export function MaxIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M21 11.5c0 4.1-4 7.4-9 7.4-1 0-2-.13-2.9-.38L4.2 20l1.1-3.3C4.1 15.3 3 13.5 3 11.5 3 7.4 7 4.1 12 4.1s9 3.3 9 7.4z" />
      <path d="M8.5 13.5v-4l3.5 3 3.5-3v4" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L17 14l5 2v3a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArticleIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M4 5h16v14H4z" />
      <path d="M7 9h7M7 12h10M7 15h6" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ZoomIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M21 21l-4.8-4.8M11 8.5v5M8.5 11h5" />
    </svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 20s-7-4.3-9.3-8.3C1.2 9 2.3 5.7 5.3 5c1.9-.4 3.6.5 4.7 2 1.1-1.5 2.8-2.4 4.7-2 3 .7 4.1 4 2.6 6.7C19 15.7 12 20 12 20z" />
    </svg>
  );
}
