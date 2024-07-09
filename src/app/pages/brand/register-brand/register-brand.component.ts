import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AbstractRegister} from "../../../core/AbstractRegister";

@Component({
  selector: 'app-register-brand',
  templateUrl: './register-brand.component.html',
  styleUrls: ['./register-brand.component.css']
})
export class RegisterBrandComponent extends AbstractRegister implements OnInit {

    constructor(protected override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    ngOnInit(): void {

    }
}
