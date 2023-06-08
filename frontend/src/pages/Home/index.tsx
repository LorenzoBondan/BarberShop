
import Banner from 'components/Banner';
import './styles.css';
import Barbers from 'components/Barbers';
import Location from 'components/Location';
import AboutUs from 'components/AboutUs';

const Home = () => {
    return(
        <div className='home-container'>
            <div className='home-container-banner'>
                <Banner/>
            </div>
            <div className='home-container-about-us'>
                <AboutUs/>
            </div>
            <div className='home-container-barbers'>
                <Barbers/>
            </div>
            <div className='home-container-location'>
                <Location/>
            </div>
        </div>
    );
}

export default Home;