function Footer() {
  const footerYear = new Date().getFullYear();

  return (
    <footer className="footer p-5 text-primary-content footer-center bg-base-300 text-gray-200 ">
      <div className="decoration-white">
        <p>Copyright &copy; {footerYear} All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
