import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { createPortal } from "react-dom";

interface Props {
  onClose: () => void;
  content: React.ReactNode;
}

const Popover = ({ onClose, content }: Props) => {
  // Use React Portal to render this component at the root level of the DOM
  return createPortal(
    <div className="fixed text-black dark:text-white inset-0 flex items-center justify-center z-50">
      {/* Background overlay covering the full screen */}
      <div
        className="bg-black opacity-50 fixed inset-0 z-40"
        onClick={onClose}
      ></div>

      {/* Popover content */}
      <div className="relative bg-secondary dark:bg-dark-secondary p-6 rounded-lg shadow-lg z-50 max-w-lg w-full">
        {/* Close button positioned at the top-right */}
        <button
          className="fixed top-8 right-8 bg-tertiary dark:bg-dark-tertiary px-3 py-2 rounded-full text-[18px] hover:bg-primary dark:hover:bg-dark-primary ease-in-out duration-300"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
        {content}
      </div>
    </div>,
    document.body // Renders the popover outside the normal component hierarchy
  );
};

export default Popover;
