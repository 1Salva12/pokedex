import { useEffect, useState, useContext } from 'react';
import { PageContext } from '../context/PageContext';
import { RingLoader } from 'react-spinners';

const InfoPokemon = () => {
    const { pokemonSeleccionado, setPokemonSeleccionado } = useContext(PageContext)
    const [imagen, setImagen] = useState();
    const [datos, setDatos] = useState(null);
    //informacion del pokemon
    useEffect(() => {
        if (!pokemonSeleccionado) return;
        const obtenerImagen = async () => {
            try {
                const resultado = await fetch(pokemonSeleccionado.url)

                const datosPokemon = await resultado.json()
                setImagen(datosPokemon.sprites.other.dream_world.front_default);
                setDatos(datosPokemon)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerImagen()
    }, [pokemonSeleccionado])

    const pokemonTypeColors = {
        normal: "bg-stone-400",
        fire: "bg-orange-500",
        water: "bg-blue-500",
        electric: "bg-yellow-400",
        grass: "bg-green-500",
        ice: "bg-cyan-300",
        fighting: "bg-red-700",
        poison: "bg-purple-600",
        ground: "bg-amber-600",
        flying: "bg-indigo-400",
        psychic: "bg-pink-500",
        bug: "bg-lime-500",
        rock: "bg-yellow-700",
        ghost: "bg-violet-700",
        dragon: "bg-indigo-700",
        dark: "bg-zinc-700",
        steel: "bg-slate-400",
        fairy: "bg-pink-300",
        stellar: "bg-teal-400",
        unknown: "bg-gray-500",
    };

    const tipoPrincipal =
        datos && datos.types.length > 0
            ? datos.types[0].type.name
            : "unknown";

    return (
        <div className="relative text-center p-5">

            <button
                onClick={() => setPokemonSeleccionado(null)}
                className='flex gap-1 bg-red-900 text-white px-2 py-1 rounded shadow cursor-pointer'
            >
                Regresar
            </button>

            {datos && (
                <div className="absolute top-5 right-5 text-right">
                    <div className="mb-4">
                        <h3 className="font-bold">Tipo</h3>

                        {datos.types.map((item) => (
                            <span
                                key={item.type.name}
                                className={`inline-block px-3 py-1 m-1 rounded-full text-white ${pokemonTypeColors[item.type.name]
                                    }`}
                            >
                                {item.type.name}
                            </span>
                        ))}
                    </div>

                    <div className="mb-4">
                        <p>
                            <strong>Altura:</strong> {datos.height / 10} m
                        </p>

                        <p>
                            <strong>Peso:</strong> {datos.weight / 10} kg
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold mb-2">Habilidades</h3>

                        {datos.abilities.map((item) => (
                            <span
                                key={item.ability.name}
                                className="inline-block bg-gray-300 px-3 py-1 rounded-full m-1"
                            >
                                {item.ability.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <h1 className="text-2xl font-bold">
                #{datos?.id} {pokemonSeleccionado?.name}
            </h1>

            {imagen ? (
                <div className="relative w-56 h-56 mx-auto flex items-center justify-center">
                    <div
                        className={`absolute w-44 h-44 rounded-full opacity-30 ${pokemonTypeColors[tipoPrincipal]
                            }`}
                    ></div>

                    <img
                        src={imagen}
                        alt={pokemonSeleccionado?.name}
                        className="relative z-10 w-48"
                    />
                </div>
            ) : (
                <RingLoader className="m-auto" color="#e61d1d" />
            )}

            {datos && (
                <div className="mt-5">
                    <h3 className="font-bold mb-3">Estadísticas</h3>

                    {datos.stats.map((stat) => (
                        <div key={stat.stat.name} className="mb-3">
                            <div className="mb-1">
                                {stat.stat.name}: {stat.base_stat}
                            </div>

                            <div className="w-72 h-4 bg-gray-300 mx-auto rounded">
                                <div
                                    className={`h-4 rounded ${pokemonTypeColors[tipoPrincipal]
                                        }`}
                                    style={{
                                        width: `${(stat.base_stat / 255) * 100}%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default InfoPokemon;