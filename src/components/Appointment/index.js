import React, { Fragment } from "react";

import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";

export default function Appointment(props) {
	const EMPTY = "EMPTY";
	const SHOW = "SHOW";
	const CREATE = "CREATE";

	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY,
	);

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
				{mode === CREATE && (
					<Form
						name={props.name}
						value={props.value}
						interviewers={props.interviewers}
						onCancel={back}
					/>
				)}
			</Fragment>
		</article>
	);
}
