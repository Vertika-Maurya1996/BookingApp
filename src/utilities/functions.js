import {api} from "./api"

export const getUserDetails = async()=>{
    let userID = localStorage.getItem('userID')

    try{
        let {data} = await api.post(`/api/getUserDetails`,{userID})
        return data
    }
    catch(error){
        console.log("error")
    }
}


export const confirmBooking = async(values)=>{
    let userID = localStorage.getItem('userID')

    try{
        let {data} = await api.post("/api/confirmBooking",{...values,userID})
        return data
    }
    catch(error){
        console.log("error")
    }
}
export const getBookings = async()=>{
    let userID = localStorage.getItem('userID')

    try{
        let {data} = await api.get(`/api/getBooking/${userID}`)
        return data
    }
    catch(error){
        console.log("error")
    }
}
export const priceBooking = async(bookingData) =>{
    let {price,bookingID} = bookingData;
    try{
        let {data} = await api.post(`/api/price-booking`,bookingData)
        return data
    }
    catch(error){
        console.log(error)
    }
}