import { Schema, model, Document, Types, Mongoose } from "mongoose";

const VacunaSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  tecnology: { type: String, required: true},
  acceptationdate: { type: Date},
  
});

export default model("Vacuna", VacunaSchema);