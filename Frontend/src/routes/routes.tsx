import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
// import FieldDisplay from "../components/FieldDisplay";
import App from "../App";
import DynamicForm from "../components/DynamicForm";
import AddWorkFlow from "../pages/AddWorkFlow";
import Test from "../pages/Test";
import DetailedFormPage from "../pages/DetailedFormPage";

export const router=createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App/>}>
        <Route index element={<DynamicForm/>}/>
    {/* <Route path="/change/" element={<FieldDisplay/>}/> */}
    <Route path="/addWorkFlow" element={<AddWorkFlow/>}/>
    <Route path="/workFlow/:wid" element={<DetailedFormPage/>}/>
    <Route path="/test" element={<Test/>}/>
    </Route>
))