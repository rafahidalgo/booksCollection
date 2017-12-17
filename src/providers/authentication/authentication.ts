import { Injectable } from '@angular/core';

//plugins
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class AuthenticationProvider {

  logged: boolean; //para saber si cargar y guardar de firebase
  actualPage: string; //para saber en qué página estamos y mostrar el menú en consecuencia
  email: string = "Invitado"; //para mostrar cuando estés o no logueado

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
