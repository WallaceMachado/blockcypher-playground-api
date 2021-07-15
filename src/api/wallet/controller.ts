import { Request, Response } from "express";
import config from "../../config";
import fs from "fs";
import axios from 'axios';
import CreateAddress from "../../dto/address";
import Address, { IAddress } from "../../model/address";
import { WalletList } from "../../dto/wallet";

// import Pet, { IPet } from '../models/pet.model';
// import { IUser } from '../models/user.model';

// interface ICreatePetInput {
//   owner: IUser['_id'];
//   name: IPet['name'];
// }

// async function CreatePet({ owner, name }: ICreatePetInput): Promise<IPet> {
//   return await Pet.create({
//     owner,
//     name
//   })
//     .then((data: IPet) => {
//       return data;
//     })
//     .catch((error: Error) => {
//       throw error;
//     });
// }

// export default {
//   CreatePet
// };
export class WalletController {

    createAddress = async (req: Request, res: Response) => {
        try {
            var addrResponse = await axios.post<IAddress>("https://api.blockcypher.com/v1/bcy/test/addrs?token=" + process.env.CYPHER_TOKEN)
            var address = await Address.create(addrResponse.data);

            res.status(200).json(addrResponse.data);

        } catch (error) {

            res.status(500).json({ error: JSON.stringify(error) });
        }

    }

    getWallet = async (req: Request, res: Response) => {


        var walletResponse = await axios.get<WalletList>("https://api.blockcypher.com/v1/bcy/test/wallets?token=" + process.env.CYPHER_TOKEN);
        res.status(200).json(walletResponse.data);
    };
}

export default new WalletController();
