import "./LayoutTitle.css";
import { Link } from "react-router-dom";

export default function LayoutTitle({ title, link }) {
  return (
    <Link to={link} className="layout-title-container">
      <div className="layout-title-line" />
      <div className="layout-title">{title}</div>
      <i className="layout-title-arrow"></i>
    </Link>
  );
}
