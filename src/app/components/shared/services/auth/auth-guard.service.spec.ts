  import { AuthGuardService } from './auth-guard.service';
  import { AuthService } from './auth.service'; // dependency service
  import { async, TestBed } from '@angular/core/testing';
  import { Router } from '@angular/router';
  import { Observable } from 'rxjs';

  class AuthServiceStub {
    isLoggedInObs() : boolean {
        return false;
    };
  }


  describe('AuthGuard Service', () => {
    let service: AuthGuardService;
    let myServiceDependency: AuthService;
    let mockRouter = { navigate: jasmine.createSpy('navigate') };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthGuardService,
          { provide: AuthService, useClass: AuthServiceStub },
          { provide: Router, useValue: mockRouter }
        ]
      });

      service = TestBed.get(AuthGuardService);
      myServiceDependency = TestBed.get(AuthService);
    });

    it('Should create AuthService instance', () => {
      expect(service).toBeDefined();
    });

    it('Should not route if User is already loggedIn', () => {
      spyOn(myServiceDependency, 'isLoggedInObs').and.returnValue(Observable.of(true));
      service.canActivate();
      expect(myServiceDependency.isLoggedInObs).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledTimes(0);
    });

    it('Should route to Unauthorized page if user is not loggedIn', () => {
      spyOn(myServiceDependency, 'isLoggedInObs').and.returnValue(Observable.of(false));
      service.canActivate();
      expect(myServiceDependency.isLoggedInObs).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['unauthorized']);
    });

  });