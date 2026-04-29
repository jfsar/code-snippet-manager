import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import { useDeleteSnippet } from "../../actions/snippets/useDeleteSnippet";
import { useNavigate } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

export default function ConfirmItemDeletionDialog({
  id,
  owner,
}: {
  id: string;
  owner: string;
}) {
  const [open, setOpen] = React.useState(false);
  const { deleteSnippet, isPending } = useDeleteSnippet();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteSnippet(id, {
      onSuccess() {
        const queryClient = new QueryClient();
        queryClient.invalidateQueries({ queryKey: ["snippets", owner] });
        navigate("/snippets");
      },
    });
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton
        aria-label="delete"
        color="error"
        size="small"
        onClick={handleClickOpen}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this item?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button
            color="error"
            size="small"
            loading={isPending}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
