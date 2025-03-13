import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { getPackages } from "../services/apiService";

export const usePackages = (filters) => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log('uc--', filters)
    // Debounced API call (300ms delay)
    const fetchPackages = useCallback(
        debounce(async (filters) => {
            setLoading(true);
            try {
                const response = await getPackages(filters);
                setPackages(response.data);
            } catch (err) {
                setError("Failed to fetch packages");
            } finally {
                setLoading(false);
            }
        }, 300),
        []
    );

    useEffect(() => {
        fetchPackages(filters);
    }, [filters, fetchPackages]);

    return { packages, loading, error };
};
