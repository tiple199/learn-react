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

    return (
        <AuthContext.Provider value={{user,setUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}