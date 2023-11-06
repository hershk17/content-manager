import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Link } from "react-router-dom";

// TODO: remove any and replace with correct type
const RouterLink = forwardRef(({ href, ...other }: any, ref: any) => <Link ref={ref} to={href} {...other} />);

RouterLink.propTypes = {
  href: PropTypes.string,
};

export default RouterLink;
