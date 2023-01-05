

export const authReducer = ( state, action ) => {

    switch (action.type) {
        case 'addError':
            return {
                ...state,
                user: null,
                status: 'not-authenticated',
                errorMessage: action.payload,
                rol: null,
            }
    
        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            };

        case 'signUp':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                user: action.payload.user,
                rol: action.payload.rol,
            }

        case 'logout':
        case 'notAuthenticated':
            return {
                ...state,
                status: 'notAuthenticated',
                user: null,
                rol: null,
            }

        default:
            return state;
    }


}


