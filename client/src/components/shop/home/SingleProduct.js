import React, { Fragment, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { getAllProduct } from "../../admin/products/FetchApi";
import { HomeContext } from "./index";
import { isWishReq, unWishReq, isWish } from "./Mixins";

const apiURL = process.env.REACT_APP_API_URL;

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const SingleProduct = (props) => {
  const { data, dispatch } = useContext(HomeContext);
  const { products } = data;
  const history = useHistory();

  /* WhisList State */
  const [wList, setWlist] = useState(
    JSON.parse(localStorage.getItem("wishList"))
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      let responseData = await getAllProduct();
      setTimeout(() => {
        if (responseData && responseData.Products) {
          const shuffledProducts = shuffleArray(responseData.Products);
          dispatch({ type: "setProducts", payload: shuffledProducts });
          dispatch({ type: "loading", payload: false });
        }
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  if (data.loading) {
    return (
      <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <Fragment>
      {products && products.length > 0 ? (
        products.map((item, index) => {
          return (
            <Fragment key={index}>
              <div
                className="relative col-span-1 m-2 w-full"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "300px", // Set a uniform height for all image containers
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    backgroundColor: "#f9f9f9", // Optional background for smaller images
                  }}
                >
                  <img
                    onClick={(e) => history.push(`/products/${item._id}`)}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain", // Ensure images maintain aspect ratio
                      cursor: "pointer",
                    }}
                    src={item.pImages[0].url}
                    alt=""
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-gray-600 font-light truncate">
                    {item.pName}
                  </div>
                  
                </div>
                {/* Wishlist Logic */}
                {/* <div className="absolute top-0 right-0 mx-2 my-2 md:mx-4">
                  <svg
                    onClick={(e) => isWishReq(e, item._id, setWlist)}
                    className={`${
                      isWish(item._id, wList) && "hidden"
                    } w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700 transition-all duration-300 ease-in`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <svg
                    onClick={(e) => unWishReq(e, item._id, setWlist)}
                    className={`${
                      !isWish(item._id, wList) && "hidden"
                    } w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700 transition-all duration-300 ease-in`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div> */}
              </div>
            </Fragment>
          );
        })
      ) : (
        <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24 text-2xl">
          No product found
        </div>
      )}
    </Fragment>
  );
};

export default SingleProduct;
