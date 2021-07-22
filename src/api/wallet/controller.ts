/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
import { Request, Response } from "express";
import config from "../../config";
import fs from "fs";
import axios from 'axios';
import CreateAddress from "../../dto/address";
import Address, { IAddress } from "../../model/address";
import { WalletList } from "../../dto/wallet";
import Wallet,  { IWallet } from "../../model/wallet";

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

    createWallet = async (req: Request, res: Response) => {
        try {
        const {name}= req.body;
        console.log("name: ", name );
        var addrResponse = await axios.post<IAddress>("https://api.blockcypher.com/v1/bcy/test/addrs?token=" + process.env.CYPHER_TOKEN)
        
        const {address}  = addrResponse.data;
        await Address.create(addrResponse.data);
        console.log("cheguei: ");
        const data = {
            name,
            addresses: [address]
        }
        console.log("cheguei: ", data);
        const walletResponse = await axios.post("https://api.blockcypher.com/v1/btc/main/wallets?token=" + process.env.CYPHER_TOKEN, JSON.stringify(data));
        console.log("walletResp: ", walletResponse );
        const wallet  = await Wallet.create(walletResponse.data);
        console.log("walletResp: ", wallet );
        res.status(200).json(walletResponse.data);
        }
        catch (error) {

            res.status(500).json({ error: JSON.stringify(error) });
        }
    };
}

export default new WalletController();
