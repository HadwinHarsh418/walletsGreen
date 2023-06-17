import { Component, OnInit, HostListener } from '@angular/core';
import { resize } from '@root/utils/resize';

@Component({
    selector: 'edex-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

    public smallScreen = false;
    public isBuying = true;

    constructor(
    ) {
        this.resize();
    }

    @HostListener('window:resize', ['$event'])
    listenResize() {
        this.resize();
    }

    resize() {
        this.smallScreen = !resize('xl');
    }

    ngOnInit() {
    }

    tabChange(e: any) {
        if (e.index === 0) {
            this.isBuying = true;
        } else {
            this.isBuying = false;
        }
    }

}
