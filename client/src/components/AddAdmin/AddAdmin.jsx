import React from 'react'
import { Formik } from 'formik';
import * as Yup from "yup"
import axios from "axios"
import {handleToastMessage} from "../../App"

//MUI
import {Box, Button, IconButton, Modal, TextField, Typography} from "@mui/material"
import {AdminPanelSettings, Close} from '@mui/icons-material';

//Style
import styles from "./AddAdmin.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { closeAddAdminModal } from '../../store/slices/addModalSlice';

const AddAdmin = () => {
    const dispatch= useDispatch()
    const date = new Date()
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
    const {openAdminModal} = useSelector((state)=>state.addModal)

    const initialAddAdminValues = {
        username:"",
    }

    const AddAdminSchema = Yup.object().shape({
        username:Yup.string().required("Enter New Admin Username"),
    })

    const handleSubmitAdmin = async(values,onSubmitProps)=>{
        await axios.post(process.env.REACT_APP_SERVER_URL+"/Admin/addAdmin",{
            ...values
        },{
            withCredentials:true
        }).then((res)=>{
            onSubmitProps.resetForm()
            handleToastMessage(res.data.message,"s")
            dispatch(closeAddAdminModal())
        }).catch((err)=>{
            handleToastMessage(err.response.data.message,"e")
        })
    }

    return(
        <Modal
            open={openAdminModal}
            onClose={()=>dispatch(closeAddAdminModal())}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={`grid-stretch ${styles.modal}`}>
                 <IconButton onClick={()=>dispatch(closeAddAdminModal())} className={`flex-center ${styles.close_btn}`}>
                    <Close/>
                </IconButton>
                <Box className={`flex-center ${styles.title} tac`}>
                    <AdminPanelSettings fontSize='large'/>
                    <Typography className={`tac`} variant='h3'>Add Admin</Typography>
                </Box>
                <Box>
                    <Formik
                        initialValues={initialAddAdminValues}
                        validationSchema={AddAdminSchema}
                        className={`flex-center`}
                        onSubmit={handleSubmitAdmin}
                    >
                        {({values,errors, touched , handleSubmit , handleBlur,handleChange})=>(
                        <form className={`grid-stretch ${styles.form}`} onSubmit={handleSubmit}>
                            <TextField className={`grid-stretch`} label="Username" name='username' value={values.username} onChange={handleChange} id="username" error={Boolean(touched.username) && Boolean(errors.username)} helperText={touched.username && errors.username} onBlur={handleBlur}/>
                            <Box className={`grid-stretch ${styles.btns}`}>
                                <Button type="submit">Add</Button>
                                <Button onClick={()=>dispatch(closeAddAdminModal())}>Cancel</Button>
                            </Box>
                        </form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Modal>
    )

}

export default AddAdmin
