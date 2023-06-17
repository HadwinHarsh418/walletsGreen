import { Component, OnInit, HostListener } from '@angular/core';
import { checkHeight, resize } from '@root/utils/resize';
import {select, Store} from '@ngrx/store';
import * as loginReducers from '@modules/login/reducers';

@Component({
    selector: 'edex-container',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class ContainerComponent implements OnInit {
    public smallScreen = false;
    public shortHeight = false;

    public user$ = this.store.pipe(select(loginReducers.getUser));

    constructor(
        private store: Store<loginReducers.State>
    ) {
        this.smallScreen = resize('sm') || resize('xs') || resize('md');
        this.shortHeight = checkHeight();
    }

    ngOnInit() {
    }

    @HostListener('window:resize', ['$event'])
    listenResize() {
        this.smallScreen = resize('sm') || resize('xs') || resize('md');
        this.shortHeight = checkHeight();
    }
}
