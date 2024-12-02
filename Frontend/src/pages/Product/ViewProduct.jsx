import axios from "axios"
import { useEffect, useState } from "react"
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ViewProduct = () => {
  const { id } = useParams();
  const [data,setData] = useState([])

  const fetchData = async() => {
    try {
      const res = await axios.get(`/api/product/${id}`);
      setData(res.data.product);
    } catch (err) {
      console.error("Error fetching data:", err.message);
    }
  }

  useEffect(() => {
    if (id) {
      fetchData();  // Fetch product data when the component mounts
    }
  }, [id]);

  return (
    <Container className="my-4">
    {data ? (
      <Row>
        {/* Left side: Product Image */}
        <Col xs={12} sm={12} md={6}>
          <Card.Img
            variant="top"
            style={{ width: "100%", height: "400px", objectFit: "cover" }}
            src={data.image} // The product image
            alt={data.product_name}
          />
        </Col>

        {/* Right side: Product Details */}
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Card.Body>
              <Card.Title>{data.product_name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Category: {data.category}
              </Card.Subtitle>
              <Card.Text>
                <strong>Description:</strong> {data.description}
              </Card.Text>
              <Card.Text>
                <strong>Price:</strong> ${data.price}
              </Card.Text>
              <Card.Text>
                <strong>Reviews:</strong> {data.numOfReviews}
              </Card.Text>
              <Button variant="primary" onClick={() => alert('Add to Cart')}>
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    ) : (
      <p>Loading product data...</p>
    )}
  </Container>
  )
}

export default ViewProduct