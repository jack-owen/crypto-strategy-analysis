import React, { Component } from "react";

class InputForm extends Component {
  // todo: add investment per month amount input
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.update(event.target.value);
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>input form</h4>

        <label>
          Investment per Month:
          <input
            type="text"
            value={this.props.investmentPerMonth} //value of the passed component property
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default InputForm;
