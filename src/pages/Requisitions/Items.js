import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material';
import { useForm, Form } from '../../components/useForm';
import * as itemService from "../../service/itemService";
import useTable from '../../components/useTable';
import { Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@mui/material';
import Controls from "../../components/controls/Controls";
import { Search } from "@mui/icons-material";
import {default as SendOutlinedIcon} from '@mui/icons-material/SendOutlined';
import Popup from '../../components/Popup';



const initialFValues = {
    id: 0,
    name: '', designation: '', departmentId: '',
    requestedDate: new Date(),
    verifiedByName: '', verifiedDate: new Date(),
    receivedByName: '', receivedDate: new Date(),
    issuedByName: '', issuedDate: new Date()
}

const styles = {
    searchInput: {
        width: '100%'
    },
}

const allItemsHeadCells = [
    { id: 'name', label: 'Name' },
    { id: 'category', label: 'Category' },
    { id: 'quantity', label: 'Available Quantity', disableSorting: true },
    { id: 'actions', label: 'Actions', disableSorting: true }
]


export default function Items(props) {
    // const classes = useStyles()
    const classes = styles;
    const [allItems, setAllItems] = React.useState(itemService.getItems())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        temp.quantity = parseInt(fieldValues.quantity) >= 1 ? "" : "Quantity must b greater than 0."
        setErrors({
            ...temp
        })
        console.log(errors)
        return Object.values(temp).every(x => x == "")
    }
    const {
        values,
        setValues,
        handleInputChange,
        errors,
        setErrors,
        resetForm
    } = useForm({ quantity: 1 }, true, validate);


    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(allItems, allItemsHeadCells, filterFn)


    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.name.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }


    const handleItemSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            setOpenItemPopup(false)
            props.addItemToRequisition(values)
        }
    }

    const [openItemPopup, setOpenItemPopup] = useState(false)


    

    return (
        <>

            <Popup
                openPopup={openItemPopup}
                title="Add Item to Requisition"
                setOpenPopup={setOpenItemPopup}
            >
                <Form onSubmit={handleItemSubmit}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Controls.Input
                                label='Item'
                                value={values.name}
                            />
                            <Controls.Input
                                label='Category'
                                value={values.category}
                            />
                            <Controls.Input
                                label='Quantity'
                                name='quantity'
                                type='number'
                                value={values.quantity}
                                onChange={handleInputChange}
                                error={errors.quantity}
                            />
                            <br/>
                            <Controls.Button
                                type="submit"
                                text="Submit"
                                onClick={handleItemSubmit}
                            />
                        </Grid>
                    </Grid>

                </Form>

            </Popup>
                <Toolbar>
                    <Controls.Input
                        sx={classes.searchInput}
                        label="Search"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                </Toolbar>

                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton color='primary' onClick={() => { setValues({ ...item ,quantity:1}); setOpenItemPopup(true) }}>
                                            <SendOutlinedIcon />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
        </>
    )
}

