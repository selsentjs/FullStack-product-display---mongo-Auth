import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [review, setReview] = useState(0);

  const navigate = useNavigate(); // To redirect after successful product post

  const postProduct = async (e) => {
    e.preventDefault();
  
    // Get the JWT token from localStorage (or wherever it's stored)
    const token = localStorage.getItem("token");
  
    // If token is not found, redirect to login (or show a message)
    if (!token) {
      alert("You must be logged in to add a product.");
      return;
    }
  
   
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id; 
  
    // Product data to send to backend
    const productData = {
      product_name: productName,
      price: price,
      description: description,
      image: image,
      category: category,
      numOfReviews: review,
      user: userId, // Add the user field with the decoded user ID
    };
  
    try {
      const response = await axios.post("/api/product", productData, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the JWT token
        },
      });
      console.log("Product added successfully:", response.data);
  
      // Optionally, reset form fields
      setProductName("");
      setPrice("");
      setDescription("");
      setImage("");
      setCategory("");
      setReview("");
  
      // Redirect to the products page or admin dashboard after successful post
      navigate("/admin"); // Adjust the redirect path as necessary
    } catch (error) {
      console.error("Error posting product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={postProduct}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="image url"
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label>Select category</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>select</option>
                <option value="men">men</option>
                <option value="women">women</option>
                <option value="kids">kids</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Review</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter review"
                name="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProduct;
