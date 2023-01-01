import React, { useState } from 'react'
import ItemForm from "./ItemForm";
import {Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment} from '@mui/material';
import {makeStyles} from '@material-ui/core'
import useTable from "../../components/useTable";
import * as itemService from "../../service/itemService";
import { Search } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Input from "../../components/controls/Input";
import Button from "../../components/controls/Button";
import ActionButton from "../../components/controls/ActionButton";
import Popup from "../../components/Popup";
import {styled} from "@mui/material/styles";


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
        backgroundColor: "#F4F5FD",
        cursor: 'pointer',
    },
}));


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    toolBar: {
        display: "flex",
        alignItems: "center",
        justifyContent:"space-around",
    }
}))


const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'name', label: 'Name' },
    { id: 'category', label: 'Category' },
    { id: 'quantity', label: 'Quantity' },
    { id: 'packaging', label: 'Packaging' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Items() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(itemService.getItems())
    const [filterFn, setFilterFn] = useState({
        fn: items => {
            return items;
        }
    })
    const [openPopup, setOpenPopup] = useState(false)
    // const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    // const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.name.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (item, resetForm) => {
        if (item.id === 0)
            itemService.addItem(item)
        else
            itemService.updateItem(item)
        resetForm()
        setRecordForEdit(null);
        setOpenPopup(false)
        setRecords([...itemService.getItems()]);
        // setRecords([...records,employee]);
        // setNotify({
        //     isOpen: true,
        //     message: 'Submitted Successfully',
        //     type: 'success'
        // })
    }

        const openInPopup = item => {
            setRecordForEdit(item)
            setOpenPopup(true)
        }

        const onDelete = id => {
            // setConfirmDialog({
            //     ...confirmDialog,
            //     isOpen: false
            // })
            itemService.deleteItem(id);
            setRecords(itemService.getItems())
            // setNotify({
            //     isOpen: true,
            //     message: 'Deleted Successfully',
            //     type: 'error'
            // })
        }

        return (
            <>
                {/*<PageHeader*/}
                {/*    title="New Employee"*/}
                {/*    subTitle="Form design with validation"*/}
                {/*    icon={<PeopleOutlineTwoToneIcon fontSize="large" />}*/}
                {/*/>*/}
                {/*<ItemForm addItem={addOrEdit}/>*/}
                <Paper className={classes.pageContent}>
                    <div className={classes.toolBar}>
                        <Input
                            label="Search Employees"
                            InputProps={{
                                startAdornment: (<InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>)
                            }}
                            className={classes.searchInput}
                            onChange={handleSearch}
                        />
                        <Button
                            text="Add New"
                            variant="outlined"
                            startIcon={<AddIcon/>}
                            className={classes.newButton}
                            onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                        />
                    </div>
                    <TblContainer>
                        <TblHead/>
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map(item =>
                                    (<StyledTableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.category}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.packaging}</TableCell>
                                        <TableCell>
                                            <ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(item) }}
                                            ><EditOutlinedIcon fontSize="small"/>
                                            </ActionButton>
                                            <ActionButton
                                                color="secondary"
                                                onClick={() => {
                                                    // setConfirmDialog({
                                                    //     isOpen: true,
                                                    //     title: 'Are you sure to delete this record?',
                                                    //     subTitle: "You can't undo this operation",
                                                    //     onConfirm: () => { onDelete(item.id) }
                                                    // })
                                                }}>
                                                <CloseIcon fontSize="small"/>
                                            </ActionButton>
                                        </TableCell>
                                    </StyledTableRow>)
                                )
                            }
                        </TableBody>
                    </TblContainer>
                    <TblPagination/>
                </Paper>
                <Popup
                    title="Items Form"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <ItemForm
                        recordForEdit={recordForEdit}
                        addItem={addOrEdit}
                    />
                </Popup>
                {/*<Notification*/}
                {/*    notify={notify}*/}
                {/*    setNotify={setNotify}*/}
                {/*/>*/}
                {/*<ConfirmDialog*/}
                {/*    confirmDialog={confirmDialog}*/}
                {/*    setConfirmDialog={setConfirmDialog}*/}
                {/*/>*/}
            </>
        )
}
