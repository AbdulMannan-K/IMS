import './App.css';
import Items from "../pages/Items/Items";
import Container from "@mui/material/Container";
import Requisitions from "../pages/Requisitions/Requisitions";
import {
    createBrowserRouter,
    RouterProvider,
    Route, Outlet,
} from "react-router-dom";
import {Box, createTheme, CssBaseline} from "@mui/material";
import AppBarWithDrawer from "../components/AppBar";
import {styled,ThemeProvider} from "@mui/material/styles";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const theme = createTheme({
    palette: {
        primary: {
            main: "#333996",
            light: '#3c44b126'
        },
        secondary: {
            main: "#f83245",
            light: '#f8324526'
        },
        background: {
            default: "#f4f5fd"
        },
    },
})

const router = createBrowserRouter([
    {
        path: "/",
        element:
            <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBarWithDrawer />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Outlet/>
                </Box>
            </Box>
            </ThemeProvider>,
        children:[
            {
                path:'/items',
                element:
                <>
                        <div>
                            <Container>
                                <Items />
                            </Container>
                        </div>
                        <CssBaseline />
                </>
            },
            {
                path: "/requisition",
                element:
                <>
                        <div style={{paddingLeft: '1px',
                            width: '100%'}}>
                            <Requisitions />
                        </div>
                        <CssBaseline />
                </>
            }
        ]
    },

]);

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
