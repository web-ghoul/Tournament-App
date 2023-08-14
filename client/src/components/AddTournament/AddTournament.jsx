import React from 'react'
import { Formik } from 'formik';
import * as Yup from "yup"
import axios from "axios"
import {handleToastMessage} from "../../App"
import { getTournaments } from '../../store/slices/tournamentsSlice';

//MUI
import {Box, Button, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography} from "@mui/material"
import {Close, EmojiEvents} from '@mui/icons-material';

//Style
import styles from "./AddTournament.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { closeAddTournamentModal } from '../../store/slices/addModalSlice';
import { useNavigate } from 'react-router-dom';

const AddTournament = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const date = new Date()
    const previousDate = new Date(date.getTime());
    previousDate.setDate(date.getDate() - 1)
    const {username} = useSelector((state)=>state.auth)
    const {openTournamentModal} = useSelector((state)=>state.addModal)

    const initialAddTournamentValues = {
        name:"",
        description:"",
        date:"",
        time:"",
        type:"",
        game_time:"",  
        max:"",
    }

    const AddTournamentSchema = Yup.object().shape({
        name:Yup.string().required("Enter Tournament Name"),
        description:Yup.string().required("Enter Tournament Description"),
        date:Yup.date().min(previousDate, "Enter Valid Date").required("Enter Tournament Date"),
        game_time:Yup.string().required("Enter Type of Tournament Time"),
        type:Yup.string().required("Enter Tournament Type"),
        time:Yup.string().required("Enter Tournament Time"),
        max:Yup.number().integer().required("Enter Maximum Number of Players").positive().when("type",{
            is:"Brackets",
            then:(value)=>value.oneOf([2,4,8,16,32,64,128], "Must enter number in powers of 2"),
            otherwise:(value)=>value.oneOf([2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72], "Must enter even number less then 72")
        })
    })

    const optionsType = [
        {value:"Brackets", label:"Brackets"},
        {value:"Points", label:"Points"},
    ]

    const handleCloseModal=()=>{
        dispatch(closeAddTournamentModal())
    }

    const handleSubmitTournament = async(values, onSubmitProps)=>{
        if(!username){
            handleToastMessage("Create Account First","i")
            navigate(process.env.REACT_APP_SIGNUP_PAGE)
            handleCloseModal()
            return;
        }
        const date = values.date
        const time = values.time
        const startsAt = date+"T"+time+":00+03:00"
        if(((new Date(startsAt).getTime()/(1000 * 60)) - (new Date().getTime()/(1000*60))) <= 5){
            handleToastMessage("Tournament Date and Time must be at least 5 min early from Now","i")
            return;
        }
        values = {...values,  startsAt : startsAt , creator:username}
        await axios.post(process.env.REACT_APP_SERVER_URL+"/Admin/addTournament",{
            ...values
        },{
            withCredentials:true
        }).then((res)=>{
            onSubmitProps.resetForm()
            handleToastMessage(res.data.message,"s")
            handleCloseModal()
            dispatch(getTournaments())
        }).catch((err)=>{
            handleToastMessage(err.response.data.message,"e")
        })
    }

    return (
        <Modal
        open={openTournamentModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >   
            <Box className={`grid-stretch ${styles.modal}`}>
                <IconButton onClick={handleCloseModal} className={`flex-center ${styles.close_btn}`}>
                    <Close/>
                </IconButton>
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
                                <TextField  min={`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDay()-1}`}  className={`grid-stretch`} label="" name='date' value={values.date} onChange={handleChange} id="date" error={Boolean(touched.date) && Boolean(errors.date)} type='date' helperText={touched.date && errors.date} onBlur={handleBlur}/>
                            </Box>

                            <Box className={`grid-stretch`}>
                                <InputLabel id="date">Time</InputLabel>
                                <TextField className={`grid-stretch`} label="" name='time' value={values.time} onChange={handleChange} id="time" error={Boolean(touched.time) && Boolean(errors.time)} type='time' helperText={touched.time && errors.time} onBlur={handleBlur}/>
                            </Box>

                            
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
                                    className={styles.select}
                                    error={Boolean(touched.type) && Boolean(errors.type)}
                                >
                                    {
                                        optionsType.map((type,i)=>(
                                            <MenuItem key={i} value={type.value}>{type.label}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Box>

                            <TextField className={`grid-stretch`} type="number" label="Maximum Players" name='max' value={values.max} onChange={handleChange} id="max" error={Boolean(touched.max) && Boolean(errors.max)} helperText={touched.max && errors.max} onBlur={handleBlur}/>

                            <Box className={`grid-stretch`}>
                                <InputLabel id="game_time">Match Time</InputLabel>
                                <Select
                                    labelId="game_time"
                                    id="game_time"
                                    value={values.game_time}
                                    label="game time"
                                    onChange={handleChange("game_time")}
                                    onBlur={handleBlur("game_time")}
                                    className={styles.select}
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
}

export default AddTournament
