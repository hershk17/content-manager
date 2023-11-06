import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { forwardRef } from "react";

// TODO: remove any and add proper types
const Iconify = forwardRef(({ icon, width = 20, sx, ...other }: any, ref) => (
  <Box
    ref={ref}
    component={Icon}
    className="component-iconify"
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
));

Iconify.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  width: PropTypes.number,
};

export default Iconify;
