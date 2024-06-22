import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import './CategoryDropdown.css'; // Import the CSS file

const apiURL = process.env.REACT_APP_API_URL; // Replace with your actual API URL

const Headers = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
      // Add any other headers if needed
    }
  };
};

export const getAllCategory = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/category/all-category`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const CategoryDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const history = useHistory();
  const location = useLocation();

  const fetchCategories = async () => {
    try {
      const data = await getAllCategory();
      if (data && Array.isArray(data.Categories)) {
        setCategories(data.Categories);
      } else {
        console.error('Error: data is not an array', data);
        setCategories([]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleButtonClick = () => {
    if (!dropdownVisible) {
      fetchCategories();
    }
    setDropdownVisible(!dropdownVisible);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownVisible(false);
    }
  };

  const handleClick = (categoryId) => {
    // window.location.replace(`/products/category/${categoryId}`);
    history.push(`/products/category/${categoryId}`);
    setDropdownVisible(false); // Close the dropdown after selecting a category
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dropdownVisible]);

  // Close the dropdown when the URL changes
  useEffect(() => {
    setDropdownVisible(false);
  }, [location]);

  // Apply the zoom level on page load
  useEffect(() => {
    const zoomLevel = 0.67; // 67% zoom
    document.body.style.zoom = zoomLevel;
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button className="dropdown-button" onClick={handleButtonClick}>
        Shop
      </button>
      {dropdownVisible && (
        <ul className="dropdown-menu">
          {categories.map((category) => (
            <li key={category._id} onClick={() => handleClick(category._id)} className="dropdown-item">
              {category.cName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryDropdown;
