import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../services/workout.service';
import { WorkoutSet } from '../../models/workout-set.model';

@Component({
  selector: 'app-workout-tracker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './workout-tracker.component.html',
  styleUrl: './workout-tracker.component.css'
})
export class WorkoutTrackerComponent implements OnInit {
  sets: WorkoutSet[] = [];

  readonly form;

  constructor(
    private readonly fb: FormBuilder,
    private readonly workoutService: WorkoutService
  ) {
    this.form = this.fb.nonNullable.group({
      exercise: ['', Validators.required],
      weight: [45, [Validators.required, Validators.min(0)]],
      reps: [8, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.workoutService.getTodaySets().subscribe((sets) => (this.sets = sets));
  }

  get totalVolume(): number {
    return this.sets.reduce((sum, set) => sum + set.weight * set.reps, 0);
  }

  get avgReps(): number {
    if (!this.sets.length) return 0;
    const totalReps = this.sets.reduce((sum, set) => sum + set.reps, 0);
    return Math.round(totalReps / this.sets.length);
  }

  get uniqueExercises(): number {
    return new Set(this.sets.map((set) => set.exercise.toLowerCase())).size;
  }

  get recentSets(): WorkoutSet[] {
    return [...this.sets].slice(-5).reverse();
  }

  addTemplate(exercise: string, weight: number, reps: number): void {
    this.form.patchValue({ exercise, weight, reps });
  }

  addSet(): void {
    if (this.form.invalid) return;

    const value = this.form.getRawValue();
    const set: WorkoutSet = {
      exercise: value.exercise.trim(),
      weight: value.weight,
      reps: value.reps,
      performedAt: new Date().toISOString()
    };

    this.workoutService.addSet(set).subscribe((created) => {
      this.sets = [...this.sets, created];
      this.form.reset({ exercise: '', weight: 45, reps: 8 });
    });
  }

  clearWorkout(): void {
    this.workoutService.clearToday().subscribe(() => (this.sets = []));
  }
}
