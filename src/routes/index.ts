import { Router } from "express";
import vacunaController from "../controllers/vacunaController";

const router: Router = Router();

router.get("/", vacunaController.getVacunas);
router.get("/:vacunaid", vacunaController.getVacuna);

router.post("/new", vacunaController.addVacuna);

router.put("/:vacunaid", vacunaController.editVacuna);

export default router;