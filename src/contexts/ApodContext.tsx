"use client";

import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const apiClient = axios.create({
    baseURL: 'https://api.nasa.gov',
});

interface ApodDataResponse {
    hdurl: string;
    title: string;
    url: string;
    explanation: string;
    date: string;
}

interface ApodContextData {
    apodData: ApodDataResponse | undefined;
    isLoading: boolean;
    error: string | null;
}

export const ApodContext = createContext<ApodContextData>({
    apodData: undefined,
    isLoading: true,
    error: null,
});

export const ApodProvider = ({ children }: { children: React.ReactNode }) => {
    const [apodData, setApodData] = useState<ApodDataResponse | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchApodData = async() => {
            try {
                const response = await apiClient.get(`/planetary/apod/?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`);
                if(!response.status) {
                    setError('Error occured while fetching data');
                }
                setApodData(response.data);
            }
            catch (err) {
                setError(`Error occured while fetching data: ${err}`);
                return;
            } finally {
                setIsLoading(false);
            }
        };
        fetchApodData();
    }, [])

    return (
        <ApodContext.Provider value={{ apodData, isLoading, error }}>
            {children}
        </ApodContext.Provider>
    )
};