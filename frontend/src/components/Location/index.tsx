import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './styles.css';
import { MdLocationPin } from 'react-icons/md';
import icon from 'assets/images/map.png';

const Location = () => {

    const initialPosition = {
        lat: 25.7732153,
        lng: -80.1899214
    }

    const location = '200 SE 1st St Suite 102, Miami, FL 33131, United States';

    return(
        <div className="location-container">
            <h1><img src={icon} alt="" />How to get here?</h1>
            <span className='separator'></span>
            <div className='location-content-container'>
                <div className='location-adress-container'>
                    <h4><MdLocationPin/>Miami, Florida</h4>
                    <h5>200 SE 1st St Suite 102</h5>
                </div>
                <div className='location-map-container'>
                    <MapContainer center={initialPosition} zoom={15} scrollWheelZoom={true}>
                        <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={initialPosition}>
                        <Popup>
                            {location}
                        </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}

export default Location;