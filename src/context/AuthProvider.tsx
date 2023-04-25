import { createContext, useContext, useState } from "react";

type AuthContextType = {
    isAuth: boolean;
    signin: Function;
    signout: Function;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const contextValue = useContext(AuthContext);
    if (contextValue === null) {
        throw Error("Context has not been Provided!");
    }
    return contextValue;
};

type Props = {
    children?: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<string | null>(localStorage.getItem("user"));

    const isAuth = user !== null;

    const signin = (login: string, password: string, callback?: Function) => {
        setUser(login);
        localStorage.setItem("user", login);
        if (callback instanceof Function) {
            callback();
        }
    };

    const signout = (callback?: Function) => {
        setUser(null);
        localStorage.removeItem("user");
        if (callback instanceof Function) {
            callback();
        }
    };

    return (
        <AuthContext.Provider value={{ isAuth, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}