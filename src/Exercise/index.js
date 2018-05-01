import React, { Component } from "react";
import Input from "../UI/Input";
import { Form, Well } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class Exercise extends Component {
  state = {};

  render() {
    return (
      <Form>
        <Input
          label="Exercise Name"
          validationCallback={function(value) {
            if (value.length < 5) {
              return "error";
            } else {
              return null;
            }
          }}
          help="Enter the name of the exercise."
        />
        <Well bsSize="large">
          <Editor />
        </Well>
      </Form>
    );
  }
}

export default Exercise;
