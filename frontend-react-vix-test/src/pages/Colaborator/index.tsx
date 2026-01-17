import { Box, Stack } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScreenFullPage } from "../../components/ScreenFullPage";
import { TextRob20Font1MB } from "../../components/Text1MB";
import { TextRob16Font1S } from "../../components/Text1S";
import { useZMspRegisterPage } from "../../stores/useZMspRegisterPage";
import { useZTheme } from "../../stores/useZTheme";
import { ColaboratorForm } from "./ColaboratorForm";
import { UserTable } from "./UserTable/UserTable";
import { UserTableFilters } from "./UserTable/UserTableFilter";

export const ColaboratorPage = () => {
  const { theme, mode } = useZTheme();
  const {
    setModalOpen,
    setMspToBeDeleted,
    setActiveStep,
    resetAll,
    setIsEditing,
    setBrandMasterDeleted,
    setVmsToBeDeleted,
  } = useZMspRegisterPage();
  const { t } = useTranslation();

  const resetAllStepStates = () => {
    setIsEditing([]);
    setActiveStep(0);
    resetAll();
  };

  const handleCancelAfterDeleteMSP = () => {
    setMspToBeDeleted(null);
    setModalOpen(null);
    setMspToBeDeleted(null);
    setBrandMasterDeleted(null);
    setVmsToBeDeleted([]);
    resetAllStepStates();
  };

  useEffect(() => {
    return () => {
      resetAllStepStates();
    };
  }, []);

  return (
    <ScreenFullPage
      title={
        <TextRob20Font1MB
          sx={{
            color: theme[mode].primary,
            fontSize: "28px",
            fontWeight: "500",
            lineHeight: "40px",
          }}
        >
          {`${t("colaboratorRegister.title")} | ${t("colaboratorRegister.sideTitle")}`}
        </TextRob20Font1MB>
      }
      sxTitleSubTitle={{
        paddingLeft: "40px",
        paddingRight: "40px",
        color: theme[mode].gray,
      }}
      sxContainer={{
        paddingLeft: "40px",
        paddingRight: "40px",
        paddingBottom: "40px",
      }}
      subtitle={t("colaboratorRegister.subtitle")}
    >
      <Stack
        sx={{
          width: "100%",
          gap: "26px",
          borderRadius: "16px",
          boxSizing: "border-box",
        }}
      >
        <Stack
          sx={{
            background: theme[mode].mainBackground,
            borderRadius: "16px",
            width: "100%",
            padding: "24px",
            boxSizing: "border-box",
          }}
        >
          <ColaboratorForm></ColaboratorForm>
        </Stack>
        <Stack
          sx={{
            background: theme[mode].mainBackground,
            borderRadius: "16px",
            width: "100%",
            padding: "24px",
            boxSizing: "border-box",
          }}
        >
          <Stack
            sx={{
              gap: "40px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "24px",
              }}
            >
              <TextRob16Font1S
                sx={{
                  color: theme[mode].black,
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                {t("colaboratorRegister.tableTitle")}
              </TextRob16Font1S>
              <UserTableFilters />
            </Box>
            <UserTable />
          </Stack>
        </Stack>
      </Stack>
    </ScreenFullPage>
  );
};
