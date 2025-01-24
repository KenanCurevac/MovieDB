import "./LayoutTitle.css";
import { Link } from "react-router-dom";

export default function LayoutTitle({ title, link }) {
  return (
    <Link to={link} className="title-small-container">
      <div className="line-small" />
      <div className="title-small">{title}</div>
      <i className="rotating-arrow-small"></i>
    </Link>
  );
}
