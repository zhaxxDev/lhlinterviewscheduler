const matchIds = (appointments, ids) => {
	const matched = ids.map((id) => appointments[id]);
	return matched;
};
function getAppointmentsForDay(state, day) {
	let appointmentArr = [];
	// eslint-disable-next-line
	state.days.map((dayObject) => {
		if (dayObject.name === day) {
			dayObject.appointments.forEach((apptId) => appointmentArr.push(apptId));
		}
	});
	return matchIds(state.appointments, appointmentArr);
}

function getInterview(state, interview) {
	if (!interview) {
		return null;
	}

	const interviewerInfo = state.interviewers[interview.interviewer];
	return {
		student: interview.student,
		interviewer: interviewerInfo,
	};
}

function getInterviewersForDay(state, day) {
	let interviewersArr = [];
	// eslint-disable-next-line
	state.days.map((dayObject) => {
		if (dayObject.name === day) {
			dayObject.interviewers.forEach((interviewerId) =>
				interviewersArr.push(interviewerId),
			);
		}
	});
	return matchIds(state.interviewers, interviewersArr);
}

module.exports = {
	matchIds,
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay,
};
