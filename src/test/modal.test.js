import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../components/Modal";

describe("Modal Component", () => {
  it("renders the modal when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    // Check if the modal is rendered
    const modalOverlay = screen.getByTestId("modal-overlay");
    const modalContent = screen.getByText("Modal Content");
    expect(modalOverlay).toBeInTheDocument();
    expect(modalContent).toBeInTheDocument();
  });

  it("does not render the modal when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    // Check if the modal is not in the document
    expect(screen.queryByTestId("modal-overlay")).not.toBeInTheDocument();
  });

  it("calls the onClose function when the close button is clicked", () => {
    const onCloseMock = jest.fn();

    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal>
    );

    // Click the close button
    const closeButton = screen.getByText("X");
    fireEvent.click(closeButton);

    // Check if the onClose function was called
    expect(onCloseMock).toHaveBeenCalled();
  });
});
