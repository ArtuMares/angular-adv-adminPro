import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [`
    a{ cursor: pointer;
    }
  `
  ]
})
export class AccountSettingsComponent implements OnInit {
  constructor(private SV:SettingsService) { }

  ngOnInit(): void {
    this.SV.checkCurrentTheme();
  }

  changeTheme(theme: string) {
    this.SV.changeTheme(theme);
  }

}
