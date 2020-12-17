import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});
	function bookInterview(id, interview) {
		return axios
			.put(`/api/appointments/${id}`, { interview })
			.then((response) =>
				Promise.all([
					axios.get("/api/appointments"),
					axios.get("/api/days"),
				]).then((all) => {
					setState({
						...state,
						appointments: all[0].data,
						days: all[1].data,
					});
				}),
			);
	}

	function cancelInterview(id) {
		return axios.delete(`/api/appointments/${id}`).then((response) =>
			Promise.all([
				axios.get("/api/appointments"),
				axios.get("/api/days"),
			]).then((all) => {
				// console.log("poggers");
				// setState({
				// 	...state,
				// 	appointments: all[0].data,
				// 	days: all[1].data,
				// });
			}),
		);
	}
	useEffect(() => {
		Promise.all([
			axios.get("http://localhost:8001/api/days"),
			axios.get("http://localhost:8001/api/appointments"),
			axios.get("http://localhost:8001/api/interviewers"),
		]).then((all) => {
			setState((prev) => ({
				...prev,
				days: all[0].data,
				appointments: all[1].data,
				interviewers: all[2].data,
			}));
		});
	}, []);
	const setDay = (day) => setState({ ...state, day });
	return {
		state,
		setDay,
		bookInterview,
		cancelInterview,
	};
}
