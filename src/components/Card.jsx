import { useEffect, useState } from 'react';
import { RingLoader } from 'react-spinners';

const Card = ({ url, nombre, noPokemon, pokemon, onSeleccionar }) => {
    const [imagen, setImagen] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerImagen = async () => {
            try {
                const resultado = await fetch(url);
                const datosPokemon = await resultado.json();
                setImagen(datosPokemon.sprites.other.dream_world.front_default);
            } catch (error) {
                console.error('Error al obtener imagen:', error);
            } finally {
                setCargando(false);
            }
        };

        if (url) {
            obtenerImagen();
        }
    }, [url]);

    return (
        <li
            onClick={() => onSeleccionar && onSeleccionar(pokemon)}
            className='transition duration-300 hover:scale-105 h-[180px] mb-40'>
            <div className='flex justify-center items-center h-[150px]'>
                {cargando ? (
                    <RingLoader color='#e71284' size={50} />
                ) : (
                    imagen && <img className='w-[150px] h-[150px] m-[-40px]' src={imagen} alt={nombre} />
                )}
            </div>

            <div className='bg-slate-800 text-white p-2 pt-10 shadow-lg shadow-slate-600 rounded'>
                <p className='text-green-200 font-bold text-xl'>#{noPokemon}</p>
                <h2 className='text-2xl capitalize'>{nombre}</h2>
            </div>
        </li>
    );
};

export default Card;
