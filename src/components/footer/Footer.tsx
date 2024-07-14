import classNames from "classnames/bind";
import { images } from "../../assets/images";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cx("footer")}>
      <div className={cx("footer_content")}>
        <div className={cx("footer__top")}>
          <div className={cx("footer__item1")}>
            <div className={cx("logo")}>
              <img src={images.logo} alt="logo" />
              <h3>DataWarehouse</h3>
            </div>
            <div className={cx("address")}>
              <p>Warehouse Society, 234</p>
              <p> Bahagia Ave Street PRBW 29281</p>
            </div>
            <div className={cx("contact")}>
              <p>info@warehouse.project</p>
              <p>1-232-3434 (Main)</p>
            </div>
          </div>
          <div className={cx("footer__item2")}>
            <p className={cx("footer__header")}>About</p>
            <ul className={cx("footer__list")}>
              <li>
                <Link to={"/"}>Profile</Link>
              </li>
              <li>
                <Link to={"/"}>Features</Link>
              </li>
              <li>
                <Link to={"/"}>Careers</Link>
              </li>
              <li>
                <Link to={"/"}>DW News</Link>
              </li>
            </ul>
          </div>
          <div className={cx("footer__item3")}>
            <p className={cx("footer__header")}>Help</p>
            <ul className={cx("footer__list")}>
              <li>
                <Link to={"/"}>Support</Link>
              </li>
              <li>
                <Link to={"/"}>Sign Up</Link>
              </li>
              <li>
                <Link to={"/"}>Guide</Link>
              </li>
              <li>
                <Link to={"/"}>Reports</Link>
              </li>
              <li>
                <Link to={"/"}>Q&A</Link>
              </li>
            </ul>
          </div>
          <div className={cx("footer__item4")}>
            <p className={cx("footer__header")}>Social Media</p>
            <div className={cx("social")}>
              <Link to={"/"}>
                <img src={images.social} alt="social_icon" />
              </Link>
              <Link to={"/"}>
                <img src={images.social} alt="social_icon" />
              </Link>
              <Link to={"/"}>
                <img src={images.social} alt="social_icon" />
              </Link>
            </div>
          </div>
        </div>
        <div className={cx("footer__bottom")}>
          <div className={cx("regs")}>
            <p>© Datawarehouse™, 2020. All rights reserved. </p>
            <p>Company Registration Number: 21479524.</p>
          </div>
          <button className={cx("chat-btn")}>
            <img src={images.chat} alt="chat_icon" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
