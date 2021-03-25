import axios from 'axios';

const getLaunches = async () => {
    return await axios.get('https://api.spacexdata.com/v3/launches');
};

const getRockets = async () => {
    return await axios.get('https://api.spacexdata.com/v3/rockets');
};

export {
    getLaunches,
    getRockets
}