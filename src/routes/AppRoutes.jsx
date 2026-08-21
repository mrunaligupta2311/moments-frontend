 import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Splash from "../pages/Splash";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import Password from "../pages/Password";
import Index from "../pages/Index";
import NewMoment from "../pages/NewMoment";
import Moment from "../pages/Moment";
import EditMoment from "../pages/EditMoment";
import ResetAccount from "../pages/ResetAccount";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                {/* PUBLIC ROUTES */}

                <Route
                    path="/"
                    element={<Splash />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />


                {/* PROTECTED ROUTES */}

                <Route element={<ProtectedRoute />}>

                    <Route
                        path="/password"
                        element={<Password />}
                    />

                    <Route
                        path="/index"
                        element={<Index />}
                    />

                    <Route
                        path="/newmoment"
                        element={<NewMoment />}
                    />

                    <Route
                        path="/moment/:id"
                        element={<Moment />}
                    />

                    <Route
                        path="/edit-moment/:id"
                        element={<EditMoment />}
                    />

                    <Route
                        path="/reset-account"
                        element={<ResetAccount />}
                    />

                </Route>


                {/* FALLBACK */}

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;