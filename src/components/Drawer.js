import React from 'react';
import Info from './Info'
import { AppContext } from '../App';
import axios from 'axios';

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

function Drawer({ closeOnCard, onRemove, items = [] }) {

    const [isLoading, setIsLoading] = React.useState(false);
    const [isComplete, setIsComplete] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const { cartItems, setCartItems } = React.useContext(AppContext)
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('https://6257daa90c918296a48c2a53.mockapi.io/orders', {
                items: cartItems,
            });

            setOrderId(data.id);
            setIsComplete(true);
            setCartItems([]);
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://6257daa90c918296a48c2a53.mockapi.io/car/' + item.id);
                await delay();
            }
        } catch (error) {
            alert("Не удалось создать заказ!");
        }
        setIsLoading(false);
    }

    return (
        <div className="korzinaShadow">
            <div className="korzina">
                <div className="otstup">
                    <h2>Корзина<img className="closeBtn" onClick={closeOnCard} src="img/close.svg" alt="close" /></h2>

                    {
                        items.length > 0 ?
                            <div>
                                <div className="items">
                                    {
                                        items.map((obj) => (

                                            <div key={obj.id} className="cartItem">
                                                <img className="imgVkorzine" width={60} height={60} src={`${obj.ImageUrl}`} alt="blouse" />
                                                <div className="blouseVkorzine">
                                                    <p className="cartItemP">{obj.name}</p>
                                                    <b>{obj.price} BYN.</b>
                                                </div>
                                                <img onClick={() => onRemove(obj.id)} className="closeBtn" src="img/close.svg" alt="remove" />
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="korzinaItogoAll">
                                    <ul>
                                        <li className="korzinaItogo">
                                            <span>Итого</span>
                                            <div></div>
                                            <b>{totalPrice} BYN.</b>
                                        </li>
                                        <li>
                                            <span>Налог 5%:</span>
                                            <div></div>
                                            <b>{Math.round(totalPrice * 0.05)} BYN.</b>
                                        </li>
                                        <button disabled={isLoading} onClick={onClickOrder}>Оформить заказ<img src="img/strelka.svg" alt="strelka" /></button>
                                    </ul>
                                </div>
                            </div>
                            :
                            <Info
                                title={isComplete ? "Заказ оформлен!" : "Корзина пустая"}
                                description={isComplete ? `Ваш заказ #${orderId} будет передан курьерской доставке` : "Добавьте хотя-бы один свитшот... "}
                                image={isComplete ? "img/okay.jpg" : "img/drawer.png"} />
                    }

                </div>
            </div>
        </div >
    )
}
export default Drawer;
