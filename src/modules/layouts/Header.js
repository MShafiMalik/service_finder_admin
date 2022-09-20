import "./Layouts.scss";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import {
  hideSidebar,
  hideSidebarBackdrop,
  showSidebar,
  showSidebarBackdrop,
} from "../../reducers/sidebarSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { logout, userDetail } from "../../reducers/authSlice";
import ROUTES from "../../common/routes";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(userDetail);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 1198px)" });

  useEffect(() => {
    dispatch(hideSidebarBackdrop());
    if (isSmallScreen === true) {
      dispatch(hideSidebar());
    } else {
      dispatch(showSidebar());
    }
  }, [isSmallScreen, dispatch]);

  const showSidebarHandler = () => {
    if (isSmallScreen === true) {
      dispatch(showSidebarBackdrop());
    }
    dispatch(showSidebar());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="mb-2 header d-flex">
      <button
        type="button"
        onClick={showSidebarHandler}
        className="burger-btn app-link d-block d-xl-none "
      >
        <i className="bi bi-justify theme-color fs-3"></i>
      </button>
      <div className="dropdown ms-auto">
        <button
          type="button"
          className=" avatar-btn dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          <img
            src={user.image}
            alt="Avatar Logo"
            className="rounded-pill avatar"
          />
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <Link to={ROUTES.AUTH.PROFILE} className="dropdown-item">
              Profile
            </Link>
          </li>
          <li>
            <Link to={ROUTES.AUTH.CHANGE_PASSWORD} className="dropdown-item">
              Change Password
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={handleLogout}
              className="dropdown-item"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
