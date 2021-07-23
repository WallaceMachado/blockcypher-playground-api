import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wallet } from './Wallet.model';
import { WalletList } from './WalletList.model';

@Injectable({
  providedIn: 'root'
})
export class WalletsService {

  constructor(private http: HttpClient,) { }


  create(wallet: Wallet,): Observable<any> {

    return this.http.post<any>('http://localhost:3333/api/wallet', wallet)
  }

  getWallets(): Observable<WalletList> {

    return this.http.get<WalletList>('http://localhost:3333/api/wallet')
  }

}