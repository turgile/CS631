import React, { Component } from "react";
import Input from "../UI/Input";
import { Form } from "react-bootstrap";
import { Editor, EditorState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class Exercise extends Component {
	constructor(props) {
		super(props);
		//this.state = { editorState: EditorState.createEmpty() };
		//this.onChange = editorState => this.setState({ editorState });
	}
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
				<Editor /*editorState={this.state.editorState} onEditorStateChange={this.onChange}*/
				/>
			</Form>
		);
	}
}

export default Exercise;
