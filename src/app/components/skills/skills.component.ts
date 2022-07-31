import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/security/service/token.service';
import { SkillsService } from 'src/app/service/skills.service';
import { Skills } from '../model/skills';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  @ViewChild("modalCreate", {static: false})
  modalCreate!: TemplateRef<any>

  @ViewChild("modalUpdate", {static: false})
  modalUpdate!: TemplateRef<any>

  max = 100;


nameSkill = '';
levelSkill!: number;


  skills: Skills[] = [];
  roles!: string[];
  isAdmin = false;
  
  /* Modal */ 
  closeResult: string = '';

  constructor(
    private skillService: SkillsService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getSkills();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
    
  }
/**
* Crea una nueva habilidad, la guarda y luego redirige al usuario a la página del portafolio
 */
  onCreateSkill(): void {
    this.modalService.open(this.modalCreate)
    
  }

/**
* Llamamos a la función listSkills() desde skillService, y luego nos suscribimos a la
   * observable que regresa.
   *
   * Si el observable devuelve datos, estamos asignando esos datos a la variable de habilidades.
   *
   * Si el observable devuelve un error, estamos registrando ese error en la consola.
 */
getSkills(){
  this.skillService.listSkills().subscribe(
    data => {
      this.skills = data;
      console.log(data);
    },
    err => {
      console.log(err);
    }
  )
}


/**
 * Llama al método de eliminación del servicio de habilidades y, si la eliminación es exitosa, muestra un
  * mensaje de éxito y refresca la lista de habilidades
 * @param {number} id - number - la id de la skill que se eliminará
 */

delete(id: number){
  this.skillService.delete(id).subscribe(
    data => {
      this.toastr.success('Skill deleted', 'OK', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.getSkills();
    },
    err => {

      if (err.status == 200) {
        this.toastr.success('Skill deleted', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.getSkills();
      } else {


        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });

      }

    }
  );
}


}
