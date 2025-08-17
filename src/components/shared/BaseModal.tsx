import React from 'react';

interface BaseModalProps {
  open: boolean;
  children: React.ReactNode;
  maxWidth?: string;
  onClose?: () => void;
}

const BaseModal: React.FC<BaseModalProps> = ({ open, children, maxWidth = 'max-w-md', onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-blue-300 bg-opacity-60">
      <div className={`bg-white rounded-3xl shadow-2xl p-8 w-full ${maxWidth} relative border border-blue-100`}>
        {onClose && (
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-blue-600 text-xl"
            onClick={onClose}
          >
            ×
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default BaseModal;
