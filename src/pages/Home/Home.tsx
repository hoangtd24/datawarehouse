import classNames from "classnames/bind";
import { A11y, Controller, Navigation, Pagination } from "swiper/modules";
import { images } from "../../assets/images";
import FeatureItem from "../../components/FeatureItem/FeatureItem";
import styles from "./Home.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const cx = classNames.bind(styles);

const Home = () => {
  return (
    <div>
      <div className={cx("section")}>
        <div className={cx("section__first")}>
          <h2>Save your data storage here.</h2>
        </div>
        <div className={cx("section__second")}>
          <div className={cx("section__second-left")}>
            <p>
              Data Warehouse is a data storage area that has been tested for
              security, so you can store your data here safely but not be afraid
              of being stolen by others.
            </p>
            <button className={cx("more")}>Learn more</button>
          </div>
          <div className={cx("section__second-right")}>
            <img src={images.section} alt="section_img" />
          </div>
        </div>
      </div>
      <div className={cx("features")}>
        <h2 className={cx("features__title")}>Features</h2>
        <p className={cx("features__desc")}>
          Some of the features and advantages that we provide for those of you
          who store data in this Data Warehouse.
        </p>
        <div className={cx("features__content")}>
          <FeatureItem
            image={images.feature1}
            title="Search Data"
            desc="Don’t worry if your data is very large, the Data Warehoue provides a search engine, which is useful for making it easier to find data effectively saving time."
            y={0}
          />
          <FeatureItem
            image={images.feature3}
            title="24 Hours Access"
            desc="Access is given 24 hours a full morning to night and
                    meet again in the morning, giving you comfort when
                    you need data when urgent."
            y={36}
          />
          <FeatureItem
            image={images.feature2}
            title="Print Out"
            desc="Print out service gives you convenience if someday
                    you need print data, just edit it all and just print it."
            y={0}
          />
          <FeatureItem
            image={images.feature4}
            title="Security Code"
            desc="Data Security is one of our best facilities. Allows for your files
                to be safer. The file can be secured with a code or password that 
                you created, so only you can open the file."
            y={0}
          />
        </div>
      </div>
      <div className={cx("slider")}>
        <h3 className={cx("slider__header")}>Testimonials</h3>
        <div className={cx("slider__content")}>
          <Swiper
            // install Swiper modules
            modules={[Pagination, A11y, Navigation, Controller]}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".next",
              prevEl: ".prev",
            }}
          >
            <SwiperSlide>
              <div className={cx("swiper__item")}>
                <div className={cx("swiper__item-img")}>
                  <img src={images.avatar} alt="user_avatar" />
                </div>
                <div className={cx("swiper__item-info")}>
                  <h4 className={cx("swiper__username")}>John Fang</h4>
                  <p className={cx("swiper__useremail")}>wordfaang.com</p>
                </div>
                <div className={cx("swiper__userdesc")}>
                  <p>
                    Suspendisse ultrices at diam lectus nullam. Nisl, sagittis
                    viverra enim erat tortor ultricies massa turpis. Arcu
                    pulvinar aenean nam laoreet nulla.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={cx("swiper__item")}>
                <div className={cx("swiper__item-img")}>
                  <img src={images.avatar} alt="user_avatar" />
                </div>
                <div className={cx("swiper__item-info")}>
                  <h4 className={cx("swiper__username")}>John Fang</h4>
                  <p className={cx("swiper__useremail")}>wordfaang.com</p>
                </div>
                <div className={cx("swiper__userdesc")}>
                  <p>
                    Suspendisse ultrices at diam lectus nullam. Nisl, sagittis
                    viverra enim erat tortor ultricies massa turpis. Arcu
                    pulvinar aenean nam laoreet nulla.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={cx("swiper__item")}>
                <div className={cx("swiper__item-img")}>
                  <img src={images.avatar} alt="user_avatar" />
                </div>
                <div className={cx("swiper__item-info")}>
                  <h4 className={cx("swiper__username")}>John Fang</h4>
                  <p className={cx("swiper__useremail")}>wordfaang.com</p>
                </div>
                <div className={cx("swiper__userdesc")}>
                  <p>
                    Suspendisse ultrices at diam lectus nullam. Nisl, sagittis
                    viverra enim erat tortor ultricies massa turpis. Arcu
                    pulvinar aenean nam laoreet nulla.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={cx("swiper__item")}>
                <div className={cx("swiper__item-img")}>
                  <img src={images.avatar} alt="user_avatar" />
                </div>
                <div className={cx("swiper__item-info")}>
                  <h4 className={cx("swiper__username")}>John Fang</h4>
                  <p className={cx("swiper__useremail")}>wordfaang.com</p>
                </div>
                <div className={cx("swiper__userdesc")}>
                  <p>
                    Suspendisse ultrices at diam lectus nullam. Nisl, sagittis
                    viverra enim erat tortor ultricies massa turpis. Arcu
                    pulvinar aenean nam laoreet nulla.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="prev">
            <img src={images.leftBtn} />
          </div>
          <div className="next">
            <img src={images.rightBtn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
