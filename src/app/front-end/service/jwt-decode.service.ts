import {Injectable, OnInit} from '@angular/core';
import {jwtDecode, JwtPayload} from "jwt-decode"
import {CookieService} from "ngx-cookie-service"
import {SharingService} from "./sharing.service";
import {AuthToken, Role} from "../constant/constants";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JwtDecodeService implements OnInit{

  public token: BehaviorSubject<string> = new BehaviorSubject("")

  constructor(
    private sharingService: SharingService,
    private cookieService: CookieService,
  ) {}

  private decodeToken = (token: string) => {
    try {
      return jwtDecode(token)
    } catch (e) {
      return null
    }
  }

  public checkToken = () : Observable<boolean> => {
    if (!this.cookieService.check(AuthToken)) return new BehaviorSubject(false).asObservable()

    let token: string = this.cookieService.get(AuthToken)
    if (!token) return new BehaviorSubject(false).asObservable()

    let jwtPayLoad: JwtPayload | null = this.decodeToken(token)

    if (!jwtPayLoad) return new BehaviorSubject(false).asObservable()

    return new BehaviorSubject((jwtPayLoad?.exp ?? 0 - Date.now()) > 0).asObservable();
  }

  public checkRole = (): boolean => {
    let jwtPayLoad: any = this.decodeToken(this.cookieService.get(AuthToken))

    if (!jwtPayLoad) return false

    let roles: Array<string> = jwtPayLoad?.roles[0].split("/")

    return roles.includes(Role.Admin) && roles.includes(Role.Moderator)
  }

  public deleteAuthToken = () => {
    if (this.cookieService.check(AuthToken)) {
      this.cookieService.delete(AuthToken)
      this.sharingService.setValueCheckAuthentication(false).then(() => false)
    }
  }

  ngOnInit(): void {
    this.token.subscribe(() => {
      if (this.cookieService.check(AuthToken)) {
        this.token.next(this.cookieService.get(AuthToken))
      }
    })
  }

  setToken = async (token: string) : Promise<void> => {
    this.token.next(token)
  }

  awaitDataToken(): Observable<boolean> {
    return this.checkToken()
  }
}
