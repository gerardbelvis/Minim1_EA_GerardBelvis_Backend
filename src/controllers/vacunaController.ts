import { Request, Response } from "express";
import Vacuna from "../models/Vacuna";

class VacunaController {

    public async getVacunas(req: Request, res: Response) {
        //Nos devuelve la lista de vacunas
        try {
          let vacunas = await Vacuna.find();
          res.status(200).json(vacunas); //Si la lista está vacia tambien es valido
        } catch (error) {
          console.log(`\n` + error);
          res.status(500).json(`${error}`);
        }
      }

      public async getVacuna(req: Request, res: Response) {
        //Nos devuelve un vacuna
        try {
            console.log(req);
          let vacuna = await Vacuna.findById(req.params.vacunaid);
          if (!vacuna) {
            console.log(`\nVacuna con id ${req.params.vacunaid} no encontrada`);
            res
              .status(404)
              .json(`Vacuna con id ${req.params.vacunaid} no encontrada`);
          } else res.status(200).json(vacuna);
        } catch (error) {
          console.log(`\n` + error);
          res.status(500).json(`${error}`);
        }
      }

      public async addVacuna(req: Request, res: Response) {
        try {
          let { name, description, tecnology, acceptationdate } = req.body;
          let newVacuna = new Vacuna({ name, description, tecnology, acceptationdate });
          await newVacuna.save();
          console.log(`\nVacuna añadida:\n ${newVacuna}`);
          res.status(201).json(newVacuna);
        } catch (error) {
          console.log(`\n` + error);
          res.status(500).json(`${error}`);
        }
      }

      public async editVacuna(req: Request, res: Response) {
        try {
          let paramsVacuna = await Vacuna.findById(req.params.vacunaid);
          if (paramsVacuna) {
            await Vacuna.findOneAndUpdate(
              { _id: req.params.vacunaid },
              {
                $set: { name: req.body.name, description: req.body.description, tecnology: req.body.tecnology },
                acceptationdate: req.body.acceptationdate,
              },
              { new: true }
            ).then((updatedVacuna) => {
              console.log(
                `Vacuna con id ${req.params.vacunaid} modificada: ${updatedVacuna}`
              );
              res.status(201).json(updatedVacuna);
            });
          } else {
            console.log(`Vacuna con id ${req.params.vacunaid} no encontrada`);
            res
              .status(404)
              .json(`Vacuna con id ${req.params.vacunaid} no ecnotrada`);
          }
        } catch (error) {
          console.log(`\n` + error);
          res.status(500).json(`${error}`);
        }
      }
}
const controller: VacunaController = new VacunaController();
export default controller;