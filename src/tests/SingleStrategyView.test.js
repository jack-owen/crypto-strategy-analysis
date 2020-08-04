import React from "react";
import {
  render,
  screen,
  fireEvent,
  getByLabelText,
  getByText,
} from "@testing-library/react";
import SingleStrategyView from "./../components/SingleStrategyView";

const EXAMPLE_STRATEGY = {
  // dateEnd: "2020-05-01",
  dateEnd: "",
  // dateStart: "2018-01-01",
  dateStart: "",
  // investmentAmount: 10,
  investmentAmount: 0,
  investmentFrequency: "daily",
  loaded: true,
};

describe("Single Strategy View component", () => {
  test("control form presence", () => {
    render(
      <SingleStrategyView
        strategy={EXAMPLE_STRATEGY}
        // setLoadedStrategy={setLoadedStrategy}
        // setSavedStrategies={setSavedStrategies}
        data={[]}
        strategyReport={[]}
      />
    );

    const aboutAnchorNode = screen.getByText(/Control/i);
  });

  test("strategy chart view", () => {
    render(
      <SingleStrategyView
        strategy={EXAMPLE_STRATEGY}
        // setLoadedStrategy={setLoadedStrategy}
        // setSavedStrategies={setSavedStrategies}
        data={[]}
        strategyReport={[]}
      />
    );

    const aboutAnchorNode = screen.getByText(/Strategy/i);
  });

  test("strategy summary presence", () => {
    render(
      <SingleStrategyView
        strategy={EXAMPLE_STRATEGY}
        // setLoadedStrategy={setLoadedStrategy}
        // setSavedStrategies={setSavedStrategies}
        data={[]}
        strategyReport={[]}
      />
    );

    const aboutAnchorNode = screen.getByText(/Summary/i);
  });

  test("strategy breakdown presence", () => {
    render(
      <SingleStrategyView
        strategy={EXAMPLE_STRATEGY}
        // setLoadedStrategy={setLoadedStrategy}
        // setSavedStrategies={setSavedStrategies}
        data={[]}
        strategyReport={[]}
      />
    );
    const aboutAnchorNode = screen.getByText(/Breakdown/i);
  });
});

// check graph updates according to user input change
test("summary changes on control input change", () => {
  const mockCallback = jest.fn((x) => x);

  render(
    <SingleStrategyView
      strategy={EXAMPLE_STRATEGY}
      setLoadedStrategy={mockCallback}
      // setSavedStrategies={setSavedStrategies}
      data={[]}
      strategyReport={[]}
    />
  );

  const dateEnd = screen.getByLabelText("end", { selector: "input" });
  expect(dateEnd).toBeInTheDocument();
  screen.debug(dateEnd);
  fireEvent.change(dateEnd, {
    target: { value: "2019-01-01" },
  });
  expect(mockCallback.mock.calls.length).toBe(1);
  expect(mockCallback.mock.results[0].value.dateEnd).toBe("2019-01-01");

  //   expect(dateEnd).toHaveValue("2019-01-01");
});
