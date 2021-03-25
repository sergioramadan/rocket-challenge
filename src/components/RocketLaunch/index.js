import { useState } from 'react';
import RocketDetails from '../RocketDetails';
import './RocketLaunch.css';

const RocketLaunch = ({ info }) => {
    const [showDetails, setShowDetails] = useState(false);

    const openDetails = () => setShowDetails(true);

    const closeDetails = () => setShowDetails(false);

    return (
        <div className="rocket-launch">
            <h2>Launch #{info.flight_number}</h2>
            <div>
                <p>Launch Name: {info.mission_name}</p>
            </div>
            <button onClick={openDetails}>See Details</button>
            { showDetails && <RocketDetails onClose={closeDetails} info={info}/> }
        </div>
    )
}

export default RocketLaunch;