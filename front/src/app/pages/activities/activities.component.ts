import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { Activity } from '../../models/activity';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './activities.component.html',
  styleUrl:'./activities.component.css'
})
export class ActivitiesComponent implements OnInit {

  list: Activity[] = []; 
  view: Activity[] = []; 
  readonly statusList   = ['pending', 'in-progress', 'completed'] as const;
  readonly priorityList = ['low', 'medium', 'high'] as const;

  q = ''; 
  filterS = '';
  filterP = ''; 

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ActivityService
  ) {

    this.form = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: [''],
      status: ['pending'],
      priority: ['low']
    });
  }

  ngOnInit(): void {
    this.load();
  }


  private load(): void {
    this.api.list().subscribe(res => {
      this.list = res;
      this.applyFilters();
    });
  }

  submit(): void {
    const { id, ...body } = this.form.value as any;

    const op = id
      ? this.api.update(id, body)  // editar
      : this.api.create(body);     // crear

    op.subscribe(() => {
      this.form.reset({ status: 'pending', priority: 'low' });
      this.load();
    });
  }

  edit(a: Activity): void {
    this.form.patchValue(a);
  }

  remove(id: string): void {
    if (!confirm('¿Eliminar esta actividad?')) { return; }
    this.api.remove(id).subscribe(() => this.load());
  }

  applyFilters(): void {
    const qLower = this.q.toLowerCase();

    this.view = this.list.filter(a =>
      (!this.filterS || a.status === this.filterS) &&
      (!this.filterP || a.priority === this.filterP) &&
      a.title.toLowerCase().includes(qLower)
    );
  }
}
