
import './styles.css';
import background from 'assets/images/background.png';
import logo from 'assets/images/logo.png';
import OptionsCard from 'components/OptionsCard';
import { FiCalendar } from 'react-icons/fi';
import { FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { hasAnyRoles } from 'util/auth';
import barberPole from 'assets/images/barber_pole.png';
import barberPoleBlack from 'assets/images/barber_pole_black.png';

const Banner = () => {

    const options = [
        {
            name : 'Hair',
            icon : 'https://cdn-icons-png.flaticon.com/128/42/42055.png'
        },
        {
            name: 'Beard',
            icon: 'https://cdn-icons-png.flaticon.com/128/4397/4397805.png'
        },
        {
            name: 'Eyebrow',
            icon: 'https://cdn-icons-png.flaticon.com/128/8973/8973608.png'
        },

    ]

    return(
        <div className='banner-container' style={{backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto",
        }}>
            <div className='banner-content-container'>
                <div className='banner-image-container'>
                    <img src={logo} alt="" />
                    <div className='row'>
                        {options.map((option,index) => (
                            <div className="col-sm-12 col-lg-4 col-xl-4 options-column" key={index}>
                                <OptionsCard name={option.name} imgUrl={option.icon} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='banner-info-container'>
                    <span>Beer, Friends and a good Hair Cut</span>
                    <h1 className='banner-info-title'><img src={barberPoleBlack} alt="" /><div className='barber-word'>Barber</div><div className='shop-word'>Shop</div><img src={barberPole} alt="" /></h1>
                    <p>The best barber shop in the city</p>
                    <div className='banner-info-button-container'>
                        {hasAnyRoles(['ROLE_CLIENT']) ? (
                            <Link to="/newappointment">
                                <button className='btn btn-primary banner-button'>
                                    Make your reservation
                                </button>
                            </Link>
                        ) : (
                            <Link to="/auth">
                                <button className='btn btn-primary banner-button'>
                                    <FiCalendar/>  Make your reservation
                                </button>
                            </Link>
                        )}
                    </div>

                    <div className='banner-calendar-and-hours'>
                        <p><FiCalendar/> Monday - Saturday</p>
                        <p><FiClock/> 9:00 AM - 7:00 PM</p>
                    </div>
                </div>
            </div>



        </div>
    );
}

export default Banner;