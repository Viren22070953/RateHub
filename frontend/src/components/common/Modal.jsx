import { X } from "lucide-react";

const Modal = ({ title, children, onClose }) => (
  <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
    <section className="modal" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h2>{title}</h2>
        <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
      </div>
      {children}
    </section>
  </div>
);

export default Modal;
