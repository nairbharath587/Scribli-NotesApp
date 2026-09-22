import { FileText } from "lucide-react";
import { useState } from "react";
import Ocr from "./Ocr";

const OcrModal = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="btn btn-primary" onClick={() => setOpen(true)}>
        <FileText/>
        <span>Image to Text</span>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-xl rounded-2xl bg-base-100 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">OCR Scanner</h2>

              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="mt-6 min-h-64 rounded-xl border border-dashed border-base-300">
                <Ocr/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OcrModal;