import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(private portfolioService: PortfolioService) { }
  isLogged=true; //Lo niego en la vista para no mostrar el botón

  portfolioList: any = [];
  studyList: any = [];

  ngOnInit(): void {
    this.portfolioService.getPortfolio().subscribe((response: any) => this.portfolioList = response);
    this.portfolioService.getStudies().subscribe((response: any) => this.studyList = response);
  }

}
