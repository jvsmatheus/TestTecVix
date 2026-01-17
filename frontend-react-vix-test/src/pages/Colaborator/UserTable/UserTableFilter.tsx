import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FilterInput } from "../../../components/Inputs/FilterInput";
import { FilterIcon } from "../../../icons/FilterIcon";
import { useZColaboratorRegister } from "../../../stores/useZColaboratorRegister";
import { useZTheme } from "../../../stores/useZTheme";

export const UserTableFilters = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  const { colaboratorNameFilter, setColaboratorNameFilter } =
    useZColaboratorRegister();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        gap: "24px",
      }}
    >
      <FilterInput
        icon={<FilterIcon fill={theme[mode].gray} />}
        value={colaboratorNameFilter}
        onChange={setColaboratorNameFilter}
        placeholder={t("colaboratorRegister.UserFilterPlaceholder")}
      />
    </Box>
  );
};
