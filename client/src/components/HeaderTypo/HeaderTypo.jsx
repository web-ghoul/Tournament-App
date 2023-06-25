import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const HeaderTypo = styled(Typography)({
    cursor:"pointer",
    '&:hover':{
      color:"var(--para-alt-color)"
    }
})