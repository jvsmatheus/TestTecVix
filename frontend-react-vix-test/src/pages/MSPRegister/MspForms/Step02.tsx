import { Divider, Stack } from "@mui/material";
import { t } from "i18next";
import { FullFilledButton } from "../../../components/Buttons/FullFilledButton";
import { UnfilledButton } from "../../../components/Buttons/UnfilledButton";
import { InputLabelAndFeedback } from "../../../components/Inputs/InputLabelAndFeedback";
import { InputUploadLabelTooltip } from "../../../components/Inputs/InputUploadLabelTooltip";
import { TextRob18Font2M } from "../../../components/Text2M";
import { PencilCicleIcon } from "../../../icons/PencilCicleIcon";
import { VisibilityOn } from "../../../icons/Visibility";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { useZTheme } from "../../../stores/useZTheme";
import { useZUserProfile } from "../../../stores/useZUserProfile";
import { maskPhone } from "../../../utils/maskPhone";

export const Step02 = () => {
  const {
    minConsumption,
    setMinConsumption,
    setDiscountRate,
    discountRate,
    isPoc,
    setIsPoc,
    setActiveStep,
    setMSPDomain,
    mspDomain,
    admName,
    setAdmName,
    admEmail,
    setAdmEmail,
    admPhone,
    setAdmPhone,
    admPassword,
    setAdmPassword,
    position,
    setPosition,
  } = useZMspRegisterPage();

  const { username } = useZUserProfile();

  const { mode, theme } = useZTheme();

  const INPUT_WIDTH = "21rem";

  const handleNextStep = () => {
    // if (disabledBtn) {
    //   toast.error(t("mspRegister.alertMessage"));
    //   return;
    // }

    // setActiveStep(1);
  };

  const handleBack = () => {
    setActiveStep(0);
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
          {t("mspRegister.mspDomain")}
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
              setMSPDomain(value);
            }}
            value={mspDomain}
            label={t("mspRegister.domain")}
            placeholder={"xx.xxx.xxx"}
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

        <TextRob18Font2M
          sx={{
            color: theme[mode].black,
            fontSize: "18px",
            fontWeight: "500",
            lineHeight: "24px",
          }}
        >
          {t("mspRegister.principalAdmin")}
        </TextRob18Font2M>
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
              setAdmName(value);
            }}
            value={admName}
            label={t("mspRegister.completeName")}
            placeholder={t("mspRegister.completeNamePlaceholder")}
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
              setAdmEmail(value);
            }}
            value={admEmail}
            label={t("mspRegister.email")}
            placeholder={t("mspRegister.emailPlaceholder")}
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
              alignItems: "end",
            },
          }}
        >
          <InputLabelAndFeedback
            disabled
            onChange={(value: string) => {
              setAdmPhone(value);
            }}
            value={maskPhone(admPhone)}
            label={t("mspRegister.phone")}
            placeholder={"(00) 00000-0000"}
            icon={<PencilCicleIcon fill={theme[mode].blueDark} />}
            sxLabel={{
              "@media (min-width: 426px) and (max-width: 768px)": {
                fontSize: "10px",
              },
            }}
            
          />

          <InputLabelAndFeedback
            disabled
            onChange={(value: string) => {
              setPosition(value);
            }}
            value={position}
            label={t("mspRegister.position")}
            placeholder={t("mspRegister.positionPlaceholder")}
            sxLabel={{
              "@media (min-width: 426px) and (max-width: 768px)": {
                fontSize: "10px",
              },
            }}
          />

          <InputLabelAndFeedback
            disabled
            onChange={(value: string) => {
              setAdmPassword(value);
            }}
            value={admPassword}
            label={t("mspRegister.initialPassword")}
            placeholder={t("mspRegister.initialPasswordPlaceholder")}
            icon={<VisibilityOn fill={theme[mode].gray} />}
            sxLabel={{
              "@media (min-width: 426px) and (max-width: 768px)": {
                fontSize: "10px",
              },
            }}
          />

          <InputLabelAndFeedback
            disabled
            onChange={() => {}}
            value={username}
            label={t("mspRegister.username")}
            placeholder={t("mspRegister.username")}
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
        <Stack
          sx={{
            gap: "24px",
            "@media (min-width: 660px)": {
              flexDirection: "row",
              alignItems: "end",
            },
          }}
        >
          <InputUploadLabelTooltip
            onUploaded={(event) => {console.log(event)}}
          ></InputUploadLabelTooltip>
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
          <FullFilledButton
            label={t("mspRegister.confirm")}
            onClick={() => {
              handleNextStep();
            }}
            sxButton={{
              maxWidth: INPUT_WIDTH,
            }}
          ></FullFilledButton>
          <UnfilledButton
            label={t("mspRegister.back")}
            onClick={() => handleBack()}
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
