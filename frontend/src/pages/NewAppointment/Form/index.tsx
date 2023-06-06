import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Appointment, User } from "types/types";
import { requestBackend } from "util/requests";
import Select, { ActionMeta } from 'react-select';
import FlatPicker from 'react-flatpickr';
import "flatpickr/dist/themes/material_green.css";

import './styles.css';

type Props = {
    client: User;
}

const Form = ({client} : Props) => {

    const { handleSubmit, formState: {errors}, control } = useForm<Appointment>();

    const history = useHistory();

    const [selectBarbers, setSelectBarbers] = useState<User[]>();

    useEffect(() => {
        requestBackend({url: '/users/barbers', withCredentials: true})
            .then(response => {
                setSelectBarbers(response.data.content)
        })
    }, []);

    const onSubmit = (formData : Appointment) => {

        formData.client = client;

        const correctTime = (dateTimeDay: string, dateTimeHour: string): string => {
            const day = dateTimeDay.substring(0, 11);
            const hour = dateTimeHour + ":00";

            const fullDayHour = day + hour;
            return fullDayHour;
          };

        formData.dateTime = new Date(correctTime(dateTimeDay, dateTimeHour));

        const params : AxiosRequestConfig = {
            method: "POST",
            url : "/appointments",
            data: formData,
            withCredentials: true
        };

        requestBackend(params)
            .then(response => {
                console.log('Sucesso', response.data);
                history.push("/");
        })
    };

    const handleCancel = () => {
        history.push("/")
    }

    const timeOptions = [
        '09:00', '09:30',
        '10:00', '10:30',
        '11:00', '11:30',
        '13:30',
        '14:00', '14:30',
        '15:00', '15:30',
        '16:00', '16:30',
        '17:00', '17:30',
        '18:00', '18:30',
        '19:00'
      ];

      const [dateTimeDay, setDateTimeDay] = useState('');

      const [dateTimeHour, setDateTimeHour] = useState('');

      const handleDateTimeChangeDay = (selectedDateTime: string | Date[]) => {
        if (Array.isArray(selectedDateTime)) {
          // É um array de datas (vem do FlatPicker)
          if (selectedDateTime.length > 0) {
            const selectedDate = selectedDateTime[0];
            setDateTimeDay(selectedDate.toISOString());
          } else {
            setDateTimeDay('');
          }
        } else {
          // É uma string (vem do select)
          setDateTimeDay(selectedDateTime);
        }
      };

      const handleDateTimeChangeHour = (selectedDateTime: string | Date[]) => {
        if (Array.isArray(selectedDateTime)) {
          // É um array de datas (vem do FlatPicker)
          if (selectedDateTime.length > 0) {
            const selectedDate = selectedDateTime[0];
            setDateTimeDay(selectedDate.toISOString());
          } else {
            setDateTimeDay('');
          }
        } else {
          // É uma string (vem do select)
          setDateTimeHour(selectedDateTime);
        }
      };

      /**/

      const [barberImage, setBarberImage] = useState<User>();

      const getBarberImage = useCallback( (barberId : number | undefined) => {
        console.log("barberId: " + barberId);
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/${barberId}`
        }
        requestBackend(params) 
          .then(response => {
            setBarberImage(response.data);
          })
      }, [])

    useEffect(() => {
      if (barberImage) {
        const img = new Image();
        img.src = barberImage.imgUrl;
        img.onload = () => {
          const barberImageElement = document.getElementById('barberImage') as HTMLImageElement;
          if (barberImageElement) {
            barberImageElement.src = barberImage.imgUrl;
          }
        };
        img.onerror = () => {
          console.error('Error when trying to load the barber image');
        };
      }
    }, [barberImage]);
    
    return(
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='new-appointment-inputs-container'>

                    <div className="new-appointment-barber-container">
                        {barberImage && 
                            <img id="barberImage" alt="" />
                        }
                        <div className='margin-bottom-30'>
                            <label htmlFor="" style={{color:"white"}}>Barber</label> 
                                <Controller 
                                    name = 'barber'
                                    rules = {{required: true}}
                                    control = {control}
                                    render = {( {field} ) => (
                                        <Select 
                                            {...field}
                                            options={selectBarbers}
                                            classNamePrefix="users-crud-select"
                                            placeholder="Barber"
                                            getOptionLabel={(user: User) => user.name}
                                            getOptionValue={(user: User) => user.id.toString()}
                                            onChange={(selectedOption: User | null, actionMeta: ActionMeta<User>) => {
                                              if (selectedOption && actionMeta.action === 'select-option') {
                                                getBarberImage(selectedOption.id);
                                              }
                                            }}
                                        />    
                                    )}
                                />
                                {errors.barber && (
                                    <div className='invalid-feedback d-block'>Campo obrigatório</div>
                                )}
                        </div>
                    </div>

                    <div className="new-appointment-time-container">
                        <div className='margin-bottom-30'>
                            <label>Time</label>
                            <select value={dateTimeHour} onChange={(e) => handleDateTimeChangeHour(e.target.value)}>
                            <option value="">Select one time</option>
                            {timeOptions.map((time, index) => (
                                <option key={index} value={time}>
                                    {time}
                                </option>
                            ))}
                            </select>
                        </div>

                        <div className='margin-bottom-30'>
                            <label>Date</label>
                            <FlatPicker
                            value={dateTimeDay}
                            onChange={(selectedDateTime: Date[]) => handleDateTimeChangeDay(selectedDateTime)}
                            options={{
                                enableTime: true,
                                dateFormat: 'Y-m-d',
                            }}
                            />
                        </div>
                    </div>
                </div>

                <div className='new-appointment-buttons-container'>
                        <button 
                            className='btn btn-outline-danger new-appointment-buttons'
                            onClick={handleCancel}
                            >
                            CANCEL
                        </button>

                        <button className='btn btn-primary text-white new-appointment-buttons'>SAVE</button>
                    </div>
                </form>
        </div>
    );
}

export default Form;