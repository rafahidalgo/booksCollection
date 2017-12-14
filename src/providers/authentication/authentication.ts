import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class AuthenticationProvider {

  logged: boolean;
  actualPage: string;
  name: string = "Invitado";

  constructor(private angularFireAuth: AngularFireAuth) {
  }

  //Login con email y password
  login(email: string, password: string): Promise<any> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  //Reset password
  resetPassword(email: string): Promise<void> {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }

  //Logout
  logout(): Promise<void> {
    return this.angularFireAuth.auth.signOut();
  }

  //Register
  register(email: string, password: string): Promise<any> {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }


}
