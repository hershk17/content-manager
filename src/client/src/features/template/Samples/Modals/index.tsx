import PropTypes from "prop-types";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import { Card, CardContent, CardHeader, Container, Divider, Grid, ListItemButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import Footer from "../../../../components/Footer";
import PageTitle from "../../../../components/PageTitle";
import PageTitleWrapper from "../../../../components/PageTitleWrapper";

const emails = ["username@gmail.com", "user02@gmail.com"];

interface Props {
  onClose: (value: string) => void;
  open: boolean;
  selectedValue: string;
}

function SimpleDialog(props: Props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItemButton onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItemButton>
        ))}

        <ListItemButton autoFocus onClick={() => handleListItemClick("addAccount")}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItemButton>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function Modals() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <Helmet>
        <title>Modals - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Modals"
          subHeading="Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks."
          docs="https://material-ui.com/components/dialogs/"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Basic Dialog" />
              <Divider />
              <CardContent>
                <Typography variant="subtitle1" component="div">
                  Selected: {selectedValue}
                </Typography>
                <br />
                <Button variant="outlined" onClick={handleClickOpen}>
                  Open simple dialog
                </Button>
                <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Modals;
