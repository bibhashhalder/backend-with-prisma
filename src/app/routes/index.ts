import { Router } from "express";
import { userRoute } from "../modules/User/user.route";
import { AdminRoute } from "../modules/Admin/admin.routes";
import { AtuhRouter } from "../modules/Auth/Auth.route";

const router =Router()
const moduleRoutes =[
    {
        path:'/user',
        route:userRoute
    },
    {
        path:'/admin',
        route:AdminRoute
    },
    {
        path:'/auth',
        route:AtuhRouter
    }
]
moduleRoutes.forEach(route=>router.use(route.path,route.route));
export default router