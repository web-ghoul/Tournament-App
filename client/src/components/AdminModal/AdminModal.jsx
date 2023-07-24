import React from 'react'
import { Formik } from 'formik';
import * as Yup from "yup"
import axios from "axios"
import {handleToastMessage} from "../../App"

//MUI
import {Box, Button, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography} from "@mui/material"
import {EmojiEvents,AdminPanelSettings} from '@mui/icons-material';

//Style
import styles from "./AdminModal.module.css"

const AdminModal = ({state,openModal,handleCloseModal, setAdd}) => {
    const date = new Date()
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

    const initialAddAdminValues = {
        username:"",
    }

    const AddAdminSchema = Yup.object().shape({
        username:Yup.string().required("Enter New Admin Username"),
    })

    const initialAddTournamentValues = {
        name:"",
        description:"",
        date:"",
        type:"",
        game_time:"",  
        max:"",
    }

    const AddTournamentSchema = Yup.object().shape({
        name:Yup.string().required("Enter Tournament Name"),
        description:Yup.string().required("Enter Tournament Description"),
        date:Yup.date().min(previous, "Enter Valid Date").required(),
        game_time:Yup.string().required("Enter Type of Tournament Time"),
        type:Yup.string().required("Enter Tournament Type"),
        time:Yup.string().required("Enter Tournament Time"),
        max:Yup.number().required("Enter Maximum Number of Players").positive().integer(),
    })

    const optionsType = [
        {value:"normal", label:"normal"},
        {value:"crazy", label:"crazy"},
    ]

    const handleSubmitTournament = async(values, onSubmitProps)=>{
        const date = values.date
        const time = values.time
        const startsAt = date+"T"+time+":00+03:00"
        values = {...values,  startsAt : startsAt}
        await axios.post(process.env.REACT_APP_SERVER_URL+"/Admin/addTournament",{
            ...values
        },{
            withCredentials:true
        }).then((res)=>{
            onSubmitProps.resetForm()
            handleToastMessage(res.data.message,"s")
            handleCloseModal()
        }).catch((err)=>{
            handleToastMessage(err.response.data.message,"e")
        })
    }

    const handleSubmitAdmin = async(values,onSubmitProps)=>{
        await axios.post(process.env.REACT_APP_SERVER_URL+"/Admin/addAdmin",{
            ...values
        },{
            withCredentials:true
        }).then((res)=>{
            onSubmitProps.resetForm()
            handleToastMessage(res.data.message,"s")
            handleCloseModal()
        }).catch((err)=>{
            handleToastMessage(err.response.data.message,"e")
        })
    }

    if(state === "tournament"){
        return (
            <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box className={`grid-stretch ${styles.modal}`}>
                    <Box className={`flex-center ${styles.title} tac`}>
                        <EmojiEvents fontSize='large'/>
                        <Typography className={`tac`} variant='h3'>Add Tournament</Typography>
                    </Box>
                    <Box>
                        <Formik
                            initialValues={initialAddTournamentValues}
                            validationSchema={AddTournamentSchema}
                            className={`flex-center`}
                            onSubmit={handleSubmitTournament}
                        >
                            {({values,errors, touched , handleSubmit , handleBlur,handleChange})=>(
                            <form className={`grid-stretch ${styles.form}`} onSubmit={handleSubmit}>
                                <TextField className={`grid-stretch`} label="Name" name='name' value={values.name} onChange={handleChange} id="name" error={Boolean(touched.name) && Boolean(errors.name)} helperText={touched.name && errors.name} onBlur={handleBlur}/>

                                <TextField className={`grid-stretch`} label="description" name='description' value={values.description} onChange={handleChange} id="name" error={Boolean(touched.description) && Boolean(errors.description)} helperText={touched.name && errors.description} onBlur={handleBlur}/>

                                <Box className={`grid-stretch`}>
                                    <InputLabel id="date">date</InputLabel>
                                    <TextField className={`grid-stretch`} label="" name='date' value={values.date} onChange={handleChange} id="date" error={Boolean(touched.date) && Boolean(errors.date)} type='date' helperText={touched.date && errors.date} onBlur={handleBlur}/>
                                </Box>

                                <Box className={`grid-stretch`}>
                                    <InputLabel id="date">Time</InputLabel>
                                    <TextField className={`grid-stretch`} label="" name='time' value={values.time} onChange={handleChange} id="time" error={Boolean(touched.time) && Boolean(errors.time)} type='time' helperText={touched.time && errors.time} onBlur={handleBlur}/>
                                </Box>

                                <TextField className={`grid-stretch`} type="number" label="Maximum Players" name='max' value={values.max} onChange={handleChange} id="max" error={Boolean(touched.max) && Boolean(errors.max)} helperText={touched.max && errors.max} onBlur={handleBlur}/>

                                <Box className={`grid-stretch`}>
                                    <InputLabel id="type">Type</InputLabel>
                                    <Select
                                        labelId="type"
                                        id="type"
                                        value={values.type}
                                        label="type"
                                        onChange={handleChange("type")}
                                        onBlur={handleBlur("type")}
                                        option={optionsType}
                                        error={Boolean(touched.type) && Boolean(errors.type)}
                                    >
                                        <MenuItem value="normal">Normal</MenuItem>
                                        <MenuItem value="crazy">Crazy</MenuItem>
                                    </Select>
                                </Box>

                                <Box className={`grid-stretch`}>
                                    <InputLabel id="game_time">Match Time</InputLabel>
                                    <Select
                                        labelId="game_time"
                                        id="game_time"
                                        value={values.game_time}
                                        label="game time"
                                        onChange={handleChange("game_time")}
                                        onBlur={handleBlur("game_time")}
                                        option={optionsType}
                                        error={Boolean(touched.game_time) && Boolean(errors.game_time)}
                                    >
                                        <MenuItem value="Rapid">Rapid</MenuItem>
                                        <MenuItem value="Blitz">Blitz</MenuItem>
                                        <MenuItem value="Classic">Classic</MenuItem>
                                    </Select>
                                </Box>

                                <Box className={`grid-stretch ${styles.btns}`}>
                                    <Button type="submit">Add</Button>
                                    <Button onClick={handleCloseModal}>Cancel</Button>
                                </Box>
                            </form>
                            )}
                        </Formik>
                    </Box>
                </Box>
            </Modal>
        )
    }else if(state === "admin"){
        return (
            <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box className={`grid-stretch ${styles.modal}`}>
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
                                    <Button onClick={handleCloseModal}>Cancel</Button>
                                </Box>
                            </form>
                            )}
                        </Formik>
                    </Box>
                </Box>
            </Modal>
        )
    }else{
        return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={`grid-stretch ${styles.modal}`}>
                <Typography className={`tac`} variant='h3'>Choose Option</Typography>
                <Box className={`grid-stretch ${styles.btns} ${styles.options_buttons}`}>
                    <IconButton onClick={()=>setAdd("tournament")} className={`grid-center`}>
                    <EmojiEvents fontSize={"large"}/>
                    <Typography variant='h4'>Create Tournament</Typography>
                    </IconButton>
                    <IconButton onClick={()=>{setAdd("admin");console.log(1)}} className={`grid-center`}>
                    <AdminPanelSettings fontSize={"large"}/>
                    <Typography variant='h4'>Add Admin</Typography>
                    </IconButton>
                </Box>
            </Box>
        </Modal>
        )
    }
}

export default AdminModal
