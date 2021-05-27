// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import WeekStats from "views/WeekStats/WeekStats.js";
import TeamStats from "views/TeamStats/TeamStats.js";
import Search from "views/Search/Search.js";
import Keywords from "views/Keywords/Keywords.js";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Websites from "views/Websites/Websites.js";
import LanguageIcon from '@material-ui/icons/Language';
import UserAuth from 'views/UserAuth/UserAuth.js';

const dashboardRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: Dashboard,
  //   component: DashboardPage,
  //   layout: "/admin"
  // },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/week",
  //   name: "Week Stats",
  //   icon: "content_paste",
  //   component: WeekStats,
  //   layout: "/admin" 
  // },
  // {
  //   path: "/team",
  //   name: "Team Stats",
  //   icon: "content_paste",
  //   component: TeamStats,
  //   layout: "/admin" 
  // },
  {
    path: "/keywords",
    name: "Keywords",
    icon: VpnKeyIcon,
    component: Keywords,
    layout: "/admin" 
  },
  {
    path: "/websites",
    name: "Websites",
    icon: LanguageIcon,
    component: Websites,
    layout: "/admin" 
  },
  {
    path: "/search",
    name: "Search",
    icon: "search",
    component: Search,
    layout: "/admin" 
  },
  {
    path: "login",
    name: "Logout",
    icon: Person,
    component: UserAuth,
    layout: "/" 
  },
];

export default dashboardRoutes;
