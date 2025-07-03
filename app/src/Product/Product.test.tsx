/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen } from "@testing-library/react";
import { Product } from "./Product";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";

describe("Product", () => {
  it("renders the product", () => {
    render(
      <Product
        title="Test Product"
        description="Test Description"
        id={"1"}
        open
      />
    );

    expect(screen.getByRole("term")).toHaveTextContent("Test Product");
    expect(screen.getByRole("definition")).toHaveTextContent(
      "Test Description"
    );
  });

  it("Displays 'No title' when the product title is missing", () => {
    render(<Product title="" description="Test Description" id={""} open />);

    expect(screen.getByRole("term")).toHaveTextContent("No title");
  });
  it("Displays 'No description' when the product description is missing", () => {
    render(<Product title="Test Product" description="" id={""} />);

    expect(screen.getByRole("definition")).toHaveTextContent("No description");
  });

  it("calls setOpenId when clicked", () => {
    const setOpenIdMock = jest.fn();
    render(
      <Product
        title="Test Product"
        description="Test Description"
        id="1"
        setOpenId={setOpenIdMock}
      />
    );

    userEvent.click(screen.getByRole("term"));
    expect(setOpenIdMock).toHaveBeenCalledWith("1");
  });

  it("calls setOpenId when Enter key is pressed", () => {
    const setOpenIdMock = jest.fn();
    render(
      <Product
        title="Test Product"
        description="Test Description"
        id="1"
        setOpenId={setOpenIdMock}
      />
    );

    const termElement = screen.getByRole("term");
    termElement.focus();
    userEvent.keyboard("{enter}");
    expect(setOpenIdMock).toHaveBeenCalledWith("1");
  });
  it("calls setOpenId when Space key is pressed", () => {
    const setOpenIdMock = jest.fn();
    render(
      <Product
        title="Test Product"
        description="Test Description"
        id="1"
        setOpenId={setOpenIdMock}
      />
    );
    const termElement = screen.getByRole("term");
    termElement.focus();
    userEvent.keyboard("{space}");
    expect(setOpenIdMock).toHaveBeenCalledWith("1");
  });

  it("calls setOpenId when touched", () => {
    const setOpenIdMock = jest.fn();
    render(
      <Product
        title="Test Product"
        description="Test Description"
        id="1"
        setOpenId={setOpenIdMock}
      />
    );

    const termElement = screen.getByRole("term");
    fireEvent.touchStart(termElement);
    fireEvent.touchEnd(termElement);
    expect(setOpenIdMock).toHaveBeenCalledWith("1");
  });

  it("does not call setOpenId when it is not provided", () => {
    const { container } = render(
      <Product title="Test Product" description="Test Description" id="1" />
    );

    const termElement = container.querySelector("dt");
    termElement?.click();
    expect(termElement).toBeInTheDocument();
  });
});
