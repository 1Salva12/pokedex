import { useEffect, useState } from "react";
import Card from "../components/Card";
import { ListPlus, ScanSearch } from "lucide-react";

// Aqui se ejecuta JavaScript

const ListaPokemons = ({agregarPokemon}) => {

    // Aqui se ejecuta jsx
    const URL = "https://pokeapi.co/api/v2/pokemon/";
    const [pokemons, setPokemons] = useState([]);
    const [next, setNext] = useState(null);
    const [busqueda, setBusqueda] = useState ("");

    const obtenerPokemons = async (url)=>{
        try {
            const resultado = await fetch(url);
            const datosPokemon = await resultado.json();
            setPokemons([...pokemons, ...datosPokemon.results]);
            setNext(datosPokemon.next);
            
        } catch (error) {
            console .error(error);
        }
    }

    useEffect(()=>{
        console.log(pokemons);
    },[pokemons]);

    useEffect(()=>{
        obtenerPokemons(URL);
    },[]);

    const pokemonsFiltrados = pokemons.filter((pokemon)=>
    pokemon.name.toLowerCase().includes(
        busqueda.toLowerCase()
    )
);

    return (
        <section>
            <div className=" flex justify-center mb-10">
                <form className="flex border-2 border-red-900 px-2">
                    <input type="text" placeholder="Buscar un Pokemon..."
                    className="outline-none" value={busqueda} onChange={(e)=>setBusqueda(e.target.value)}
                    />
                    <ScanSearch className="text-red-900"/>
                </form>
            </div>
            <ul className="flex flex-wrap w-full justify-center gap-2">
                {
                    pokemonsFiltrados.map((pokemon, indice)=>(
                    <Card 
                    key={indice}
                    url={pokemon.url} 
                    nombre={pokemon.name}
                    noPokemon={indice + 1}
                    pokemon={pokemon}
                    
                    />
                ))
                }
            </ul>
            <div className="flex w-full justify-center my-10">
                {
                    next &&
                    <button onClick={()=>obtenerPokemons(next)} className="flex gap-1 bg-red-900 text-white px-2 py-1 rounded shadow cursor-pointer"><ListPlus/>Mostrar mas</button>
                }
            </div>
        </section>
    )
}
export default ListaPokemons