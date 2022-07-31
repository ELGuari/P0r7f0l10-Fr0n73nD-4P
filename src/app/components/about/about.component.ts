import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/security/service/token.service';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { Persona } from '../model/persona';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  @ViewChild("modalLogin", {static: false})
modalLogin: TemplateRef<any>


  roles: string[] = [];
  portfolioList: any = [];
  isAdmin = false;

  //persona: Persona = null;

  constructor(
    private portfolioService: PortfolioService,
    private tokenService: TokenService,
    private modalService: NgbModal,
    private router: Router
) { }
  
  ngOnInit(){
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });

    this.portfolioService.getPortfolio().subscribe((response: any) => this.portfolioList = response);
  }
  
  onUpdate(): void {
    this.modalService.open(this.modalLogin)
  }
  

}



