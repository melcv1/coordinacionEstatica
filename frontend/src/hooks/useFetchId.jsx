import React, { useState, useEffect } from 'react'

export const useFetchId = () => {
  const [idnino, setIdnino] = useState(0);
  const [valores, setValores] = useState([]);

  async function getId() {
    let id = await fetch("http://localhost:9000/api/id")
        .then((response) => response.json())
        .then((response) => {
            console.log('##############ID################');
            console.log(response[0].id_est)
            return (response[0].id_est);
        })
    console.log(id)
    setIdnino(id);
}

  useEffect(() => {
    getId();
  }, []);

  return (
    idnino
  )
}
