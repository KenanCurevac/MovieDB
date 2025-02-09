import "./LayoutTitle.css";
import { Link } from "react-router-dom";

type LayoutTitleProp = {
  title: string;
  link: string;
};

export default function LayoutTitle({ title, link }: LayoutTitleProp) {
  return (
    <Link to={link} className="layout-title-container">
      <div className="layout-title-line" />
      <div className="layout-title">{title}</div>
      <i className="layout-title-arrow"></i>
    </Link>
  );
}
