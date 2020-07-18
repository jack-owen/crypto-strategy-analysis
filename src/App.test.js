import React from "react";
import { render, screen } from "@testing-library/react";
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
    expect(getByText("Control")).toBeInTheDocument();
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
