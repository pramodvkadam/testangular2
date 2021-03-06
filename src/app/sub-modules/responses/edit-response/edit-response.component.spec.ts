/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {EditResponseComponent} from './edit-response.component';

describe('EditResponseComponent', () => {
    let component: EditResponseComponent;
    let fixture: ComponentFixture<EditResponseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditResponseComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditResponseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
