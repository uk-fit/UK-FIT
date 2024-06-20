import React, { Fragment, createContext, useReducer ,useState , useEffect} from "react";
import Layout from "../layout";
import Slider from "./Slider";
import ProductCategory from "./ProductCategory";
import { homeState, homeReducer } from "./HomeContext";
import SingleProduct from "./SingleProduct";
import TestimonialCarousel from "../partials/TestimonialCarousel";
import "./style.css"





export const HomeContext = createContext();

// const Popup = ({ onClose }) => {
//   const [isVisible, setIsVisible] = useState(true);

//   const handleClose = () => {
//     setIsVisible(false);
//     onClose();
//   };

//   return (
//     isVisible && (
//       <div className="popup-overlay">
//         <div className="popup-container">
//           <div >
//             <button className="close-button" onClick={handleClose}>
//               &times;
//             </button>
//           </div>
//           <div className="popup-body">
//             <img src="logo.png" alt="Logo" className="popup-logo" />
//             <h2>
//             Partner with us for Your Sports Apparel Needs 
//             </h2>
//             <br></br>
//             <h5>Enquire about our products and services by clicking the button below.</h5>
//           </div>
//           <div className="popup-footer">
//             <button className="popup-button1" onClick={handleClose}>
//               Close
//             </button>
//             <button
//               className="popup-button"
//               onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSfFARzEHg_Bt22r2TMirpA9TxsA8P3MoSRmqwPV94vVNnGiQQ/viewform?usp=sf_link", "_blank")}
//             >
//               Enquire Now
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   );
// }


// HomeComponent with Popup
const HomeComponent = () => {
  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup = () => {
    setShowPopup(false);
  };


  return (
    
    <Fragment>
      {/* {showPopup && <Popup onClose={handleClosePopup} />} */}
      <Slider />
      {/* Category, Search & Filter Section */}
      <section className="m-4 md:mx-8 md:my-6">
        <ProductCategory />
      </section>
      {/* Product Section */}
      <section className="m-4 md:mx-8 md:my-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <SingleProduct />
      </section>
      <section className="m-4 md:mx-8 md:my-6">
        <TestimonialCarousel/>
      </section>
    </Fragment>
    //  </div>
  );
};

const Home = (props) => {

  const [data, dispatch] = useReducer(homeReducer, homeState);
  return (
    <Fragment>
      <HomeContext.Provider value={{ data, dispatch }}>
        <Layout children={<HomeComponent />} />
      </HomeContext.Provider>
    </Fragment>
  );
};

export default Home;
