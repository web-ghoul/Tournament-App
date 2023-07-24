//MUI
import { Typography } from "@mui/material";

//Style
import styled from "@emotion/styled";

export const HeaderTypo = styled(Typography)({
    cursor:"pointer",
    '&:hover':{
      color:"var(--para-alt-color)"
    }
})