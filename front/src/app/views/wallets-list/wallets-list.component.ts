import { Component, OnInit } from '@angular/core';
import { WalletList } from 'src/app/shared/WalletList.model';
import { WalletsService } from 'src/app/shared/wallets.service';

@Component({
  selector: 'app-wallets-list',
  templateUrl: './wallets-list.component.html',
  styleUrls: ['./wallets-list.component.css']
})
export class WalletsListComponent implements OnInit {

  walletList : Array<string> = [];

  constructor(private walletsService: WalletsService) { }

  ngOnInit(): void {
      
    this.listWallets(); 
  }

  listWallets(): void {
    this.walletsService.getWallets().subscribe(response => {
      this.walletList = response.wallet_names;
      
    });


      }


}
