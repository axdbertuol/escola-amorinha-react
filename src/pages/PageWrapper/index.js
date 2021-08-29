import React, { useState } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  nav: {
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    justifyContent: "center",
    marginTop: "5rem",
    marginBottom: "5rem",
    "& > *": {
      // margin: theme.spacing(2),
    },
  },
}));

const PageWrapper = ({ children, title = "Escolinha Amorinha", size }) => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleListItemClick = (e, value) => {
    // console.log(e);
    handleClick(e);
    history.push(`/list/${value}`);
    handleClose();
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <Container maxWidth={size || "sm"}>
      <nav className={classes.nav}>
        <ButtonGroup variant="contained" color="secondary">
          <Button onClick={() => history.push("/")}>Home</Button>
          <Button onClick={() => history.push("/register")}>
            Registration
          </Button>
          {/* <Button onClick={() => history.push("/list")}>Student List</Button> */}
          <div>
            <Button
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              color="secondary"
              variant="contained"
            >
              List
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              style={{ zIndex: "1000" }}
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem
                          value={"table"}
                          onClick={(e) => handleListItemClick(e, "table")}
                        >
                          Table
                        </MenuItem>
                        <MenuItem
                          value={"default"}
                          onClick={(e) => handleListItemClick(e, "default")}
                        >
                          Default
                        </MenuItem>
                        {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </ButtonGroup>
      </nav>

      <div>{children}</div>
    </Container>
  );
};

export default PageWrapper;
