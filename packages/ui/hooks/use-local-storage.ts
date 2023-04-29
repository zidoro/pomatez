import { useState, useEffect } from "react";

export function useLocalStorage<ValueType>(
  key: string,
  value: ValueType,
  defaultValue?: ValueType
) {
  const [storageValue, setStorageValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return (
      storedValue ? JSON.parse(storedValue) : defaultValue
    ) as ValueType;
  });

  useEffect(() => {
    if (value) {
      setStorageValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  useEffect(() => {
    const listener = (e: StorageEvent) => {
      if (e.storageArea === localStorage && e.key === key) {
        const newValue = e.newValue ? JSON.parse(e.newValue) : value;

        setStorageValue(newValue as ValueType);
      }
    };

    window.addEventListener("storage", listener);

    return () => {
      window.removeEventListener("storage", listener);
    };
  }, [key, value]);

  return storageValue;
}
