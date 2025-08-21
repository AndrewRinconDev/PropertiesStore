function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center md:fixed bottom-0 w-full h-12 bg-gray-200 border-t border-gray-200">
      <p>
        All reserved rights &copy;{" "}
        <span className="text-blue-900">{currentYear} Andrés Rincón</span>
      </p>
    </footer>
  );
}

export default Footer;
