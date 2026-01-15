import { Divider, Stack } from "@mui/material";
import { t } from "i18next";
import { toast } from "react-toastify";
import { FullFilledButton } from "../../../components/Buttons/FullFilledButton";
import { UnfilledButton } from "../../../components/Buttons/UnfilledButton";
import { CheckboxLabel } from "../../../components/CheckboxLabel";
import { InputLabelAndFeedback } from "../../../components/Inputs/InputLabelAndFeedback";
import { TextRob18Font2M } from "../../../components/Text2M";
import { PencilCicleIcon } from "../../../icons/PencilCicleIcon";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { useZTheme } from "../../../stores/useZTheme";
import { maskCNPJ } from "../../../utils/maskCNPJ";
import { maskPhone } from "../../../utils/maskPhone";
import { onlyDigits } from "../../../utils/onlyDigits";

export const Step01 = () => {
  const {
    companyName,
    setCompanyName,
    cnpj,
    setCnpj,
    resetAll,
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
    setActiveStep,
    activeStep,
    setIsEditing,
    cep,
    setCep,
    countryState,
    setCountryState,
    city,
    setCity,
    street,
    setStreet,
    streetNumber,
    setStreetNumber,
  } = useZMspRegisterPage();

  const { mode, theme } = useZTheme();

  const INPUT_WIDTH = "21rem";
  const disabledBtn =
    !companyName || !locality || !cnpj || !phone || !sector || !contactEmail;

  const handleNextStep = () => {
    if (disabledBtn) {
      toast.error(t("mspRegister.alertMessage"));
      return;
    }

    setActiveStep(1);
  };

  const handleCancel = () => {
    setCreateEditComponentOpen(false);
    setIsEditing([]);
    resetAll();
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
            sxLabel={{
              "@media (min-width: 426px) and (max-width: 768px)": {
                fontSize: "10px",
              },
            }}
            sxContainer={{
              maxWidth: INPUT_WIDTH,
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
            sxLabel={{
              "@media (min-width: 426px) and (max-width: 768px)": {
                fontSize: "10px",
              },
            }}
            sxContainer={{
              maxWidth: INPUT_WIDTH,
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
            sxLabel={{
              "@media (min-width: 426px) and (max-width: 768px)": {
                fontSize: "10px",
              },
            }}
            sxContainer={{
              maxWidth: INPUT_WIDTH,
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
            sxLabel={{
              "@media (min-width: 426px) and (max-width: 768px)": {
                fontSize: "10px",
              },
            }}
            sxContainer={{
              maxWidth: INPUT_WIDTH,
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
            sxLabel={{
              "@media (min-width: 426px) and (max-width: 768px)": {
                fontSize: "10px",
              },
            }}
            sxContainer={{
              maxWidth: INPUT_WIDTH,
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
            sxLabel={{
              "@media (min-width: 426px) and (max-width: 768px)": {
                fontSize: "10px",
              },
            }}
            sxContainer={{
              maxWidth: INPUT_WIDTH,
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
              alignItems: "end",
            },
          }}
        >
          <InputLabelAndFeedback
            onChange={(value: string) => {
              setCep(value);
            }}
            value={cep}
            label={t("mspRegister.cep")}
            placeholder={"00000-000"}
            icon={<PencilCicleIcon fill={theme[mode].blueDark} />}
            sxLabel={{
              "@media (min-width: 426px) and (max-width: 768px)": {
                fontSize: "10px",
              },
            }}
            sxContainer={{
              maxWidth: INPUT_WIDTH,
            }}
          />

          <InputLabelAndFeedback
            onChange={(value: string) => {
              setCountryState(value);
            }}
            value={countryState}
            label={t("mspRegister.countryState")}
            placeholder={t("mspRegister.countryStatePlaceholder")}
            icon={<PencilCicleIcon fill={theme[mode].blueDark} />}
            sxLabel={{
              "@media (min-width: 426px) and (max-width: 768px)": {
                fontSize: "10px",
              },
            }}
            sxContainer={{
              maxWidth: INPUT_WIDTH,
            }}
          />

          <InputLabelAndFeedback
            onChange={(value: string) => {
              setCity(value);
            }}
            value={city}
            label={t("mspRegister.city")}
            placeholder={t("mspRegister.cityPlaceholder")}
            icon={<PencilCicleIcon fill={theme[mode].blueDark} />}
            sxLabel={{
              "@media (min-width: 426px) and (max-width: 768px)": {
                fontSize: "10px",
              },
            }}
            sxContainer={{
              maxWidth: INPUT_WIDTH,
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
              setStreet(value);
            }}
            value={street}
            label={t("mspRegister.street")}
            placeholder={t("mspRegister.streetPlaceholder")}
            icon={<PencilCicleIcon fill={theme[mode].blueDark} />}
            sxLabel={{
              "@media (min-width: 426px) and (max-width: 768px)": {
                fontSize: "10px",
              },
            }}
            sxContainer={{
              maxWidth: INPUT_WIDTH,
            }}
          />

          <InputLabelAndFeedback
            onChange={(value: string) => {
              setStreetNumber(value);
            }}
            value={streetNumber}
            label={t("mspRegister.number")}
            placeholder={"123"}
            icon={<PencilCicleIcon fill={theme[mode].blueDark} />}
            sxLabel={{
              "@media (min-width: 426px) and (max-width: 768px)": {
                fontSize: "10px",
              },
            }}
            sxContainer={{
              maxWidth: INPUT_WIDTH,
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
              alignItems: "end",
            },
          }}
        >
          <InputLabelAndFeedback
            onChange={(value: string) => {
              setMinConsumption(Number(onlyDigits(value)));
            }}
            value={String(minConsumption)}
            label={t("mspRegister.minConsumption")}
            placeholder={"0"}
            icon={<PencilCicleIcon fill={theme[mode].blueDark} />}
            sxContainer={{
              maxWidth: INPUT_WIDTH,
            }}
            sxLabel={{
              "@media (min-width: 426px) and (max-width: 768px)": {
                fontSize: "10px",
              },
            }}
          />

          <InputLabelAndFeedback
            onChange={(value: string) => {
              setDiscountRate(Number(onlyDigits(value)));
            }}
            value={String(discountRate)}
            label={t("mspRegister.discountPercentage")}
            placeholder={"0"}
            icon={<PencilCicleIcon fill={theme[mode].blueDark} />}
            sxSidelabel={{
              color: theme[mode].gray,
              paddingLeft: "10px",
              fontSize: "13px",
            }}
            sxContainer={{
              maxWidth: INPUT_WIDTH,
            }}
            sxLabel={{
              "@media (min-width: 426px) and (max-width: 768px)": {
                fontSize: "10px",
              },
            }}
          />

          <CheckboxLabel
            checked={isPoc}
            handleChange={() => {
              setIsPoc(!isPoc);
            }}
            label={t("mspRegister.isPoc")}
            sxLabel={{
              whiteSpace: "nowrap",
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
          <FullFilledButton
            label={t("mspRegister.continue")}
            onClick={() => {
              handleNextStep();
            }}
            sxButton={{
              maxWidth: INPUT_WIDTH,
            }}
          ></FullFilledButton>
          <UnfilledButton
            label={t("mspRegister.cancel")}
            onClick={() => handleCancel()}
            sxButton={{
              borderColor: theme[mode].blueDark,
              maxWidth: INPUT_WIDTH,
            }}
            sxLabel={{
              color: theme[mode].blueDark,
            }}
          ></UnfilledButton>
        </Stack>
      </Stack>
    </>
  );
};
