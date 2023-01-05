import React, { useEffect, useState } from 'react'

export const useFetchPruebas = (id) => {

  const [pruebas, setPruebas] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const getData = async () => {
    await fetch(`http://localhost:9000/api/pruebas/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setPruebas(response);
      });
      setisLoading(false);
  }

  useEffect(() => {
      console.log('asdasd');
      getData();
  }, [])




  return {
    pruebas,
    isLoading,
  }
}
