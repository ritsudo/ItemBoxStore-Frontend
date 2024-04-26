export class RegisterContract {
    login: string;
    email: string;
    name: string;
    phone: string;
    password: string;
    confirmPassword: string;
  
    constructor(
        login: string,
        email: string,
        name: string,
        phone: string,
        password: string,
        confirmPassword: string,
        ) {
      this.login = login;
      this.email = email;
      this.name = name;
      this.phone = phone;
      this.password = password;
      this.confirmPassword = confirmPassword;
    }
  }