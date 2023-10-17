import { useEffect } from "react"
import { useState } from "react"

export function Pokemon() {
    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        async function getPokemons() {
            const url = 'https://pokeapi.co/api/v2/pokemon'

            const mainPoke = await fetch(url)
            const json = await mainPoke.json()
            console.log(json.results);

            json.results.forEach(async(el)=>{
                const pokemonData = await fetch(el.url)
                const dataJson = await pokemonData.json()
                const newPokemon = {
                    id:dataJson.id,
                    name:dataJson.name,
                    image: dataJson.sprites.front_default
                }
                setPokemons((pokemons)=>[...pokemons,newPokemon])
            })

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