import { useEffect, useState } from 'react'

const PREFIX = "insider-clone-";

export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key;
    const [value, setValue] = useState(() => {
        const currentLocalStorage = localStorage.getItem(prefixedKey);
        if (currentLocalStorage != null) return JSON.parse(currentLocalStorage);
        if (typeof initialValue === 'function') {
            return initialValue();
        } else {
            return initialValue
        }
    });

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [prefixedKey, value])

    return [value, setValue]
}
