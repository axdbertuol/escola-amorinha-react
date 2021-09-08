import React, { useContext } from "react";
import {
  Grid,
  Paper,
  ButtonBase,
  Typography,
  colors,
  IconButton,
  Divider,
  Button,
  Modal,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CloseIcon from "@material-ui/icons/Close";
import { useFormik, Formik, useFormikContext } from "formik";

import PageWrapper from "../PageWrapper";
import { Context as AuthContext } from "../../context/AuthContext";
import passwordValidationSchema from "./schema";
import useStyles from "./style";

function getModalStyle() {
  const top = 40;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const MakeModalBody = (userId, classes, handleClose) => {
  const [modalStyle] = React.useState(getModalStyle);
  const formik = useFormik({
    initialValues: {
      currPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: async (values) => {
      // check oldpassword with api
      try {
        const response = await fetch("/api/check-password", {
          method: "POST",
          body: JSON.stringify({
            id: userId,
            passwordToCheck: values.currPassword,
          }),
        });
        const data = await response.json();
        console.log("data", data);
        if (data.status === 201) {
          // then check new password === new password confirm

          if (values.newPassword === values.newPasswordConfirm) {
            try {
              // then call api to change password

              const response = await fetch("/api/change-password", {
                method: "POST",
                body: JSON.stringify({
                  id: userId,
                  newPassword: values.newPassword,
                }),
              });
              const data = await response.json();
              if (data.status === 201) {
                alert("Success");
              } else {
                alert("Error");
              }
            } catch (error) {
              console.log("newPasswordError", error);
            }
          } else {
            alert("Favor confirmar as senhas novas");
          }
        } else {
          alert("Senha atual inválida");
        }
        // console.log("check-password", data);
      } catch (error) {
        console.log("onSubmit checkpassword", error);
      }
    },
  });

  return (
    <div style={modalStyle} className={classes.modal}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="currPassword"
          name="currPassword"
          fullWidth
          label="Senha Atual"
          value={formik.currPassword}
          onChange={formik.handleChange}
        />
        <TextField
          id="newPassword"
          name="newPassword"
          fullWidth
          label="Senha Nova"
          value={formik.newPassword}
          onChange={formik.handleChange}
        />
        <TextField
          id="newPasswordConfirm"
          name="newPasswordConfirm"
          fullWidth
          label="Repita Senha Nova"
          value={formik.newPasswordConfirm}
          onChange={formik.handleChange}
        />
        <div style={{ marginTop: "1rem" }}>
          <Button variant="outlined" type="submit">
            Mudar
          </Button>
        </div>
        <IconButton
          style={{ position: "absolute", top: 0, right: 0, zIndex: 4 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </form>
    </div>
  );
};

const UserProfilePage = () => {
  const {
    state: { user },
  } = useContext(AuthContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    setOpen(false);
  };
  const rows = [
    { label: "Nome", value: user.name },
    { label: "Email", value: user.email },
    { label: "Cargo", value: user.job },
    { label: "Turmas", value: user.classNumbers.join() },
  ];

  return (
    <PageWrapper size="sm">
      <TableContainer className={classes.paper} component={Paper}>
        <Typography
          variant="h3"
          style={{ textAlign: "center", marginBottom: "1rem" }}
        >
          Dados do Usuário
        </Typography>
        <Divider />
        <Table>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.label}>
                <TableCell className={classes.label}>{row.label}</TableCell>
                <TableCell>{row.value}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className={classes.label}>Senha</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={handleOpen}>
                  Mudar senha
                </Button>
              </TableCell>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {MakeModalBody(user.id, classes, handleClose)}
              </Modal>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </PageWrapper>
  );
};

export default UserProfilePage;
