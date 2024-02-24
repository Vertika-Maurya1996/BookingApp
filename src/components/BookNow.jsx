import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { confirmBooking } from "../utilities/functions";
import Back from "../assets/images/Back.png";

const BookNow = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      origin:"",
      destination:"",
      pickup_date: "",
      pickup_time: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    let response = await confirmBooking(values);
    if (!response.status) {
      toast.error(response.message);

      return;
    } else toast.success(response.message);
    navigate("/home");
  };

  return (
    <div className="booking-section">
      <div className="position-absolute">
        <img src={Back} alt="back" role="button" onClick={() => navigate(-1)} />
      </div>
      <div className="container w-50">
        <Row className="m-0 p-0 justify-content-center h-100">
          <Col md={12} className=" p-0 w-50 text-center">
            <p className="d-inline text-primary font-large">
              <b>Book Now</b>
            </p>
            <Form
              onSubmit={formik.handleSubmit}
              className="form-details mx-auto"
            >
              <h6 className="text-start mb-4 text-primary font-medium"></h6>
              <FormGroup controlId="origin">
                <Input
                  type="text"
                  placeholder="Origin"
                  name="origin"
                  className="w-100"
                  onChange={formik.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup controlId="destination">
                <Input
                  type="text"
                  placeholder="Destination"
                  name="destination"
                  className="w-100"
                  onChange={formik.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup controlId="pickupDate">
                <Input
                  type="date"
                  placeholder="Pickup Date"
                  name="pickup_date"
                  className="w-100"
                  onChange={formik.handleChange}
                  required
                />
              </FormGroup>

              <FormGroup controlId="pickupTime">
                <Input
                  type="text"
                  placeholder="Pick up time"
                  name="pickup_time"
                  onChange={formik.handleChange}
                  required
                />
              </FormGroup>

              <Button
                variant="primary"
                type="submit"
                block
                className="btn-submit w-50"
              >
                Book now
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default BookNow;
