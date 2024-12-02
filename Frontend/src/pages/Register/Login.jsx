import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // For storing errors

  // form validation
  const formValidation = () => {
    const formErrors = {};

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      formErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      formErrors.email = "Invalid email format";
    }

    if (!password) {
      formErrors.password = "Password is required";
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const formErrors = formValidation();
    console.log("Form Errors:", formErrors);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Send login data to backend
    axios
      .post("/api/auth/Login", { email, password })
      .then((response) => {
        console.log("Login response:", response); // Log the entire response to see its structure

        const { token, user } = response.data; // Assuming the response contains 'token' and 'user' object

 // in backend user inside all the registered user details are there
  /*
        "user": 
            {
             "name": "Susi",
             "email": "susi@gmail.com",
              "password": "$2a$10$VV.axk.gLYWDb4W8b6HOqebqn5NTXhwEB837AQvQQCkZg3XrKqVJO",
              "gender": "female",
               "role": "user",
               "_id": "674b135991fe79b64cd8b237",
                "createdAt": "2024-11-30T13:30:01.741Z",
                "updatedAt": "2024-11-30T13:30:01.741Z",
                "__v": 0
          },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzRiMTM1OTkxZmU3OWI2NGNkOGIyMzciLCJuYW1lIjoiU3VzaSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzMyOTczNDAxLCJleHAiOjE3MzMxNDYyMDF9.E5juBbbzCFjw1g9aspLX67-Dm_MtkY8FFVrAeq3gWl0"
      }
 */
        if (!user.role) {
          toast.error("Role not found in response.");
          return;
        }

        // Store token and role in localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("role", user.role); // Save user role

        // Log role for debugging
        console.log("User role:", user.role);

        // Navigate based on role
        if (user.role === "admin") {
          navigate("/admin"); // Navigate to admin page
        } else if (user.role === "user") {
          navigate("/user"); // Navigate to user page
        } else {
          toast.error("Invalid role, please contact support");
        }

        toast.success("Login successful");
      })
      .catch((error) => {
        console.error("Login error", error);
        toast.error("Login failed. Please try again.");
      });
  };

  return (
    <>
      <h3 style={{ textAlign: "center", padding: "10px", margin: "10px" }}>
        Login
      </h3>
      <Container>
        <Row>
          {/* left side */}
          <Col xs={12} sm={12} md={6}>
            <Image
              className="register-image"
              src="https://img.freepik.com/free-vector/business-people-writing-agreement-shaking-hands-tiny-man-with-magnifying-glass-researching-checklist-document-clipboard-paper-flat-vector-illustration-survey-paperwork-management-concept_74855-21676.jpg?t=st=1732896611~exp=1732900211~hmac=a786f99297ccce48a1adc72adedf9db9f7f413606bdb06dbed02ed3548f773c1&w=740"
              rounded
            />
          </Col>
          {/* right side */}
          <Col
            xs={12}
            sm={12}
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <Form className="w-75" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <Form.Text className="text-danger">{errors.email}</Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <Form.Text className="text-danger">
                    {errors.password}
                  </Form.Text>
                )}
                <NavLink to="/register">
                  Not registered yet. <b>Register</b>
                </NavLink>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
