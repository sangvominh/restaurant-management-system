"use client";
import Link from "next/link";
import { useEffect, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
export function Icon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined ${className}`}
    >
      {name}
    </span>
  );
}
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={`card ${className}`}>{children}</section>;
}
export function Badge({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "green" | "amber" | "red" | "gray";
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
export function Button({
  children,
  secondary,
  danger,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  secondary?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      className={`btn ${secondary ? "btn-secondary" : danger ? "btn-danger" : "btn-primary"} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
export function ActionLink({
  href,
  children,
  secondary = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`btn ${secondary ? "btn-secondary" : "btn-primary"} ${className}`}
    >
      {children}
    </Link>
  );
}
export function Notice({
  children,
  error = false,
}: {
  children: ReactNode;
  error?: boolean;
}) {
  return (
    <div
      role={error ? "alert" : "status"}
      className={`notice ${error ? "notice-error" : ""}`}
    >
      <Icon name={error ? "error" : "info"} />
      <div>{children}</div>
    </div>
  );
}
export function Empty({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <Card className="empty">
      <Icon name="receipt_long" />
      <h2>{title}</h2>
      <div className="muted">{children}</div>
    </Card>
  );
}
export function Title({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-title">
      <div>
        <h1>{title}</h1>
        {subtitle && <p className="muted mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

export function Toast({ children, error = false }: { children: ReactNode; error?: boolean }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => { const timer = window.setTimeout(() => setVisible(false), 5000); return () => window.clearTimeout(timer); }, []);
  if (!visible) return null;
  return <div className={`staff-toast ${error ? "staff-toast-error" : ""}`} role={error ? "alert" : "status"}><Icon name={error ? "error" : "check_circle"}/><div>{children}</div></div>;
}
export function SearchInput({ value, onChange, label, hint }: { value: string; onChange: (value: string) => void; label: string; hint: string }) {
 const [focused, setFocused] = useState(false);
 return <div className={`inventory-search ${focused || value ? "expanded" : ""}`}><Icon name="search"/><input type="search" aria-label={label} placeholder={focused || value ? hint : label} value={value} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={e => onChange(e.target.value)}/></div>;
}
export function SortSelect({ value, onChange, label, options }: { value: string; onChange: (value: string) => void; label: string; options: [string, string][] }) {
 return <label className="inventory-sort" title={label}><Icon name="sort"/><select aria-label={label} value={value} onChange={e => onChange(e.target.value)}>{options.map(([key, text]) => <option key={key} value={key}>{text}</option>)}</select></label>;
}
