import "./ErrorPage.scss";
import { useRouteError } from "react-router-dom";

type RouteError = {
  status?: number;
  statusText?: string;
  message?: string;
};

export default function ErrorPage() {
  const error = useRouteError() as RouteError;

  return (
    <div className="error-page">
      <h1 className="error-heading">Oops!</h1>
      <p className="error-message">
        We can't seem to find the page you're looking for.
      </p>
      <p className="error-code">
        {error?.status && `Error Code: ${error.status}`}
        {error?.statusText && ` - ${error.statusText}`}
      </p>
    </div>
  );
}
