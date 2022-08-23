import { Component } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function  customInit():any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {
  constructor(private SV:SettingsService, private ss:SidebarService) { 
    customInit();
    this.ss.cargarMenu();
  } 

}
