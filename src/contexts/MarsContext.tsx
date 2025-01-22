"use client";

import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const apiClient = axios.create({
    baseURL: 'https://api.nasa.gov',
});

interface Photo {
    id: number;
    img_src: string;
    earth_date: string;
}

interface MarsDataResponse {
    photos: Photo[];
}

interface MarsContextData {
    marsData: MarsDataResponse | undefined;
    isLoading: boolean;
    error: string | null;
}

export const MarsContext = createContext<MarsContextData>({
    marsData: undefined,
    isLoading: true,
    error: null,
});

export const MarsProvider = ({ children }: { children: React.ReactNode }) => {
    const [marsData, setMarsData] = useState<MarsDataResponse | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMarsData = async() => {
            try {
                const response = await apiClient.get(`/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`);
                if(!response.status) {
                    setError('Error occured while fetching data');
                }
                setMarsData(response.data);
            }
            catch (err) {
                setError(`Error occured while fetching data: ${err}`);
                return;
            } finally {
                setIsLoading(false);
            }
        };
        fetchMarsData();
    }, [])

    return (
        <MarsContext.Provider value={{ marsData, isLoading, error }}>
            {children}
        </MarsContext.Provider>
    )
};