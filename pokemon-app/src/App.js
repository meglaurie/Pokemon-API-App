import React, { useState, useEffect }from 'react';
import { getAllPokemon, getPokemon } from './services/pokemon';
import logo from './logo.svg';
import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon';

  useEffect(() => {
      async function fetchData() {
        let response = await getAllPokemon(initialUrl)
        setNextUrl(response.next);
        setPrevUrl(response.previous);
        await loadPokemon(response.results);
        setLoading(false);
      }
      fetchData();
    }, [])

  const loadPokemon = async (data) =>{
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon);
      return pokemonRecord;
    }))
    setPokemonData(_pokemonData);
  }
  console.log(pokemonData);
  return (
    <div className="App">
    {loading ? <h1>Loading...</h1> : (
      <h1>Data is fetched</h1>
    )}
    </div>
  );
}

export default App;
