import { useState } from "react"
import "../Componet/Card.css"
import { Link } from "react-router-dom"
const Card = ({ pokemon }) => {

    return (
        <>
            <div className="Container">

                {pokemon.map((item) => {
                    return (
                        <>
                            <div className="card" key={item.id} >
                                <h4>{item.id}</h4>
                                <img src={item.sprites.front_default} alt="" />
                                < h3>{item.name}</h3>

                            </div>
                        </>
                    )
                })}
            </div>

        </>
    )
}

export default Card