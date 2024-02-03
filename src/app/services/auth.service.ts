import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatform } from '@ionic/angular';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private currentUser: BehaviorSubject<User | boolean | null> = new BehaviorSubject<User | boolean | null>(null);

  constructor(private router: Router) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);


    this.loadUser();
  }

  async loadUser() {
    if (this.currentUser.value) {
      console.log('ALREADY GOT USER');
      return;
    }
    const user = await this.supabase.auth.getUser();
    console.log('🚀 ~ file: auth.service.ts ~ line 33 ~ AuthService ~ loadUser ~ session', user);

    if (user.data.user) {
      this.currentUser.next(user.data.user);
    } else {
      this.currentUser.next(false);
    }
  }

  signUp(credentials: { email: any; password: any }) {
    return this.supabase.auth.signUp(credentials);
  }

  signIn(credentials: { email: any; password: any }) {
    return this.supabase.auth.signInWithPassword(credentials);
  }

  signInWithEmail(email: string) {
    const redirectTo = isPlatform('capacitor') ? 'supachat://login' : `${window.location.origin}/groups`;
    console.log('set redirect: ', redirectTo);

    return this.supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } });
  }

  sendPwReset(email: string) {
    return this.supabase.auth.resetPasswordForEmail(email);
  }

  async signOut() {
    await this.supabase.auth.signOut();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  getCurrentUser(): Observable<User | boolean | null> {
    return this.currentUser.asObservable();
  }

  getCurrentUserId(): string | null{
    if (this.currentUser.value) {
      return (this.currentUser.value as User).id;
    } else {
      return null;
    }
  }

  async setSession(access_token: any, refresh_token: any) {
    return this.supabase.auth.setSession({ access_token, refresh_token });
  }
}
