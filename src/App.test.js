import React from "react";
import {
  render,
  screen,
  fireEvent,
  getByLabelText,
} from "@testing-library/react";
import App from "./App";

// test("renders learn react link", () => {
//   const { getByText } = render(<App />);
//   // const linkElement = getByText(/learn react/i);
//   const linkElement = getByText(/App/);
//   expect(linkElement).toBeInTheDocument();
// });

describe("App", () => {
  test("app is present", () => {
    // expect(true).toBe(true);
    const { getByText } = render(<App />);
    // screen.debug();

    const element = getByText(/Crypto Strategy/);
    expect(element).toBeInTheDocument();
  });

  test("drawer button loaded", () => {
    // const { getByRole } = render(<App />);
    const { getByLabelText, getByText } = render(<App />);

    let element = getByText(/See more/);
    // const element = getByLabelText(/open drawer/);
    expect(element).toBeInTheDocument();

    expect(getByLabelText(/open drawer/)).toBeInTheDocument();
  });

  // test("save strategy button", () => {
  //   // const { getByRole } = render(<App />);
  //   const { getByLabelText, getByText, getAllByRole } = render(<App />);
  //   let element = getAllByRole("button").toHaveTextContent("Save");
  //   // const element = getByLabelText(/open drawer/);
  //   expect(element).toBeInTheDocument();
  //   // expect(getByLabelText(/open drawer/)).toBeInTheDocument();
  // });
});

describe("Dashboard", () => {
  test("strategy control section loaded", () => {
    const { getByText } = render(<App />);
    expect(getByText(/Control/i)).toBeInTheDocument();
  });

  test("Strategy chart section loaded", () => {
    const { getByText } = render(<App />);
    expect(getByText("Strategy")).toBeInTheDocument();
  });

  test("Strategy summary section loaded", () => {
    const { getByText } = render(<App />);
    expect(getByText(/Summary/)).toBeInTheDocument();
  });

  test("Strategy breakdown section loaded", () => {
    const { getByText } = render(<App />);
    expect(getByText(/Breakdown/)).toBeInTheDocument();
  });

  test("Saved strategies section loaded", () => {
    const { getByText } = render(<App />);
    expect(getByText(/Saved strategies/)).toBeInTheDocument();
  });

  // test("Hint section loaded", () => {
  //   const { getByText, getByLabelText, getByRole } = render(<App />);
  //   expect(getByText(/Control/)).toBeInTheDocument();
  // });

  test("Recommended link", () => {
    const { getByText } = render(<App />);
    expect(getByText(/Recommended/)).toBeInTheDocument();
  });

  test("Compare saves link", () => {
    const { getByText } = render(<App />);
    expect(getByText(/Compare saves/)).toBeInTheDocument();
  });
});

test("save strategy button", () => {
  const {
    getByText,
    getByRole,
    getAllByRole,
    getByLabelText,
    getByTitle,
    getByTestId,
  } = render(<App />);

  // expect(getByRole("button")).toBeInTheDocument();
  // getAllByRole("button");
  const element = getByRole("button", { name: /^save$/i });
  // screen.debug();
  expect(element).toBeInTheDocument();

  // input a strategy into control form
  const dateStart = getByLabelText("start", { selector: "input" });
  expect(dateStart).toBeInTheDocument();
  fireEvent.change(dateStart, {
    target: { value: "2017-01-01" },
  });
  expect(dateStart).toHaveValue("2017-01-01");

  const dateEnd = getByLabelText("end", { selector: "input" });
  expect(dateEnd).toBeInTheDocument();
  fireEvent.change(dateEnd, {
    target: { value: "2019-01-01" },
  });
  expect(dateEnd).toHaveValue("2019-01-01");

  const amount = getByLabelText("Amount", { selector: "input" });
  expect(amount).toBeInTheDocument();
  fireEvent.change(amount, {
    target: { value: "20000" },
  });
  expect(amount).toHaveValue("20000");

  // test frequency drop down
  // const frequency = getByLabelText("Frequency", { selector: "input" });
  // expect(frequency).toBeInTheDocument();
  // fireEvent.change(frequency, {
  //   target: { value: "daily" },
  // });
  // expect(frequency).toHaveValue("daily");
  // fireEvent.change(frequency, {
  //   target: { value: "weekly" },
  // });
  // expect(frequency).toHaveValue("weekly");
});
