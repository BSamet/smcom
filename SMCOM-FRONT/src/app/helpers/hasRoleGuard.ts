import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TokenStorageService} from "../services/token-storage.service";

export class Permissions {
  canActivate(router:Router, tokenService:any, role:string): boolean {
    const user = tokenService.getUser();
    if (user && user.role) {
      if (user.role!=null) {
        return true
      } else {
        console.log("need role!")
        router.navigate(['login/unauthorized']).then();
        return false
      }
    } else {
      console.log("need session!")
      router.navigate(['login/unauthorized']).then();
      return false;
    }
  }
}

@Injectable()
export class NeedNormalRole implements CanActivate {
  constructor(private permissions: Permissions, private tokenService: TokenStorageService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return this.permissions.canActivate(this.router, this.tokenService, 'normal');
  }
}

@Injectable()
export class NeedAdminRole implements CanActivate {
  constructor(private permissions: Permissions, private tokenService: TokenStorageService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return this.permissions.canActivate(this.router, this.tokenService, 'admin');
  }
}
