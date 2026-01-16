import { Box, Button, Divider, Stack } from "@mui/material";
import { t } from "i18next";
import { toast } from "react-toastify";
import { FullFilledButton } from "../../../components/Buttons/FullFilledButton";
import { UnfilledButton } from "../../../components/Buttons/UnfilledButton";
import { ImgFromDB } from "../../../components/ImgFromDB";
import { InputLabelAndFeedback } from "../../../components/Inputs/InputLabelAndFeedback";
import { InputUploadLabelTooltip } from "../../../components/Inputs/InputUploadLabelTooltip";
import { TextRob18Font2M } from "../../../components/Text2M";
import { useBrandMasterResources } from "../../../hooks/useBrandMasterResources";
import { PencilCicleIcon } from "../../../icons/PencilCicleIcon";
import { VisibilityOn } from "../../../icons/Visibility";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { useZTheme } from "../../../stores/useZTheme";
import { useZUserProfile } from "../../../stores/useZUserProfile";
import { maskPhone } from "../../../utils/maskPhone";

export const Step02 = () => {
  const {
    companyName,
    locality,
    cnpj,
    phone,
    sector,
    contactEmail,
    cep,
    countryState,
    city,
    street,
    streetNumber,
    minConsumption,
    retailPercentageDefault,
    isPoc,
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
    brandLogoUrl,
    setBrandLogo,
    isEditing,
  } = useZMspRegisterPage();

  const { username } = useZUserProfile();
  const { createAnewBrandMaster, updateBrandMasterInfo } = useBrandMasterResources();

  const { mode, theme } = useZTheme();

  const INPUT_WIDTH = "21rem";

  const mountMspCreate = () => {
    return {
      idBrandMaster: isEditing[0],
      companyName,
      locality,
      cnpj,
      phone,
      sector,
      contactEmail,
      cep,
      countryState,
      city,
      street,
      streetNumber,
      minConsumption,
      retailPercentageDefault,
      isPoc,
      mspDomain,
      admName,
      admEmail,
      admPhone,
      position,
      admPassword,
      username,
      brandLogo: brandLogoUrl,
    };
  }

  const mountMspUpdate = () => {
    return {
       idBrandMaster: isEditing[0],
      brandName: companyName,
      location: locality,
      cnpj,
      smsContact: phone,
      setorName: sector,
      emailContact: contactEmail,
      cep,
      state: countryState,
      city,
      street,
      placeNumber: streetNumber,
      minConsumption,
      retailPercentageDefault,
      isPoc,
      domain: mspDomain,
      brandLogo: brandLogoUrl,
    };
  }

  const handleCreateMsp = async () => {
    const res = await createAnewBrandMaster(mountMspCreate());
    if (res.brandMaster) {
      toast.success(t("mspRegister.createdMsp"))
    }
  };

  const handleUpdateMsp = async () => {
    const res = await updateBrandMasterInfo(mountMspUpdate());
    if (res) {
      toast.success(t("mspRegister.createdMsp"))
    }
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
            gap: "15px",
          }}
        >
          <Box>
            <TextRob18Font2M
              sx={{
                color: theme[mode].black,
                fontSize: "18px",
                fontWeight: "500",
                lineHeight: "24px",
              }}
            >
              {t("mspRegister.companyLogo")}
            </TextRob18Font2M>

            <TextRob18Font2M
              sx={{
                color: theme[mode].black,
                fontSize: "14px",
                lineHeight: "24px",
              }}
            >
              {t("mspRegister.companyLogoSubtitle")}
            </TextRob18Font2M>
          </Box>

          <Stack
            sx={{
              gap: "15px",
              "@media (min-width: 660px)": {
                flexDirection: "row",
              },
            }}
          >
            <InputUploadLabelTooltip
              onUploaded={(event) => {
                setBrandLogo({
                  brandLogoUrl: event.url,
                  brandObjectName: event.objectName,
                });
              }}
              sxContainer={{
                gap: "0",
                "@media (min-width: 768px)": {
                  width: "40%",
                },
                display: "flex",
                flexDirection: "column",
              }}
            ></InputUploadLabelTooltip>
            {brandLogoUrl !== "" && (
              <Box
                sx={{
                  maxWidth: "165px",
                  height: "50px",
                }}
              >
                <ImgFromDB src={brandLogoUrl}></ImgFromDB>
              </Box>
            )}
            <Stack
              sx={{
                gap: "8px",
                alignContent: "start",
              }}
            >
              <Button
                variant="text"
                children={t("mspRegister.alterBrandLog")}
                sx={{
                  textDecoration: "underline",
                  maxWidth: "fit-content",
                  textTransform: "initial",
                  padding: "0",
                  color: theme[mode].blueDark,
                  fontSize: "0.625rem",
                  justifyContent: "start",
                }}
              ></Button>
              <Button
                variant="text"
                children={t("mspRegister.removeBrandLogo")}
                sx={{
                  textDecoration: "underline",
                  maxWidth: "fit-content",
                  textTransform: "initial",
                  padding: "0",
                  color: theme[mode].blueDark,
                  fontSize: "0.625rem",
                }}
                onClick={() => {
                  setBrandLogo({
                    brandLogoUrl: null,
                    brandObjectName: null,
                  });
                }}
              ></Button>
              <ul
                className="list-disc marker:text-indigo-200 text-gray-400"
                style={{
                  fontSize: "10px",
                  paddingLeft: "15px",
                }}
              >
                <li>{t("mspRegister.imageDefault")}</li>
                <li>{t("mspRegister.imageSize")}</li>
                <li>{t("mspRegister.imageFormats")}</li>
              </ul>
            </Stack>
          </Stack>
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
            onClick={() =>
              isEditing.length > 0 ? handleUpdateMsp() : handleCreateMsp()
            }
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
