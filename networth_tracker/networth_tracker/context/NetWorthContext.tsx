import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NetWorthContextType {
    netWorth: number;
    income: number;
    age: number;
    setNetWorth: (value: number) => void;
    setIncome: (value: number) => void;
    setAge: (value: number) => void;
    isLoading: boolean;
}

const NetWorthContext = createContext<NetWorthContextType | undefined>(undefined);

export const useNetWorth = () => {
    const context = useContext(NetWorthContext);
    if (!context) {
        throw new Error('useNetWorth must be used within a NetWorthProvider');
    }
    return context;
};

export const NetWorthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [netWorth, setNetWorthState] = useState<number>(0);
    const [income, setIncomeState] = useState<number>(0);
    const [age, setAgeState] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const storedNetWorth = await AsyncStorage.getItem('netWorth');
                const storedIncome = await AsyncStorage.getItem('income');
                const storedAge = await AsyncStorage.getItem('age');

                if (storedNetWorth !== null) {
                    setNetWorthState(parseFloat(storedNetWorth));
                }
                if (storedIncome !== null) {
                    setIncomeState(parseFloat(storedIncome));
                }
                if (storedAge !== null) {
                    setAgeState(parseFloat(storedAge));
                }
            } catch (error) {
                console.error('Failed to load data from storage', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const setNetWorth = async (value: number) => {
        setNetWorthState(value);
        try {
            await AsyncStorage.setItem('netWorth', value.toString());
        } catch (error) {
            console.error('Failed to save net worth', error);
        }
    };

    const setIncome = async (value: number) => {
        setIncomeState(value);
        try {
            await AsyncStorage.setItem('income', value.toString());
        } catch (error) {
            console.error('Failed to save income', error);
        }
    };

    const setAge = async (value: number) => {
        setAgeState(value);
        try {
            await AsyncStorage.setItem('age', value.toString());
        } catch (error) {
            console.error('Failed to save age', error);
        }
    };

    return (
        <NetWorthContext.Provider value={{ netWorth, income, age, setNetWorth, setIncome, setAge, isLoading }}>
            {children}
        </NetWorthContext.Provider>
    );
};
