import { Link } from "react-router-dom";
export default function NotAuthorized() {
  return (
    <div>
      <h1>You are not authorized to view this page</h1>
      <p>
        Please <Link to={"/login"}>login</Link> to view this page
      </p>
    </div>
  );
}
