import FlatPicker from 'react-flatpickr';
import "flatpickr/dist/themes/material_green.css";
import { FilterData } from 'types/types';
import { useState } from 'react';
import './styles.css';

type Props = {
    onFilterChange: (filter : FilterData) => void;
}

const Filter = ({onFilterChange} : Props) => {

    const [dates, setDates] = useState<Date[]>([]);

    const onChangeDate = (dates: Date[]) => {
        if (dates.length === 2 ){ // se já selecionou data final e inicial
            setDates(dates);
            onFilterChange( {dates} );
        }
    };


    return(
        <div className='filter-container'>
            <FlatPicker
                className='filter-input'
                onChange={onChangeDate}
                placeholder='Select the dates'
                options={{
                    mode: 'range', 
                    dateFormat: 'd/m/Y',
                    showMonths: 2
                }}
            />
        </div>
    );
}

export default Filter;