import Card from '../components/Card';
import React from 'react';
import { AppContext } from '../App';
import axios from 'axios';

function Orders({ clickToFavorites }) {
    const [oprders, setOrders] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            const orders = await axios.get('https://6257daa90c918296a48c2a53.mockapi.io/orders');

            setOrders(orders.data);
        }
        fetchData();
    }, []);


    return (
        <div className="content">
            <div className="allBlouse">
                <h1>Мои заказы</h1>
            </div>

            <div className="blouse">
                {
                    [].map((obj, index) =>
                        <Card
                        />)
                }
            </div>
        </div>
    )
};

export default Orders;