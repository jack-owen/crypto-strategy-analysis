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
        <h4>Enter Your BTC Strategy Conditions</h4>

        <div>
          <label className="buyAmount">Purchase amount:</label>
          <input
            type="text"
            name="investmentPerMonth"
            value={this.props.investmentPerMonth} //value of the passed component property
            onChange={this.handleChange}
          />
        </div>
        <div className="buyFrequency">
          <div className="checkboxes">
            <input
              type="checkbox"
              id="daily"
              name="buyFrequency"
              value="daily"
              checked={this.props.buyFrequency === "daily" ? true : false}
              onChange={this.handleChange}
            />
            <label htmlFor="daily">Daily</label>
          </div>
          <div className="checkboxes">
            <input
              type="checkbox"
              id="weekly"
              name="buyFrequency"
              value="weekly"
              checked={this.props.buyFrequency === "weekly" ? true : false}
              onChange={this.handleChange}
            />
            <label htmlFor="weekly">Weekly</label>
          </div>
          <div className="checkboxes">
            <input
              type="checkbox"
              id="monthly"
              name="buyFrequency"
              value="monthly"
              checked={this.props.buyFrequency === "monthly" ? true : false}
              onChange={this.handleChange}
            />
            <label htmlFor="monthly">Monthly</label>
          </div>
        </div>

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
