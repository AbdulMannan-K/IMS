import React from 'react';
 import {default as MuiButton} from '@mui/material/Button';
import {styled} from "@mui/material/styles";


 const ButtonStyled = styled(MuiButton)(({theme})=>({
     margin: theme.spacing(0.5),
 }))

export default function Button(props) {

    const { text, size, color, variant, onClick, ...other } = props

    return (
    <ButtonStyled
    variant={variant || "contained"}
    size={size || "large"}
    backgroundColor={color || "primary"}
    onClick={onClick}
    {...other}
>
    {text}
</ButtonStyled>
    );
}
