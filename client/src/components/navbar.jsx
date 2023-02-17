import { Box, Drawer, Tab, Tabs, Toolbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import logo from '../img/logo-white.png'
import Logout from "./logout";

export default function NavBar(props) {
    const [value, setValue] = React.useState(props.value);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Drawer
            sx={{
                width: 250,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 250,
                    boxSizing: 'border-box',
                    backgroundColor: '#547958',
                    borderColor: '#FFFFFE'
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar>
                <Box
                    component="img"
                    sx={{
                        height: 64,
                        my: '30px'
                    }}
                    alt="Your logo."
                    src={logo}
                />
            </Toolbar>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    orientation="vertical"
                    aria-label="nav tabs example"
                    sx={{
                        '.MuiTabs-indicator': {
                            left: 0,
                            width: '4px',
                            backgroundColor: '#ECF3A3',
                        },
                        '.MuiTab-wrapped': {
                            alignItems: "self-start",
                            justifyContent: "flex-start",
                            color: "#FFFFFE",
                            textTransform: "none",
                            fontSize: "18px",
                            fontWeight: "medium",
                            pl: "30px",
                            py: "20px"
                        },
                        '.Mui-selected': {
                            color: "#ECF3A3 !important",
                            fontWeight: "bold"
                        },
                    }}
                >
                    <Tab component={Link} label="Recipes" to="/recipes" wrapped={true} />
                    <Tab component={Link} label="Week Plan" to="/week-plan" wrapped={true} />
                    <Tab component={Link} label="Shopping List" to="/shopping-list" wrapped={true} />
                </Tabs>
            </Box>
            <Box>
                <Logout />
            </Box>
        </Drawer>
    );
}