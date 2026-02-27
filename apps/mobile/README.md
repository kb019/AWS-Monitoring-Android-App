# Mobile App (Expo)

This is the mobile app for the Cloud Infrastructure Monitoring project. It uses Expo with file-based routing (Expo Router) and currently renders the EC2 Instances list using mock data.

## Quick Start

1. Install dependencies

   ```bash
   npm install
   ```

2. Start Metro

   ```bash
   npx expo start
   ```

3. Open the iOS Simulator

   Press `i` in the Expo terminal, or run:

   ```bash
   npx expo start --ios
   ```

## Current Screen

- Instances list (EC2 name, ID, state, type): `app/(tabs)/index.tsx`
- Instance detail + CPU chart: `app/instance/[id].tsx`
- Mock data source: `data/mockInstances.ts`
- CPU mock data: `data/mockCpuSeries.ts`
- Card component: `components/InstanceCard.tsx`
- Chart component: `components/CpuUsageChart.tsx`
- Types: `types/instances.ts`

## Project Structure

- `app/` — file-based routes (Expo Router)
- `components/` — shared UI components
- `data/` — mock data and local fixtures
- `services/` — app services (auth, API helpers)
- `types/` — shared TypeScript types
- `assets/` — images and fonts

## Secure Token Storage

JWTs are stored using `expo-secure-store` via:
- `services/authStorage.ts`

Use `setAccessToken`, `getAccessToken`, and `clearTokens` to manage tokens.

## Next Step (API Wiring)

Replace `mockInstances` with real data once the OpenAPI client is ready, and connect the screen to the backend.

## Troubleshooting

- If you see a white screen, stop Metro and restart from `apps/mobile` with `npx expo start -c`.
- Make sure Metro is running from this folder: `.../SER517-Team5/apps/mobile`.

## Learn More

- Expo Router docs: https://docs.expo.dev/router/introduction/
- Expo docs: https://docs.expo.dev/
