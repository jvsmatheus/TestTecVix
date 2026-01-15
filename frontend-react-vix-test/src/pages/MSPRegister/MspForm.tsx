import { Box, Button, Divider, Stack } from "@mui/material";
import { t } from "i18next";
import { CheckboxLabel } from "../../components/CheckboxLabel";
import { InputLabelAndFeedback } from "../../components/Inputs/InputLabelAndFeedback";
import { TextRob18Font2M } from "../../components/Text2M";
import { PencilCicleIcon } from "../../icons/PencilCicleIcon";
import { useZMspRegisterPage } from "../../stores/useZMspRegisterPage";
import { useZTheme } from "../../stores/useZTheme";
import { maskCNPJ } from "../../utils/maskCNPJ";
import { maskPhone } from "../../utils/maskPhone";

export const MspForm = () => {
  const {
    companyName,
    setCompanyName,
    cnpj,
    setCnpj,
    resetAll,
    isEditing,
    createEditComponentOpen,
    setCreateEditComponentOpen,
    locality,
    setLocality,
    setPhone,
    phone,
    setSector,
    sector,
    setContactEmail,
    contactEmail,
    minConsumption,
    setMinConsumption,
    setDiscountRate,
    discountRate,
    isPoc,
    setIsPoc,
  } = useZMspRegisterPage();
  const { mode, theme } = useZTheme();

  const isEditMode = isEditing.length > 0;

  const handleSubmit = () => {
    if (isEditMode) {
      // update MSP
    } else {
      // create MSP
    }
  };

  return (
    <>
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
          {t("mspRegister.stepOneTitle")}
        </TextRob18Font2M>
        {/* Inputs */}

        <Stack
          sx={{
            gap: "24px",
            "@media (min-width: 660px)": {
              flexDirection: "row",
            },
          }}
          className="lg:w-11/12"
        >
          <InputLabelAndFeedback
            onChange={(value: string) => {
              setCompanyName(value);
            }}
            value={companyName}
            label={t("mspRegister.companyName")}
            placeholder={"Vituax"}
            icon={<PencilCicleIcon fill={theme[mode].blueDark} />}
            sideLabel={t("mspRegister.required")}
            sxSidelabel={{
              color: theme[mode].gray,
              paddingLeft: "10px",
              fontSize: "13px",
            }}
          />

          <InputLabelAndFeedback
            onChange={(value: string) => {
              setLocality(value);
            }}
            value={locality}
            label={t("mspRegister.location")}
            placeholder={t("mspRegister.locationPlaceholder")}
            icon={<PencilCicleIcon fill={theme[mode].blueDark} />}
            sideLabel={t("mspRegister.required")}
            sxSidelabel={{
              color: theme[mode].gray,
              paddingLeft: "10px",
              fontSize: "13px",
            }}
          />

          <InputLabelAndFeedback
            onChange={(value: string) => {
              setCnpj(maskCNPJ(value));
            }}
            value={maskCNPJ(cnpj)}
            label={t("mspRegister.cnpj")}
            placeholder={"00.000.000/0001-00"}
            icon={<PencilCicleIcon fill={theme[mode].blueDark} />}
            sideLabel={t("mspRegister.required")}
            sxSidelabel={{
              color: theme[mode].gray,
              paddingLeft: "10px",
              fontSize: "13px",
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
          className="lg:w-11/12"
        >
          <InputLabelAndFeedback
            onChange={(value: string) => {
              setPhone(maskPhone(value));
            }}
            value={maskPhone(phone)}
            label={t("mspRegister.phone")}
            placeholder={"(00) 00000-0000"}
            icon={<PencilCicleIcon fill={theme[mode].blueDark} />}
            sideLabel={t("mspRegister.required")}
            sxSidelabel={{
              color: theme[mode].gray,
              paddingLeft: "10px",
              fontSize: "13px",
            }}
          />

          <InputLabelAndFeedback
            onChange={(value: string) => {
              setSector(value);
            }}
            value={sector}
            label={t("mspRegister.sector")}
            placeholder={t("mspRegister.sectorPlaceholder")}
            icon={<PencilCicleIcon fill={theme[mode].blueDark} />}
            sideLabel={t("mspRegister.required")}
            sxSidelabel={{
              color: theme[mode].gray,
              paddingLeft: "10px",
              fontSize: "13px",
            }}
          />

          <InputLabelAndFeedback
            onChange={(value: string) => {
              setContactEmail(value);
            }}
            value={contactEmail}
            label={t("mspRegister.contactEmail")}
            placeholder={"vituax@gmail.com"}
            icon={<PencilCicleIcon fill={theme[mode].blueDark} />}
            sideLabel={t("mspRegister.required")}
            sxSidelabel={{
              color: theme[mode].gray,
              paddingLeft: "10px",
              fontSize: "13px",
            }}
          />
        </Stack>
        <Divider
          sx={{
            borderColor: theme[mode].grayLight,
          }}
        />
        <Stack
          sx={{
            gap: "24px",
            "@media (min-width: 660px)": {
              flexDirection: "row",
            },
          }}
        >
          <Box className="w-7/12">
            <InputLabelAndFeedback
              onChange={(value: string) => {
                setMinConsumption(Number(value));
              }}
              value={String(minConsumption)}
              label={t("mspRegister.minConsumption")}
              placeholder={"0"}
              icon={<PencilCicleIcon fill={theme[mode].blueDark} />}
              sideLabel={t("mspRegister.required")}
              sxSidelabel={{
                color: theme[mode].gray,
                paddingLeft: "10px",
                fontSize: "13px",
              }}
              type="number"
            />
          </Box>

          <Box className="w-7/12">
            <InputLabelAndFeedback
              onChange={(value: string) => {
                setDiscountRate(Number(value));
              }}
              value={String(discountRate)}
              label={t("mspRegister.discountPercentage")}
              placeholder={"0"}
              icon={<PencilCicleIcon fill={theme[mode].blueDark} />}
              sideLabel={t("mspRegister.required")}
              sxSidelabel={{
                color: theme[mode].gray,
                paddingLeft: "10px",
                fontSize: "13px",
              }}
              type="number"
            />
          </Box>

          <CheckboxLabel
            checked={isPoc}
            handleChange={() => {
              setIsPoc(!isPoc);
            }}
            label={t("mspRegister.isPoc")}
          />
        </Stack>
        <Button
          children={"Cancelar"}
          onClick={() => setCreateEditComponentOpen(false)}
        ></Button>
      </Stack>
    </>
  );
};
