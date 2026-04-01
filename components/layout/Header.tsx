"use client";

import Container from "./Container";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Logo from "./Logo";
import NavIcons from "./NavIcons";

type HeaderProps = Readonly<{}>;

export default function Header(_: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b">
      <Container>
        <div className="flex items-center justify-between h-16">
          <MobileNav />
          <Logo />
          <DesktopNav />
          <NavIcons />
        </div>
      </Container>
    </header>
  );
}
