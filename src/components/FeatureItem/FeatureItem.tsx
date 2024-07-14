import classNames from "classnames/bind";
import styles from "./FeatureItem.module.scss";
import { images } from "../../assets/images";

const cx = classNames.bind(styles);
interface FeturesItemProps {
  image: string;
  title: string;
  desc: string;
  y: number;
}
const FeatureItem = ({ image, title, desc, y }: FeturesItemProps) => {
  return (
    <div
      className={cx("features__item")}
      style={{
        transform: `translateY(${y}px)`,
      }}
    >
      <img src={image} />
      <div
        className={cx("features__item-info")}
        style={{ transform: `${y > 0 ? `translateY(-150px)` : null}` }}
      >
        <h3>{title}</h3>
        <p>{desc}</p>
        <button>
          Learn more
          <img src={images.right} alt="right_btn" className={cx("right_img")} />
        </button>
      </div>
    </div>
  );
};

export default FeatureItem;
