import Link from "next/link";

type LogoProps = Readonly<{
  title?: string;
}>;

export default function Logo({ title = "CLOTHIFY" }: LogoProps) {
  return (
    <Link
      href="/"
      className="text-xl font-heading tracking-wide"
      aria-label="Go to homepage"
    >
      <span>{title}</span>
    </Link>
  );
}
