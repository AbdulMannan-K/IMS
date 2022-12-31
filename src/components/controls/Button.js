import React from 'react';
// import { Button as MuiButton } from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
 import {default as MuiButton} from '@mui/material/Button';
import {styled} from "@mui/material/styles";


 const ButtonStyled = styled(MuiButton)(({theme})=>({
     margin: theme.spacing(0.5),
 }))

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    }
}))

export default function Button(props) {

    const { text, size, color, variant, onClick, ...other } = props
    const classes = useStyles();

    return (
        // <MuiButton
        //     variant={variant || "contained"}
        //     size={size || "large"}
        //     color={color || "primary"}
        //     onClick={onClick}
        //     {...other}
        //     classes={{ root: classes.root, label: classes.label }}
        //     >
        //     {text}
        // </MuiButton>
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
