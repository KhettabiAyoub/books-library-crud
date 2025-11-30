import { Link } from "react-router-dom";

export default function BookRow({ book, onDelete }) {
  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.year}</td>
      <td>{book.price}</td>
      <td>
        <span className="badge">{book.status}</span>
      </td>
      <td className="actions">
        <Link className="btn ghost" to={`/books/${book.id}`}>
          Details
        </Link>
        <Link className="btn ghost" to={`/books/${book.id}/edit`}>
          Edit
        </Link>
        <button className="btn warn" onClick={() => onDelete(book.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}
