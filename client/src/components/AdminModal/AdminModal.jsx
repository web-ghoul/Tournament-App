import React from 'react'
import {Box, Button, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography} from "@mui/material"
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import styles from "./AdminModal.module.css"
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Formik } from 'formik';
import * as Yup from "yup"
import axios from "axios"
import swal from "sweetalert2"

const AdminModal = ({state,openModal,handleCloseModal, setAdd}) => {
  const initialAddAdminValues = {
      username:"",
  }
  const AddAdminSchema = Yup.object().shape({
      username:Yup.string().required(),
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
      name:Yup.string().required(),
      description:Yup.string().required(),
      date:Yup.string().required(),
      game_time:Yup.string().required(),
      type:Yup.string().required(),
      time:Yup.string().required(),
      max:Yup.number().required(),
  })

  const optionsType = [
    {value:"normal", label:"normal"},
    {value:"crazy", label:"crazy"},
  ]

  const handleSubmitTournament = async(values, onSubmitProps)=>{
    const date = values.date
    const time = values.time
    const startsAt = date+"T"+time+"03:00"
    await axios.post(process.env.REACT_APP_SERVER_URL+"/Admin/addTournament",{
        ...values,  startsAt : startsAt
    }).then((res)=>{
        console.log(res)
        swal.fire({
            title:"Success",
            text:"",
            icon:"success"
        })
        onSubmitProps.resetForm()
    }).catch((err)=>{
        swal.fire({
            title:"Error",
            text:err.response.data.message,
            icon:"error"
        })
        onSubmitProps.resetForm()
    })
  }

  const handleSubmitAdmin = async(values,onSubmitProps)=>{
    console.log(values)
    await axios.post(process.env.REACT_APP_SERVER_URL+"/Admin/addAdmin",{
        ...values
    }, {withCredentials: true}).then((res)=>{
        console.log(res)
        swal.fire({
            title:"Success",
            text:res.data.message,
            icon:"success"
        })
        onSubmitProps.resetForm()
    }).catch((err)=>{
        swal.fire({
            title:"Error",
            text:"error",
            icon:"error"
        })
        onSubmitProps.resetForm()
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
                      <EmojiEventsIcon fontSize='large'/>
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
                                    <MenuItem value="rapid">Rapid</MenuItem>
                                    <MenuItem value="blitz">Blitz</MenuItem>
                                    <MenuItem value="classic">Classic</MenuItem>
                                </Select>
                            </Box>

                            <Box className={`grid-stretch ${styles.btns}`}>
                                <Button onClick={handleSubmitTournament} type="submit">Add</Button>
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
                    <AdminPanelSettingsIcon fontSize='large'/>
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
              <Box className={`grid-stretch ${styles.btns}`}>
                <IconButton onClick={()=>setAdd("tournament")} className={`grid-center`}>
                  <EmojiEventsIcon fontSize={"large"}/>
                  <Typography variant='h4'>Create Tournament</Typography>
                </IconButton>
                <IconButton onClick={()=>{setAdd("admin");console.log(1)}} className={`grid-center`}>
                  <AdminPanelSettingsIcon fontSize={"large"}/>
                  <Typography variant='h4'>Add Admin</Typography>
                </IconButton>
              </Box>
          </Box>
      </Modal>
    )
  }
}

export default AdminModal
