import { Divider, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { CTAsDoubleButtons } from "../../components/Buttons/CTAsDoubleButtons";
import { DropDrownLabel } from "../../components/Inputs/DropDrownLabel";
import { InputLabelAndFeedback } from "../../components/Inputs/InputLabelAndFeedback";
import { TextRob18Font2M } from "../../components/Text2M";
import { useBrandMasterResources } from "../../hooks/useBrandMasterResources";
import { useListUsers } from "../../hooks/useListUsers";
import { useUserResources } from "../../hooks/useUserResources";
import { PencilCicleIcon } from "../../icons/PencilCicleIcon";
import { useZColaboratorRegister } from "../../stores/useZColaboratorRegister";
import { useZMspRegisterPage } from "../../stores/useZMspRegisterPage";
import { useZTheme } from "../../stores/useZTheme";
import { TRole, useZUserProfile } from "../../stores/useZUserProfile";
import { maskPhone } from "../../utils/maskPhone";

export const ColaboratorForm = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  const {
    colaboratorName,
    setColaboratorName,
    email,
    setEmail,
    phone,
    setPhone,
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    position,
    setPosition,
    department,
    setDepartment,
    permission,
    setPermission,
    hiringDate,
    setHiringDate,
    status,
    setStatus,
    resetAll,
    isEditing,
    setIsEditing,
  } = useZColaboratorRegister();
  const { mspList } = useZMspRegisterPage();
  const { listAllBrands } = useBrandMasterResources();
  const { createUserByManager, updateUser } = useUserResources();
  const { setUser } = useZUserProfile();
  const { fetchListUsers } = useListUsers();

  const [selectedStatus, setSelectStatus] = useState<{
    label: string;
    value: string;
  }>({
    label: "",
    value: "",
  });

  const [selectedMSP, setSelectMsp] = useState<{
    brandName: string;
    idBrandMaster: number;
  }>({
    brandName: "",
    idBrandMaster: null,
  });

  const rolesOptions = [
    {
      label: "Admin",
      value: "admin",
    },
    {
      label: "Manager",
      value: "manager",
    },
    {
      label: "Member",
      value: "member",
    },
  ];

  const statusOptions = [
    {
      label: t("colaboratorRegister.active"),
      value: "active",
    },
    {
      label: t("colaboratorRegister.inactive"),
      value: "inactive",
    },
  ];

  const handleSaveOrUpdate = async () => {
    const user = {
      fullName: colaboratorName,
      email,
      userPhoneNumber: phone,
      username,
      password,
      confirmPassword,
      field: position,
      department,
      role: permission as TRole,
      contractDate: hiringDate,
      isActive: status === "active" ? true : false,
      idBrandMaster: selectedMSP.idBrandMaster ?? null,
    };

    if (!isEditing || isEditing.length === 0) {
      const response = await createUserByManager(user);
      if (response) {
        toast.success(t("colaboratorRegister.userCreated"));
        resetForm();
      }
    }

    if (isEditing.length > 0) {
      const response = await updateUser(user);
      if (response) {
        toast.success(t("colaboratorRegister.userEdited"));
        resetForm();
      }
    }

    fetchUsers();
  };

  const resetForm = () => {
    resetAll();
    setIsEditing([]);
    setSelectMsp({
      idBrandMaster: 0,
      brandName: "",
    });
    setSelectStatus({
      label: "",
      value: "",
    });
  };

  const getMspOptions = () =>
    mspList.map((msp) => {
      return { label: msp.brandName, value: msp.idBrandMaster };
    });

  const isValid =
    !colaboratorName ||
    !email ||
    !username ||
    !password ||
    !position ||
    !permission ||
    !status;

  const fetchUsers = async () => {
    await fetchListUsers();
  };

  useEffect(() => {
    listAllBrands();
  }, []);

  return (
    <Stack
      sx={{
        gap: "30px",
      }}
    >
      {/* Title */}
      <TextRob18Font2M
        sx={{
          color: theme[mode].black,
          fontSize: "18px",
          fontWeight: "500",
          lineHeight: "24px",
        }}
      >
        {t("colaboratorRegister.subtitle")}
      </TextRob18Font2M>
      {/* Inputs */}

      <Stack
        sx={{
          gap: "24px",
          "@media (min-width: 660px)": {
            flexDirection: "row",
          },
        }}
      >
        <InputLabelAndFeedback
          onChange={(value: string) => {
            setColaboratorName(value);
          }}
          value={colaboratorName}
          label={t("colaboratorRegister.completeName")}
          placeholder={t("colaboratorRegister.completeNamePlaceholder")}
          icon={<PencilCicleIcon fill={theme[mode].blueDark} />}
          sideLabel={t("colaboratorRegister.required")}
          sxSidelabel={{
            color: theme[mode].gray,
            paddingLeft: "10px",
            fontSize: "13px",
          }}
          sxLabel={{
            "@media (min-width: 426px) and (max-width: 768px)": {
              fontSize: "10px",
            },
          }}
        />

        <InputLabelAndFeedback
          onChange={(value: string) => {
            setEmail(value);
          }}
          value={email}
          label={t("colaboratorRegister.email")}
          placeholder={t("colaboratorRegister.emailPlaceholder")}
          icon={<PencilCicleIcon fill={theme[mode].blueDark} />}
          sideLabel={t("colaboratorRegister.required")}
          sxSidelabel={{
            color: theme[mode].gray,
            paddingLeft: "10px",
            fontSize: "13px",
          }}
          sxLabel={{
            "@media (min-width: 426px) and (max-width: 768px)": {
              fontSize: "10px",
            },
          }}
        />

        <InputLabelAndFeedback
          onChange={(value: string) => {
            setPhone(value);
          }}
          value={maskPhone(phone)}
          label={t("colaboratorRegister.phone")}
          placeholder={"(00) 0 0000-0000"}
          icon={<PencilCicleIcon fill={theme[mode].blueDark} />}
          sxSidelabel={{
            color: theme[mode].gray,
            paddingLeft: "10px",
            fontSize: "13px",
          }}
          sxLabel={{
            "@media (min-width: 426px) and (max-width: 768px)": {
              fontSize: "10px",
            },
          }}
        />
      </Stack>
      <Stack
        sx={{
          gap: "24px",
          "@media (min-width: 660px)": {
            flexDirection: "row",
          },
        }}
      >
        <InputLabelAndFeedback
          onChange={(value: string) => {
            setUsername(value);
          }}
          value={username}
          label={t("colaboratorRegister.username")}
          placeholder={t("colaboratorRegister.username")}
          icon={<PencilCicleIcon fill={theme[mode].blueDark} />}
          sideLabel={t("colaboratorRegister.required")}
          sxSidelabel={{
            color: theme[mode].gray,
            paddingLeft: "10px",
            fontSize: "13px",
          }}
          sxLabel={{
            "@media (min-width: 426px) and (max-width: 768px)": {
              fontSize: "10px",
            },
          }}
        />

        <InputLabelAndFeedback
          type="password"
          onChange={(value: string) => {
            setPassword(value);
          }}
          value={password}
          label={t("colaboratorRegister.password")}
          placeholder={t("colaboratorRegister.password")}
          sideLabel={t("colaboratorRegister.required")}
          sxSidelabel={{
            color: theme[mode].gray,
            paddingLeft: "10px",
            fontSize: "13px",
          }}
          sxLabel={{
            "@media (min-width: 426px) and (max-width: 768px)": {
              fontSize: "10px",
            },
          }}
        />

        <InputLabelAndFeedback
          type="password"
          onChange={(value: string) => {
            setConfirmPassword(value);
          }}
          value={confirmPassword}
          label={t("colaboratorRegister.confirmPassword")}
          placeholder={t("colaboratorRegister.confirmPassword")}
          sxSidelabel={{
            color: theme[mode].gray,
            paddingLeft: "10px",
            fontSize: "13px",
          }}
          sxLabel={{
            "@media (min-width: 426px) and (max-width: 768px)": {
              fontSize: "10px",
            },
          }}
        />
      </Stack>

      <Stack
        sx={{
          gap: "24px",
          "@media (min-width: 660px)": {
            flexDirection: "row",
            alignItems: "end",
          },
        }}
      >
        <InputLabelAndFeedback
          onChange={(value: string) => {
            setPosition(value);
          }}
          value={position}
          label={t("colaboratorRegister.position")}
          placeholder={t("colaboratorRegister.positionPlaceholder")}
          icon={<PencilCicleIcon fill={theme[mode].blueDark} />}
          sideLabel={t("colaboratorRegister.required")}
          sxSidelabel={{
            color: theme[mode].gray,
            paddingLeft: "10px",
            fontSize: "13px",
          }}
          sxLabel={{
            "@media (min-width: 426px) and (max-width: 768px)": {
              fontSize: "10px",
            },
          }}
        />

        <InputLabelAndFeedback
          onChange={(value: string) => {
            setDepartment(value);
          }}
          value={department}
          label={t("colaboratorRegister.department")}
          placeholder={t("colaboratorRegister.departmentPlaceholder")}
          icon={<PencilCicleIcon fill={theme[mode].blueDark} />}
          sxLabel={{
            "@media (min-width: 426px) and (max-width: 768px)": {
              fontSize: "10px",
            },
          }}
        />

        <DropDrownLabel
          data={rolesOptions}
          onChange={(item: { label: string; value: string }) => {
            setPermission(item.value);
          }}
          value={{ label: permission, value: permission }}
          label={t("colaboratorRegister.permission")}
          sideLabel={t("colaboratorRegister.required")}
          sxSidelabel={{
            color: theme[mode].gray,
            paddingLeft: "10px",
            fontSize: "13px",
          }}
          sxLabel={{
            "@media (min-width: 426px) and (max-width: 768px)": {
              fontSize: "10px",
            },
          }}
        />
      </Stack>
      <Stack
        sx={{
          gap: "24px",
          "@media (min-width: 660px)": {
            flexDirection: "row",
            alignItems: "end",
          },
        }}
      >
        <InputLabelAndFeedback
          onChange={(value: string) => {
            setHiringDate(value);
          }}
          value={hiringDate}
          label={t("colaboratorRegister.hiringDate")}
          placeholder={"01/01/2025"}
          icon={<PencilCicleIcon fill={theme[mode].blueDark} />}
          sxLabel={{
            "@media (min-width: 426px) and (max-width: 768px)": {
              fontSize: "10px",
            },
          }}
        />

        <DropDrownLabel
          data={statusOptions}
          onChange={(item: { label: string; value: string }) => {
            setStatus(item.value);
            setSelectStatus(item);
          }}
          value={{ label: selectedStatus.label, value: selectedStatus.value }}
          label={t("colaboratorRegister.status")}
          sideLabel={t("colaboratorRegister.required")}
          sxSidelabel={{
            color: theme[mode].gray,
            paddingLeft: "10px",
            fontSize: "13px",
          }}
          sxLabel={{
            "@media (min-width: 426px) and (max-width: 768px)": {
              fontSize: "10px",
            },
          }}
        />

        <DropDrownLabel
          data={getMspOptions()}
          onChange={(item: { label: string; value: number }) => {
            setSelectMsp({
              idBrandMaster: item.value,
              brandName: item.label,
            });
            setUser({ idBrand: selectedMSP.idBrandMaster });
          }}
          value={{
            label: selectedMSP.brandName,
            value: selectedMSP.idBrandMaster,
          }}
          label={t("colaboratorRegister.companyName")}
          sxLabel={{
            "@media (min-width: 426px) and (max-width: 768px)": {
              fontSize: "10px",
            },
          }}
        />
      </Stack>

      <Divider
        sx={{
          borderColor: theme[mode].grayLight,
        }}
      />
      <CTAsDoubleButtons
        saveDisabled={
          (isValid && isEditing.length === 0) ||
          (isValid && isEditing.length > 0)
        }
        handleSave={() => handleSaveOrUpdate()}
        handleRestore={() => resetForm()}
        labelSave={t("colaboratorRegister.save")}
        labelRestore={t("colaboratorRegister.clear")}
        sxButtonSave={{
          color: theme[mode].btnText,
        }}
        sxButtonRestore={{
          color: theme[mode].blueDark,
        }}
      ></CTAsDoubleButtons>
    </Stack>
  );
};
