import { useFormik } from "formik";
import { Button, FormGroup, Input, Label } from "reactstrap";
import Bookings from "../components/Bookings"

const HomeDriver = () => {
  const formik = useFormik({
    initialValues: {
      location: "",
    },
    onSubmit: (values) => {
      // Search
    },
  });
  return (
    <div className="container my-5">
      <div className="current-location d-flex justify-content-center">
        <div className="w-50">
        <FormGroup controlId="formEmail">
          <Input
            type="text"
            placeholder="Current Location"
            name="location"
            className="w-100 form-control"
            value={formik.values.location}
            onChange={formik.handleChange}
            required
          />
        </FormGroup>
             <Button variant="primary" type="submit" block className="btn-submit">
               Search
             </Button>
        </div>
      </div>
      <div className="booking-list">
        <Bookings />
      </div>
    </div>
  );
};
export default HomeDriver;
