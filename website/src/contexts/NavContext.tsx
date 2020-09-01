import React, { createContext, useState } from "react";

type Props = {
	isMenuOpen: boolean;
	toggleMenu?: () => void;
};

const NavContext = createContext<Props>({ isMenuOpen: false });

const NavProvider: React.FC = ({ children }) => {
	const [isMenuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => setMenuOpen((prevState) => !prevState);

	return (
		<NavContext.Provider
			value={{
				isMenuOpen,
				toggleMenu,
			}}
		>
			{children}
		</NavContext.Provider>
	);
};

export { NavContext, NavProvider };
