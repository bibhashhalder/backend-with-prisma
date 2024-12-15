import { Router } from "express";
import { UserController } from "./user.controller";

import { auth } from "../../middleWares/auth";
import { UserRole } from "@prisma/client";

const router =Router()

router.post('/',auth(UserRole.ADMIN,UserRole.SUPER_ADMIN), UserController.createAdmin)
export const userRoute =router