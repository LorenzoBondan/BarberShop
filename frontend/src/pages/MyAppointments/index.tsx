
import { useCallback, useContext, useEffect, useState } from 'react';
import './styles.css';
import { AuthContext } from 'AuthContext';
import { getTokenData, isAuthenticated } from 'util/auth';
import { User } from 'types/types';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import AppointmentCard from './AppointmentCard';

const MyAppointments = () => {

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
 
     const getUser = useCallback(() => {
         const params : AxiosRequestConfig = {
           method:"GET",
           url: `/users/email/${email}`,
           withCredentials:true
         }
         requestBackend(params) 
           .then(response => {
             setUser(response.data);
           })
     }, [])
 
     useEffect(() => {
         getUser();
     }, [getUser]);
 
     /**/

    return(
        <div className='my-appointments-container'>
            <h1>{user?.name}'s Appointments</h1>
            <div className='row' style={{width:"100%"}}>
                {user?.barberAppointmentsId?.map(appointment => (
                    <div className="col-sm-12 col-lg-4 col-xl-6 options-column" key={appointment}>
                        <AppointmentCard appointmentId={appointment} />
                    </div>
                ))}
            </div>

        </div>
    );
}

export default MyAppointments;