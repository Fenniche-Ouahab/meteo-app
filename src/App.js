import React, { useState } from 'react';
const api = {
  key: "d43faf8e5e705859a79f5731e1b821b6",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {

  const [requete, setRequete] = useState('');
  const [meteo, setMeteo] = useState({});

  const recherche = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${requete}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setMeteo(result);
          setRequete('');
        });
    }
  }
  const dateBuilder = (d) => {

    let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];
    let days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimance"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  function RenvoyerTempEnFrançais(props) {

    if (meteo.weather[0].main === "Mist") {
      return <div id="Mist"><h1>Brouillard</h1></div>
    } else if (meteo.weather[0].main === "Clear") {
      return <div id="Clear"><h1>Clairs</h1></div>
    } else if (meteo.weather[0].main === "Clouds") {
      return <div id="Clouds"><h1>Nuageux</h1></div>
    } else if (meteo.weather[0].main === "Rain") {
      return <div id="Rain"><h1>Pluie</h1></div>
    }
    else {
      return <div><h1>{meteo.weather[0].main}</h1></div>
    }


  }



  return (
    <div className={(typeof meteo.main != "undefined") ? ((meteo.main.temp > 16) ? 'app warm' : 'app') : 'app'}>

      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Rechercher..."
            onChange={e => setRequete(e.target.value)}
            value={requete}
            onKeyPress={recherche}
          />
        </div>
        {(typeof meteo.main != "undefined") ? (
          <div>
            <div className="emplacement-box">
              <div className="emplacement">{meteo.name}, {meteo.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="meteo-box">
              <div className="sunrise">
                Lever de soleil <br />
                {new Date((meteo.sys.sunrise) * 1000).toLocaleTimeString()}
              </div>
              <div className="sunset">
                Coucher de soleil <br />
                {new Date((meteo.sys.sunset) * 1000).toLocaleTimeString()}
              </div>



              <div className="temp">
                {Math.round(meteo.main.temp)}°c
              </div>
              <div className="meteo">
                <RenvoyerTempEnFrançais />


              </div>

              <div className="humidite">
                humidité :  {meteo.main.humidity} %
              </div>

            </div>
          </div>
        ) : ('')}

      </main>
    </div>
  );
}

export default App;
