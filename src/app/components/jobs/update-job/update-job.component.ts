import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/security/service/token.service';
import { JobsService } from 'src/app/service/jobs.service';
import { Job } from '../../model/experiences';

@Component({
  selector: 'app-update-job',
  templateUrl: './update-job.component.html',
  styleUrls: ['./update-job.component.css']
})
export class UpdateJobComponent implements OnInit {

  roles: string[] = [];
  isAdmin = false;

  job: Job = null;
  jobs: Job[] = [];

  constructor(
    private jobsService: JobsService,
    private activatedRoute: ActivatedRoute,
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
    });
    const id = this.activatedRoute.snapshot.params['id'];
    console.log(id)
    this.jobsService.listJob().subscribe(
      data => {

        this.jobs = data
        console.log(this.jobs)
        console.log(this.jobs.filter(job => job.id== id)[0])
        this.job = this.jobs.filter(job => job.id== id)[0];
      }
    )
  }

  onUpdate(){
    const id = this.activatedRoute.snapshot.params['id'];
  
    console.log("Study: " + this.job)
  
    this.jobsService.updateJob(id, this.job).subscribe(
        data => {
          this.toastr.success('Study Updated', 'OK', {
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

