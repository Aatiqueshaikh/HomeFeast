import { Link } from "react-router-dom";

function PrimaryButton({
  children,
  to,
  type = "button",
  onClick,
  className = "",
}) {
  const styles = `inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 font-medium text-white transition duration-300 hover:bg-orange-600 ${className}`;

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

export default PrimaryButton;