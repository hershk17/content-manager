import { useContext } from "react";

import {
  Box,
  Button,
  List,
  ListItem,
  ListSubheader,
  alpha,
  styled,
} from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";
import { SidebarContext } from "../../../../providers/SidebarProvider";

import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import BallotTwoToneIcon from "@mui/icons-material/BallotTwoTone";
import BeachAccessTwoToneIcon from "@mui/icons-material/BeachAccessTwoTone";
import BrightnessLowTwoToneIcon from "@mui/icons-material/BrightnessLowTwoTone";
import CameraFrontTwoToneIcon from "@mui/icons-material/CameraFrontTwoTone";
import CheckBoxTwoToneIcon from "@mui/icons-material/CheckBoxTwoTone";
import ChromeReaderModeTwoToneIcon from "@mui/icons-material/ChromeReaderModeTwoTone";
import DesignServicesTwoToneIcon from "@mui/icons-material/DesignServicesTwoTone";
import DisplaySettingsTwoToneIcon from "@mui/icons-material/DisplaySettingsTwoTone";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import FilterVintageTwoToneIcon from "@mui/icons-material/FilterVintageTwoTone";
import HowToVoteTwoToneIcon from "@mui/icons-material/HowToVoteTwoTone";
import LocalPharmacyTwoToneIcon from "@mui/icons-material/LocalPharmacyTwoTone";
import MmsTwoToneIcon from "@mui/icons-material/MmsTwoTone";
import RedeemTwoToneIcon from "@mui/icons-material/RedeemTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import TableChartTwoToneIcon from "@mui/icons-material/TableChartTwoTone";
import TrafficTwoToneIcon from "@mui/icons-material/TrafficTwoTone";
import WorkspacePremiumTwoToneIcon from "@mui/icons-material/WorkspacePremiumTwoTone";

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(["color"])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  "transform",
                  "opacity",
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);

  return (
    <MenuWrapper>
      <List
        component="div"
        subheader={
          <ListSubheader component="div" disableSticky>
            Home
          </ListSubheader>
        }
      >
        <SubMenuWrapper>
          <List component="div">
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/dashboard"
                startIcon={<BrightnessLowTwoToneIcon />}
              >
                Dashboard
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/messenger"
                startIcon={<MmsTwoToneIcon />}
              >
                Messenger
              </Button>
            </ListItem>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/transactions"
                  startIcon={<TableChartTwoToneIcon />}
                >
                  Transactions
                </Button>
              </ListItem>
            </List>
          </List>
        </SubMenuWrapper>
      </List>
      <List
        component="div"
        subheader={
          <ListSubheader component="div" disableSticky>
            Account
          </ListSubheader>
        }
      >
        <SubMenuWrapper>
          <List component="div">
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/profile/details"
                startIcon={<AccountCircleTwoToneIcon />}
              >
                User Profile
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/profile/settings"
                startIcon={<DisplaySettingsTwoToneIcon />}
              >
                Settings
              </Button>
            </ListItem>
          </List>
        </SubMenuWrapper>
      </List>
      <List
        component="div"
        subheader={
          <ListSubheader component="div" disableSticky>
            Sample Components
          </ListSubheader>
        }
      >
        <SubMenuWrapper>
          <List component="div">
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/sample/buttons"
                startIcon={<BallotTwoToneIcon />}
              >
                Buttons
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/sample/modals"
                startIcon={<BeachAccessTwoToneIcon />}
              >
                Modals
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/sample/accordions"
                startIcon={<EmojiEventsTwoToneIcon />}
              >
                Accordions
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/sample/tabs"
                startIcon={<FilterVintageTwoToneIcon />}
              >
                Tabs
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/sample/badges"
                startIcon={<HowToVoteTwoToneIcon />}
              >
                Badges
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/sample/tooltips"
                startIcon={<LocalPharmacyTwoToneIcon />}
              >
                Tooltips
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/sample/avatars"
                startIcon={<RedeemTwoToneIcon />}
              >
                Avatars
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/sample/cards"
                startIcon={<SettingsTwoToneIcon />}
              >
                Cards
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/sample/forms"
                startIcon={<TrafficTwoToneIcon />}
              >
                Forms
              </Button>
            </ListItem>
          </List>
        </SubMenuWrapper>
      </List>
      <List
        component="div"
        subheader={
          <ListSubheader component="div" disableSticky>
            Extra Pages
          </ListSubheader>
        }
      >
        <SubMenuWrapper>
          <List component="div">
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/404"
                startIcon={<CheckBoxTwoToneIcon />}
              >
                Error 404
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/500"
                startIcon={<CameraFrontTwoToneIcon />}
              >
                Error 500
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/coming-soon"
                startIcon={<ChromeReaderModeTwoToneIcon />}
              >
                Coming Soon
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/maintenance"
                startIcon={<WorkspacePremiumTwoToneIcon />}
              >
                Maintenance
              </Button>
            </ListItem>
          </List>
        </SubMenuWrapper>
      </List>
    </MenuWrapper>
  );
}

export default SidebarMenu;
