import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureGeneratorComponentComponent } from './signature-generator-component.component';

describe('SignatureGeneratorComponentComponent', () => {
  let component: SignatureGeneratorComponentComponent;
  let fixture: ComponentFixture<SignatureGeneratorComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignatureGeneratorComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatureGeneratorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
