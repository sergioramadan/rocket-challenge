import { useState, useEffect } from 'react';
import Modal from '../Modal';
import './RocketDetails.css';

const FAVORITE_STORAGE = "favorite_rockets";

const RocketDetails = ({ info, onClose }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const setFavoriteList = (value) => {
        window.localStorage.setItem(FAVORITE_STORAGE, JSON.stringify(value));
    }

    const getFavoriteList = () => {
        if (!window.localStorage[FAVORITE_STORAGE]) {
            setFavoriteList([]);
        };

        return window.localStorage[FAVORITE_STORAGE] ? 
            JSON.parse(window.localStorage.getItem(FAVORITE_STORAGE)) :
            [];
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    useEffect(() => {
        const getList = getFavoriteList();
        setIsFavorite(!!(getList.indexOf(info.flight_number)!== -1));
    }, []);

    useEffect(() => {
        const favoriteList = getFavoriteList();
        if (isFavorite) {
            setFavoriteList(favoriteList.push(info.flight_number));
        } else {
            setFavoriteList(favoriteList.filter(element => element !== info.flight_number))
        }
    }, [isFavorite]);

    return (
        <Modal >
            <div key={info.flight_number} className="launch-details">
                <div className="buttons-container">
                    <button onClick={onClose}>Back</button>
                    <button onClick={toggleFavorite} className={isFavorite ? 'fav' : null}>
                        {isFavorite ? 'Added To Favorites' : 'Add To Favorite'}
                    </button>
                </div>
                <div className="launch-info">
                    <img src={info.links.mission_patch_small} alt={info.mission_name} />
                    <div>
                        <p><b>Mission Name:</b> {info.mission_name}</p>
                    </div>
                </div>
            </div>
        </Modal>
    ) 
};

export default RocketDetails;