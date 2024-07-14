import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { images } from "../../assets/images";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
import axios from "axios";

const cx = classNames.bind(styles);

const HeaderOnLargeScreen = () => {
  const { isAuthenticated, logoutClient } = useAuth();
  const [fixHeader, setFixHeader] = useState<boolean>(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setFixHeader(window.scrollY > 30);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        setFixHeader(window.scrollY > 30);
      });
    };
  }, []);
  const logOut = async () => {
    await axios.post("https://api-test-web.agiletech.vn/auth/logout");
  };
  return (
    <header className={cx("header", { fixHeader })}>
      <div className={cx("header_content")}>
        <div className={cx("logo")}>
          <img src={images.logo} alt="logo" />
        </div>
        {isAuthenticated ? (
          <div style={{ display: "flex", gap: "12px" }}>
            <div>
              <Link to={"/profile"} className={cx("signin-btn")}>
                Profile
              </Link>
            </div>
            <div
              onClick={() => {
                logOut();
                logoutClient();
              }}
            >
              <Link to={"/sign-in"} className={cx("signin-btn")}>
                Logout
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <Link to={"/sign-in"} className={cx("signin-btn")}>
              Sign In
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderOnLargeScreen;
