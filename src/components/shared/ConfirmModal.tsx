import React from 'react';
import BaseModal from './BaseModal';

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title = 'Confirmar acción',
  message,
  onConfirm,
  onCancel,
  confirmText = 'Aceptar',
  cancelText = 'Cancelar',
}) => {
  return (
    <BaseModal open={open} maxWidth="max-w-sm" onClose={onCancel}>
      <h2 className="text-xl font-bold text-blue-700 mb-4">{title}</h2>
      <p className="mb-6 text-gray-700">{message}</p>
      <div className="flex justify-end gap-4">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg"
          onClick={onCancel}
        >
          {cancelText}
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
          onClick={onConfirm}
        >
          {confirmText}
        </button>
      </div>
    </BaseModal>
  );
};

export default ConfirmModal;
