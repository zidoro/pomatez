import { useState, useCallback } from "react";

export const useInput = (initialState: any) => {
	const [value, setValue] = useState(initialState);

	const getValueCallback = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;
			if (typeof initialState === "object") {
				setValue((prevState: object) => ({
					...prevState,
					[name]: value,
				}));
				return;
			}
			setValue(value);
		},
		[],
	);

	return { value, setValue, getValueCallback };
};
