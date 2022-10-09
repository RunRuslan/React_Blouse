import Card from '../components/Card';
import React from 'react';
import { AppContext } from '../App';

function Favorites({ clickToFavorites }) {
    const { favorites } = React.useContext(AppContext);
    return (
        <div className="content">
            <div className="allBlouse">
                <h1>Мои закладки</h1>
            </div>

            <div className="blouse">
                {
                    favorites.map((obj, index) =>
                        <Card key={index}
                            favorited={true}
                            onFavorite={clickToFavorites}
                            {...obj}
                        />)
                }
            </div>
        </div>
    )
};

export default Favorites;