
import Banner from 'components/Banner';
import './styles.css';
import Barbers from 'components/Barbers';

const Home = () => {
    return(
        <div className='home-container'>
            <div className='home-container-banner'>
                <Banner/>
            </div>
            <div className='home-container-barbers'>
                <Barbers/>
            </div>
            <div className='home-container-location'>
                How to get here?
            </div>
        </div>
    );
}

export default Home;