export class Persona {
    idPersona: number;
    name: string;
    surname: string;
    email: string;
    profession: string;
    localization: string;
    fecha_nac: string;
    url_photo: string;
    url_banner: string;
    about_me: string;

constructor (
    idPersona: number,
    name: string,
    surname: string,
    email: string,
    profession: string,
    localization: string,

    fecha_nac: string,
    url_photo: string,
    url_banner: string,
    about_me: string,

    ) {
    this.idPersona = idPersona;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.profession = profession;
    this.localization = localization;
    this.fecha_nac = fecha_nac;
    this.url_photo = url_photo;
    this.url_banner = url_banner;
    this.about_me = about_me;

}
}