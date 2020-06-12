import React, { Component } from "react";

class InputForm extends Component {
  // todo:
  // add investment period parameter input
  //    months first,
  //    year second,
  //    day third,
  // add shortcut actions to defined 6 month period etc.
  //    2 years.
  //
  // add daily investment option
  // add bi-monthly investment option
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const payload = {
      investmentPerMonth: value,
      name: "investmentPerMonth",
    };

    this.props.update({
      value: value,
      name: name,
    });

    // this.props.update(event.target.value);
  }

  render() {
    return (
      <form className="strategyInput" onSubmit={this.handleSubmit}>
        <h4>input form</h4>

        <label>
          Investment per Month:
          <input
            type="text"
            name="investmentPerMonth"
            value={this.props.investmentPerMonth} //value of the passed component property
            onChange={this.handleChange}
          />
        </label>
        <label>
          Start:
          <input
            type="text"
            name="startMonth"
            value={this.props.investmentPeriod.startMonth} //value of the passed component property
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="startYear"
            value={this.props.investmentPeriod.startYear} //value of the passed component property
            onChange={this.handleChange}
          />
        </label>
      </form>
    );
  }
}

export default InputForm;
