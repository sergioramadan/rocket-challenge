import RocketLaunch from '../RocketLaunch';

const RocketList = ({ list }) => {
    return (
        <div>
            {list.map((element) => {
                return <RocketLaunch key={element.flight_number} info={element} />
            })}
        </div>
    );
}

export default RocketList;
