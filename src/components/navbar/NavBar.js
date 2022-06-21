import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import logo from "../../assets/commerce.png";
import useStyles from "./styles";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../common/Routes";

function NavBar({ totalItems = 0 }) {
  const classes = useStyles();
  const location = useLocation();
  return (
    <div>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to={ROUTES.HOME}
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="Commerce.js"
              height={"25px"}
              className={classes.image}
            />
            Commerce.js
          </Typography>
          <div className={classes.grow} />
          {location.pathname === ROUTES.HOME && (
            <div className={classes.button}>
              <Link to={ROUTES.CART}>
                <IconButton aria-label="Show cart items" color="inherit">
                  <Badge badgeContent={totalItems} color={"secondary"}>
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
