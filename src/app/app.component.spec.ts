import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GameSetupComponent } from './game-setup/game-setup.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        AppComponent,
        GameSetupComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`navigate to "" should redirect to /setup`, async(() => {
    const router = TestBed.get(Router);
    const location = TestBed.get(Location);

    router.initialNavigation();
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('/setup');
    });
  }));
});
