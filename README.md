# GymApp (Angular + TypeScript)

This project is now built with Angular and TypeScript, with a service layer structured for easy Java backend integration.

## Stack
- Angular standalone components
- TypeScript
- Reactive Forms + HttpClient
- LocalStorage fallback for local development

## Java backend readiness
The `WorkoutService` includes backend endpoint placeholders targeting:
- `GET /api/workouts/today`
- `POST /api/workouts`
- `DELETE /api/workouts/today`

Default API base URL is configured in `src/environments/environment.ts`.

## Run
1. `npm install`
2. `npm start`
