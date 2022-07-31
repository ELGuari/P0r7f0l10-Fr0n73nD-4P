import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/security/service/token.service';
import { JobsService } from 'src/app/service/jobs.service';
import { Job } from '../../model/experiences';

@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.css']
})
export class NewJobComponent implements OnInit {

  roles: string[] = [];
  isAdmin = false;

  jobs: Job = null;



  
  jobPosition = '';
  jobCompany = '';
  jobDescription = '';
  jobLocalization = '';
  fecha_ini = '';
  fecha_fin = '';


  constructor(
    private jobsService: JobsService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit() {
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
      console.log("Jobs - User is admin: " + this.isAdmin);
    });
  }

  onCreate(): void{
    const jobs = new Job(
      this.jobPosition,
      this.jobCompany,
      this.jobDescription,
      this.jobLocalization,
      this.fecha_ini,
      this.fecha_fin,
      );

      this.jobsService.saveJob(jobs).subscribe(
        data => {
          this.toastr.success('Experience Creada Correctamente', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.router.navigate(['']);
        },
        err => {
          if (err.status= 200) {
            this.toastr.success('Experience Creada Correctamente', 'OK', {
              timeOut: 3000, positionClass: 'toast-top-center'
            });
            this.router.navigate(['']);
            window.location.reload();
          } else {
              this.toastr.error('', 'Fail', {
                timeOut: 3000, positionClass: 'toast-top-center',
              });
              console.log ( err)
          }

        }
      );
  }

}
