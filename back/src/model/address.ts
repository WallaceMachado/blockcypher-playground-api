/* eslint-disable prettier/prettier */
import mongoose, { Document } from "mongoose";
export interface IAddress extends Document {
    "private": string,
    "public": string,
    "address": string,
    "wif": string
}
const addressSchema = new mongoose.Schema({
    private: {
        type: "string",
        required: true
    },
    public: {
        type: "string",
        required: true
    },
    address: {
        type: "string",
        required: true,
        unique: true
    },
    wif:{
        type:"string",
        required:true
    }



})

export default mongoose.model<IAddress>('Address', addressSchema);