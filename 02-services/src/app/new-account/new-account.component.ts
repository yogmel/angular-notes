import { Component } from '@angular/core';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html'
})
export class NewAccountComponent {
  constructor(private accountsService: AccountsService) {
    this.accountsService.statusUpdated.subscribe(
      (status: string) => alert('status' + status)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.onAccountAdded(accountName, accountStatus);
  }
}
