import "bootstrap/dist/js/bootstrap.bundle";

export default function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <ul className="pagination mt-5 justify-content-center">
        <li className="page-item"></li>
        <button
          className="page-link"
          aria-label="Previous"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <span aria-hidden="true">이전</span>
        </button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <li key={i + 1} className="page-item">
              <button
                className="page-link"
                key={i + 1}
                onClick={() => setPage(i + 1)}
                aria-current={page === i + 1 ? "page" : null}
              >
                {i + 1}
              </button>
            </li>
          ))}
        <li className="page-item">
          <button
            className="page-link"
            aria-label="Next"
            onClick={() => setPage(page + 1)}
            disabled={page === numPages}
          >
            <span aria-hidden="true">다음</span>
          </button>
        </li>
      </ul>
    </>
  );
}
