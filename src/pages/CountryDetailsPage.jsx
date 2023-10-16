import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function CountryDetails() {
  const [oneCountry, setOneCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const { countryId } = useParams();
  console.log(countryId);
  useEffect(() => {
    const fetchOneCountry = async () => {
      try {
        const response = await axios.get(
          `https://ih-countries-api.herokuapp.com/countries/${countryId}`
        );

        setOneCountry(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchOneCountry();
  }, [countryId]);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!oneCountry) {
    return <p>Error: Country not found</p>;
  }
  const borders = [...oneCountry.borders];

  return (
    <>
      <h2>Country Details</h2>
      <div>
        <img
          className="flag"
          src={`https://flagpedia.net/data/flags/icon/72x54/${oneCountry.alpha2Code.toLowerCase()}.png`}
        />
        <h2>{oneCountry.name.common}</h2>
        <p>Capital : {oneCountry.capital}</p>
        <p>Area : {oneCountry.area}</p>
        <div>
          {borders.map((border) => {
            return (
              <div key={border}>
                <Link to={`/${border}`}>
                  <p>{border}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CountryDetails;
