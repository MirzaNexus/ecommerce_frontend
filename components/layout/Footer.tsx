import React from "react";
import Container from "./Container";
const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-6 mt-auto">
      <Container>
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
