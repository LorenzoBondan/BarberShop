import { User } from "types/types";
import './styles.css';

type Props = {
    barber: User;
}

const BarberCard = ({barber} : Props) => {
    return(
        <div className="barber-card-container base-card">
            <div className="barber-card-first-container">
                <h3>{barber.name}</h3>
            </div>
            <div className="barber-card-second-container">
                <img src={barber.imgUrl} alt="" />
            </div>
            <div className="barber-card-third-container">
                <h3>Barber</h3>
            </div>
        </div>
    );
}

export default BarberCard;