import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

const CheckboxWithFilter = ({ fetchData }) => {
  // Track selected categories
  const [selectedCategories, setSelectedCategories] = useState({
    men: false,
    women: false,
    kids: false,
  });

  // Handle category checkbox changes
  const handleCategoryChange = (category) => {
    setSelectedCategories((prevState) => {
      const updatedCategories = {
        ...prevState,
        [category]: !prevState[category],
      };
      return updatedCategories;
    });
  };

  // Fetch products whenever selectedCategories changes
  useEffect(() => {
    // Get all selected categories
    const selectedCategoryList = Object.keys(selectedCategories).filter(
      (key) => selectedCategories[key]
    );

    console.log("Selected Categories:", selectedCategoryList); // Log selected categories
    fetchData(selectedCategoryList); // Fetch products based on the selected categories
  }, [selectedCategories]);

  return (
    <div style={{ border: "1px solid black", padding: "2rem" }}>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Men"
          checked={selectedCategories.men}
          onChange={() => handleCategoryChange("men")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Women"
          checked={selectedCategories.women}
          onChange={() => handleCategoryChange("women")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Kids"
          checked={selectedCategories.kids}
          onChange={() => handleCategoryChange("kids")}
        />
      </Form.Group>
    </div>
  );
};

// Add prop types validation
CheckboxWithFilter.propTypes = {
  fetchData: PropTypes.func.isRequired, // Expecting fetchData to be a required function
};

export default CheckboxWithFilter;
