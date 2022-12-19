import { useState, useCallback } from "react";

export type UseInput<P> = {
	values: P;
	setValues: React.Dispatch<React.SetStateAction<P>>;
	getValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const useInputHandler = (initialState: object) => {
	const [values, setValues] = useState(initialState);

	const getValues = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues((prevState) => ({ ...prevState, [name]: value }));
	}, []);

	return { values, setValues, getValues };
};
