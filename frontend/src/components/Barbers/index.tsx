
import { useCallback, useEffect, useState } from 'react';
import './styles.css';
import { SpringPage, User } from 'types/types';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import BarberCard from './BarberCard';

const Barbers = () => {

    const [page, setPage] = useState<SpringPage<User>>();

    const getUsers = useCallback(() => {
      const params : AxiosRequestConfig = {
        method:"GET",
        url: "/users/barbers",
      }
    
      requestBackend(params) 
        .then(response => {
          setPage(response.data);
          window.scrollTo(0, 0);
        })
    }, [])
  
    useEffect(() => {
      getUsers();
    }, [getUsers]);

    return(
        <div className="barbers-container">
            <h1 className='barbers-title'><img src="https://em-content.zobj.net/thumbs/160/apple/354/barber-pole_1f488.png" alt="" />Meet our Barbers<img src="https://em-content.zobj.net/thumbs/160/apple/354/barber-pole_1f488.png" alt="" /></h1>
            <div className='barbers-row'>
                <div className='row'>
                    {page?.content
                        .sort((a,b) => a.name > b.name ? 1 : -1)
                        .map(barber => (
                            <div className="col-sm-6 col-lg-6 col-xl-4 barbers-column" key={barber.id}>
                                {barber && 
                                    <BarberCard barber={barber}/>
                                }
                            </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Barbers;