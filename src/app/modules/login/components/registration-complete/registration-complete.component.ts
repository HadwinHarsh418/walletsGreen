import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

@Component({
    selector: "login-registration-complete",
    templateUrl: "./registration-complete.component.html",
    styleUrls: ["./registration-complete.component.scss"]
})
export class RegistrationCompleteComponent implements OnInit {

    public status = ''
    public message = ''

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.status = this.route.snapshot.queryParamMap.get(
            "status"
        );
        this.message = this.route.snapshot.queryParamMap.get(
            "message"
        );
    }
}
