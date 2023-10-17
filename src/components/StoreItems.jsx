import { useEffect, useState } from "react"

export function StoreItems (){
    const [items,setItems] = useState([])
    useEffect(() => {
        async function getData() {
            const url = "https://fakestoreapi.com/products"
            fetch(url)
            .then(res=>res.json())
            .then(json=>{
                setItems(json)
            })
        }
        getData();
    },[])

    return(
        <>
        <h1>store data</h1>
        {
            items.map((el) => {
                return(
                    <article key={el.id} style={{display:"flex", flexDirection:"column"}}>
                        <img style={{width:'200px'}} src={el.image} alt="" />
                        <figcaption>{el.title}</figcaption>
                    </article>
                )
            })
        }
        </>
    )
}