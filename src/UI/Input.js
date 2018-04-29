import React from "react";
import {
  ControlLabel,
  FormGroup,
  FormControl,
  HelpBlock,
  Feedback
} from "react-bootstrap";

class Input extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ""
    };
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  render() {
    return (
      <FormGroup
        controlId="formBasicText"
        validationState={this.props.validationCallback(this.state.value)}
      >
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl
          type="text"
          value={this.state.value}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
        />
        <HelpBlock>{this.props.help}</HelpBlock>
      </FormGroup>
    );
  }
}

export default Input;
