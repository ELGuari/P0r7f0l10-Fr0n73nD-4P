export class Job {
    
    id: number;
    jobPosition: string;
    jobCompany: string;
    jobDescription: string;
    jobLocalization: string;
    fecha_ini: string;
    fecha_fin: string;

    

constructor( 
    jobPosition: string,
    jobCompany: string,
    jobDescription: string,
    jobLocalization: string,
    fecha_ini: string,
    fecha_fin: string,
)
    {
        this.jobPosition = jobPosition;
        this.jobCompany = jobCompany;
        this.jobDescription = jobDescription;
        this.jobLocalization = jobLocalization;
        this.fecha_ini = fecha_ini;
        this.fecha_fin = fecha_fin;
    }
}