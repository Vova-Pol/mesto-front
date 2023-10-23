import React, { ReactElement } from 'react';

function Footer(): ReactElement {
  return (
    <footer className="footer section-sizing">
      <p className="footer__text">
        &copy;{new Date().getFullYear()} Mesto Russia
      </p>
    </footer>
  );
}

export default Footer;
