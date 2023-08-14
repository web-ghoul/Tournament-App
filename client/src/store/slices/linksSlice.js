import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    webGhoulContacts : {
        "linkedin":"https://www.linkedin.com/in/mahmoud-salama-23b627211/",
        "facebook":"https://www.facebook.com/mahmoud.gogoo.5/",
        "whatsapp":"https://wa.me/+201009344881",
        "github":"https://github.com/web-ghoul"
    }
    ,
    amrContacts: {
        "linkedin":"https://www.linkedin.com/in/amr-khaled-mohamed/",
        "facebook":"https://www.facebook.com/profile.php?id=100006620191591",
        "whatsapp":"https://wa.me/+201013714763",
        "github":"https://github.com/Amr006"
    }
}

const linksSlice = createSlice({
    name:"links",
    initialState,
})

export default linksSlice.reducer