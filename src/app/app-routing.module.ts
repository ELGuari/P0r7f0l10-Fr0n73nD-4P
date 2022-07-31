import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JobsComponent } from './components/jobs/jobs.component';
import { StudiesComponent } from './components/studies/studies.component';

import { LoginComponent } from './security/auth/login/login.component';
import { IndexComponent } from './security/index/index.component';

import { PortfolioGuardService } from './security/guards/portfolio-guard.service';

import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';

import { NewSkillsComponent } from './components/skills/new-skills/new-skills.component';
import { UpdateSkillsComponent } from './components/skills/update-skills/update-skills.component';
import { UpdatePersonComponent } from './components/about/update-person/update-person.component';
import { NewProjectComponent } from './components/projects/new-project/new-project.component';
import { UpdateProjectComponent } from './components/projects/update-project/update-project.component';
import { NewStudyComponent } from './components/studies/new-study/new-study.component';
import { UpdateStudyComponent } from './components/studies/update-study/update-study.component';
import { NewJobComponent } from './components/jobs/new-job/new-job.component';
import { UpdateJobComponent } from './components/jobs/update-job/update-job.component';

const routes: Routes = [

  { path: '', component: IndexComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'projects/all', component: ProjectsComponent },
  /* Person */
  { path: 'person/update/:id', component: UpdatePersonComponent, canActivate: [PortfolioGuardService], data: {expectedRol: ['admin']}  },

  /* Projects */
  { path: 'projects/new', component: NewProjectComponent,canActivate: [PortfolioGuardService], data: {expectedRol: ['admin']} },
  { path: 'projects/update/:id', component: UpdateProjectComponent,canActivate: [PortfolioGuardService], data: {expectedRol: ['admin']} },

  /* Skills */
  { path: 'skills/all', component: SkillsComponent },
  { path: 'skills/new', component:  NewSkillsComponent, canActivate: [PortfolioGuardService], data: {expectedRol: ['admin']} },
  { path: 'skills/update/:id', component:  UpdateSkillsComponent, canActivate: [PortfolioGuardService], data: {expectedRol: ['admin']} },

  /* Studies */
  { path: 'studies/all', component: StudiesComponent },
  { path: 'studies/new', component: NewStudyComponent , canActivate: [PortfolioGuardService], data: {expectedRol: ['admin']} },
  { path: 'studies/update/:id', component: UpdateStudyComponent , canActivate: [PortfolioGuardService], data: {expectedRol: ['admin']} },
  
  /* Jobs */
  { path: 'jobs/all', component: JobsComponent },
  { path: 'jobs/new', component: NewJobComponent, canActivate: [PortfolioGuardService], data: {expectedRol: ['admin']} },
  { path: 'jobs/update/:id', component: UpdateJobComponent , canActivate: [PortfolioGuardService], data: {expectedRol: ['admin']} },


  { path: '**', redirectTo: '', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
