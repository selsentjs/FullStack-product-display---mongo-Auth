const Product = require("../Models/Product");

// get all the products
const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find({});

    res.status(200).json({ product });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "server error", error: err.message });
  }
};

// get single product
const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "please provide id" });
  }
  try {
    const product = await Product.findOne({ _id: id });
    res.status(200).json({ product });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "server error", error: err.message });
  }
};

// create product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(200).json({ msg: "product inserted", product });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "server error", error: err.message });
  }
};

// update product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ msg: "please provide id" });
  }
  try {
    const product = await Product.findOneAndUpdate({ _id: id }, req.body);
    res.status(200).json({ msg: "product updated successfully", product });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "server error", error: err.message });
  }
};

// delete product

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "please provide id" });
  }
  try {
    const product = await Product.findOneAndDelete({ _id: id });
    res.status(200).json({ msg: "product deleted successfully", product });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "server error", error: err.message });
  }
};

// sort the product by price

const sortProductsByPrice = async (req, res) => {
   console.log("Sorting by price with query:", req.query);
  const { price } = req.query;

  let sortOption = {};

  switch (price) {
    case "priceLowToHigh":
      sortOption = { price: 1 }; // Ascending order
      break;
    case "priceHighToLow":
      sortOption = { price: -1 }; // Descending order
      break;
    default:
      sortOption = { price: 1 }; // Default to priceLowToHigh if no valid price parameter is provided
      break;
  }

  try {
    // Fetch the products and apply sorting
    const product = await Product.find({}).sort(sortOption);

    // If no products are found
    if (product.length === 0) {
      return res.status(404).json({ msg: "No products found." });
    }

    // Return the sorted products
    res.status(200).json({ product });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// sort the product by product_name

const sortProductsByProductName = async (req, res) => {
  const { product_name } = req.query;

  let sortProduct = {};

  switch (product_name) {
    case "productAToZ":
      sortProduct = { product_name: 1 };
      break;
    case "productZToA":
      sortProduct = { product_name: -1 };
      break;
    default:
      sortProduct = { product_name: 1 };
      break;
  }
  try {
    const product = await Product.find({})
      .collation({ locale: "en", strength: 2 })
      .sort(sortProduct);
    // If no products are found
    if (product.length === 0) {
      return res.status(404).json({ msg: "No products found." });
    }

    // Return the sorted products
    res.status(200).json({ product });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// filter by category

const filterByCategory = async (req, res) => {
  const { category } = req.query;
  // Check if categories are passed as a comma-separated string
  const categories = category ? category.split(",") : [];

  // If no category is selected, return all products
  if (categories.length === 0) {
    try {
      const product = await Product.find();
      return res.status(200).json({ product});
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ msg: "Server error", error: err.message });
    }
  }

  try {
    const product = await Product.find({ category: { $in: categories } });
    // If no products are found
    if (product.length === 0) {
      return res.status(404).json({ msg: "No products found." });
    }

    // Return the sorted products
    res.status(200).json({ product });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  sortProductsByPrice,
  sortProductsByProductName,
  filterByCategory,
};
