import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, ButtonGroup, Card, CardBody, Col, Row } from "reactstrap";

import { getBookings } from "../utilities/functions";

const Profile = () => {
  const navigate = useNavigate()
  const [total,setTotal] = useState()
  const getBookingDetails = async() =>{
    let response = await getBookings();
  }
  useEffect(()=>{
    getBookingDetails()
  },[])

  return (
    <div className="container my-5">
      <Row className=" home-page">
       <Col md={12} className="banner-container g-2">
        <Card className="banner-img">
        </Card>
       </Col>
      <Col md={2} className="g-2">
  <Button block className="btn-submit" onClick={()=>navigate("/book")}>
    Book now
  </Button>
      </Col>
      <Col md={2} className="g-2">
      <Button block className="btn-submit">
    Previous Bookings
  </Button>
      </Col>
    
      </Row>
      <Row>
        <Col md={12} className="g-2 mt-5">
        <h5 className="text-primary">Your bookings</h5>
        </Col>
      <Col md={4} className="g-2">
        <Card className="bookings-card my-2">
          <CardBody className="d-flex align-items-center">
            <div>
            <h3 className="text-primary"> <b>
            Total Booking: </b> 22</h3>
            <h3 className="text-primary"> <b>
            Total Cancelled: </b> 2</h3>
            </div>
          </CardBody>

        </Card>
      </Col>
      <Col md={4} className="g-2">
        <Card className="bookings-card my-2">
          <CardBody className="d-flex align-items-center">
            <div>
            <h3 className="text-primary"> <b>
            Total Spent: </b> 22</h3>
            <h3 className="text-primary"> <b>
            Total Duration: </b> 2</h3>
            </div>
          </CardBody>

        </Card>
      </Col>
      </Row>
    </div>
  );
};
export default Profile;
