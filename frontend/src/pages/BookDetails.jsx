import { useEffect, useState } from "react";
import { getBook } from "../api/booksApi";
import { useParams, Link } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getBook(id)
      .then(setBook)
      .catch(() => setError("Book not found"));
  }, [id]);

  if (error)
    return (
      <div className="container">
        <div className="card">{error}</div>
      </div>
    );
  if (!book)
    return (
      <div className="container">
        <div className="card">Loading…</div>
      </div>
    );

  return (
    <div className="container">
      <div className="header">
        <h2>Book Details</h2>
        <Link className="btn ghost" to="/">
          Back
        </Link>
      </div>
      <div className="card">
        <p>
          <b>Title:</b> {book.title}
        </p>
        <p>
          <b>Author:</b> {book.author}
        </p>
        <p>
          <b>Year:</b> {book.year}
        </p>
        <p>
          <b>Price:</b> {book.price}
        </p>
        <p>
          <b>Status:</b> {book.status}
        </p>
      </div>
    </div>
  );
}
