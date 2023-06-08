
import Table from './Table';
import './styles.css';
import icon from 'assets/images/razor.png';

const PriceTable = () => {
    return(
        <div className='prices-table-container'>
            <div className='prices-table-title'>
                <img src={icon} alt="" />
                <h4>Our Services</h4>
                <span className='separator'></span>
                <p>In addition to providing the best experience and service, we believe that the value of our work should be fair! That's why our prices fit your budget.</p>
            </div>
            <div className='prices-table-zone'>
                <div className='prices-table-border'>
                    <Table/>
                </div>
            </div>
        </div>
    );
}

export default PriceTable;