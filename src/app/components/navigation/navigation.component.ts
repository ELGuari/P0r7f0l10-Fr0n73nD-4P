import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginUsuario } from 'src/app/security/Entity/login-usuario';
import { AuthService } from 'src/app/security/service/auth.service';
import { TokenService } from 'src/app/security/service/token.service';



@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})


export class NavigationComponent implements OnInit {

  isNavbarCollapsed=true;

@ViewChild("modalLogin", {static: false})
modalLogin: TemplateRef<any>

  isLogged = false;
  isLoginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errorMessage!: string;
  

  constructor(private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal
    ) { }

    ngOnInit(): void {
  
  
  
      if(this.tokenService.getToken()){
        this.isLogged = true;
        this.nombreUsuario = this.tokenService.getUserName();
        console.log(this.isLogged)
        console.log(this.nombreUsuario)
      }else {
        this.isLogged = false;
        console.log(this.isLogged)
      }
  
      if(this.tokenService.getToken()){
    
        this.isLogged = true;
        this.isLoginFail = false;
        this.roles = this.tokenService.getAuthorities();
      }
      
    }
  
    onLogOut(): void {
      this.tokenService.logOut();
      window.location.reload();
      
    }
  
    onLogin(): void {
      this.modalService.open(this.modalLogin)
      
    }
  }
  