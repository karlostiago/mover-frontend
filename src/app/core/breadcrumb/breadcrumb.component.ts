import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {NavigationStart, Router, Event} from "@angular/router";

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    standalone: true,
    styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

    items: MenuItem[] | undefined;
    home: MenuItem | undefined;

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.items = [{label: 'Dashboard'} ];
        this.home = { icon: 'pi pi-home', routerLink: '/' };

        this.router.events.subscribe((e: Event) => {
            if (e instanceof NavigationStart) {
                this.montarURL(e.url);
            }
        });
    }

    montarURL(url: string) {
        if (url === '/') {
            url = 'Dashboard/';
        }

        const arr = url.split('/')
            .filter(pt => pt !== '');

        const newArr = [];

        for (const p of arr) {
            const regex = /\d/;

            if (regex.test(p)) {
                continue;
            }

            newArr.push({
                label: p.charAt(0).toUpperCase() + p.slice(1)
            });
        }

        this.items = newArr;
    }
}
