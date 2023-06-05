
import { Appointment } from 'types/types';
import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

type Props = {
    appointmentId : number;
}

const AppointmentCard = ({appointmentId} : Props) => {

    const [appointment, setAppointment] = useState<Appointment>();

    const getAppointmentById = useCallback( () => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/appointments/${appointmentId}`
        }
        requestBackend(params) 
          .then(response => {
            setAppointment(response.data);
          })
      }, [appointmentId])

    useEffect(() => {
        getAppointmentById();
    }, [getAppointmentById]);

    return(
        <div className='appointment-card-container base-card'>
            <p>Barber: {appointment?.barber.name}</p>
            <p>Client: {appointment?.client.name}</p>
            <p>Date: {appointment?.dateTime.toString()}</p>
        </div>
    );
}

export default AppointmentCard;