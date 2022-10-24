import { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from "./root.module.scss";

export default function Root() {
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/login");
    }
  }, []);

  return (
    <main className={styles.rootContainer}>
      <nav>
        {location.pathname.startsWith("/user") ? (
          <div className={styles.appContainer}>
            <NavLink to="/user-detail" className={styles["me"]} >Me</NavLink>
            <NavLink to="/user-list" className={styles["home"]}>FTM</NavLink>
            <NavLink to="/login" className={styles["logout"]}>Logout</NavLink>
          </div>
        ) : (
          <div className={styles.authContainer}>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </div>
        )}
      </nav>
      <Outlet />
    </main>
  );
}
