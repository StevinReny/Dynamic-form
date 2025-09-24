import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import FieldDisplay from "../components/FieldDisplay";
import App from "../App";
import DynamicForm from "../components/DynamicForm";
import AddWorkFlow from "../pages/AddWorkFlow";

export const router=createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App/>}>
        <Route index element={<DynamicForm/>}/>
    <Route path="/change/:id" element={<FieldDisplay/>}/>
    <Route path="/addWorkFlow" element={<AddWorkFlow/>}/>
    </Route>
))