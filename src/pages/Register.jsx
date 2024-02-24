import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
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

import { api } from "../utilities/api";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation()
  const [userType,setUserType]= useState(2)
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      type:"",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      if(userType){
        formik.setFieldValue('type',userType)
      }
      const { data } = await api.post("/api/register", values);
      if (!data?.status) {
        toast.error(data?.message || "Something went wrong");
        return;
      }
      toast.success(data?.message || "Registeration successful");
      let path = userType == 1? "/login-driver": "/"
      navigate(path);
    } catch (err) {
      console.log("error while registering user", err);
      toast.error("Something went wrong");
    }
  };
  const handleUserChange=()=>{
    if(pathname.includes("/register-driver")){
      navigate("/register-user")
      localStorage.setItem('userType',2)
      setUserType(2)
      formik.setFieldValue('type',2)
    }
    else{
      navigate("/register-driver")
      localStorage.setItem('userType',1)
      setUserType(1)
      formik.setFieldValue('type',1)
    }
  }


  useEffect(()=>{
    if(pathname.includes("/register-driver")){
      localStorage.removeItem('userID')
      localStorage.setItem("userType",1)
      formik.setFieldValue('type',1)
      setUserType(1)
    }
    else{
      localStorage.setItem("userType",2)
      localStorage.removeItem('userID')
      formik.setFieldValue('type',2)
      setUserType(2)
    }

  },[pathname])
  return (
    <div>
    <div className="detail-container">
      <Row className="m-0 p-0 justify-content-end h-100">
        <Col md={3} className=" form-container p-0">
          <div className="blur-effect"></div>
          <div>
           
          <Form onSubmit={formik.handleSubmit} className="m-4 form-details">
          <h6 className="mb-3 text-center">Welcome</h6>
          <h6 className="text-start mb-4 text-primary">Sign Up</h6>
            <FormGroup controlId="formFirstName">
              <Label htmlFor="firstName">Full Name</Label>
              <Input
                type="text"
                placeholder="Full Name"
                name="fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                required
              />
            </FormGroup>
            <FormGroup controlId="formEmail">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                required
              />
            </FormGroup>

            <FormGroup controlId="formPassword">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                required
              />
            </FormGroup>

            <Button  type="submit" block className="btn-submit">
              Sign Up
            </Button>
            <div className="my-4">
            <p className="text-primary"><span role="button" onClick={handleUserChange} className="text-primary"><b>Sign Up</b></span> as a {userType == 1 ? "user":"driver"}?</p>
            {/* <p className="text-primary">New? <span role="button" onClick={handleUserSignUp} className="text-primary"><b>SignUp</b></span></p> */}
          
           </div>
          </Form>
         </div>
         </Col>
         </Row>
         </div>
    </div>
  );
};

export default Signup;
