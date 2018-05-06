import React from "react";
import {
	FormGroup,
	ControlLabel,
	FormControl,
	HelpBlock
} from "react-bootstrap";

const fieldGroup = ({ id, label, help, ...props }) => {
	return (
		<FormGroup controlId={id}>
			<ControlLabel>{label}</ControlLabel>
			<FormControl {...props} />
			{help && <HelpBlock>{help}</HelpBlock>}
		</FormGroup>
	);
});

export default fieldGroup;