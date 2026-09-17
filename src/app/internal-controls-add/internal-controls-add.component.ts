import {Component, inject, Input, OnInit, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {
  InternalControlEntry,
  internalControlEntryDefaultSettings,
} from "../interface/internal-control-entry";
import {FormSegment} from "../interface/form-segment";
import {FormsModule, NgForm} from "@angular/forms";
import {InputFocused, inputFocusedDefaultSettings} from "../input-focused";
import {UtilsService} from "../services/utils/utils-service";
import {InternalControlsService} from "../services/internal-controls-service";
import {IonDatetime, IonicModule, ModalController} from "@ionic/angular";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-internal-controls-add',
  templateUrl: './internal-controls-add.component.html',
  styleUrls: ['./internal-controls-add.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    NgIf,
    NgForOf
  ]
})
export class InternalControlsAddComponent {

  @Input() isEdit!: boolean;
  @Input() internalControlEntry!: InternalControlEntry;

  inputsFocused: InputFocused[] = inputFocusedDefaultSettings();
  private utilsService = inject(UtilsService);
  private icService = inject(InternalControlsService);
  private modalController = inject(ModalController);

  constructor() {
  }

  async saveInternalControl(form: NgForm) {
    if (!form.valid) return;
    this.internalControlEntry.entryDateDisplay = this.utilsService.convertISOtoLocaleDateString(this.internalControlEntry.entryDate);

    if(this.isEdit) {
      await this.icService.modifyInternalControl(this.internalControlEntry);
      this.isEdit = false;
    } else {
      await this.icService.addInternalControl(this.internalControlEntry);
    }
    await this.closeModal();
  }

  dateChange(e: any) {
    this.internalControlEntry.entryDate = e.detail.value;
  }

  segmentChange(e: any, id: number) {
    let value = e.target.value;
    value = JSON.parse(value);

    const targetFormSegment = this.internalControlEntry.booleans.find(segment => segment.id === id);
    if (!targetFormSegment) return;

    targetFormSegment.value = value;

    console.log(this.internalControlEntry.booleans);
  }


  //BUG A CORRIGER
  onProfessionalCardInput(e: any) {
    let targetValue = e.target.value;
    if (targetValue.length >= 4) {
      targetValue = targetValue.slice(0, 3) + '-' + targetValue.slice(4);
    }
    if (targetValue.length >= 8) {
      targetValue = targetValue.slice(0, 7) + '-' + targetValue.slice(8);
    }
    if (targetValue.length >= 13) {
      targetValue = targetValue.slice(0, 12) + '-' + targetValue.slice(13);
    }
    if (targetValue.length >= 16) {
      targetValue = targetValue.slice(0, 15) + '-' + targetValue.slice(16);
    }
    if (targetValue.length >= 19) {
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

  professionalCardNumberLengthIsCorrect(): boolean {
    return this.internalControlEntry.professionalCardNumber ? this.internalControlEntry.professionalCardNumber.length === 30 : true;
  }

  getSegment(name: string): FormSegment | undefined {
    return this.internalControlEntry.booleans.find(segment => segment.name === name);
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  protected readonly JSON = JSON;
}
