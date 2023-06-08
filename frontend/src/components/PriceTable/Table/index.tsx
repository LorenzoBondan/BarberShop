
const Table = () => {
    return(
        <table className='prices-table'>
            <tbody>
                <tr>
                    <td className="product-name">Hair Cut</td>
                    <td className="product-price">U$ 45.00</td>
                </tr>
                <tr>
                    <td className="product-name">Beard Cut</td>
                    <td className="product-price">U$ 30.00</td>
                </tr>
                <tr>
                    <td className="product-name">Beard + Hair Cut</td>
                    <td className="product-price">U$ 65.00</td>
                </tr>
                <tr>
                    <td className="product-name">Hair Finishing</td>
                    <td className="product-price">U$ 15.00</td>
                </tr>
            </tbody>
            <tbody>
                <tr>
                    <td className="product-name">Eyebrow</td>
                    <td className="product-price">U$ 25.00</td>
                </tr>
                <tr>
                    <td className="product-name">Nose hair removal</td>
                    <td className="product-price">U$ 20.00</td>
                </tr>
                <tr>
                    <td className="product-name">Ear hair removal</td>
                    <td className="product-price">U$ 20.00</td>
                </tr>
                <tr>
                    <td className="product-name">Hair Styling</td>
                    <td className="product-price">U$ 15.00</td>
                </tr>
            </tbody>
        </table>
    );
}

export default Table;