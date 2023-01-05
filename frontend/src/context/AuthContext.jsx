import React, { createContext, useEffect, useReducer } from 'react';
import { authReducer, AuthState } from './authReducer';
import { useLocalStorage } from '../localStorage/useLocalStorage';
import { data } from '@tensorflow/tfjs';

const authInicialState = {
    status: 'notAuthenticated',
    token: null,
    user: null,
    errorMessage: '',
    rol: null,
}



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useLocalStorage("session", JSON.stringify(authInicialState));


    const [state, dispatch] = useReducer(authReducer, JSON.parse(session));

    useEffect(() => {
        //checkToken();
    }, [])

    const checkToken = async () => {
        console.log(session);
        let sessionObj = JSON.parse(session);
        const token = sessionObj.status;
        // No token, no autenticado
        if (token === 'notAuthenticated') return dispatch({ type: 'notAuthenticated' });

        // Hay token
        let resp = await fetch("http://localhost:9000/api/id")
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                return (response);
            })

        if (resp.status !== 200) {
            return dispatch({ type: 'notAuthenticated' });
        }

        // await AsyncStorage.setItem('token', resp.data.token );
        sessionObj = {
            status: resp.data.status,
            user: resp.data.user,
        }
        await setSession(JSON.stringify(sessionObj));
        dispatch({
            type: 'signUp',
            payload: {
                user: resp.data.usuario,
                rol: data.rol,
            }
        });
    }


    const signIn = async (user, password ) => {
        try {

            //const { data } = await cafeApi.post < LoginResponse > ('/auth/login', { correo, password });
            const requestInit = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        usuario: user,
                        contrasena: password,
                    }
                )
            };

            let resp = await fetch("http://localhost:9000/api/login/users", requestInit)
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                    return (response);
                })
            if(resp.status ==='authenticated'){
                dispatch({
                    type: 'signUp',
                    payload: {
                        user: resp.user,
                        rol: resp.rol,
                    }
                });
                //await AsyncStorage.setItem('token', data.token );
                const sessionObj = {
                    status: resp.status,
                    user: resp.user,
                }
                await setSession(JSON.stringify(sessionObj));

            }else{
                alert('Datos Incorrectos')
            }

        } catch (error) {
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Información incorrecta'
            })
        }
    };

    const signUp = async ({ nombre, password }) => {

        try {

            //const { data } = await cafeApi.post<LoginResponse>('/usuarios', { correo, password, nombre } );
            const requestInit = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        usuario: nombre,
                        contrasena: password,
                    }
                )
            };

            let resp = await fetch("http://localhost:9000/api/login/users", requestInit)
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                    return (response);
                })
            dispatch({
                type: 'signUp',
                payload: {
                    user: data.usuario
                }
            });

            //await AsyncStorage.setItem('token', data.token );
            const sessionObj = {
                status: resp.data.status,
                user: resp.data.user,
            }
            await setSession(JSON.stringify(sessionObj));
        } catch (error) {
            dispatch({
                type: 'addError',
                payload: error.response.data.errors[0].msg || 'Revise la información'
            });
        }

    };

    const logOut = async () => {
        //await AsyncStorage.removeItem('token');
        const sessionObj = {
            status: 'not-authenticated',
            user: '',
        }
        await setSession(JSON.stringify(sessionObj));
        dispatch({ type: 'logout' });
    };

    const removeError = () => {
        dispatch({ type: 'removeError' });
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError,
        }}>
            {children}
        </AuthContext.Provider>
    )

}


