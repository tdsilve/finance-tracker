"use client";
import React from 'react'

type UseDebounceArgs = {
    value: any;
    delay: number;
}

export const useDebounce = ({value, delay = 500}: UseDebounceArgs) => {
    const [debouncedValue, setDebouncedValue] = React.useState<any>(value);
    React.useEffect(() => {
        const timeout: NodeJS.Timeout = setTimeout(() => {
            console.log('hey', debouncedValue)
            setDebouncedValue(value)
            
        }, delay)
      
        return () => {
            console.log("hey 2", debouncedValue)
            clearTimeout(timeout);
        }
    }, [value, delay, debouncedValue])

    return debouncedValue;
}
