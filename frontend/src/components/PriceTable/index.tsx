
import Table from './Table';
import './styles.css';

const PriceTable = () => {
    return(
        <div className='prices-table-container'>
            <div className='prices-table-title'>
                <h4>Our Services</h4>
                <span className='separator'></span>
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