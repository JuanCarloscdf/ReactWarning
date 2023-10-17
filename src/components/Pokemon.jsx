import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

export function Pokemon() {
    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        async function getPokemons() {
            const url = 'https://pokeapi.co/api/v2/pokemon'


            const mainPoke = await axios(url);
            console.log(mainPoke.data.results);

            const promises = mainPoke.data.results.map(async (el) => {
                const pokemonData = await axios(el.url);
                return {
                    id: pokemonData.data.id,
                    name: pokemonData.data.name,
                    image: pokemonData.data.sprites.front_default
                };
            });

            const newPokemons = await Promise.all(promises);
            setPokemons((pokemons) => [...pokemons, ...newPokemons]);

        }

        getPokemons();
    }, [])
    return (
        <>
            <h1>Pokemon usando fetchdaasd</h1>
            {
                pokemons.map((el) => (
                    <article key={el.id}>
                        <h2>{el.id}</h2>
                        <h3>{el.name}</h3>
                        <img src={el.image} alt="" />
                    </article>
                ))
            }
        </>
    )
}