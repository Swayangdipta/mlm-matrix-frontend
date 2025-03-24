// Store and Retrive and Delete the data from Local Storage

export const lsService = {
    set: (key, value) => {
        localStorage.setItem(key
        , JSON.stringify(value));   
    }
    ,
    get: (key) => {
        return JSON.parse(localStorage.getItem(key));
    }
    ,
    remove: (key) => {
        localStorage.removeItem(key);
    }
    
};
// Compare this snippet from src/Components/Navbar.jsx:     
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { lsService } from "../services/ls.service";
//
// function Navbar() {
