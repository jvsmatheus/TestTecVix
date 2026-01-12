export interface IUserResponse {
  idUser: number;
  idBrandMaster: 1;
  createdAt: string | Date;
  deletedAt: string | Date | null;
  email: string | null;
  isActive: boolean;
  lastLoginDate: string | Date;
  profileImgUrl: string | null;
  role: "admin" | "manager" | "member";
  socketId: null | string;
  updatedAt: string | Date;
  username: string;
}

export interface IPincodeInfos {
  expiredPinCodeSeconds: number;
  pinCode: string;
  socketId: string | null;
  updatedAt: Date | string;
}

export interface IUserBasicInfo {
  fullName?: string | null;
  name?: string | null;
  username?: string | null;
  idUser?: number | null;
  idBrandMaster?: number | null;
}

export interface IUserAuth {
  tokem: string;
  user: {
    idUser: number;
    email: string;
    username: string;
    role: "admin" | "manager" | "member";
    idBrandMaster: number;
  }

}
