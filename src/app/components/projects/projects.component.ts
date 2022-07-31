import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { TokenService } from 'src/app/security/service/token.service';
import { ProjectsService } from 'src/app/service/projects.service';
import { Project } from '../model/project';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  @ViewChild("modalCreate", {static: false})
  modalCreate!: TemplateRef<any>

  project: Project = null;
  projects: Project[] = [];
  roles!: string[];
  isAdmin = false;

  constructor(
    private projectService: ProjectsService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getProjects();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  getProjects() {
    this.projectService.listProjects().subscribe(
      data => {
        this.projects = data;
        console.log(data)
      },
      err => {
        console.log(err);
      }
    )
  }

  onCreateProject(): void{
    this.modalService.open(this.modalCreate)
  }


  delete(id: number) {
    this.projectService.deleteProject(id).subscribe(
      data => {
        this.toastr.success('Project deleted', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.getProjects();
      },
      err => {
        if (err.status = 200) {
          this.toastr.success('Project deleted', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.getProjects();
        } else {

          this.toastr.error(err.error.message, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }

      }
    );
  }



}
