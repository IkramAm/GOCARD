import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  as?: 'button' | 'a';
  href?: string;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '190px',
    height: '44px',
    padding: '12px 44px',
    gap: '10px',
    background:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(93.1deg, #36363B 0%, #222222 99%), linear-gradient(162.61deg, rgba(90, 90, 90, 0.0154) 2.8%, rgba(255, 255, 255, 0.77) 41.22%, rgba(0, 0, 0, 0) 80.82%, rgba(255, 255, 255, 0.0154) 100%)',
    backgroundOrigin: 'padding-box, padding-box, border-box',
    backgroundClip: 'padding-box, padding-box, border-box',
    border: '1px solid transparent',
    boxShadow: '0px 4px 11px 0px #00000040',
    borderRadius: '53px',
    opacity: 1,
    fontFamily: "'Barlow Semi Condensed', sans-serif",
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '100%',
    color: '#FFFFFF',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
  },
  secondary: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px 44px',
    gap: '10px',
    background: 'transparent',
    borderRadius: '53px',
    border: 'none',
    fontFamily: "'Barlow Semi Condensed', sans-serif",
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '100%',
    color: '#FFFFFF',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
  },
  outline: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px 44px',
    gap: '10px',
    background: 'transparent',
    borderRadius: '53px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    fontFamily: "'Barlow Semi Condensed', sans-serif",
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '100%',
    color: '#FFFFFF',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
  },
};

export function Button({
  variant = 'primary',
  children,
  as = 'button',
  href,
  style,
  ...props
}: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    ...variantStyles[variant],
    ...style,
  };

  if (as === 'a' && href) {
    return (
      <a href={href} style={baseStyle} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" style={baseStyle} {...props}>
      {children}
    </button>
  );
}
