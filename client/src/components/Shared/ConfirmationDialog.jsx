import React from "react";
import PropTypes from "prop-types";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from "@mui/material";

const ConfirmationDialog = ({
    open,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel",
    confirmColor = "primary",
    cancelColor = "secondary",
}) => {
    return (
        <Dialog open={open} onClose={onCancel}>
            {title && <DialogTitle>{title}</DialogTitle>}
            {message && (
                <DialogContent>
                    <DialogContentText>{message}</DialogContentText>
                </DialogContent>
            )}
            <DialogActions>
                <Button onClick={onCancel} color={cancelColor}>
                    {cancelText}
                </Button>
                <Button onClick={onConfirm} variant="contained" sx={{
                    bgcolor: '#FF6216',

                    '&:hover': {
                        bgcolor: '#E55A12',
                    },
                }}>
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ConfirmationDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    confirmColor: PropTypes.string,
    cancelColor: PropTypes.string,
};

export default ConfirmationDialog;
