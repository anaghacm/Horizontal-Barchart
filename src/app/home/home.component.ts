import { Component, OnInit } from '@angular/core';
import { BarchartData } from '../Services/barchart-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public populationData:BarchartData[]=[
    {country:'China', population:1415046, color:'#f0a23e'},
    {country:'Pakistan', population:200814, color:'#e66b5b'},
    {country:'United States', population:1267670, color:'#c2bf5a'},
    {country:'Brazil', population:410868, color:'#037a92'},
    {country:'Indonesia', population:866795, color:'#7badae'},
    {country:'India', population:1354052, color:'#0e0b'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
