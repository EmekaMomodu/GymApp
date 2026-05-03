import { Component } from '@angular/core';
import { WorkoutTrackerComponent } from './components/workout-tracker/workout-tracker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WorkoutTrackerComponent],
  template: '<app-workout-tracker />'
})
export class AppComponent {}
