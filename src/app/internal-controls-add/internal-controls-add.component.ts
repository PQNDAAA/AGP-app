import {Component, inject, Input, OnInit, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {
  InternalControlEntry,
  internalControlEntryDefaultSettings,
} from "../interface/internal-control-entry";
import {FormSegment} from "../interface/form-segment";
import {FormsModule, NgForm} from "@angular/forms";
import {UtilsService} from "../services/utils/utils-service";
import {InternalControlsService} from "../services/internal-controls-service";
import {IonDatetime, IonicModule, ModalController} from "@ionic/angular";
import {NgForOf, NgIf} from "@angular/common";
import {InputFocused, inputFocusedDefaultSettings} from "../interface/input-focused";

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

  private readonly professionalCardGroupSizes = [4, 11, 14, 16];

  isSubmitted = false;

  constructor() {
  }

  async saveInternalControl(form: NgForm) {
    if (!form.valid) return;
    this.internalControlEntry.entryDateDisplay = this.utilsService.convertISOtoLocaleDateString(this.internalControlEntry.entryDate);

    this.isSubmitted = true;

    let success : boolean;
    if (this.isEdit) {
      success = await this.icService.modifyInternalControl(this.internalControlEntry);
    } else {
      success = await this.icService.addInternalControl(this.internalControlEntry);
    }

    if(!success) {
      this.isSubmitted = false;
      return;
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
  }


  onProfessionalCardInput(e: any) {
    const rawValue = (e.target.value ?? '').replace(/-/g, '');
    let formattedValue = '';

    let startIndex = 0;
    let index = 0;

    for (const size of this.professionalCardGroupSizes) {
      if (size >= rawValue.length){
        if (rawValue.length <= this.professionalCardGroupSizes[0]) formattedValue += rawValue.slice(startIndex);
        break;
      }
      formattedValue += rawValue.slice(startIndex, size) + '-';
      startIndex = size;
      index++;

      if (rawValue.length <= this.professionalCardGroupSizes[index] || index >= this.professionalCardGroupSizes.length) formattedValue += rawValue.slice(startIndex);
    }
    e.target.value = formattedValue;
  }


  inputBlur(e: any, form: NgForm) {
    const inputName = e.target.name;
    const value : string = e.target.value;
    const control = form.controls[inputName];

    if(value.length > 0 && value.trim().length === 0){
      control.setErrors({ whitespace: true });
      control.markAsTouched();
    }

    this.changeInputStatus(true, inputName);
  }

  changeInputStatus(newValue: boolean, inputName: any) {
    const targetValue = this.inputsFocused.find(value => value.name === inputName);
    if (!targetValue) return;
    targetValue.touched = newValue;
  }

  getSegment(name: string): FormSegment | undefined {
    return this.internalControlEntry.booleans.find(segment => segment.name === name);
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  protected readonly JSON = JSON;
}
