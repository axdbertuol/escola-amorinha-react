import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";

const ColorRadio = (props) => {
  const CustomRadio = withStyles({
    root: {
      color: purple[400],
      "&$checked": {
        color: purple[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  return <CustomRadio {...props} />;
};

export default ColorRadio;
