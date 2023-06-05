
import { Appointment } from 'types/types';
import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import moment from 'moment';
import { FiCalendar } from 'react-icons/fi';
import { FiClock } from 'react-icons/fi';

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

    const convertFormatDataDays = useCallback((data: string | undefined): string | undefined => {
      if (data) {
        const dataMoment = moment(data, 'YYYY-MM-DDTHH:mm:ss');
        if (dataMoment.isValid()) {
          const dataFormat = dataMoment.format('dddd, MMMM DD YYYY');
          return dataFormat;
        }
      }
      return undefined;
    }, []);

    const convertFormatDataHours = useCallback((data: string | undefined): string | undefined => {
      if (data) {
        const dataMoment = moment(data, 'YYYY-MM-DDTHH:mm:ss');
        if (dataMoment.isValid()) {
          const dataFormat = dataMoment.format('HH:mm');
          return dataFormat;
        }
      }
      return undefined;
    }, []);


    return(
        <div className='appointment-card-container'>
          <div className='appointment-card-title'>
              <h3>Appointment #{appointment?.id}</h3>
          </div>
          <div className='appointment-card-barber-client'> 
            <div className='appointment-card-barber'>
                <span>Barber</span>
                <img src={appointment?.barber.imgUrl} alt="" />
                <p>{appointment?.barber.name}</p>
            </div>
            <div className='appointment-card-barber'>
                <span>Client</span>
                <img src={appointment?.client.imgUrl} alt="" />
                <p>{appointment?.client.name}</p>
            </div>
          </div>
          <div className='appointment-card-time'>
            <p><FiCalendar/> {convertFormatDataDays(appointment?.dateTime.toString())}</p>
            <p><FiClock/> {convertFormatDataHours(appointment?.dateTime.toString())}</p>
          </div>
        </div>
    );
}

export default AppointmentCard;