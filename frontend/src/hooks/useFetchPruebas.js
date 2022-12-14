import React, { useState, useEffect } from 'react';

export  const useFetchPruebas = (id) => {

    const [pruebas, setPruebas] = useState([]);
    
    useEffect(() => {
      getPruebasList();
    }, [])
    

    const getPruebasList = async () => {
        console.log('aasda');
        await fetch(`http://localhost:9000/api/pruebas/${id}`)
            .then((response) => response.json())
            .then((response) => {                
                setPruebas(response);
            });
    }


  return {
    pruebas,
  }
}
