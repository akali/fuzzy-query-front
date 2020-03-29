import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpEvent, HttpEventType, HttpResponse} from "@angular/common/http";
import {filter, map, tap} from "rxjs/operators";
import {pipe} from "rxjs";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  progress = 0;
  success = false;

  formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    console.log('Test Works!')
  }

  hasError(field: string, error: string) {
    const control = this.formGroup.get(field);
    return control.dirty && control.hasError(error);
  }

  onSubmit() {
    this.success = false;

    if (!this.formGroup.valid) {
      markAllAsDirty(this.formGroup);
      return;
    }

    for (const key of Object.keys(this.formGroup.value)) {
      console.log(key, this.formGroup.value[key]);
    }

    // this.http.post('http://localhost:8080/signup', toFormData(this.formGroup.value), {
    //   reportProgress: true,
    //   observe: 'events'
    // }).pipe(
    //   uploadProgress(progress => (this.progress = progress)),
    //   toResponseBody()
    // ).subscribe(res => {
    //   this.progress = 0;
    //   this.success = true;
    //   this.formGroup.reset();
    // });
  }
}

export function markAllAsDirty(form: FormGroup) {
  for (const control of Object.keys(form.controls)) {
    form.controls[control].markAsDirty();
  }
}

export function toFormData<T>(formValue: T) {
  const formData = new FormData();

  for (const key of Object.keys(formValue)) {
    const value = formValue[key];
    formData.append(key, value);
  }

  return formData;
}

export function uploadProgress<T>(cb: (progress: number) => void) {
  return tap((event: HttpEvent<T>) => {
    if (event.type === HttpEventType.UploadProgress) {
      cb(Math.round((100 * event.loaded) / event.total));
    }
  });
}

export function toResponseBody<T>() {
  return pipe(
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    map((res: HttpResponse<T>) => res.body)
  );
}
