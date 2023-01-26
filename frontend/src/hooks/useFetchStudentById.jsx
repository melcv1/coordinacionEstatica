import React, { useState, useEffect } from 'react'

export const useFetchStudentById = (id) => {
  const [student, setStudent] = useState();

  async function getById() {
    let data = await fetch(`http://localhost:9000/api/participante/${id}`)
        .then((response) => response.json())
        .then((response) => {
            console.log(response[0])
            return (response[0]);
        })
    setStudent(data);
}

  useEffect(() => {
    getById();
  }, []);

  return (
    student
  )
}
