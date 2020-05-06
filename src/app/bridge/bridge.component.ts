import { Component } from '@angular/core';
import { OperationId } from './shared/service.model';

@Component({
  selector: 'app-bridge',
  templateUrl: './bridge.component.html',
  styleUrls: ['./bridge.component.css']
})
export class BridgeComponent {

  currentOperationId?: OperationId

  onSelected(selected: OperationId) {
    console.log("was selected", selected);
    this.currentOperationId = selected;
  }
}
