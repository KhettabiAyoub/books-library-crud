import { Routes, Route, Link } from "react-router-dom";
import BooksList from "./pages/BooksList";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import BookDetails from "./pages/BookDetails";
import "./styles.css";

export default function App() {
  return (
    <>
      <nav style={{ background: "#0f172a", color: "white", padding: "12px 0" }}>
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{ color: "white", textDecoration: "none", fontWeight: 700 }}
          >
            📚 BookShelf
          </Link>
          <div style={{ display: "flex", gap: 12 }}>
            <Link to="/" style={{ color: "white" }}>
              Books
            </Link>
            <Link to="/books/new" style={{ color: "white" }}>
              Add Book
            </Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<BooksList />} />
        <Route path="/books/new" element={<AddBook />} />
        <Route path="/books/:id/edit" element={<EditBook />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route
          path="*"
          element={
            <div className="container">
              <div className="card">Page not found</div>
            </div>
          }
        />
      </Routes>
    </>
  );
}
