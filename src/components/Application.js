import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment/index";

const appointments = [
	{
		id: 1,
		time: "12pm",
		interview: {
			student: "Lewis Hamilton",
			interviewer: {
				id: 1,
				name: "Sylvia Palmer",
				avatar: "https://i.imgur.com/LpaY82x.png",
			},
		},
	},
	{
		id: 2,
		time: "1pm",
		interview: {
			student: "Kimi Raikonnen",
			interviewer: {
				id: 1,
				name: "Sylvia Palmer",
				avatar: "https://i.imgur.com/LpaY82x.png",
			},
		},
	},
	{
		id: 3,
		time: "2pm",
		interview: {
			student: "Sebatian Vettel",
			interviewer: {
				id: 1,
				name: "Sylvia Palmer",
				avatar: "https://i.imgur.com/LpaY82x.png",
			},
		},
	},
	{
		id: 4,
		time: "3pm",
		interview: {
			student: "George Russel",
			interviewer: {
				id: 1,
				name: "Sylvia Palmer",
				avatar: "https://i.imgur.com/LpaY82x.png",
			},
		},
	},
	{
		id: 5,
		time: "4pm",
		interview: {
			student: "Max Vershtappen",
			interviewer: {
				id: 1,
				name: "Sylvia Palmer",
				avatar: "https://i.imgur.com/LpaY82x.png",
			},
		},
	},
];

export default function Application(props) {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		// you may put the line below, but will have to remove/comment hardcoded appointments variable
		appointments: {},
	});

	const setDays = (days) => {
		setState((prev) => ({ ...prev, days }));
	};
	useEffect(() => {
		axios.get("/api/days").then((response) => setDays(response.data));
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
					<DayList days={state.days} day={state.day} /* setDay={state.day}*/ />
				</nav>
				<img
					className="sidebar__lhl sidebar--centered"
					src="images/lhl.png"
					alt="Lighthouse Labs"
				/>
			</section>
			<section className="schedule">
				{appointments.map((appointment) => (
					<Appointment key={appointment.id} {...appointment} />
				))}
				<Appointment key="last" time="5pm" />
			</section>
		</main>
	);
}
