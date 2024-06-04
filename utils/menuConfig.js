import { AiOutlineHome, AiOutlineMedicineBox } from "react-icons/ai";
import { BsBarChartLine, BsCardList, BsColumnsGap, BsFolder } from "react-icons/bs";
import { FaHospitalUser } from "react-icons/fa6";
import { GiCow } from "react-icons/gi";
import { GrTest, GrTestDesktop } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdOutlineLocalPharmacy } from "react-icons/md";
import { SlLayers } from "react-icons/sl";
import { VscOutput } from "react-icons/vsc";

export const menuConfig = {
  admin: [
    { href: "/", icon: <AiOutlineHome size={22} />, label: "Home" },
    { href: "/staffs", icon: <FaHospitalUser size={22} />, label: "Staffs" },
    { href: "/users", icon: <HiOutlineUserGroup size={22} />, label: "Users" },
    {
      hrefParent: "/appointment",
      hrefOne: "/appointment/new",
      hrefTwo: "/appointment/view",
      icon: <BsFolder size={20} />,
      label: "Appointment",
      labelOne: "New Appointment",
      labelTwo: "View Appointment",
      submenuNumber: "submenu-1",
    },
    {
      hrefParent: "/patient-registration",
      hrefOne: "/patient-registration/add",
      hrefTwo: "/patient-registration/view",
      icon: <BsColumnsGap size={20} />,
      label: "History & Clinical Examination",
      labelOne: "Add Registration",
      labelTwo: "View Registration",
      submenuNumber: "submenu-2",
    },
    {
      hrefParent: "/prescription",
      hrefOne: "/prescription/add",
      hrefTwo: "/prescription/view",
      icon: <BsCardList size={20} />,
      label: "Prescription",
      labelOne: "Add Prescription",
      labelTwo: "View Prescription",
      submenuNumber: "submenu-3",
    },
    { href: "/test-parameter", icon: <BsBarChartLine size={20} />, label: "Test Parameter" },
    { href: "/incomming-test", icon: <GrTestDesktop size={18} />, label: "Incoming Test" },
    { href: "/tests", icon: <GrTest size={20} />, label: "Tests" },
    { href: "/departments", icon: <SlLayers size={20} />, label: "Departments" },
    {
      hrefParent: "/medicine",
      hrefOne: "/medicine/add",
      hrefTwo: "/medicine/view",
      icon: <AiOutlineMedicineBox size={22} />,
      label: "Medicine",
      labelOne: "Add Medicine",
      labelTwo: "View Medicine",
      submenuNumber: "submenu-4",
    },
    { href: "/pharmacy", icon: <MdOutlineLocalPharmacy size={22} />, label: "Pharmacy" },
    {
      hrefParent: "/species-complaints",
      hrefOne: "/species-complaints/species",
      hrefTwo: "/species-complaints/complaints",
      icon: <GiCow size={22} />,
      label: "Species & Complaints",
      labelOne: "Species",
      labelTwo: "Complaints",
      submenuNumber: "submenu-5",
    },
  ],
  doctor: [
    { href: "/", icon: <AiOutlineHome size={22} />, label: "Home" },
    {
      hrefParent: "/appointment",
      hrefOne: "/appointment/new",
      hrefTwo: "/appointment/view",
      icon: <BsFolder size={20} />,
      label: "Appointment",
      labelOne: "New Appointment",
      labelTwo: "View Appointment",
      submenuNumber: "submenu-1",
    },
    {
      hrefParent: "/patient-registration",
      hrefOne: "/patient-registration/add",
      hrefTwo: "/patient-registration/view",
      icon: <BsColumnsGap size={20} />,
      label: "History & Clinical Examination",
      labelOne: "Add Registration",
      labelTwo: "View Registration",
      submenuNumber: "submenu-2",
    },
    {
      hrefParent: "/prescription",
      hrefOne: "/prescription/add",
      hrefTwo: "/prescription/view",
      icon: <BsCardList size={20} />,
      label: "Prescription",
      labelOne: "Add Prescription",
      labelTwo: "View Prescription",
      submenuNumber: "submenu-3",
    },
    { href: "/test-parameter", icon: <BsBarChartLine size={20} />, label: "Test Parameter" },
    { href: "/incomming-test", icon: <GrTestDesktop size={18} />, label: "Incoming Test" },
    { href: "/tests", icon: <GrTest size={20} />, label: "Tests" },
    { href: "/departments", icon: <SlLayers size={20} />, label: "Departments" },
    {
      hrefParent: "/medicine",
      hrefOne: "/medicine/add",
      hrefTwo: "/medicine/view",
      icon: <AiOutlineMedicineBox size={22} />,
      label: "Medicine",
      labelOne: "Add Medicine",
      labelTwo: "View Medicine",
      submenuNumber: "submenu-4",
    },
    { href: "/pharmacy", icon: <MdOutlineLocalPharmacy size={22} />, label: "Pharmacy" },
    {
      hrefParent: "/species-complaints",
      hrefOne: "/species-complaints/species",
      hrefTwo: "/species-complaints/complaints",
      icon: <GiCow size={22} />,
      label: "Species & Complaints",
      labelOne: "Species",
      labelTwo: "Complaints",
      submenuNumber: "submenu-5",
    },
  ],
  lab: [
    { href: "/", icon: <AiOutlineHome size={22} />, label: "Home" },
    { href: "/test-parameter", icon: <BsBarChartLine size={20} />, label: "Test Parameter" },
    { href: "/incomming-test", icon: <GrTestDesktop size={18} />, label: "Incoming Test" },
    { href: "/tests", icon: <GrTest size={20} />, label: "Tests" },
  ],
  pharmacy: [
    { href: "/", icon: <AiOutlineHome size={22} />, label: "Home" },
    { href: "/pharmacy", icon: <MdOutlineLocalPharmacy size={22} />, label: "Pharmacy" },
  ],
  receptionist: [
    { href: "/", icon: <AiOutlineHome size={22} />, label: "Home" },
    {
      hrefParent: "/appointment",
      hrefOne: "/appointment/new",
      hrefTwo: "/appointment/view",
      icon: <BsFolder size={20} />,
      label: "Appointment",
      labelOne: "New Appointment",
      labelTwo: "View Appointment",
      submenuNumber: "submenu-1",
    },
  ],
};

export default menuConfig;