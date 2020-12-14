import React, { Fragment, useEffect } from "react";

import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

export default function Appointment(props) {
	const EMPTY = "EMPTY";
	const SHOW = "SHOW";
	const CREATE = "CREATE";
	const ERROR_SAVE = "ERROR_SAVE";
	const ERROR_DELETE = "ERROR_DELETE";
	const SAVING = "SAVING";
	const DELETING = "DELETING";
	const CONFIRM = "CONFIRM";
	const EDITING = "EDITING";

	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY,
	);

	function save(name, interviewer) {
		if (name && interviewer) {
			const interview = {
				student: name,
				interviewer,
			};
			transition(SAVING);
			props
				.bookInterview(props.id, interview)
				.then((response) => transition(SHOW))
				.catch((error) => transition(ERROR_SAVE, true));
		}
	}

	function remove() {
		if (mode === CONFIRM) {
			transition(DELETING, true);
			props
				.cancelInterview(props.id)
				.then((response) => transition(EMPTY))
				.catch((error) => transition(ERROR_DELETE, true));
		} else {
			transition(CONFIRM);
		}
	}

	function edit() {
		transition(EDITING);
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
						onDelete={remove}
						onEdit={edit}
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
				{mode === DELETING && <Status message="Deleting" />}
				{mode === CONFIRM && (
					<Confirm
						onCancel={back}
						onConfirm={remove}
						message="Are you sure you would like to delete?"
					/>
				)}
				{mode === EDITING && (
					<Form
						name={props.interview.student}
						interviewer={props.interview.interviewer.id}
						interviewers={props.interviewers}
						onSave={save}
						onCancel={back}
					/>
				)}
				{mode === ERROR_SAVE && (
					<Error message="Could not create appointment" onClose={back} />
				)}
				{mode === ERROR_DELETE && (
					<Error message="Could not cancel appointment" onClose={back} />
				)}
			</Fragment>
		</article>
	);
}
