import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import {
  StyledDownload,
  StyledDownloadButtonWrapper,
  StyledDownloadForWindows,
  StyledDownloadForLinux,
  StyledDownloadForMac,
  StyledDownloadOSLogo,
  StyledDownloadButton,
  StyledLinuxInstallerWrapper,
  StyledDownloadContent,
  StyledLinuxOrSpan,
} from "../styles";
import { Header, SVG } from "../components";
import {
  WINDOWS_INSTALLER,
  DEB_INSTALLER,
  APP_IMAGE_INSTALLER,
  RPM_INSTALLER,
  MAC_INSTALLER,
} from "../config";
import { DownloadQuery } from "../queries";

const Download: React.FC = () => {
  const { allMarkdownRemark } = DownloadQuery();

  const [ref, inView] = useInView({ triggerOnce: true });

  const control = useAnimation();

  useEffect(() => {
    if (inView) {
      control.start("animate");
    }
  }, [control, inView]);

  const { node } = allMarkdownRemark.edges[0];

  return (
    <StyledDownload id="installers">
      <StyledDownloadContent>
        <Header node={node} />

        <StyledDownloadButtonWrapper ref={ref} animate={control}>
          <StyledDownloadForWindows>
            <StyledDownloadOSLogo>
              <SVG name="windows" />
            </StyledDownloadOSLogo>

            <StyledDownloadButton>
              <a href={WINDOWS_INSTALLER}>
                <SVG name="download" />
                Windows 7, 8 and 10
              </a>
            </StyledDownloadButton>
          </StyledDownloadForWindows>

          <StyledDownloadForLinux>
            <StyledDownloadOSLogo>
              <SVG name="linux" />
            </StyledDownloadOSLogo>

            <StyledLinuxInstallerWrapper>
              <StyledDownloadButton>
                <a href={DEB_INSTALLER} id="deb">
                  <SVG name="download" />
                  .deb
                </a>
              </StyledDownloadButton>
              <StyledDownloadButton>
                <a href={APP_IMAGE_INSTALLER} id="app-image">
                  <SVG name="download" />
                  .AppImage
                </a>
              </StyledDownloadButton>
              <StyledDownloadButton id="rpm">
                <a href={RPM_INSTALLER}>
                  <SVG name="download" />
                  .rpm
                </a>
              </StyledDownloadButton>

              <StyledLinuxOrSpan>Or</StyledLinuxOrSpan>

              <StyledDownloadButton id="snap-store-btn">
                <a
                  href="https://snapcraft.io/pomatez"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Get it from Snap Store</span>
                  <SVG name="snap-store" />
                </a>
              </StyledDownloadButton>
            </StyledLinuxInstallerWrapper>
          </StyledDownloadForLinux>

          <StyledDownloadForMac>
            <StyledDownloadOSLogo>
              <SVG name="apple" />
            </StyledDownloadOSLogo>

            <StyledDownloadButton>
              <a href={MAC_INSTALLER}>
                <SVG name="download" />
                Mac OS 10.10+
              </a>
            </StyledDownloadButton>
          </StyledDownloadForMac>
        </StyledDownloadButtonWrapper>
      </StyledDownloadContent>
    </StyledDownload>
  );
};

export default Download;
