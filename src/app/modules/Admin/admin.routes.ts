import { NextFunction, Request, Response, Router } from "express";
import { AdminController } from "./admin.controller";

import { validateRequest } from "../../middleWares/validator.";
import { update } from "./admin.validation";
import { auth } from "../../middleWares/auth";
import { UserRole } from "@prisma/client";

const router =Router()




router.get(
    '/',
    auth(UserRole.SUPER_ADMIN,UserRole.ADMIN),
    AdminController.getAllAdmin
)
router.get(
    '/:adminId',
    auth(UserRole.SUPER_ADMIN,UserRole.ADMIN),
    AdminController.getAdminById
)
router.patch(
    '/:adminId',
    auth(UserRole.SUPER_ADMIN,UserRole.ADMIN),
    validateRequest(update),
    AdminController.updatedAdmin
)
router.delete(
    '/:adminId',
    auth(UserRole.SUPER_ADMIN,UserRole.ADMIN),
    AdminController.deleteAdmin
)
router.delete(
    '/shoft/:adminId',
    auth(UserRole.SUPER_ADMIN,UserRole.ADMIN),
    AdminController.shoftDeleteAdmin
)
export const AdminRoute =router