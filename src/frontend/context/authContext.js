import { createContext,useContext } from "react";



export const authContext = createContext();

export const useAuth = () => useContext(authContext);

export const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const [token,setToken] = useState(null);

    const login = (user) => {
        setUser(user);
        setToken(localStorage.setItem('token',user.token))
        console.log(user);
        console.log(token);
    }

    const logout = () => {
        setUser(null);
    }

    const value = {
        user,
        login,
        logout
    }

    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    )
}