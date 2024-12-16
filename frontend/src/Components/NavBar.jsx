import React from "react";

export default function NavBar({ username, quantity }) {
  return (
    <nav className="NavBar">
      <div className="NavDiv NavUser">
        <h3>Hello, {username}</h3> {/* Display the logged-in username */}
      </div>
      <div className="NavDiv NavTitle">
        <h2>Groceries App 🍎</h2>
      </div>
      <div className="NavDiv NavCart">
        <img
          src={
            quantity > 0
              ? "src/assets/cart-full.png"
              : "src/assets/cart-empty.png"
          }
        />
      </div>
    </nav>
  );
}
