import React, { useEffect, useState } from 'react'

export const useFetchEdad = () => {
    const [ninoEdad, setNinoEdad] = useState(0);

    useEffect(() => {
        fetch("http://localhost:9000/api/edad")
            .then((response) => response.json())
            .then((ninoEdad) => setNinoEdad(ninoEdad));
    }, []);



  return (
    ninoEdad
  )
}
