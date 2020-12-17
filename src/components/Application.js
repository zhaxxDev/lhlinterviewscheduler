import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import useApplicationData from "hooks/useApplicationData";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";
import { getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
	const {
		state,
		setDay,
		bookInterview,
		cancelInterview,
	} = useApplicationData();

	const dailyAppointments = getAppointmentsForDay(state, state.day);
	const appointments = getAppointmentsForDay(state, state.day);

	const schedule = appointments.map((appointment) => {
		const interview = getInterview(state, appointment.interview);
		const interviewers = getInterviewersForDay(state, state.day);
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
