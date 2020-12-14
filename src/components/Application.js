import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";
import { getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});

	const setDay = (day) => setState({ ...state, day });
	const dailyAppointments = getAppointmentsForDay(state, state.day);
	const appointments = getAppointmentsForDay(state, state.day);
	const interviewers = getInterviewersForDay(state, state.day);

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
				console.log("poggers");
				setState({
					...state,
					appointments: all[0].data,
					days: all[1].data,
				});
			}),
		);
	}

	const schedule = appointments.map((appointment) => {
		const interview = getInterview(state, appointment.interview);
		return (
			<Appointment
				key={appointment.id}
				id={appointment.id}
				time={appointment.time}
				bookInterview={bookInterview}
				interview={interview}
				interviewers={interviewers}
				cancelInterview={cancelInterview}
			/>
		);
	});

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
	return (
		<main className="layout">
			<section className="sidebar">
				<img
					className="sidebar--centered"
					src="images/logo.png"
					alt="Interview Scheduler"
				/>
				<hr className="sidebar__separator sidebar--centered" />
				<nav className="sidebar__menu">
					<DayList
						days={state.days}
						day={state.day}
						setDay={setDay}
						bookInterview={bookInterview}
						cancelInterview={cancelInterview}
					/>
				</nav>
				<img
					className="sidebar__lhl sidebar--centered"
					src="images/lhl.png"
					alt="Lighthouse Labs"
				/>
			</section>
			<section className="schedule">
				{dailyAppointments.map((appointment) => schedule)}
				<Appointment
					key="last"
					time="5pm"
					bookInterview={bookInterview}
					cancelInterview={cancelInterview}
				/>
			</section>
		</main>
	);
}
