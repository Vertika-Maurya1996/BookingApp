import Blob from "blob";
import React, { useState } from "react";
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { api } from "../utilities/api";
import { toast } from "react-toastify";
import { priceBooking } from "../utilities/functions";

const VerificationModal = ({ isOpen = "", handleClose, bookingID = "" }) => {
  const [price, setPrice] = useState("");
const handleChange = (e) =>{
  if(e.target.value != ""){
    setPrice(e.target.value)
  }
  else{
    setPrice("")
  }

}
const handleConfirm = async()=>{
  if(!price){
    toast.error("No price entered")
    return;
  }
let res = await priceBooking({price,bookingID})
if(!res.status)
{
  toast.error(res.message);
}
else{
  toast.success(res.message);
  
}
handleClose();
}

  return (
    <div>
      <Modal isOpen={isOpen} toggle={handleClose}>
        <ModalHeader toggle={handleClose}>Confirm Booking Amount-{bookingID} </ModalHeader>
        <ModalBody>
          <Label>Price</Label>
          <Input type="number" value={price} id="price" onChange={handleChange} />
        </ModalBody>
        <ModalFooter>
          <Button className="btn-submit" onClick={handleConfirm}>
            Confirm
          </Button>{" "}
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default VerificationModal;
