import classNames from "classnames/bind";
import HeaderOnLargeScreen from "../components/header/Header";
import styles from "./DefaultLayout.module.scss";
import Footer from "../components/footer/Footer";

const cx = classNames.bind(styles);
interface Props {
  children: JSX.Element;
}
const DefaultLayout = ({ children }: Props) => {
  return (
    <div className={cx("wrapper")}>
      <HeaderOnLargeScreen />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
