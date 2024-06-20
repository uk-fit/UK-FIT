import React, { Fragment, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { HomeContext } from "./index";
import { getAllCategory } from "../../admin/categories/FetchApi";
import "./style.css"; // Ensure this import is present to use the styles

const apiURL = process.env.REACT_APP_API_URL;

const CategoryList = () => {
  const history = useHistory();
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let responseData = await getAllCategory();
      if (responseData && responseData.Categories) {
        setCategories(responseData.Categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-4">
      <hr />
      <div className="py-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 category-grid">
        {categories && categories.length > 0 ? (
          categories.map((item, index) => {
            return (
              <Fragment key={index}>
                <div
                  onClick={() => history.push(`/products/category/${item._id}`)}
                  className="col-span-1 m-2 flex flex-col items-center justify-center space-y-2 cursor-pointer category-container"
                >
                  <img src={item.cImage} alt="pic" className="category-image" />
                  <div className="font-medium">{item.cName}</div>
                </div>
              </Fragment>
            );
          })
        ) : (
          <div className="text-xl text-center my-4">No Category</div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
