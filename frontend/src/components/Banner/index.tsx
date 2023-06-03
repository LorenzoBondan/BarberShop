
import './styles.css';
import background from 'assets/images/background.png';
import logo from 'assets/images/logo.png';
import OptionsCard from 'components/OptionsCard';

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
            <div className='banner-content-container base-card'>
                <div className='banner-image-container'>
                    <img src={logo} alt="" />
                </div>
                <div className='banner-info-container'>
                    <span>Beer, Friends and a good Hair Cut</span>
                    <h1 className='banner-info-title'><img src="https://em-content.zobj.net/thumbs/160/apple/354/barber-pole_1f488.png" alt="" /><div className='barber-word'>Barber</div><div className='shop-word'>Shop</div><img src="https://em-content.zobj.net/thumbs/160/apple/354/barber-pole_1f488.png" alt="" /></h1>
                    <p>The best barber shop in the city</p>
                    <button className='btn btn-primary'>
                        Make your reservation
                    </button>
                </div>
            </div>

            <div className='row'>
                {options.map((option,index) => (
                    <div className="col-sm-12 col-lg-4 col-xl-4 options-column" key={index}>
                        <OptionsCard name={option.name} imgUrl={option.icon} />
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Banner;