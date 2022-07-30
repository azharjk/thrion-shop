import ReactModal from "react-modal";

interface CheckoutConfirmationModalProps {
  isOpen: boolean;
  onApprove: () => void;
  onCancel: () => void;
}

ReactModal.setAppElement("#__next");

export default function CheckoutConfirmationModal({
  isOpen,
  onApprove,
  onCancel,
}: CheckoutConfirmationModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      className="absolute p-4 top-0 bottom-0 left-0 right-0"
    >
      <div className="bg-slate-700 p-4 w-full max-w-[420px] text-white rounded-sm shadow-md mx-auto mt-16">
        <header className="mb-10 mt-4">
          <h1 className="text-white text-lg text-center">Are you sure?</h1>
        </header>
        <button
          onClick={onApprove}
          className="block w-full bg-slate-500 border mt-2 py-2 uppercase font-semibold rounded-sm"
        >
          Yes
        </button>
        <button
          onClick={onCancel}
          className="block w-full border mt-2 py-2 uppercase font-semibold rounded-sm"
        >
          Cancel
        </button>
      </div>
    </ReactModal>
  );
}
