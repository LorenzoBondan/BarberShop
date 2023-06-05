
import { Appointment } from 'types/types';
import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import moment from 'moment';

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

    const convertFormatData = useCallback((data: string | undefined): string | undefined => {
      if (data) {
        const dataMoment = moment(data, 'YYYY-MM-DDTHH:mm:ss');
        if (dataMoment.isValid()) {
          const dataFormat = dataMoment.format('dddd, MMMM DD YYYY HH:mm');
          return dataFormat;
        }
      }
      return undefined;
    }, []);

    return(
        <div className='appointment-card-container base-card'>
            <p>Barber: {appointment?.barber.name}</p>
            <p>Client: {appointment?.client.name}</p>
            <p>Date: {convertFormatData(appointment?.dateTime.toString())}</p>
        </div>
    );
}

export default AppointmentCard;