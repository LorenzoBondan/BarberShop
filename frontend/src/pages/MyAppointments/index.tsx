
import { useCallback, useContext, useEffect, useState } from 'react';
import './styles.css';
import { AuthContext } from 'AuthContext';
import { getTokenData, isAuthenticated } from 'util/auth';
import { FilterData, User } from 'types/types';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import AppointmentCard from './AppointmentCard';
import Filter from 'components/Filter';
import moment from 'moment';

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

     const [filterData, setFilterData] = useState<FilterData>();

     const onFilterChange = (filter: FilterData) => {
      setFilterData(filter);
      getAppointmentsByDate();
    }

    const convertFormatData = useCallback((data: string | undefined): string | undefined => {
      if (data) {
        const dataMoment = moment(data, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (zz)');
        if (dataMoment.isValid()) {
          const dataFormat = dataMoment.format('YYYY-MM-DDTHH:mm:ss');
          return dataFormat;
        }
      }
      return undefined;
    }, []);

    const getAppointmentsByDate = useCallback(() => {
      if (user?.id && filterData?.dates) {
        console.log("entrou");
        const formattedDate1 = convertFormatData(filterData.dates[0]?.toString());
        const formattedDate2 = convertFormatData(filterData.dates[1]?.toString());
      
        if (formattedDate1 && formattedDate2) {
          const params: AxiosRequestConfig = {
            method: "GET",
            url: `/users/${user.id}/${formattedDate1}/${formattedDate2}`,
            withCredentials: true
          }
      
          requestBackend(params)
            .then(response => {
              setUser(response.data);
            })
            .catch(error => {
              console.log("erro: " + error);
            });
        }
      }
    }, [user?.id, filterData?.dates, convertFormatData]);


    return(
        <div className='my-appointments-container'>
            <h1>{user?.name}'s Appointments</h1>
            <div className='my-appointments-filter'>
                <Filter onFilterChange={onFilterChange} />
                <p style={{color:"black"}}>{filterData?.dates[0].toString()}</p>
                <p>{convertFormatData(filterData?.dates[0].toString())}</p>
                <p>{convertFormatData(filterData?.dates[1].toString())}</p>
            </div>
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