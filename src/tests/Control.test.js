import React from "react";
import { render, screen } from "@testing-library/react";
import Control from "./../components/Control";

describe("Strategy Controls", () => {
  const strategy = {
    dateEnd: "2020-05-01",
    dateStart: "2018-01-01",
    investmentAmount: 10,
    investmentFrequency: "monthly",
    loaded: true,
  };

  test("save strategy button", () => {
    const { getByText, getByRole, getAllByRole } = render(
      <Control
        strategy={strategy}
        // handleChange={props.setLoadedStrategy}
        // setSavedStrategies={props.setSavedStrategies}
      />
    );
    // expect(getByRole("button")).toBeInTheDocument();
    // getAllByRole("button");
    const element = getByRole("button", { name: /^save$/i });
    // screen.debug();
    expect(element).toBeInTheDocument();

    // test button click saves the strategy data to the parent state (userEvent)
  });

  test("strategy start date input", () => {
    const { getByText, getByLabelText, getByRole, getAllByRole } = render(
      <Control strategy={strategy} />
    );
    const element = getByLabelText(/^start$/i);

    expect(element).toBeInTheDocument();

    // making an input change changes the state strategy value accurately
    //... use userEvent or maybe fireEvent
  });

  test("strategy end date input", () => {
    const { getByText, getByLabelText, getByRole, getAllByRole } = render(
      <Control strategy={strategy} />
    );
    const element = getByLabelText(/^end$/i);

    expect(element).toBeInTheDocument();

    // making an input change changes the state strategy value accurately
    //... use userEvent or maybe fireEvent
  });

  test("strategy amount input", () => {
    const { getByText, getByLabelText, getByRole, getAllByRole } = render(
      <Control strategy={strategy} />
    );
    const element = getByLabelText(/^amount$/i);

    expect(element).toBeInTheDocument();

    // making an input change changes the state strategy value accurately
    //... use userEvent or maybe fireEvent});
  });

  test("strategy frequency input", () => {
    const { getByText, getByLabelText, getByRole, getAllByRole } = render(
      <Control strategy={strategy} />
    );
    const element = getByLabelText(/^frequency$/i);

    expect(element).toBeInTheDocument();

    // making an input change changes the state strategy value accurately
    //... use userEvent or maybe fireEvent});
  });
});
