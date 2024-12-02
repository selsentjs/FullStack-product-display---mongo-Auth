import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Search from "../../components/Search";
import axios from "axios";
import { useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent";
import CheckboxWithFilter from "../../components/CheckboxWithFilter";

const User = () => {
  // store all the products
  const [data, setData] = useState([]);

  // Store filtered products based on category
  const [filteredData, setFilteredData] = useState([]);
  const [sortOption, setSortOption] = useState(""); // State to store the selected sort option

  // search
  const [search, setSearch] = useState("")

  const fetchData = async (categories = [], sort = "") => {
    let url = "/api/product";
    if (categories.length > 0) {
      url = `/api/product/filterByCategory?category=${categories.join(",")}&t=${new Date().getTime()}`;
    }

    // Handle sorting by price

    if (sort) {
      url = `/api/product/sort?price=${sort}&t=${new Date().getTime()}`;
    }
    try {
      const res = await axios.get(url);
      // console.log("API Response:", res.data);
      setData(res.data.product);
      setFilteredData(res.data.product); // Initially display all products
    } catch (err) {
      console.error("Error fetching data:", err.message);
    }
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortOption(selectedSort); // Update the sort option state
    let sortQuery = "";

    // Set the sort query for price sorting
    if (selectedSort === "priceLowToHigh") {
      sortQuery = "priceLowToHigh";
    } else if (selectedSort === "priceHighToLow") {
      sortQuery = "priceHighToLow";
    }

    // Fetch data based on selected sort option
    fetchData([], sortQuery, selectedSort);
    console.log("selectedSort:", selectedSort);
  };

  // Initial fetch (when component mounts)
  useEffect(() => {
    fetchData([], sortOption); // Fetch with the selected sort option
  }, [sortOption]);

  return (
    <div>
      <NavbarComponent />
      <Container>
        <Row>
          {/* Left side (Search by category) */}
          <Col xs={12} sm={12} md={2} style={{ marginTop: "50px" }}>
            <h6>Search by category</h6>
            {/* checkbox with women,men and kids to filter */}
            <CheckboxWithFilter fetchData={fetchData} />
          </Col>

          {/* Right side (Search bar, select menu, and card below) */}
          <Col xs={12} sm={12} md={10}>
            <Row>
              {/* Right column - Search bar and Select menu */}
              <Col
                xs={12}
                sm={12}
                md={10}
                className="d-flex flex-column justify-content-start align-items-end"
              >
                <div className="d-flex justify-content-end mb-3">
                  {/* search component */}
                  <Search data={data} setFilteredData={setFilteredData} search={search} setSearch={setSearch}/>
                  <Form.Select
                    aria-label="Default select example"
                    className="mb-3 m-4"
                    value={sortOption}
                    onChange={handleSortChange}
                  >
                    <option>Sort by: Featured</option>
                    <option value="priceLowToHigh">Price: Low to High</option>
                    <option value="priceHighToLow">Price: High to Low</option>
                  </Form.Select>
                </div>
              </Col>
            </Row>

            {/* Card below search bar and select menu */}
            {filteredData?.length > 0 ? (
              <Row>
                {filteredData?.map((item) => {
                  return (
                    <Col key={item.id} xs={12} sm={6} md={4} className="mb-4">
                      <Card style={{ width: "18rem" }}>
                        <Card.Img
                          variant="top"
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                          }}
                          src={item.image}
                        />
                        <Card.Body>
                          <Card.Title>{item.product_name}</Card.Title>
                          <Card.Text>$ {item.price}</Card.Text>
                          <div className="d-flex justify-content-center align-items-center">
                            <Button variant="primary">Add To Cart</Button>
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

export default User;
