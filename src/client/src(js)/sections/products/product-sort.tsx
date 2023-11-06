import Button from "@mui/material/Button";
import { listClasses } from "@mui/material/List";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Iconify from "../../components/iconify";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "priceDesc", label: "Price: High-Low" },
  { value: "priceAsc", label: "Price: Low-High" },
];

export default function ShopProductSort() {
  const [open, setOpen] = useState(null);

  // TODO: remove any and add proper types
  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? "eva:chevron-up-fill" : "eva:chevron-down-fill"} />}>
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: "text.secondary" }}>
          Newest
        </Typography>
      </Button>

      <Menu
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              [`& .${listClasses.root}`]: {
                p: 0,
              },
            },
          },
        }}>
        {SORT_OPTIONS.map((option) => (
          <MenuItem key={option.value} selected={option.value === "newest"} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
