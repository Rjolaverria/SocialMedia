import { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null,
};

const token = localStorage.getItem('JWT');

if (token) {
    const user = jwtDecode(token);

    if (user.exp * 1000 < Date.now()) {
        localStorage.removeItem('JWT');
    } else {
        initialState.user = user;
    }
}
export const AuthContext = createContext();

const reducer = (state, { type, data }) => {
    switch (type) {
        case 'LOGIN':
            localStorage.setItem('JWT', data.authToken);
            return {
                ...state,
                user: data,
            };
        case 'LOGOUT':
            localStorage.removeItem('JWT');
            return {
                ...state,
                user: null,
            };

        default:
            return {};
    }
};

export const AuthProvider = ({ children }) => {
    const [{ user }, dispatch] = useReducer(reducer, initialState);

    const login = (data) => {
        dispatch({
            type: 'LOGIN',
            data,
        });
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
