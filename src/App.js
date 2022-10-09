import React from "react";
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import "./index.scss";
import Header from './components/Header';
import Drawer from './components/Drawer';
import Orders from "./pages/Orders";

export const AppContext = React.createContext({});

function App(props) {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [isReady, setIsReady] = React.useState(true);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const CarResponse = await axios.get('https://6257daa90c918296a48c2a53.mockapi.io/car');
                const favoritesResponse = await axios.get('https://6257daa90c918296a48c2a53.mockapi.io/favorites');
                const itemsResponse = await axios.get('https://6257daa90c918296a48c2a53.mockapi.io/items');

                setIsReady(false);

                setCartItems(CarResponse.data);
                setFavorites(favoritesResponse.data);
                setItems(itemsResponse.data);
            } catch (error) {
                alert("Ошибка при запросе данных");
            }
        }
        fetchData();
    }, []);

    const [clickCard, setclickCard] = React.useState(false);

    const clickOnCart = () => {
        clickCard(true);
    };

    const clickToPlus = async (obj) => {
        try {
            const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id));
            if (findItem) {
                setCartItems(pred => pred.filter(item => Number(item.parentId) !== Number(obj.id)));
                await axios.delete(`https://6257daa90c918296a48c2a53.mockapi.io/car/${findItem.id}`);
            } else {
                setCartItems((pred) => [...pred, obj]);
                const { data } = await axios.post('https://6257daa90c918296a48c2a53.mockapi.io/car', obj);
                setCartItems((pred) => pred.map(item => {
                    if (item.parentId === data.parentId) {
                        return {
                            ...item,
                            id: data.id
                        };
                    }
                    return item;
                }));

            };
        } catch (error) {
            alert("Не торопитесь добавлять!");
        }


    };

    const onRemoveItem = (id) => {
        try {
            axios.delete(`https://6257daa90c918296a48c2a53.mockapi.io/car/${id}`);
            setCartItems((pred) => pred.filter((item) => Number(item.id) !== Number(id)));
        } catch (error) {
            alert("Не удалось удалить в корзину");
        }
    };

    const clickToFavorites = async (obj) => {
        try {
            if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
                axios.delete(`https://6257daa90c918296a48c2a53.mockapi.io/favorites/${obj.id}`);
                setFavorites((pred) => pred.filter((item) => Number(item.id) !== Number(obj.id)));
            } else {
                const { data } = await axios.post('https://6257daa90c918296a48c2a53.mockapi.io/favorites', obj);
                setFavorites((pred) => [...pred, data]);
            }

        } catch (error) {
            alert("Не удалось добавить в фавориты");
        }
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    const getAddedItems = (id) => {
        return cartItems.some((item) => Number(item.parentId) === Number(id));
    }

    return (
        <AppContext.Provider value={{ items, cartItems, favorites, getAddedItems, setclickCard, setCartItems }}>
            <div className="wrapper" >
                {clickCard && <Drawer items={cartItems} closeOnCard={() => setclickCard(false)} onRemove={onRemoveItem} />}
                <Header clickOnCart={() => setclickCard(true)} />

                <Switch>
                    <Route path="/" exact >
                        <Home
                            items={items}
                            cartItems={cartItems}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            onChangeSearchInput={onChangeSearchInput}
                            clickToFavorites={clickToFavorites}
                            clickToPlus={clickToPlus}
                            isReady={isReady}
                        />
                    </Route>
                </Switch>

                <Switch>
                    <Route path="/favorite" exact >
                        <Favorites clickToFavorites={clickToFavorites} />
                    </Route>
                    <Route path="/orders" exact >
                        <Orders clickToFavorites={clickToFavorites} />
                    </Route>
                </Switch>


            </div >
        </AppContext.Provider>
    );
}

export default App;


