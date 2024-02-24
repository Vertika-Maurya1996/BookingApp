import moment from "moment";
import { useEffect, useState } from "react";
import { MdDelete, MdDownload } from "react-icons/md";
import { Button, Table } from "reactstrap";

import { api } from "../utilities/api";
import VerificationModal from "./VerificationModal";
import { toast } from "react-toastify";
import { getBookings } from "../utilities/functions";

const UserFiles = () => {
  const [bookingData, setBookingData] = useState([]);
  const [modalOpen,setModalOpen] = useState(false)
  const [bookingID,setBookingID] = useState(false)


  const getBookingDetails = async () => {
    let { data } = await getBookings();
    if (!data) {
      return;
    } else setBookingData(data);
  };

  useEffect(() => {
    getBookingDetails();
  }, []);

const handleConfirm = (id)=>{
  setModalOpen(true)
  setBookingID(id)
}
const handleClose = ()=>{
  setModalOpen(false)
  getBookingDetails()
}
  return (
    <>
      <div className="container ul-table mt-3">
        <p className="text-primary">Total Booking: <b>{bookingData?.length}</b></p>
        <Table hover striped>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>S.no.</th>
              <th style={{ width: "30%" }}>Origin</th>
              <th style={{ width: "20%" }}>Destination</th>
              <th style={{ width: "20%" }}>Pickup Date</th>
              <th style={{ width: "30%" }}>Pickup Time</th>
              <th style={{ width: "30%" }}>Amount($)</th>
              <th style={{ width: "50%" }}>Created At</th>
              <th style={{ width: "20%" }}>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookingData.length &&
              bookingData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.origin || "-"}</td>
                  <td>{item?.destination || "-"}</td>
                  <td>{item?.pickupDate || "-"}</td>
                  <td>{item?.pickupTime || "-"}</td>
                  <td>{item?.price || "-"}</td>
                  <td style={{minWidth:"150px"}}>{moment(item?.createdAt).format("YYYY-MM-DD HH:mm")|| "-"}</td>
                  <td><Button block className="btn-submit" disabled={item?.price ? true:false} onClick={()=>handleConfirm(item._id)}>Confirm</Button></td>
                  <td><Button block color="danger" disabled={!item?.price ? true:false} onClick={()=>handleConfirm(item._id)}>Negotiate</Button></td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
              {modalOpen && <VerificationModal isOpen={modalOpen} handleClose={handleClose} bookingID={bookingID}/>}
    </>
  );
};

export default UserFiles;
