/*
    Campos:
        idClient, vehicle, service, status
*/

import { Schema, model } from "mongoose";

const appointmentSchema = new Schema(
  {
    idClient: {
        type: Schema.Types.ObjectId,
        ref: "clients",
        require: true,
      },

    vehicle: {
        type: String,
        required: true,
    },

    service: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    }

  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("appointment", appointmentSchema);