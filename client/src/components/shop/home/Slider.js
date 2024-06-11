import React, { Fragment, useEffect, useContext, useState } from "react";
import OrderSuccessMessage from "./OrderSuccessMessage";
import { HomeContext } from "./";
import { sliderImages } from "../../admin/dashboardAdmin/Action";
import { prevSlide, nextSlide } from "./Mixins";
import './slider.css'; // Adjust the path as necessary

const apiURL = process.env.REACT_APP_API_URL;

const Slider = (props) => {
  const { data, dispatch } = useContext(HomeContext);
  const [slide, setSlide] = useState(0);
  console.log("logging from shop data slider.js");
  console.log(data);

  useEffect(() => {
    sliderImages(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prevSlide) => (prevSlide + 1) % data.sliderImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [data.sliderImages.length]);

  return (
    <Fragment>
      <div className="slider-container">
        {data.sliderImages.length > 0 ? (
          <img
            className="slider-image"
            src={data.sliderImages[slide].slideImage} // Cloudinary URL directly
            alt="sliderImage"
          />
        ) : (
          ""
        )}

        {data?.sliderImages?.length > 0 ? (
          <div className="slider-nav">
            <button
              onClick={() => prevSlide(data.sliderImages.length, slide, setSlide)}
              className="slider-button"
            >
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => nextSlide(data.sliderImages.length, slide, setSlide)}
              className="slider-button"
            >
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        ) : null}
      </div>
      <div className="order-success">
        <OrderSuccessMessage />
      </div>
    </Fragment>
  );
};

export default Slider;
