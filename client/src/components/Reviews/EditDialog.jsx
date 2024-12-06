import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const EditDialog = ({  open, onClose, title, content, actions, maxWidth = 'sm', fullWidth = false }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth={fullWidth}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        {content}
      </DialogContent>
      {actions && (
        <DialogActions>
          {actions.map((action, index) => (
            <Button 
              key={index} 
              onClick={action.onClick} 
              color={action.color || 'primary'}
              variant={action.variant || 'contained'}
              sx={action.sx}  
            >
              {action.label}
            </Button>
          ))}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default EditDialog;
