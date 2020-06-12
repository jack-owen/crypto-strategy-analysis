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
    this.props.update({
      value: value,
      name: name,
    });
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
            name="startDay"
            value={this.props.investmentPeriod.startDay} //value of the passed component property
            onChange={this.handleChange}
          />
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
        <label>
          End:
          <input
            type="text"
            name="endDay"
            value={this.props.investmentPeriod.endDay} //value of the passed component property
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="endMonth"
            value={this.props.investmentPeriod.endMonth} //value of the passed component property
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="endYear"
            value={this.props.investmentPeriod.endYear} //value of the passed component property
            onChange={this.handleChange}
          />
        </label>
      </form>
    );
  }
}

export default InputForm;
