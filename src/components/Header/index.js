import React from "react";
import Typography from "@material-ui/core/Typography";

import "./header.css";

const Header = ({ title }) => {
  return (
    <header className="header">
      <Typography variant="h3" component="h2" color="primary">
        {title}
      </Typography>
    </header>
  );
};

export default Header;
