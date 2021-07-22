/* eslint-disable prettier/prettier */
import mongoose, { Document } from "mongoose";
export interface IWallet extends Document {
    "token"?: string;
    "name": string
    "address": string,
    
}
const walletSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true,
        
    },
    address: {
        type: "string",
        required: true,
        
    }



})

export default mongoose.model<IWallet>('Wallet', walletSchema);