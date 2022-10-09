import React from 'react';
import ContentLoader from "react-content-loader";
import { AppContext } from '../App';

function Card({ id, name, price, ImageUrl, onFavorite, onPlus, favorited, added = false, loading = false }) {

    const { getAddedItems } = React.useContext(AppContext);

    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const onClickPlus = () => {
        onPlus({ id, parentId: id, name, price, ImageUrl });
    };

    const onClickFavorite = () => {
        onFavorite({ id, parentId: id, name, price, ImageUrl });
        setIsFavorite(!isFavorite);
    }

    return (
        <div className="card">
            {
                loading ?
                    <ContentLoader
                        speed={1.2}
                        width={340}
                        height={310}
                        viewBox="0 0 340 310"
                        backgroundColor="#e6cbcb"
                        foregroundColor="#ecebeb"

                    >
                        <rect x="274" y="165" rx="0" ry="0" width="1" height="0" />
                        <rect x="15" y="227" rx="10" ry="10" width="149" height="10" />
                        <rect x="11" y="208" rx="10" ry="10" width="159" height="11" />
                        <rect x="11" y="248" rx="11" ry="11" width="43" height="17" />
                        <rect x="139" y="275" rx="10" ry="10" width="33" height="33" />
                        <rect x="63" y="252" rx="10" ry="10" width="43" height="10" />
                        <rect x="11" y="10" rx="21" ry="21" width="155" height="189" />
                    </ContentLoader>
                    :
                    <>
                        <div class="animate__animated animate__bounce" className="favorite">
                            <img onClick={onClickFavorite} src={isFavorite ? "img/heart-cheked.svg" : "img/heart-unCheked.svg"} alt="liked" />
                        </div>
                        <img width={180} src={ImageUrl} alt="blouse" />
                        <h5>{name}</h5>
                        <div className="cardBottom">
                            <div>
                                <span>Цена:</span>
                                <b>{price} BYN.</b>
                            </div>
                            <button className="button">
                                <img className="plus" onClick={onClickPlus} src={getAddedItems(id) ? "img/isAdded.svg" : "img/plus.svg"} alt="plus" />
                            </button>
                        </div>
                    </>
            }

        </div>)
}
export default Card;