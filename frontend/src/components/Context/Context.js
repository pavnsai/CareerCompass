import {
    createContext,
    useContext,
    useReducer,
    useEffect,
} from 'react';
import {careerReducer} from "./Reducer";

const Career = createContext();
const Context = ({children}) => {
    const [state, dispatch] = useReducer(careerReducer, {
        services: [],
        cart: [],
        modal: false,
    });
    useEffect(() => {
    }, []);
    return (
        <Career.Provider
            value={{state, dispatch}}
        >
            {children}
        </Career.Provider>
    );
}

export const CareerState = () => {
    return useContext(Career);
};

export default Context;
