export class Credencial {
  UserName: string;
  Password: string;

  constructor(username: string, pwd: string){
    this.UserName = username;
    this.Password = pwd;
  }
}
