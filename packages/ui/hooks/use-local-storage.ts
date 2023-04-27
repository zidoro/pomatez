import { useState, useEffect } from "react";

export function useLocalStorage<ValueType>(
  key: string,
  value: ValueType,
  defaultValue?: ValueType
) {
  const [storageValue, setStorageValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return (defaultValue ||
      (storedValue && JSON.parse(storedValue))) as ValueType;
  });

  useEffect(() => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  useEffect(() => {
    const listener = (e: StorageEvent) => {
      if (e.storageArea === localStorage && e.key === key) {
        const newValue = e.newValue
          ? JSON.parse(e.newValue)
          : e.newValue;

        setStorageValue(newValue as ValueType);
      }
    };

    window.addEventListener("storage", listener);

    return () => {
      window.removeEventListener("storage", listener);
    };
  }, [key, defaultValue]);

  const removeValue = () => {
    localStorage.removeItem(key);
  };

  return { value: storageValue, removeValue };
}
