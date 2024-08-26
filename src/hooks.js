import React, { useState } from 'react';
import axios from "axios";
import { v1 as uuid } from "uuid";
import pokemon from './pokemonList';
const useFlip = () => {
    const [isFacingUp, setIsFacingUp] = useState(true);
    const flipCard = () => {
        setIsFacingUp(isUp => !isUp);
    };
    return [isFacingUp, flipCard];
}

const useAxios = (url) => {
    const [cards, setCards] = useState([]);
    const addCard = async (name) => {
        try{
            let response;
            if (pokemon.find(p => p===name) !== undefined) {
               
                response = await axios.get(url + name);
                
            } else {
               
                response = await axios.get(url);
            }
    
            setCards(cards => [...cards, { ...response.data, id: uuid() }]);
        }catch(error){
            console.log(error)
        }
       
    };
    return [cards, addCard];

}

export { useFlip, useAxios };