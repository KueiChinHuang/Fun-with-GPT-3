/**
 * Credit of ScrollButton: GeeksforGeeks
 * https://www.geeksforgeeks.org/how-to-create-a-scroll-to-top-button-in-react-js/
 */

import React, { useState } from "react";

const ScrollButton = () => {

	if (typeof window !== "undefined") {
		window.addEventListener("scroll", toggleVisible);
	}
    
	const [visible, setVisible] = useState(false);

	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > 300) {
			setVisible(true);
		} else if (scrolled <= 300) {
			setVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<button
			onClick={scrollToTop}
			style={{ display: visible ? "inline" : "none" }}
		>
			Back to the top
		</button>
	);
};

export default ScrollButton;
