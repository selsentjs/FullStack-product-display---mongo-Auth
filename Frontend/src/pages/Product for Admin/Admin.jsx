import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent";
import { NavLink } from "react-router-dom";

const Admin = () => {
  // store all the products
  const [data, setData] = useState([]);

  // get all the products
  const fetchData = async () => {
    let url = "/api/product";

    try {
      const res = await axios.get(url);
      setData(res.data.product);
    } catch (err) {
      console.error("Error fetching data:", err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/product/${id}`);
      fetchData(); // Refresh the data after deleting
    } catch (err) {
      console.error("Error deleting product:", err.message);
    }
  };

  return (
    <div>
      <NavbarComponent />
      <NavLink to="/add">
        <Button className="m-4" variant="primary">
          Add New Product
        </Button>
      </NavLink>
      <Container className="m-4">
        <Row>
          <Col xs={12} sm={12} md={10}>
            {data?.length > 0 ? (
              <Row>
                {data?.map((item) => {
                  return (
                    <Col key={item.id} xs={12} sm={6} md={4} className="mb-4">
                      <Card style={{ width: "18rem" }}>
                        <NavLink to={`/view/${item._id}`}>
                          <Card.Img
                            variant="top"
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                            }}
                            src={item.image}
                          />
                        </NavLink>
                        <Card.Body>
                          <Card.Title>{item.product_name}</Card.Title>
                          <Card.Text>$ {item.price}</Card.Text>
                          <div className="d-flex justify-content-center align-items-center">
                            <NavLink to={`/edit-product/${item._id}`}>
                              <Button variant="primary">Edit</Button>
                            </NavLink>
                            <NavLink>
                              <Button
                                variant="primary"
                                className="ms-4"
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </Button>
                            </NavLink>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            ) : (
              <p>No Data Available</p>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Admin;
