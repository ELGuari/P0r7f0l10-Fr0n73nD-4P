import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';


import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { SkillsComponent } from './components/skills/skills.component';
import { StudiesComponent } from './components/studies/studies.component';
import { IndexComponent } from './security/index/index.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { BannerComponent } from './components/banner/banner.component';
import { LoginComponent } from './security/auth/login/login.component';


import { InterceptProvider } from './security/interceptors/portfolio-interceptor.service';

import { NewSkillsComponent } from './components/skills/new-skills/new-skills.component';
import { UpdateSkillsComponent } from './components/skills/update-skills/update-skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { NgbModule, NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { UpdatePersonComponent } from './components/about/update-person/update-person.component';
import { UpdateProjectComponent } from './components/projects/update-project/update-project.component';
import { NewProjectComponent } from './components/projects/new-project/new-project.component';
import { NewStudyComponent } from './components/studies/new-study/new-study.component';
import { UpdateStudyComponent } from './components/studies/update-study/update-study.component';
import { NewJobComponent } from './components/jobs/new-job/new-job.component';
import { UpdateJobComponent } from './components/jobs/update-job/update-job.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AboutComponent,
    FooterComponent,
    ProjectsComponent,
    SkillsComponent,
    StudiesComponent,
    IndexComponent,
    JobsComponent,
    BannerComponent,
    LoginComponent,
    NewSkillsComponent,
    UpdateSkillsComponent,
    UpdatePersonComponent,
    UpdateProjectComponent,
    NewProjectComponent,
    NewStudyComponent,
    UpdateStudyComponent,
    NewJobComponent,
    UpdateJobComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    NgbProgressbarModule,
    NgbModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    })
  ],
  providers: [InterceptProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
