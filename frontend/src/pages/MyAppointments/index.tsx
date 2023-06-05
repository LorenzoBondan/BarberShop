
import { useCallback, useContext, useEffect, useState } from 'react';
import './styles.css';
import { AuthContext } from 'AuthContext';
import { getTokenData, isAuthenticated } from 'util/auth';
import { Appointment, FilterData, User } from 'types/types';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import AppointmentCard from './AppointmentCard';
import Filter from 'components/Filter';
import moment from 'moment';

type ControlComponentsData = {
  filterData: FilterData;
}

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
        // Trate o erro de requisição aqui
      }
    }, []);
 
     useEffect(() => {
         getUser();
     }, [getUser]);
 
     /**/

     const [appointmentData, setAppointmentData] = useState<Appointment[]>([]);

     const [filterData, setFilterData] = useState<FilterData>();

     const onFilterChange = (filter: FilterData) => {
      setFilterData(filter);
      getAppointmentsByDate();
    };

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
              setAppointmentData(response.data);
            })
            .catch(error => {
              console.log("erro: " + error);
            });
        }
      }
    }, [user?.id, filterData?.dates, convertFormatData]);

    useEffect(() => {
      getAppointmentsByDate();
    }, [getAppointmentsByDate]);


    return(
        <div className='my-appointments-container'>
            <h1>{user?.name}'s Appointments</h1>
            <div className='my-appointments-filter'>
                <h6>Select the date period</h6>
                <Filter onFilterChange={onFilterChange} />
            </div>
            <div className='row' style={{width:"100%"}}>
                {appointmentData?.map(appointment => (
                    <div className="col-sm-12 col-lg-4 col-xl-2 options-column" key={appointment.id}>
                        <AppointmentCard appointmentId={appointment.id} />
                    </div>
                ))}
            </div>

        </div>
    );
}

export default MyAppointments;