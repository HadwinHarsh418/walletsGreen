import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
    selector: "edex-receive-dialogue",
    templateUrl: "./receive-dialogue.component.html",
    styleUrls: ["./receive-dialogue.component.scss"]
})
export class ReceiveDialogueComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

    

    copy(val: string) {
        let selBox = document.createElement("textarea");
        selBox.style.position = "fixed";
        selBox.style.left = "0";
        selBox.style.top = "0";
        selBox.style.opacity = "0";
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand("copy");
        document.body.removeChild(selBox);
    }
}
