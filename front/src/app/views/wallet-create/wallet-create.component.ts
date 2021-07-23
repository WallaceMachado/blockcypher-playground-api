import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Wallet } from 'src/app/shared/Wallet.model';
import { WalletsService } from 'src/app/shared/wallets.service';

@Component({
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
  styleUrls: ['./wallet-create.component.css']
})
export class WalletCreateComponent implements OnInit {

  walletForm!: FormGroup;
  token = '';
  walletName!: Wallet;


  constructor(
    public dialogRef: MatDialogRef<WalletCreateComponent>, 
    private fb: FormBuilder, 
    private walletsService: WalletsService
    ) { 
      this.walletForm = this.fb.group({
        name: ['', [Validators.required]],
          
      })
    }

  ngOnInit(): void {

  }

  cancel(): void {
    this.dialogRef.close();
    this.walletForm.reset();
  }

  createWallet() {
      this.walletName = this.walletForm.value ;
      console.log(this.walletName);
      this.walletsService.create(this.walletName).subscribe(data => {
        this.dialogRef.close();
        this.walletForm.reset();
        window.location.reload();
      })
  }

}
