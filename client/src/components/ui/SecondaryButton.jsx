import { Link } from "react-router-dom";

function SecondaryButton({
  children,
  to,
  type = "button",
  onClick,
  className = "",
}) {
  const styles = `inline-flex items-center justify-center rounded-xl border border-orange-500 bg-white px-5 py-3 font-medium text-orange-500 transition duration-300 hover:bg-orange-50 ${className}`;

  if (to) {
    return (
      <Link to={to} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={styles}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;