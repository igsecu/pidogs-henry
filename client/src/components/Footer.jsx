const Footer = () => {
  return (
    <footer className="p-3 bg-dark text-white mt-5 d-flex flex-column justify-content-center align-items-center">
      <p className="lead fw-bold mb-1">Created by Ignacio Cunial</p>
      <div>
        <a
          href="https://www.linkedin.com/in/ignacio-cunial"
          target="_blank"
          rel="noreferrer"
        >
          <i className="bi bi-linkedin text-white mx-1 fs-4"></i>
        </a>
        <a
          href="https://www.github.com/igsecu"
          target="_blank"
          rel="noreferrer"
        >
          <i className="bi bi-github text-white mx-1 fs-4"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
