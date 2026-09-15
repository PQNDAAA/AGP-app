import {Component, OnInit} from '@angular/core';
import {FormSegment, formSegmentDefaultSettings} from "../interface/form-segment";
import {InternalControlEntry, InternalControlEntryDefaultSettings} from "../interface/internal-control-entry";
import {Observable} from "rxjs";
import {InternalControlsService} from "../services/internal-controls-service";
import {NgForm} from "@angular/forms";
import {InputFocused} from "../input-focused";
import {ModalController} from "@ionic/angular";
import {EditingWindowICComponent} from "../editing-window-ic/editing-window-ic.component";
import {inject} from '@angular/core';
import {UtilsService} from "../services/utils/utils-service";

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
    {
      name: "professionalCardNumber",
      touched: false,
    }
  ]

  private utilsService = inject(UtilsService);

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private icService: InternalControlsService, private modalController: ModalController) {
    this.internalControls$ = this.icService.internalControls$;
  }

  ngOnInit() {}

  async addInternalControl(form: NgForm) {
    if (!form.valid) return;
    this.internalControlEntry.entryDateDisplay = this.utilsService.convertISOtoLocaleDateString(this.internalControlEntry.entryDate);

    await this.icService.addInternalControl(this.internalControlEntry);
  }

  segmentChange(e: any, id: number) {
    let value = e.target.value;
    value = JSON.parse(value);
    const targetFormSegment = this.internalControlEntry.booleans.find(segment => segment.id === id);
    if (!targetFormSegment) return;
    targetFormSegment.value = value;

    console.log(this.internalControlEntry.booleans);
  }

  onProfessionalCardInput(e: any){
    let targetValue = e.target.value;
    if(targetValue.length >= 4){
      targetValue = targetValue.slice(0, 3) + '-' + targetValue.slice(4);
    }
    if(targetValue.length >= 8){
      targetValue = targetValue.slice(0, 7) + '-' + targetValue.slice(8);
    }
    if(targetValue.length >= 13){
      targetValue = targetValue.slice(0, 12) + '-' + targetValue.slice(13);
    }
    if(targetValue.length >= 16){
      targetValue = targetValue.slice(0, 15) + '-' + targetValue.slice(16);
    }
    if(targetValue.length >= 19){
      targetValue = targetValue.slice(0, 18) + '-' + targetValue.slice(19);
    }
    console.log(targetValue);
    e.target.value = targetValue;
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

  async openEditingModal(internalControl: InternalControlEntry) {
    const modal = await this.modalController.create({
      component: EditingWindowICComponent,
      componentProps: {
        internalControl: internalControl
      }
    });
    await modal.present();
  }

  async deleteInternalControl(internalControl: InternalControlEntry) {
    await this.icService.deleteInternalControl(internalControl);
  }

// NOM FONCTION A CHANGER
  get numberOfIC() {
    return this.icService.icsLength;
  }

  getSegment(name: string) : FormSegment | undefined {
    return this.internalControlEntry.booleans.find(segment => segment.name === name);
  }
}
