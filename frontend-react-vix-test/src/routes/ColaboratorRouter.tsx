import { PrivatePage } from "../auth/PrivatePage";
import { ColaboratorPage } from "../pages/Colaborator";

export const ColaboratorRouter = {
  path: "/colaborator-register",
  element: (
    <PrivatePage>
      <ColaboratorPage />
    </PrivatePage>
  ),
};