import { Button } from "@mui/material";
import React from "react";

export default function Logout() {

    return (
        <Button
            variant="text"
            onClick={() => this.onClick()}
            sx={{
                color: "#FFFFFE",
                textTransform: "none",
                fontSize: "18px",
                fontWeight: "medium",
                ml: "30px",
                bottom: "30px",
                position: "absolute"
            }}
        >Logout</Button>
    );
}