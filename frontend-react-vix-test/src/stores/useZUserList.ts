import { create } from "zustand";
import { IUserResponse } from "../types/userTypes";

export interface IUserList {
  userList: IUserResponse[];
  userTotalCount: number;
}

const INIT_STATE: IUserList = {
  userList: [],
  userTotalCount: 0
};

interface IUserListState extends IUserList {
  setUserList: (userList: IUserResponse[]) => void;
  setUserTotalCount: (userTotalCount: number) => void;
}

export const useZUserList = create<IUserListState>((set) => ({
  ...INIT_STATE,
  setUserList: (userList) => set((state) => ({ ...state, userList })),
  setUserTotalCount: (userTotalCount) => set((state) => ({ ...state, userTotalCount })),
}));
