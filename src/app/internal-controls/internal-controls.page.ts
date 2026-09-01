import {Component, OnInit} from '@angular/core';
import {FormSegment, formSegmentDefaultSettings} from "../interface/form-segment";
import {InternalControlEntry, InternalControlEntryDefaultSettings} from "../interface/internal-control-entry";
import {BehaviorSubject, Observable} from "rxjs";
import {InternalControlsService} from "../services/internal-controls-service";
import {NgForm} from "@angular/forms";
import {InputFocused} from "../input-focused";
import {ModalController} from "@ionic/angular";
import {EditingWindowICComponent} from "../editing-window-ic/editing-window-ic.component";

@Component({
  selector: 'app-internal-controls',
  templateUrl: './internal-controls.page.html',
  styleUrls: ['./internal-controls.page.scss'],
  standalone: false
})
export class InternalControlsPage implements OnInit {

  internalControls$: Observable<InternalControlEntry[]>;

  internalControlEntry: InternalControlEntry = InternalControlEntryDefaultSettings;

  segmentList: FormSegment[] = formSegmentDefaultSettings;

  inputsFocused: InputFocused[] = [
    {
      name: "agent-name",
      touched: false,
    },
    {
      name: "domain-name",
      touched: false,
    },
    {
      name: "comment",
      touched: false,
    },

  ]

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private icService: InternalControlsService, private modalController: ModalController) {
    this.internalControls$ = this.icService.internalControls$;
  }

  ngOnInit() {
  }

  async addInternalControl(form: NgForm) {
    if (!form.valid) return;

    this.internalControlEntry.entryDateDisplay = this.convertISOtoLocaleDateString(this.internalControlEntry.entryDate);
    this.icService.addIC(this.internalControlEntry);
  }

  segmentChange(e: any, id: number) {
    const value = e.target.value;
    const targetFormSegment = this.internalControlEntry.segmentList.find(segment => segment.id === id);
    if (!targetFormSegment) return;
    targetFormSegment.value = value;

    console.log(this.internalControlEntry.segmentList);
  }

  get numberOfIC() {
    return this.icService.icsLength;
  }

  convertISOtoLocaleDateString(isoString: string) {
    return new Date(isoString).toLocaleDateString();
  }

  inputBlur(e: any) {
    const inputName = e.target.name;
    this.changeInputStatus(true, inputName);
    console.log(this.inputsFocused);
  }

  changeInputStatus(newValue: boolean, inputName: any) {
    const targetValue = this.inputsFocused.find(value => value.name === inputName);
    if (!targetValue) return;
    targetValue.touched = newValue;
  }

  inputIsTouched(inputName: string): boolean {
    const targetValue = this.inputsFocused.find(value => value.name === inputName);
    if (!targetValue) return false;
    return targetValue.touched;
  }

  deleteIC(internalControl: InternalControlEntry){
    this.icService.deleteIC(internalControl);
  }

  async openEditingModal(internalControl: InternalControlEntry){
    const modal = await this.modalController.create({
      component: EditingWindowICComponent,
      componentProps: {
        internalControl: internalControl
      }
    });
    await modal.present();
  }
}
