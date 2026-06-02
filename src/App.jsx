import React, { useState } from 'react'
import Header from './components/Header'
import ListaPokemons from './pages/ListaPokemons'
import InfoPokemon from './pages/InfoPokemon'
import { PageContext } from './context/PageContext'

function App() {
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null)
  //useContext para compartir informacion entre componentes

  return (
    <>
      <Header />
      <PageContext.Provider value={{ pokemonSeleccionado, setPokemonSeleccionado }}>
        {pokemonSeleccionado ? (
          <InfoPokemon pokemon={pokemonSeleccionado} setPokemon={setPokemonSeleccionado} />
        ) : (
          <ListaPokemons agregarPokemon={setPokemonSeleccionado} />
        )}
      </PageContext.Provider>
    </>
  )
}

export default App