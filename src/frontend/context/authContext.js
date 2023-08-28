import { createContext,useContext ,useState} from "react";



export const authContext = createContext();

export const useAuth = () => useContext(authContext);

export const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const [token,setToken] = useState(null);

    const login = (user) => {
        setUser(localStorage.setItem('user',user));
        
        setToken(localStorage.setItem('token',))
        console.log(user);
        console.log(user.token);
    }

    const logout = () => {
        setUser(null);
    }

    const checkAuth = () => {
        if(localStorage.getItem('token')){
            return true;
        }
        else{
            return false;
        }
    }


    const value = {
        user,
        login,
        logout,
        checkAuth
    }


    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    )
}