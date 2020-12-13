import React, { Fragment, useEffect } from "react";

import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";

export default function Appointment(props) {
	const EMPTY = "EMPTY";
	const SHOW = "SHOW";
	const CREATE = "CREATE";
	const ERROR_SAVE = "ERROR_SAVE";
	const SAVING = "SAVING";

	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY,
	);
	useEffect(() => {
		if (props.interview && mode === EMPTY) {
			transition(SHOW);
		}

		if (!props.interview && mode === SHOW) {
			transition(EMPTY);
		}
	}, [mode, transition, props.interview]);

	function save(name, interviewer) {
		if (name && interviewer) {
			transition(SAVING);
			const interview = {
				student: name,
				interviewer,
			};
			props.bookInterview(props.id, interview);
			// .then(() => transition(SHOW))
			// .catch(() => transition(ERROR_SAVE, true));
			transition(SHOW);
		}
	}

	return (
		<article className="appointment">
			<Header time={props.time} />
			<Fragment>
				{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
				{mode === SHOW && (
					<Show
						student={props.interview.student}
						interviewer={props.interview.interviewer}
					/>
				)}
				{mode === SAVING && <Status message="Saving" />}
				{mode === CREATE && (
					<Form
						name={props.name}
						value={props.value}
						interviewers={props.interviewers}
						onSave={save}
						onCancel={back}
					/>
				)}
			</Fragment>
		</article>
	);
}
