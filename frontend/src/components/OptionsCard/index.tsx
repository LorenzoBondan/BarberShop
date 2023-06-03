
import './styles.css';

type Props = {
    name: string;
    imgUrl: any;
}

const OptionsCard = ({name, imgUrl} : Props) => {
    return(
        <div className="options-card-container base-card">
            <img src={imgUrl} alt="" />
            <h4>{name}</h4>
        </div>
    );
}

export default OptionsCard;