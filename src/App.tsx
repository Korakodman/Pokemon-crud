import { useEffect, useState, useMemo, } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import axios from 'axios';
import './App.css';
import Card from './Componet/Card';
import Contaniner from './Componet/Contanier';
import TraingPage from "./pages/TraingPage"
import { useMediaQuery } from 'react-responsive';

function App() {
  const [Pokedex, setPokedex] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [PrevUrl, SetPrevUrl] = useState("")
  const [NextUrl, SetNextUrl] = useState("")

  const fetchPokemon = useMemo(() => async () => {
    const res = await axios.get(url);
    SetPrevUrl(res.data.previous)
    SetNextUrl(res.data.next)
    const pokemonData = await Promise.all(
      res.data.results.map(async (item) => {

        const result = await axios.get(item.url);
        return result.data;
      })
    );
    setPokedex(pokemonData.sort((a, b) => a.id - b.id));
  }, [url]);

  useEffect(() => {
    fetchPokemon();
  }, [url]);

  return (
    <div>
      <div>
        <Contaniner />
        <div id='top'></div>
        <div > <Card pokemon={Pokedex} /></div>
        <div className='btn-group'>
          <a href="#top">
            <button onClick={() => {
              setUrl(PrevUrl)
            }}>กลับมา</button>
          </a>
          <a href="#top">
            <button onClick={() => {
              setUrl(NextUrl)
            }}>ต่อไป</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;