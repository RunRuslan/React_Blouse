import React from 'react'
import { AppContext } from '../App';

const Info = ({ title, image, description }) => {
    const { setclickCard } = React.useContext(AppContext)
    return (
        <div className="cartEmpty">
            <img className="cartEmptyImg" src={image} alt="empty" />
            <h2>{title}</h2>
            <p className="catdAdd">{description}</p>
            <button onClick={() => setclickCard(false)} className="greenBtn">
                <img src="img/strelka.svg" alt="Arrow" /> Вернуться назад
            </button>
        </div>
    )
}

export default Info;