import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletAdressComponent } from './wallet-adress.component';

describe('WalletAdressComponent', () => {
  let component: WalletAdressComponent;
  let fixture: ComponentFixture<WalletAdressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletAdressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
