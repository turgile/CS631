import React from "react";
import {
  ControlLabel,
  FormGroup,
  FormControl,
  HelpBlock
} from "react-bootstrap";

class Input extends React.Component {
  state = { value: "" };

  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  componentDidMount() {
    this.setState({ value: this.props.value });
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
          bsSize="large"
        />
        <HelpBlock>{this.props.help}</HelpBlock>
      </FormGroup>
    );
  }
}

export default Input;
