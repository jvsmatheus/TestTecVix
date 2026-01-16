import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, IconButton, Stack } from "@mui/material";
import { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ImgFromDB } from "../../../components/ImgFromDB";
import { TextRob14Font1Xs } from "../../../components/Text1Xs";
import { TextRob12Font2Xs } from "../../../components/Text2Xs";
import { useListUsers } from "../../../hooks/useListUsers";
import { useUserResources } from "../../../hooks/useUserResources";
import { PencilCicleIcon } from "../../../icons/PencilCicleIcon";
import { useZColaboratorRegister } from "../../../stores/useZColaboratorRegister";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { useZTheme } from "../../../stores/useZTheme";
import { useZUserList } from "../../../stores/useZUserList";
import { TRole, useZUserProfile } from "../../../stores/useZUserProfile";

export const UserTable = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();

  const { fetchListUsers } = useListUsers();
  const {
    setIsEditing,
    setColaboratorName,
    setEmail,
    setPhone,
    setUsername,
    confirmPassword,
    setConfirmPassword,
    setPosition,
    setDepartment,
    setPermission,
    setHiringDate,
    setStatus,
    setIdBrandMaster,
    colaboratorNameFilter,
    companyNameFilter,
  } = useZColaboratorRegister();
  const { userList } = useZUserList();
  const { mspList } = useZMspRegisterPage();
  const { deleteUserByManager } = useUserResources();

  const { role, idUser } = useZUserProfile();

  const fetchUsers = async () => {
    await fetchListUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getMspName = (idBrandMaster: number) => {
    const msp = mspList.find((msp) => msp.idBrandMaster === idBrandMaster);
    return msp ? msp.brandName : "Vituax";
  };

  const getPermissionLabels = (role: TRole) => {
    switch (role) {
      case "admin":
        return t("colaboratorRegister.admin");
      case "manager":
        return t("colaboratorRegister.manager");
      case "member":
        return t("colaboratorRegister.member");
    }
  };

  const handleEdit = (index: number) => {
    console.log(index);
    setIsEditing([index]);
    const user = userList.find((c) => c.idUser === index);
    setColaboratorName(user?.fullName || "");
    setEmail(user?.email || "");
    setPhone(user?.userPhoneNumber || "");
    setUsername(user?.username || "");
    setConfirmPassword(confirmPassword || "");
    setPosition(user?.field || "");
    setDepartment(user?.department || "");
    setPermission(user?.role || "");
    setHiringDate(new Date(user?.contractDate).toLocaleDateString() || "");
    setStatus(user?.status || "");
    setIdBrandMaster(user?.idBrandMaster);
  };

  const handleDelete = async (idUser: number) => {
    await deleteUserByManager(idUser);
    await fetchListUsers();
  };

  return (
    <Stack
      sx={{
        width: "100%",
        maxHeight: "540px",
        overflow: "auto",
        gap: "16px",
      }}
    >
      {[...userList]
        .filter((user) =>
          user.username
            .toLowerCase()
            .includes(colaboratorNameFilter.toLowerCase()),
        )
        .map((user, index) => (
          <Fragment key={`${user.idUser}-${user.username}`}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 4px",
                gap: "16px",
                "@media (max-width: 800px)": {
                  flexDirection: "column",
                  alignItems: "flex-start",
                },
              }}
            >
              <Box
                sx={{
                  flex: "2",
                  display: "flex",
                  flexDirection: "row",
                  gap: "16px",
                  alignItems: "center",
                }}
              >
                <ImgFromDB
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "100%",
                  }}
                  alt="user image"
                  src={
                    user.profileImgUrl ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGHdcalX0wUWxZQCiSv8WzuserpFGHr4jlsw&s"
                  }
                />
                <Stack>
                  <TextRob14Font1Xs
                    sx={{
                      color: theme[mode].black,
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {user.username}
                  </TextRob14Font1Xs>
                  <TextRob12Font2Xs
                    sx={{
                      color: theme[mode].gray,
                      fontSize: "12px",
                      fontWeight: 400,
                    }}
                  >
                    {user.email || ""}
                  </TextRob12Font2Xs>
                </Stack>
              </Box>

              {/* Status */}
              <Box
                sx={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  "@media (max-width: 900px)": { display: "none" },
                }}
              >
                <TextRob14Font1Xs
                  sx={{
                    color: theme[mode].black,
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {t("colaboratorRegister.status")}
                </TextRob14Font1Xs>
                <TextRob12Font2Xs
                  sx={{
                    color: theme[mode].gray,
                    fontSize: "12px",
                    fontWeight: 400,
                  }}
                >
                  {`${t("colaboratorRegister.lastActivity")} ${new Date(user.lastLoginDate).toLocaleDateString()}`}
                </TextRob12Font2Xs>
              </Box>
              <Box
                sx={{
                  flex: "2",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "8px",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <TextRob14Font1Xs
                  sx={{
                    boxSizing: "content-box",
                    padding: "0 10px",
                    fontWeight: "400",
                    borderRadius: "12px",
                    border: `1px solid ${theme[mode].blueDark}`,
                    color: theme[mode].blueDark,
                    maxWidth: "120px",
                    overflow: "hidden",
                    textWrap: "nowrap",
                    textOverflow: "ellipsis",
                    "&:hover": {
                      cursor: "pointer",
                      background: theme[mode].blueDark,
                      color: theme[mode].mainBackground,
                    },
                  }}
                >
                  {getPermissionLabels(user.role)}
                </TextRob14Font1Xs>

                <TextRob14Font1Xs
                  sx={{
                    boxSizing: "content-box",
                    padding: "0 10px",
                    fontWeight: "400",
                    borderRadius: "12px",
                    border: `1px solid ${theme[mode].blueDark}`,
                    color: theme[mode].blueDark,
                    maxWidth: "120px",
                    overflow: "hidden",
                    textWrap: "nowrap",
                    textOverflow: "ellipsis",
                    "&:hover": {
                      cursor: "pointer",
                      background: theme[mode].blueDark,
                      color: theme[mode].mainBackground,
                    },
                  }}
                >
                  {getMspName(user.idBrandMaster)}
                </TextRob14Font1Xs>

                <TextRob14Font1Xs
                  sx={{
                    boxSizing: "content-box",
                    padding: "0 10px",
                    fontWeight: "400",
                    borderRadius: "12px",
                    border: `1px solid ${
                      user.isActive ? theme[mode].ok : theme[mode].danger
                    }`,
                    color: user.isActive ? theme[mode].ok : theme[mode].danger,
                  }}
                >
                  {t(
                    `colaboratorRegister.${user.isActive ? "active" : "inactive"}`,
                  )}
                </TextRob14Font1Xs>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  "@media (max-width: 600px)": { display: "none" },
                }}
              >
                <IconButton
                  onClick={() => {
                    return handleEdit(user.idUser);
                  }}
                >
                  <PencilCicleIcon fill={theme[mode].blueMedium} />
                </IconButton>
                {role === "admin" && user.idUser !== idUser && (
                  <IconButton
                    onClick={() => {
                      handleDelete(user.idUser);
                    }}
                  >
                    <DeleteForeverIcon sx={{ color: theme[mode].danger }} />
                  </IconButton>
                )}
              </Box>
            </Box>
            {index !== userList.length - 1 && (
              <div
                key={`${user.idUser}-${user.username}-divider`}
                style={{
                  height: "1px",
                  minHeight: "1px",
                  maxHeight: "1px",
                  width: "100%",
                  background: theme[mode].grayLight,
                }}
              />
            )}
          </Fragment>
        ))}
    </Stack>
  );
};
