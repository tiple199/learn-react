import { createContext, useState } from "react";

export const AuthContext = createContext({
    email: "admin@.com",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: ""
});

export const AuthWrapper = (props) => {
    const [user,setUser] = useState({
        email: "admin@.com",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: ""
    })
    const [isAppLoading, setIsAppLoading] = useState(true);

    return (
        <AuthContext.Provider value={{user,setUser,isAppLoading,setIsAppLoading}}>
            {props.children}
        </AuthContext.Provider>
    )
}