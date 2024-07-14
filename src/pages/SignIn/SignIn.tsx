import classNames from "classnames/bind";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../../assets/images";
import api from "../../common/api";
import { useAuth } from "../../context/UserContext";
import styles from "./SignIn.module.scss";

type LoginInputs = {
  username: string;
};

const cx = classNames.bind(styles);
const SignIn = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setToken } = useAuth();
  const [code, setCode] = useState<undefined | number>(undefined);
  const { register, handleSubmit } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const result = await api.post("auth/login", data);
    console.log(result);
    if (result.data.code) {
      setCode(result.data.code);
    } else {
      setIsAuthenticated(true);
      setToken(result.data.accessToken);
      localStorage.setItem("refresh_token", result.data.refreshToken)
      navigate("/");
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header_content")}>
        <Link to={"/"} className={cx("logo")}>
          <img src={images.logo} alt="logo" />
        </Link>
      </div>
      <div className={cx("form__wrapper")}>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={cx("form")}>
          <div className={cx("input-item")}>
            <label htmlFor="username">UserName</label>
            <input
              {...register("username")}
              id="username"
              className={cx("input")}
            />
            {code && (
              <p style={{ color: `var(--primary-color)` }}>User not exist</p>
            )}
          </div>
          <input type="submit" className={cx("submit_btn")} value="Sign In" />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
