import { useEffect, useMemo, useState } from "react";
import { getBooks, deleteBook } from "../api/booksApi";
import { Link } from "react-router-dom";
import BookRow from "../components/BookRow";

const PAGE_SIZE = 5;

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState("title");
  const [dir, setDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    getBooks()
      .then(setBooks)
      .catch(() => setError("Failed to load data"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = !term
      ? books
      : books.filter(
          (b) =>
            b.title.toLowerCase().includes(term) ||
            b.author.toLowerCase().includes(term)
        );
    list = list.sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (va < vb) return dir === "asc" ? -1 : 1;
      if (va > vb) return dir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [books, q, sortKey, dir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const changeSort = (key) => {
    if (key === sortKey) setDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setDir("asc");
    }
  };

  const doDelete = async (id) => {
    if (!confirm("Confirm delete book?")) return;
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
      setNotice("Book deleted successfully");
      setTimeout(() => setNotice(""), 1500);
    } catch {
      setError("Failed to delete");
    }
  };

  if (loading)
    return (
      <div className="container">
        <div className="card">Loading…</div>
      </div>
    );
  if (error)
    return (
      <div className="container">
        <div className="card">{error}</div>
      </div>
    );

  return (
    <div className="container">
      <div className="header">
        <h2>Books</h2>
        <Link className="btn primary" to="/books/new">
          + New Book
        </Link>
      </div>

      <div className="card" style={{ marginBottom: 12 }}>
        <input
          className="input"
          placeholder="Search by title or author"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
        />
        {notice && <div className="notice">{notice}</div>}
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => changeSort("title")}>
                Title {sortKey === "title" ? (dir === "asc" ? "↑" : "↓") : ""}
              </th>
              <th onClick={() => changeSort("author")}>
                Author {sortKey === "author" ? (dir === "asc" ? "↑" : "↓") : ""}
              </th>
              <th onClick={() => changeSort("year")}>
                Year {sortKey === "year" ? (dir === "asc" ? "↑" : "↓") : ""}
              </th>
              <th onClick={() => changeSort("price")}>
                Price {sortKey === "price" ? (dir === "asc" ? "↑" : "↓") : ""}
              </th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((b) => (
              <BookRow key={b.id} book={b} onDelete={doDelete} />
            ))}
          </tbody>
        </table>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="actions">
            <button
              className="btn ghost"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </button>
            <button
              className="btn ghost"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
