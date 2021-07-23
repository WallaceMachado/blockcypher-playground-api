/* eslint-disable prettier/prettier */
import mongoose, { Document } from "mongoose";
export interface IWallet extends Document {
    "token"?: string;
    "name": string
    "addresses": [],

}
const walletSchema = new mongoose.Schema(
    {
        name: {
            type: "string",
            required: true,

        },
        addresses: [],
    },

    {
        toJSON: {
            transform: (_, ret): void => {
                delete ret.token;
                delete ret.address;
                delete ret._id;
                delete ret.__v;
            },
        },
    }



);

export default mongoose.model<IWallet>('Wallet', walletSchema);