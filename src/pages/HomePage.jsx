import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const apiURL = "https://ih-countries-api.herokuapp.com/countries";
function HomePage() {
  //   const [fetching, setFetching] = useState(true);
  const [countries, setCountries] = useState([]);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(apiURL);
      // setCountries(response.data)
      const nations = response.data.map((element) => {
        console.log(element);
        return element;
      });
      const uniqueNations = new Set(nations);
      console.log(uniqueNations);

      setCountries([...uniqueNations]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  //   const fetchCountries = async () => {
  //     try {
  //       const response = await axios.get(apiURL);
  //       setOneCountry(response.data);
  //       const nations = response.data.map((element) => {
  //         return console.log(element);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  return (
    <div>
      <h2>WikiCountries: Your Guide to the World</h2>
      <div>
        {countries.map((element) => {
          return (
            <div
              style={{ fontSize: "20px", fontWeight: "bold" }}
              key={element._id}
              value={element._id}
            >
              <Link to={`/${element.alpha3Code}`}>
                <img
                  className="flag"
                  src={`https://flagpedia.net/data/flags/icon/72x54/${element.alpha2Code.toLowerCase()}.png`}
                />
                <h3>{element.name.common}</h3>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
