import { AuthContext } from "AuthContext";
import { AxiosRequestConfig } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { User } from "types/types";
import { getTokenData, isAuthenticated } from "util/auth";
import { requestBackend } from "util/requests";
import './styles.css';
import Form from "./Form";

const NewAppointment = () => {

         // getting the email
         const { authContextData, setAuthContextData } = useContext(AuthContext);

         useEffect(() => {
             if(isAuthenticated()){
               setAuthContextData({
                 authenticated: true,
                 tokenData: getTokenData()
               })
             }
             else{
               setAuthContextData({
                 authenticated: false,
               })
             }
         }, [setAuthContextData]);
     
         let email: string;
     
         authContextData.authenticated && (
             authContextData.tokenData?.user_name && (
             email = authContextData.tokenData?.user_name)) 
         
         // then, getting the user Id by email
         
         const [user, setUser] = useState<User>();
     
         const getUser = useCallback(async () => {
          try {
            const params: AxiosRequestConfig = {
              method: "GET",
              url: `/users/email/${email}`,
              withCredentials: true
            };
        
            const response = await requestBackend(params);
            setUser(response.data);
          } catch (error) {
            console.log("error: " + error);
          }
        }, []);
     
         useEffect(() => {
             getUser();
         }, [getUser]);
     
         /**/
         
    return(
        <div className="new-appointment-container">
            <h1>New Appointment</h1>
                {user && 
                    <Form client={user}/>
                }
        </div>
    );
}

export default NewAppointment;