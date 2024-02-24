import { useEffect, useState } from "react";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import { getUserDetails } from "../utilities/functions";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [userInfo,setUserInfo] = useState([])
  const getUser = async() =>{
   let res= await getUserDetails()
    if(!res.status){
      toast.error(res.message)
      return;
    }
    setUserInfo(res?.userData[0])

  }
  useEffect(()=>{
    getUser()
  },[])
  return (
    <div className="container w-50">
     <Card className="bookings-card my-2">
     <CardBody className="d-flex align-items-center">
       <div>
      <h2 className=" mb-5">User Details</h2>
       <h3 className="text-primary"> <b>
       Name :</b> {userInfo?.fullname}</h3>
       <h3 className="text-primary"> <b>
       Email: </b>{userInfo?.fullname}</h3>
       <h3 className="text-primary"> <b>
       User ID: </b>{userInfo?._id}</h3>
       </div>
     </CardBody>

   </Card>
   </div>
  );
};
export default UserProfile;
