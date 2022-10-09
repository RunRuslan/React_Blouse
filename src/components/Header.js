import React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

function Header({ clickOnCart, clickToFavotites }) {
    const { cartItems } = React.useContext(AppContext);
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)


    return (
        <header>
            <Link to="/">
                <div className="headerLeft">

                    <img className="img" width={50} height={50} src="img/blouse2.svg" alt="svit"></img>

                    <div className="headerInfo">
                        <h3>REACT BLOUSE</h3>
                        <p>Магазин лучших свитшотов</p>
                    </div>
                </div>
            </Link>
            <ul className="headerRight">
                <li>
                    <img className="img" width={20} onClick={clickOnCart} src="img/card.svg" alt="card" />
                </li>
                <span><b>{totalPrice} BYN.</b></span>
                <li>
                    <Link to="/favorite">
                        <img onClick={clickToFavotites} className="img" width={20} src="img/heart.svg" alt="favotite" />
                    </Link>
                    <Link to="/orders">
                        <img className="img" width={20} src="img/user.svg" alt="user" />
                    </Link>
                </li>
            </ul>
        </header>)
}
export default Header;


