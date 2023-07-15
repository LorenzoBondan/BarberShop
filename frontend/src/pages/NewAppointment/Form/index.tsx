import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Appointment, User } from "types/types";
import { requestBackend } from "util/requests";
import Select, { ActionMeta } from 'react-select';
import FlatPicker from 'react-flatpickr';
import './styles.css';
import { toast } from 'react-toastify';

type Props = {
  client: User;
}

const Form = ({client} : Props) => {
  
  const { handleSubmit, formState: { errors }, control } = useForm<Appointment>();
  const history = useHistory();
  const [selectBarbers, setSelectBarbers] = useState<User[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<User | null>(null);
  const [dateTimeDay, setDateTimeDay] = useState('');
  const [dateTimeHour, setDateTimeHour] = useState('');
  const [barberImage, setBarberImage] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    requestBackend({ url: '/users/barbers', withCredentials: true })
      .then(response => {
        setSelectBarbers(response.data.content);
      });
  }, []);

  const onSubmit = (formData: Appointment) => {

    formData.client = client;

    if (!selectedBarber) {
      setAlertMessage('Please choose a barber.');
      return;
    }

    formData.barber = selectedBarber;

    const correctTime = (dateTimeDay: string, dateTimeHour: string): string => {
      const day = dateTimeDay.substring(0, 11);
      const hour = dateTimeHour + ':00';

      const fullDayHour = day + hour;
      return fullDayHour;
    };

    formData.dateTime = new Date(correctTime(dateTimeDay, dateTimeHour));

    const params: AxiosRequestConfig = {
      method: 'POST',
      url: '/appointments',
      data: formData,
      withCredentials: true,
    };

    requestBackend(params)
      .then(response => {
        console.log('Success', response.data);
        history.push('/');
        toast.success("Appointment reserved with success!");
      })
      .catch(error => {
        if (error.response && error.response.status === 409) {
          setAlertMessage('This time slot is already booked. Please choose another one.');
        } else {
          setAlertMessage('An error occurred while processing the request.');
        }
      });
  };

  const handleCancel = () => {
    history.push('/');
  };

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

  const handleDateTimeChangeDay = (selectedDateTime: string | Date[]) => {
    if (Array.isArray(selectedDateTime)) {
      if (selectedDateTime.length > 0) {
        const selectedDate = selectedDateTime[0];
        setDateTimeDay(selectedDate.toISOString());
      } else {
        setDateTimeDay('');
      }
    } else {
      setDateTimeDay(selectedDateTime);
    }
  };

  const handleDateTimeChangeHour = (selectedDateTime: string | Date[]) => {
    if (Array.isArray(selectedDateTime)) {
      if (selectedDateTime.length > 0) {
        const selectedHour = selectedDateTime[0].toString().substring(16, 21);
        setDateTimeHour(selectedHour);
      } else {
        setDateTimeHour('');
      }
    } else {
      setDateTimeHour(selectedDateTime);
    }
  };

  const getBarberImage = useCallback(async (barberId: number | undefined) => {
    if (barberId) {
      try {
        const response: AxiosResponse<User> = await axios.get(`http://localhost:8080/users/${barberId}`);
        setBarberImage(response.data.imgUrl);
        setSelectedBarber(response.data);
      } catch (error) {
        console.error('Error when trying to load the barber image:', error);
      }
    } else {
      setBarberImage(null);
      setSelectedBarber(null);
    }
  }, []);

  const handleBarberSelect = useCallback(async (selectedOption: User | null, actionMeta: ActionMeta<User>) => {
    if (selectedOption) {
      setSelectedBarber(selectedOption);
      getBarberImage(selectedOption.id);
    } else {
      setSelectedBarber(null);
      setBarberImage(null);
    }
  }, [getBarberImage]);

  useEffect(() => {
    if (barberImage) {
      const img = new Image();
      img.src = barberImage;
      img.onload = () => {
        const barberImageElement = document.getElementById('barberImage') as HTMLImageElement;
        if (barberImageElement) {
          barberImageElement.src = barberImage;
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
                        <h3>Choose your favorite Barber</h3>
                        {barberImage && 
                            <img id="barberImage" alt="" />
                        }
                        <div className='margin-bottom-30 barber-select'>
                          <Controller
                            name="barber"
                            control={control}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={selectBarbers}
                                getOptionLabel={(option: User) => option.name}
                                getOptionValue={(option: User) => String(option.id)}
                                isSearchable
                                placeholder="Select a barber"
                                onChange={handleBarberSelect}
                                value={selectedBarber}
                              />
                            )}
                          />
                            <div className='invalid-feedback d-block'>{errors.barber?.message}</div>
                        </div>
                    </div>
                    <div className="new-appointment-time-container">
                      <div className="new-appointment-time-title"> 
                        <h3>Choose the best time for you</h3>
                      </div>
                      <div className="new-appointment-time-inputs">
                          <div className='margin-bottom-30'>
                              <label>Time</label>
                              <select value={dateTimeHour} onChange={(e) => handleDateTimeChangeHour(e.target.value)} className="base-input time-input">
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
                              className="base-input time-input"
                              />
                          </div>

                          {alertMessage && <p className="error-message">{alertMessage}</p>}
                        </div>
                    </div>
                </div>
                <div className='new-appointment-buttons-container'>
                        <button className='btn new-appointment-buttons btn-secondary' onClick={handleCancel}>
                            CANCEL
                        </button>
                        <button className="btn btn-primary text-white new-appointment-buttons" type="submit">
                          SAVE
                        </button>
                    </div>
                </form>
        </div>
    );
}

export default Form;