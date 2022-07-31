import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/security/service/token.service';
import { ProjectsService } from 'src/app/service/projects.service';
import { Project } from '../../model/project';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {

  roles!: string[];
  isAdmin = false;

  project: Project = null;
  projects: Project[] = [];

  constructor(
    private projectService: ProjectsService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService,
  ) { }

  ngOnInit()  {
    
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
    const id = this.activatedRoute.snapshot.params['id'];
    console.log(id)
    this.projectService.listProjects().subscribe(
      data => {
        this.projects = data
        console.log(this.projects)
        console.log(this.projects.filter(project=>project.id==id)[0])
        this.project= this.projects.filter(project=>project.id==id)[0]
      }
    )

  }

  onUpdate(){

    const id = this.activatedRoute.snapshot.params['id'];
  
    console.log("Project: " + this.project)
  
    this.projectService.updateProject(id, this.project).subscribe(
        data => {
          this.toastr.success('Project Updated', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          console.log(data);
          this.router.navigate(['/portfolio/all']);
        },
        err => {
          this.toastr.error(err.error.mesagge, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }
      );
    }

}
