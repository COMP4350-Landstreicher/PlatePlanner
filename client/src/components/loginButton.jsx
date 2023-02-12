import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginButton() {
    const navigate = useNavigate();
    const onClick = () => {
        navigate("/recipes");
    } 
    return (
        <Button
            color='secondary'
            onClick={onClick}
        >Login</Button>
    );
}