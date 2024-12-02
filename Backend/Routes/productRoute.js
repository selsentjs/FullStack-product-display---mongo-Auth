const express = require("express");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const router = express.Router();
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  sortProductsByPrice,
  sortProductsByProductName,
  filterByCategory,
} = require("../controllers/productController");

// get all the products by admin and user
router.get(
  "/",
  [authenticateUser, authorizePermissions("admin", "user")],
  getAllProducts
);
// sort by price
router.get(
  "/sort",
  [authenticateUser, authorizePermissions("admin", "user")],
  sortProductsByPrice
);

// filter by category - men,women,kids
router.get(
  "/filterByCategory",
  [authenticateUser, authorizePermissions("admin", "user")],
  filterByCategory
);

// sort by product name
router.get(
  "/sortByProductName",
  [authenticateUser, authorizePermissions("admin", "user")],
  sortProductsByProductName
);
// get single product by admin and user
router.get(
  "/:id",
  [authenticateUser, authorizePermissions("admin", "user")],
  getSingleProduct
);

// create product - // only admin can use these routes.
router.post(
  "/",
  [authenticateUser, authorizePermissions("admin")],
  createProduct
);

// update product - // only admin can use these routes.
router.patch(
  "/:id",
  [authenticateUser, authorizePermissions("admin")],
  updateProduct
);

// delete product - // only admin can use these routes.
router.delete(
  "/:id",
  [authenticateUser, authorizePermissions("admin")],
  deleteProduct
);

module.exports = router;

/*
sort - api:
===========
localhost:5000/api/product/sort?price=priceLowToHigh
localhost:5000/api/product/sort?price=priceHighToLow
localhost:5000/api/product/sortByProductName?product_name=productAToZ
localhost:5000/api/product/sortByProductName?product_name=productZToA

filter product by category:
==========================
localhost:5000/api/product/filterByCategory?category=men
localhost:5000/api/product/filterByCategory?category=men,women
localhost:5000/api/product/filterByCategory?category=kids
*/
