import React from "react";
import img1 from "./arch_bad.jpg";
import img2 from "./brothers.jpg";
import img3 from "./checkmate.jpg";
import img4 from "./leanwolves.jpg";
import img5 from "./trans.jpg";

const TestimonialCarousel = () => {
  const styles = {
    body: {
      fontFamily: '"Open Sans", sans-serif',
      color: "#000",
    },
    h2: {
      color: "#000",
      textAlign: "center",
      textTransform: "uppercase",
      fontFamily: '"Roboto", sans-serif',
      fontWeight: "bold",
      position: "relative",
      margin: "25px 0 50px",
    },
    h2After: {
      content: '""',
      width: "100px",
      position: "absolute",
      margin: "0 auto",
      height: "3px",
      background: "#ffdc12",
      left: "0",
      right: "0",
      bottom: "-10px",
    },
    carousel: {
      width: "70%",
      margin: "0 auto",
      paddingBottom: "50px",
    },
    carouselItem: {
      color: "#000",
      fontSize: "14px",
      textAlign: "center",
      overflow: "hidden",
      minHeight: "340px",
    },
    carouselItemA: {
      color: "#eb7245",
    },
    imgBox: {
      width: "145px",
      height: "145px",
      margin: "0 auto",
      borderRadius: "50%",
    },
    imgBoxImg: {
      width: "100%",
      height: "100%",
      display: "block",
      borderRadius: "50%",
    },
    testimonial: {
      padding: "30px 0 10px",
      fontWeight: 400,
      fontSize: "1.2em", // Adjust font size
      lineHeight: "1.6", // Adjust line height for better readability
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", // Font family
      color: "#333", // Text color
      textAlign: "center", // Center the text
      backgroundColor: "#f9f9f9", // Light background color for contrast
      borderRadius: "5px", // Rounded corners
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
      margin: "20px 0", // Margin to separate from other content
    },
    
    overview: {
      textAlign: "center",
      paddingBottom: "5px",
    },
    overviewB: {
      color: "#000",
      fontSize: "20px",
      textTransform: "uppercase",
      display: "block",
      paddingBottom: "5px",
    },
    starRating: {
      fontSize: "18px",
      color: "#ffdc12",
    },
    carouselControlPrev: {
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      background: "#999",
      textShadow: "none",
      top: "4px",
    },
    carouselControlNext: {
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      background: "#999",
      textShadow: "none",
      top: "4px",
    },
    carouselControlPrevI: {
      fontSize: "20px",
      marginRight: "2px",
    },
    carouselControlNextI: {
      fontSize: "20px",
      marginRight: "-2px",
    },
    carouselIndicators: {
      bottom: "15px",
    },
    carouselIndicatorsLi: {
      width: "11px",
      height: "11px",
      margin: "1px 5px",
      borderRadius: "50%",
      background: "#e2e2e2",
      border: "none",
    },
    carouselIndicatorsLiActive: {
      // background: "#888",
    },
  };


  return (
    <div style={{ marginTop: "40px" }}>
      <h2 style={styles.h2}>
        What customers has to say about us !!
        <style>
          {`:after {
              // content: "";
              // width: 100px;
              // position: absolute;
              margin: 0 auto;
              // height: 3px;
              // background: #ffdc12;
              // left: 0;
              // right: 0;
              // bottom: -10px;
            }
          `}
            h2:
        </style>
      </h2>
      <div id="myCarousel" className="carousel slide" data-ride="carousel" style={styles.carousel}>
        {/* Carousel indicators */}
        <ol className="carousel-indicators" style={styles.carouselIndicators}>
          <li data-target="#myCarousel" data-slide-to="0" className="active" style={styles.carouselIndicatorsLiActive}></li>
          <li data-target="#myCarousel" data-slide-to="1" style={styles.carouselIndicatorsLi}></li>
          <li data-target="#myCarousel" data-slide-to="2" style={styles.carouselIndicatorsLi}></li>
        </ol>
        {/* Wrapper for carousel items */}
        <div className="carousel-inner">
          <div className="carousel-item active" style={styles.carouselItem}>
            <div className="img-box" style={styles.imgBox}>
              <img
                src={img2}
                alt=""
                style={styles.imgBoxImg}
              />
            </div>
            <p className="testimonial" style={styles.testimonial}>
            We recently purchased UK FIT shorts and T-shirts for our badminton academy, and we're very happy with the purchase. 
            The Shorts and T-shirts are well-made and comfortable, and they look great on the court. We would definitely 
            recommend UK FIT to other sports academies.
            </p>
            <p className="overview" style={styles.overview}>
              <b style={styles.overviewB}>Brothers Badminton Academy</b>
            </p>
            {/* <div className="star-rating" style={styles.starRating}>
              <ul className="list-inline">
                <li className="list-inline-item"><i className="fa fa-star"></i></li>
                <li className="list-inline-item"><i className="fa fa-star"></i></li>
                <li className="list-inline-item"><i className="fa fa-star"></i></li>
                <li className="list-inline-item"><i className="fa fa-star"></i></li>
                <li className="list-inline-item"><i className="fa fa-star-o"></i></li>
              </ul>
            </div> */}
          </div>
          <div className="carousel-item" style={styles.carouselItem}>
            <div className="img-box" style={styles.imgBox}>
              <img
                src={img5}
                alt=""
                style={styles.imgBoxImg}
              />
            </div>
            <p className="testimonial" style={styles.testimonial}>
            We partnered with UK FIT to create custom T-shirts and shorts for our PU college sports teams. 
            The design process was collaborative, resulting in high-quality, affordable apparel that looks great and 
            performs well on the field. The breathable material keeps our athletes cool and comfortable, boosting team spirit and pride.
            
            </p>
            <p className="overview" style={styles.overview}>
              <b style={styles.overviewB}>Transcend Ground of Institution</b>
            </p>
            {/* <div className="star-rating" style={styles.starRating}>
              <ul className="list-inline">
                <li className="list-inline-item"><i className="fa fa-star"></i></li>
                <li className="list-inline-item"><i className="fa fa-star"></i></li>
                <li className="list-inline-item"><i className="fa fa-star"></i></li>
                <li className="list-inline-item"><i className="fa fa-star"></i></li>
                <li className="list-inline-item"><i className="fa fa-star-o"></i></li>
              </ul>
            </div> */}
          </div>
          <div className="carousel-item" style={styles.carouselItem}>
            <div className="img-box" style={styles.imgBox}>
              <img
                src={img1}
                alt=""
                style={styles.imgBoxImg}
              />
            </div>
            <p className="testimonial" style={styles.testimonial}>
            As a badminton academy, it's important for our students to have a kit that allow for freedom of movement. 
            UK FIT shorts and T-shirts are exactly what we need. They're lightweight and breathable, and they don't restrict 
            movement in any way. Our students love them.
            </p>
            <p className="overview" style={styles.overview}>
              <b style={styles.overviewB}>Arch Badminton Academy</b> 
            </p>
            {/* <div className="star-rating" style={styles.starRating}>
              <ul className="list-inline">
                <li className="list-inline-item"><i className="fa fa-star"></i></li>
                <li className="list-inline-item"><i className="fa fa-star"></i></li>
                <li className="list-inline-item"><i className="fa fa-star"></i></li>
                <li className="list-inline-item"><i className="fa fa-star"></i></li>
                <li className="list-inline-item"><i className="fa fa-star-half-o"></i></li>
              </ul>
            </div> */}
          </div>
          <div className="carousel-item" style={styles.carouselItem}>
            <div className="img-box" style={styles.imgBox}>
              <img
                src={img3}
                alt=""
                style={styles.imgBoxImg}
              />
            </div>
            <p className="testimonial" style={styles.testimonial}>
             Happy to Collaborate and release our Checkmate Summer camp outfit By UK FIT - We are impressed, 
            the tracksuits are well made ,they also look great + foldable feature of Tracksuit is splendid.
            Thank you UK FIT.
            </p>
            <p className="overview" style={styles.overview}>
              <b style={styles.overviewB}>Check mate table tennis Academy</b> 
            </p>
            {/* <div className="star-rating" style={styles.starRating}>
              <ul className="list-inline">
                <li className="list-inline-item"><i className="fa fa-star"></i></li>
                <li className="list-inline-item"><i className="fa fa-star"></i></li>
                <li className="list-inline-item"><i className="fa fa-star"></i></li>
                <li className="list-inline-item"><i className="fa fa-star"></i></li>
                <li className="list-inline-item"><i className="fa fa-star-half-o"></i></li>
              </ul>
            </div> */}
          </div>
          <div className="carousel-item" style={styles.carouselItem}>
            <div className="img-box" style={styles.imgBox}>
              <img
                src={img4}
                alt=""
                style={styles.imgBoxImg}
              />
            </div>
            <p className="testimonial" style={styles.testimonial}>
            <i>Tracksuits and T-shirts are perfect. They're Comfortable Stylish and durable. It's Just Amazing!</i>
            </p>
            <p className="overview" style={styles.overview}>
              <b style={styles.overviewB}>Lean Wolves CrossFit Gym</b> 
            </p>
            {/* <div className="star-rating" style={styles.starRating}>
              <ul className="list-inline">
                <li className="list-inline-item"><i className="fa fa-star"></i></li>
                <li className="list-inline-item"><i className="fa fa-star"></i></li>
                <li className="list-inline-item"><i className="fa fa-star"></i></li>
                <li className="list-inline-item"><i className="fa fa-star"></i></li>
                <li className="list-inline-item"><i className="fa fa-star-half-o"></i></li>
              </ul>
            </div> */}
          </div>
        </div>
        {/* Carousel controls */}
        <a className="carousel-control-prev" href="#myCarousel" data-slide="prev" style={styles.carouselControlPrev}>
          <i className="fa fa-angle-left" style={styles.carouselControlPrevI}></i>
        </a>
        <a className="carousel-control-next" href="#myCarousel" data-slide="next" style={styles.carouselControlNext}>
          <i className="fa fa-angle-right" style={styles.carouselControlNextI}></i>
        </a>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
