import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useAsyncError, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";

import BgImage from "../assets/images/TaxiApp1.png"
import { api } from "../utilities/api";

const Login = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation()
  const [userType,setUserType] = useState(2) //1-driver 2-user
  const formik = useFormik({
    initialValues: {
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
      const { data } = await api.post("/user/login", values);
    let user_type=  localStorage.getItem('userType')
      if (data?.token) {
        if(user_type == 1){
          navigate("/home-driver");
        }
        else{

          navigate("/home");
        }
        localStorage.setItem("userID", data?.userID);
      } else {
        toast.error(data?.message || "Unauthorised");
      }
    } catch (err) {
      toast.error("Error while login");
      console.log("Error while login", err);
    }
  };
  const handleUserChange = ()=>{
    if(pathname.includes("/login-driver")){
      navigate("/")
      localStorage.setItem('userType',2)
      localStorage.removeItem('userID')

      setUserType(2)
    }
    else{
      navigate("/login-driver")
      localStorage.setItem('userType',1)
      localStorage.removeItem('userID')
      setUserType(1)
    }
  }
  const handleUserSignUp = () =>{
    if(pathname.includes("/login-driver")){
      navigate("/register-driver")
      localStorage.setItem('userType',1)
      localStorage.removeItem('userID')

    }
    else{
      navigate("/register-user")
      localStorage.setItem('userType',2)
      localStorage.removeItem('userID')

    }
  }
  useEffect(()=>{
    if(pathname.includes("/login-driver")){
      localStorage.setItem("userType",1)
      setUserType(1)
    formik.setFieldValue('type',1)

    }
    else{
      localStorage.setItem("userType",2)
      setUserType(2)
    formik.setFieldValue('type',2)

    }

  },[pathname])
  return (
    <div>
      <div className="detail-container">
        <Row className="m-0 p-0 justify-content-end h-100">
          <Col md={3} className=" form-container p-0">
            <div className="blur-effect"></div>
            <div>
           <Form onSubmit={formik.handleSubmit} className="m-4 form-details"  >
            <h6 className="mb-3 text-center">Welcome</h6>
           <h6 className="text-start mb-4 text-primary font-medium">Sign In</h6>
             <FormGroup controlId="formEmail">
               <Label>Email</Label>
               <Input
                 type="email"
                 placeholder="Email"
                 name="email"
                 className="w-100"
                 value={formik.values.email}
                 onChange={formik.handleChange}
                 required
               />
             </FormGroup>

             <FormGroup controlId="formPassword">
               <Label>Password</Label>
               <Input
                 type="password"
                 placeholder="Password"
                 name="password"
                 value={formik.values.password}
                 onChange={formik.handleChange}
                 required
               />
             </FormGroup>

             <Button variant="primary" type="submit" block className="btn-submit">
               Login
             </Button>
             <div className="my-4">
            <p className="text-primary"><span role="button" onClick={handleUserChange} className="text-primary"><b>Sign In</b></span> as a {userType == 1 ? "user":"driver"}?</p>
            <p className="text-primary">New? <span role="button" onClick={handleUserSignUp} className="text-primary"><b>SignUp</b></span></p>
          
           </div>
           </Form>

           </div>
           </Col>
           </Row>
   
           </div>
      </div>
  );
};

export default Login;
