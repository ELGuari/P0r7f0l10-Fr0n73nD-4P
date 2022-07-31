import {Component, OnInit,} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuario } from '../../Entity/login-usuario';
import { AuthService } from '../../service/auth.service';
import { TokenService } from '../../service/token.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  isLogged = false;
  isLoginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errorMessage!: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,

  ) { }

  ngOnInit() {
/* Comprobando si el usuario ya ha iniciado sesión. Si es así, establece la variable isLogged en verdadero, y el
isLoginFail variable a falso. También establece la variable roles a las autoridades del usuario. */
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  /**
   * La función onLogin() se llama cuando el usuario hace clic en el botón de inicio de sesión. Crea un nuevo
    * Objeto LoginUsuario con el usuario y contraseña ingresados por el usuario. Luego llama al inicio de sesión ()
    * función del authService, que devuelve un Observable. Se llama a la función subscribe()
    * el Observable, y los datos devueltos por el Observable se almacenan en los datos variables. la ficha
    * se almacena en el almacenamiento local del navegador y el usuario es redirigido a la página de inicio
   */
   onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario,this.password);
    this.authService.login(this.loginUsuario).subscribe({
      next: (data) => {
        this.isLogged = true;
        this.isLoginFail = false;

        console.log(data.nombreUsuario)
        console.log(data.token)
        console.log(data.authorities)

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate(['/']);
        window.location.reload();
      },
      error: (err) => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errorMessage = err.error.errorMessage;
        console.log(err.error.errorMessage);
        

      }
    })
  }

}