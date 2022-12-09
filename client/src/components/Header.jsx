import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(reset());
    dispatch(logout());
  };
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">GoalSetter</Link>
      </div>
      <ul>
        {!user ? (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser />
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <button className="btn" onClick={handleLogout}>
                <FaSignOutAlt />
                Log out
              </button>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
