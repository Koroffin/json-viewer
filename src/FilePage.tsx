// react component for the file page
// should show "Upload file" in the middle of the screen with drag and drop support
// use material ui components

import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { questsStore } from "./state";

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FileUploadInput = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export function FilePage() {
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      const json: { data: Quest[] } = JSON.parse(content as string);
      questsStore.setData(json.data);
      navigate("/quests/list");
    };
    reader.readAsText(files?.[0]);
  };

  return (
    <FileUploadContainer>
      <Typography variant="h3">{"Upload file"}</Typography>
      <FileUploadInput type="file" onChange={onChange} />
    </FileUploadContainer>
  );
}
