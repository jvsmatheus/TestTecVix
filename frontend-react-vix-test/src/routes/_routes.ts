import { DefaultRouter } from "./DefaultRouter";
import { HomeRouter } from "./HomeRoute";
import { LoginRouter } from "./LoginRouter";
import { MSPRegisterRouter } from "./MSPRegisterRouter";
import { MyVMsRouter } from "./MyVMsRouter";
import { RegisterRouter } from "./RegisterRouter";
import { VirtualMachineRouter } from "./VirtualMachineRouter";
import { WhiteLabelRouter } from "./WhiteLabelRouter";

export const mainRoutes = [
  DefaultRouter,
  HomeRouter,
  LoginRouter,
  RegisterRouter,
  VirtualMachineRouter,
  MyVMsRouter,
  MSPRegisterRouter,
  WhiteLabelRouter,
];
