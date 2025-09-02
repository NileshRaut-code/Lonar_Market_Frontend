import axios from "axios"
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export const loadAd=(SetAdData)=>{
   axiosInstance.get("/api/v1/users/Load_Ads").then(res=>
   {SetAdData(res.data)
   }
   ).catch(err=>{

   })
}