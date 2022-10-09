import React from 'react';
import Card from '../components/Card';


function Home({
    items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    clickToFavorites,
    clickToPlus,
    isReady
}) {

    const renderItems = () => {
        const filtration = items.filter((item) => item.name.toLowerCase().includes(searchValue.toLocaleLowerCase()))

        return (isReady ? [...Array(8)] : filtration).map((obj, index) =>
            <Card key={index}
                onFavorite={(item) => clickToFavorites(item)}
                onPlus={(item) => clickToPlus(item)}
                loading={isReady}
                {...obj} />)

    }
    return (
        <div className="content">
            <div className="allBlouse">
                <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все свитшоты...'}</h1>
                <div className="search-block">
                    <img src="img/search.svg" alt="search" />
                    {searchValue && <img onClick={() => setSearchValue('')} className="closeBtnInput" src="img/close.svg" alt="clear" />}
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Все..." />
                </div>
            </div>

            <div className="blouse">
                {
                    renderItems()
                }
            </div>
        </div>
    )
};

export default Home;