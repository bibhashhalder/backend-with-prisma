import { Router } from "express";
import { AuthController } from "./Auth.controller";

const router =Router()
router.post('/login',AuthController.loginUser)
router.post('/refresh-token',AuthController.refreshToken)
export const AtuhRouter =router