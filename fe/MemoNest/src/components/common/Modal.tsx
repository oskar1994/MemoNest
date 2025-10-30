import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmLabel = 'OK',
  cancelLabel = 'Anuluj',
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent dividers>{children}</DialogContent>
      {(onClose || onConfirm) && (
        <DialogActions>
          {onClose && <Button onClick={onClose}>{cancelLabel}</Button>}
          {onConfirm && <Button onClick={onConfirm}>{confirmLabel}</Button>}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;
