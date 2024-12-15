import { useLocation } from "react-router-dom";
export default function LikeEditPage() {
  const Location = useLocation();

  return (
    <div>
      <h1>{Location.state.username}</h1>
    </div>
  );
}
