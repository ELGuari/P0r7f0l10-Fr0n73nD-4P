import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/security/service/token.service';
import { ProjectsService } from 'src/app/service/projects.service';
import { Project } from '../../model/project';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  roles!: string[];
  isAdmin: boolean = false;

  project: Project = null;

  projectName = '';
  projectDescription = '';
  fecha ='';
  projectUrlImg = '';
  linkRepositorio = '';
  linkWeb = '';



  constructor(
    private projectService: ProjectsService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
      console.log("Projects - User is admin: " + this.isAdmin);
    });
  }

/*
*/

  onCreate(): void {
    const project = new Project(
      this.projectName,
      this.projectDescription,
      this.fecha,
      this.projectUrlImg,
      this.linkRepositorio,
      this.linkWeb,
    );
    
    this.projectService.saveProject(project).subscribe(
      data => {
        this.toastr.success('Project created!', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['']);
      },
      err => {
        if (err.status = 200){
          this.toastr.success('Project created!', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.router.navigate(['']);
          window.location.reload();
        }else{

          this.toastr.error('', 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }
      }
      );
  }

}
