import { useState } from "react";

import {
  Menu,
  MenuItem,
  Avatar
} from "@mui/material";

function ProfileMenu() {

  const [anchorEl,
    setAnchorEl] =
    useState(null);

  const open =
    Boolean(anchorEl);

  const handleLogout =
    () => {

      localStorage.clear();

      window.location.href =
        "/";
    };

  return (
    <>
      <Avatar
        sx={{
          cursor: "pointer"
        }}
        onClick={(e) =>
          setAnchorEl(
            e.currentTarget
          )
        }
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() =>
          setAnchorEl(null)
        }
      >
        <MenuItem>
          Profile
        </MenuItem>

        <MenuItem>
          Settings
        </MenuItem>

        <MenuItem
          onClick={
            handleLogout
          }
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default ProfileMenu;