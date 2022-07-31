import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/security/service/token.service';
import { StudiesService } from 'src/app/service/studies.service';
import { Studies } from '../../model/studies';

@Component({
  selector: 'app-update-study',
  templateUrl: './update-study.component.html',
  styleUrls: ['./update-study.component.css']
})
export class UpdateStudyComponent implements OnInit {

  roles: string[] = [];
  isAdmin = false;

  study: Studies = null;
  studys: Studies[] = [];

  constructor(  
    private studyService: StudiesService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(){
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
    const id = this.activatedRoute.snapshot.params['id'];
    console.log(id)
    this.studyService.listStudies().subscribe(
      data => {
        this.studys = data
        console.log(data)
        console.log(this.studys.filter(study => study.id== id)[0])
        this.study = this.studys.filter(study => study.id== id)[0];
      }
    )
  }

  onUpdate(){

    const id = this.activatedRoute.snapshot.params['id'];
  
    console.log("Study: " + this.study)
  
    this.studyService.updateStudies(id, this.study).subscribe(
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
