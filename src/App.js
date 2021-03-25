import { useState, useEffect } from 'react';
import RocketList from './components/RocketList';
import { getLaunches, getRockets } from './services/RocketServices';
import './App.css';

function App() {
  const [launchList, setLaunchList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredLaunchList, setFilteredLaunchList] = useState([]);

  useEffect(() => {
    async function getServiceData () {
      const launchesCallback = await getLaunches();
      const rocketsCallback = await getRockets();
      const launchesList = launchesCallback.data;
      const rocketsList = rocketsCallback.data;
  
      const parsedLaunches = launchesList.map((launch) => {
        let launchedRocket = rocketsList.filter((rocket) => {
          return rocket.rocket_id === launch.rocket.rocket_id;
        });

        return {
          ...launch,
          rocket: {
            ...launch.rocket,
            ...launchedRocket
          }
        };
      })

      setLaunchList(parsedLaunches);
      setFilteredLaunchList(parsedLaunches);
    }
    getServiceData();
  },[])

  useEffect(() => {
    if(searchValue.length === 0) {
      setFilteredLaunchList(launchList);
    } else {
      setFilteredLaunchList(launchList.filter((launch) => {
        let missionName = launch.mission_name.toLocaleLowerCase();
        return missionName.indexOf(searchValue.toLocaleLowerCase()) !== -1;
      }))
    }
    
  }, [searchValue])

  return (
    <div className="App">
      <input type="text" onChange={(e) => setSearchValue(e.target.value)} />
      <RocketList list={filteredLaunchList} />
    </div>
  );
}

export default App;
