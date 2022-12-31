import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";
// import {styled} from "@mui/material/styles";
// import {FormControl} from "@mui/material";
import styled from "styled-components";
import {FormControl, Stack} from "@mui/material";

export function useForm(initialFValues, validateOnChange = false, validate) {


    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }

    const resetForm = () => {
        setValues(initialFValues);
        setErrors({})
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm

    }
}


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '45%',
            margin: theme.spacing(1)
        }
    }
}))

const styledForm = styled.form`
  width: 45%;
  margin: 8px;
`
// sx={{
//     '& .MuiFormControl-root': {
//         width: '45%',
//         margin: '10px'
//     }
// }
// }

// className={`${classes.root} ${className}`}
export function Form(props) {

    const classes = useStyles();
    const { children,className='', ...other } = props;
    return (
        <Stack  sx={{
            '& .MuiFormControl-root': {
                width: '45%',
                margin: '8px'
            }
        }
        } autoComplete="off" {...other}>
            {props.children}
        </Stack>
    )
}

