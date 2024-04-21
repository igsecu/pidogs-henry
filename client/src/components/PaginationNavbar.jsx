const PaginationNavbar = ({ page, pages, setPage }) => {
  const prevPage = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };
  const nextPage = () => {
    if (page !== pages) {
      setPage(page + 1);
    }
  };

  return (
    <nav aria-label="Page navigation px-5">
      <ul className="pagination justify-content-between">
        {page !== 1 ? (
          <li
            className={page === 1 ? "page-item disabled" : "page-item"}
            onClick={prevPage}
          >
            <p
              className="page-link rounded-0 text-white bg-dark"
              style={{ cursor: "pointer" }}
            >
              Previous
            </p>
          </li>
        ) : (
          <div></div>
        )}
        {page !== pages ? (
          <li
            className={page === pages ? "page-item disabled" : "page-item"}
            onClick={nextPage}
          >
            <p
              className="page-link rounded-0 text-white bg-dark"
              style={{ cursor: "pointer" }}
            >
              Next
            </p>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </nav>
  );
};

export default PaginationNavbar;
