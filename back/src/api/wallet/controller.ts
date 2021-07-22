/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import Wallet, { IWallet } from "../../model/wallet";

export class WalletController {

    createAddress = async (req: Request, res: Response) => {
        try {
            var addrResponse = await axios.post<IAddress>("https://api.blockcypher.com/v1/bcy/test/addrs?token=" + process.env.CYPHER_TOKEN)

            await Address.create(addrResponse.data);

            res.status(200).json(addrResponse.data);

        } catch (error) {

            res.status(500).json({ error: JSON.stringify(error) });
        }

    }

    getWallet = async (req: Request, res: Response) => {

        // var walletResponse = await axios.get<WalletList>("https://api.blockcypher.com/v1/bcy/test/wallets?token=" + process.env.CYPHER_TOKEN);
        const wallets = await Wallet.find();

        let wallet_names = [];

        for (var w of wallets) {

            wallet_names.push(w.name)
        }


        res.status(200).json({ wallet_names: wallet_names });
    };

    createWallet = async (req: Request, res: Response) => {
        try {
            const { name } = req.body;

            const addrResp = await axios.post<IAddress>("https://api.blockcypher.com/v1/bcy/test/addrs?token=" + process.env.CYPHER_TOKEN)

            const { address } = addrResp.data;

            console.log(address);

            await Address.create(addrResp.data);

            const addressTest = "1JcX75oraJEmzXXHpDjRctw3BX6qDmFM8e";

            var data = {
                name: name,
                addresses: [addressTest]
                //"addresses": [address]
            }

            const walletResponse = await axios.post("https://api.blockcypher.com/v1/btc/main/wallets?token=" + process.env.CYPHER_TOKEN, JSON.stringify(data));


            const wallet = {
                name: walletResponse.data.name,
                address: walletResponse.data.addresses[0]
            }

            console.log(wallet);

            await Wallet.create(wallet);

            res.status(201).json(walletResponse.data);
        }
        catch (error) {

            res.status(500).json({ error: JSON.stringify(error) });
        }
    };
}

export default new WalletController();
