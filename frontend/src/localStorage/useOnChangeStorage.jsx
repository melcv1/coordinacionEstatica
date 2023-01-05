import React, { useEffect, useState } from 'react';

export const useOnChangeStorage = (storageItem, defaultValue) => {

    const [storage, setStorage] = useState(localStorage.getItem(storageItem));

    useEffect(() => {
        // Agrega un escuchador para el evento de almacenamiento
        window.addEventListener('storage', (event) => {
            // Verifica si el evento fue disparado por un cambio en el almacenamiento local
            if (event.storageArea === localStorage) {
                // Aquí puedes manejar el cambio en el almacenamiento local
                const storedValue = localStorage.getItem(storageItem);
                setStorage(storedValue.toString().replace(/['"]+/g, ''));
            }
        });
    }, []);

    return {
        storage
    }
}
