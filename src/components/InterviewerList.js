import React from "react";
import "./InterviewerList.scss";

const classNames = require("classnames");

export default function InterviewerList(props) {
	return (
		<section className="interviewers">
			<h4 className="interviewers__header text--light">Interviewer</h4>
			<ul className="interviewers__list"></ul>
		</section>
	);
}

// export default function InterviewerListItem(props) {
// 	const InterviewerClass = classNames("interviewers__item", {
// 		"interviewers__item--selected": props.selected,
// 	});

// 	return (
// 		<li className={InterviewerClass} onClick={props.setInterviewer}>
// 			<img
// 				className="interviewers__item-image"
// 				src={props.avatar}
// 				alt={props.name}
// 			/>
// 			{props.selected && props.name}
// 		</li>
// 	);
// }
