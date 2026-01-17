export interface IPayload {
  idUser: string;
  email: string;
  username: string;
  role: "admin" | "manager" | "member";
  idBrandMaster?: number;
}
