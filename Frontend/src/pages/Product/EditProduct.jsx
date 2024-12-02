import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const EditProduct = () => {
  const { id } = useParams();
  //console.log("Product ID:", id); 

  // use state
  const [product, setProduct] = useState({
    product_name: "",
    price: 0,
    description: "",
    image: "",
    category: "",
    numOfReviews: 0,
  });
  const navigate = useNavigate();

  // get the data by id
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/product/${id}`);
      setProduct(res.data.product);
      console.log("Fetched product:",res.data.product); 
    } catch (err) {
      console.error("Error fetching product data:", err.message);
    }
  };

  useEffect(() => {
    if(id){
        fetchProduct();
        console.log("Product state:", product); 
    }
    
  }, [id]);

  const handleChange = (e) => {
    const {name,value} = e.target;
    setProduct((prevState) => ({
        ...prevState,
        [name]:value,
    }))
  }

  // submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    // update the product
    try{
       const response = await axios.patch(`/api/product/${id}`, product);
       console.log("product updated successfully", response.data) 
        navigate("/admin")
    }
    catch (err) {
        console.error("Error updating product:", err.message);
        alert("Failed to update product.");
      }
  }
  return (
    <Container>
      <Row>
        <Col>
          <h3>Edit Product</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="product_name"
                value={product.product_name}
                onChange={handleChange}
                placeholder="Enter product name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Enter price"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                value={product.description}
                onChange={handleChange}
                placeholder="Enter description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={product.image}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={product.category}
                onChange={handleChange}
              >
                <option>select</option>
                <option value="men">men</option>
                <option value="women">women</option>
                <option value="kids">kids</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Review Count</Form.Label>
              <Form.Control
                type="number"
                name="numOfReviews"
                value={product.numOfReviews}
                onChange={handleChange}
                placeholder="Enter number of reviews"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProduct;
