import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Appointment, User } from "types/types";
import { requestBackend } from "util/requests";
import Select from 'react-select';
import FlatPicker from 'react-flatpickr';
import "flatpickr/dist/themes/material_green.css";

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

        console.log("TEMPO CORRETO: " + correctTime(dateTimeDay, dateTimeHour));

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
            .catch(() => {
                //toast.error('Erro ao cadastrar o User.');
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
    
    

    return(
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row post-crud-inputs-container'>

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
                                        />    
                                    )}
                                />
                                {errors.barber && (
                                    <div className='invalid-feedback d-block'>Campo obrigatório</div>
                                )}
                        </div>

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
                                dateFormat: 'Y-m-d H:i',
                            }}
                            />
                        </div>

                        <div className='post-crud-buttons-container'>
                            <button 
                                className='btn btn-outline-danger post-crud-buttons'
                                onClick={handleCancel}
                                >
                                CANCEL
                            </button>

                            <button className='btn btn-primary text-white post-crud-buttons'>SAVE</button>
                        </div>
                    </div>
                </form>
        </div>
    );
}

export default Form;