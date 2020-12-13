import { useState } from "react";

export default function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
	// eslint-disable-next-line
	const [history, setHistory] = useState([initial]);
	const transition = (newMode, replace = false) => {
		if (replace) {
			setMode((prev) => newMode);
			let replaceHistory = [...history];
			replaceHistory[replaceHistory.length - 1] = mode;
			setHistory((prev) => replaceHistory);
		} else {
			setMode((prev) => newMode);
			let newHistory = [...history];
			newHistory.push(newMode);
			setHistory((prev) => newHistory);
		}
	};

	const back = () => {
		let newHistory = [...history];
		newHistory.pop(mode);
		setHistory((prev) => newHistory);
		if (history.length > 1) {
			setMode((prev) => newHistory[newHistory.length - 1]);
		}
	};

	return { mode, transition, back };
}
