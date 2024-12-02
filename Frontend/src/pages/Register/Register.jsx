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

const Register = () => {
  // useState
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({}); // For storing errors

  const navigate = useNavigate();

  // form validation
  const formValidation = () => {
    const formErrors = {};

    if (!name) {
      formErrors.name = "Name is required";
    }

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

    if (password !== confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match"; // Validate confirmPassword
    }

    if (!gender) {
      formErrors.gender = "Gender is required";
    }

    if (!role) {
      formErrors.role = "Role is required";
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const formErrors = formValidation();
    console.log("Form Errors:", formErrors); // Log errors

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Send registration data to backend
    axios
      .post("/api/auth/Register", {
        name,
        email,
        password,
        confirmPassword,
        gender,
        role,
      })
      .then((response) => {
        console.log("Registration successful", response);
        toast.success("Registration successful");
        navigate("/login"); // Redirect to login page after successful registration
      })
      .catch((error) => {
        console.error("Registration error", error);
        toast.error("Registration failed. Please try again.");
      });
  };

  return (
    <>
      <h3 style={{ textAlign: "center", padding: "5px", margin: "5px" }}>
        Register
      </h3>
      <Container>
        <Row>
          {/* Left side */}
          <Col xs={12} sm={12} md={6}>
            <Image
              className="register-image"
              src="https://img.freepik.com/free-vector/business-people-writing-agreement-shaking-hands-tiny-man-with-magnifying-glass-researching-checklist-document-clipboard-paper-flat-vector-illustration-survey-paperwork-management-concept_74855-21676.jpg?t=st=1732896611~exp=1732900211~hmac=a786f99297ccce48a1adc72adedf9db9f7f413606bdb06dbed02ed3548f773c1&w=740"
              rounded
            />
          </Col>
          {/* Right side */}
          <Col xs={12} sm={12} md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <Form.Text className="text-danger">{errors.name}</Form.Text>
                )}
              </Form.Group>

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
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                  <Form.Text className="text-danger">
                    {errors.confirmPassword}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group
                className="mb-3 d-flex flex-column"
                controlId="formBasicRadio"
              >
                <Form.Label>Gender</Form.Label>
                <div className="d-flex">
                  <Form.Check
                    type="radio"
                    label="Male"
                    name="gender" // Same name attribute groups the radio buttons together
                    id="male" // Unique id for each radio button
                    value="male"
                    checked={gender === "male"} // Check if this is the selected value
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="Female"
                    name="gender" // Same name attribute groups the radio buttons together
                    id="female" // Unique id for each radio button
                    className="ms-3"
                    value="female"
                    checked={gender === "female"} // Check if this is the selected value
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
                {errors.gender && (
                  <Form.Text className="text-danger">{errors.gender}</Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicSelect">
                <Form.Label>Select your role</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option>Select any one</option>
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </Form.Select>
                {errors.role && (
                  <Form.Text className="text-danger">{errors.role}</Form.Text>
                )}
                <NavLink to="/login">
                  Already have an account <b>login</b> here
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

export default Register;
