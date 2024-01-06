import React from "react";
import Header from "./Header";
import styled from "styled-components/macro";
import ReactMarkdown from "react-markdown";
import { useAppDispatch, useAppSelector } from "hooks/storeHooks";
import { AppStateTypes, setIgnoreUpdate, SettingTypes } from "../store";
import {
  setUpdateBody,
  setUpdateVersion,
  UpdateTypes,
} from "../store/update";
import {
  StyledButtonNormal,
  StyledButtonPrimary,
  StyledDescriptionPreviewer,
  StyledTaskForm,
} from "../styles";
import { getInvokeConnector } from "../contexts";
import { INSTALL_UPDATE } from "@pomatez/shareables";
import { useNotification } from "../hooks";
import notificationIcon from "../assets/logos/notification-dark.png";

const UpdateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  padding-left: 2rem;
  padding-right: 1.4rem;
`;

// Extend StyledDescriptionPreviewer to make it taller
const UpdateDescriptionPreviewer = styled(StyledDescriptionPreviewer)`
  flex: 1 1 0; // Flex properties to allow growth and shrinkage
  overflow-y: auto; // Enable vertical scrolling
  height: 100%; // Set a fixed height
  display: flex;
  flex-direction: column;
  min-height: 0;
  max-height: none;
`;

const ActionButtons = styled.div`
  padding: 1rem 0;
`;
const IgnoreVersion = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
`;

const Updater: React.FC = () => {
  const settings: SettingTypes = useAppSelector(
    (state: AppStateTypes) => state.settings
  );
  const update: UpdateTypes = useAppSelector(
    (state: AppStateTypes) => state.update
  );

  const dispatch = useAppDispatch();

  return (
    <UpdateWrapper>
      <Header heading={"An update is available"} />
      <UpdateDescriptionPreviewer
        className="md-previewer"
        hasValue={true}
      >
        <ReactMarkdown
          linkTarget={"_blank"}
          children={update.updateBody || "No update body found"}
        />
      </UpdateDescriptionPreviewer>

      <ActionButtons>
        <StyledTaskForm>
          <StyledButtonPrimary
            onClick={() => {
              const invokeConnector = getInvokeConnector();
              new window.Notification(
                "Downloading & Installing Update",
                {
                  body: `This may take a moment to start depending on your internet speed.`,
                }
              );
              invokeConnector?.send(INSTALL_UPDATE);
              dispatch(setUpdateVersion(""));
              dispatch(setUpdateBody(""));
            }}
          >
            Install Now
          </StyledButtonPrimary>
          <StyledButtonNormal
            onClick={() => {
              dispatch(setUpdateVersion(""));
              dispatch(setUpdateBody(""));
            }}
          >
            Remind Me Later
          </StyledButtonNormal>
        </StyledTaskForm>
        <IgnoreVersion
          onClick={() => {
            dispatch(setIgnoreUpdate(update.updateVersion));
            dispatch(setUpdateBody(""));
          }}
        >
          Ignore This Version
        </IgnoreVersion>
      </ActionButtons>
    </UpdateWrapper>
  );
};

export default React.memo(Updater);
