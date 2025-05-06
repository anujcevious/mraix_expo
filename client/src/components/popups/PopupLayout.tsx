import React from "react";
import Icons from "../ui/Icons";

interface PopupLayoutProps {
  title: string;
  onClose: () => void;
  handleClick: () => void;
  icon?: string;
  itemId: string;
  children: React.ReactNode;
}
export default function PopupLayout({
  title,
  onClose,
  itemId,
  handleClick,
  icon,
  children,
}: PopupLayoutProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
      <div className="bg-white h-[100vh] w-full max-w-md rounded-l-lg shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex bg-secondary/10 items-center justify-between px-6 py-4 ">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold">{title}</h2>
          </div>
          <button onClick={onClose}>
            <Icons name="close" onClick={() => {}} size={16} />
          </button>
        </div>

        {/* Body content scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>

        {/* Footer */}
        <div className="flex bg-secondary/10 justify-center gap-5 py-3 border-t">
          <button
            onClick={onClose}
            className="px-4 text-xs py-1.5 rounded border"
          >
            Cancel
          </button>
          <button
            onClick={handleClick}
            className="px-4 text-xs py-1.5 rounded bg-violet-600 text-white"
          >
            {itemId ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
