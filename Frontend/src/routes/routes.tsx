import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
// import FieldDisplay from "../components/FieldDisplay";
import App from "../App";

import AddWorkFlow from "../pages/AddWorkFlow";
import Test from "../pages/Test";
import DetailedFormPage from "../pages/DetailedFormPage";
import HomePage from "../components/Homepage";
import ResponsePage from "../pages/ResponsePage";
import ResponseDetail from "../pages/ResponseDetail";
import AllTicket from "../components/AllTicket";
import SuccessPage from "../pages/SuccessPage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute";

export const router=createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App/>}>
         <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
        <Route index element={<HomePage/>}/>
    {/* <Route path="/change/" element={<FieldDisplay/>}/> */}
    <Route path="/addWorkFlow" element={<AddWorkFlow/>}/>
    <Route path="/workFlow/:wid" element={<DetailedFormPage/>}/>
    <Route path="/response" element={<ResponsePage/>}/>
    <Route path="/response/:id" element={<ResponseDetail/>}/>
    <Route path="/tickets" element={<AllTicket/>}/>
     <Route path="/success" element={<SuccessPage/>}/>
     <Route path="/cancel" element={<SuccessPage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
    <Route path="/test" element={<Test/>}/>
    </Route>
    </Route>
))