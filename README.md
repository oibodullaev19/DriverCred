# DriverCred

### Verified Careers. Trusted Drivers.

DriverCred is a mobile app that gives commercial (CDL) truck drivers a verified professional reputation, and gives employers a trusted way to verify a driver's employment history. Drivers stay in control of who can see their records.

Senior Capstone project – CSC-6162 · Author: **Omon Ibodullaev**

## Links

| | Sprint 1 | Sprint 2 |
|---|---|---|
| 🎥 YouTube video | [Sprint 1 Review](https://youtu.be/IpL-zPH36uU) | [Sprint 2 Review](https://youtu.be/QwUsLnSvrBg) |
| 💼 LinkedIn post | [Sprint 1 Update](https://lnkd.in/p/gydqnkA4) | [Sprint 2 Update](https://lnkd.in/p/g3TEFdXK) |

Project proposal: [YouTube](https://youtu.be/p_grb34mZl0) · [LinkedIn](https://lnkd.in/p/gd8YtVbS)

## Sprint progress

### ✅ Sprint 1 – Accounts and log in
- Welcome screen, then Log In
- Create Account for **Driver** or **Employer**, with email verification
- Passwords of at least 15 characters
- Remember Me
- Forgot Password with a privacy-safe message (never reveals whether an email is registered)
- Role-based Driver and Employer dashboards

### ✅ Sprint 2 – Driver profile and employment history
- **My Profile:** phone, city, state, CDL class (A/B/C), CDL state, endorsements, years of experience, About Me
- **Employment History:** jobs listed newest first; add, edit and delete jobs
- **CDL Training:** new CDL graduates can add their school instead of a job
- History covers the **last 5 years** only; dates are checked (MM/YYYY, no future dates, end after start)
- **Firestore security rules:** drivers can only change their own profile and jobs; employment history stays private

### ⏳ Sprint 3 – Employer side (next)
- Search drivers by name, CDL class and state
- Request verification; the driver approves or denies
- Employer sees employment history only after approval

## Comparison with existing platforms

| Capability | DriverCred status |
|---|---|
| Mobile-first design | Completed |
| Driver professional profile | Completed (Sprint 2) |
| Driver participation | Completed (Sprint 2) |
| Employment verification | In progress |
| Structured evaluation | In progress |
| Consent / access workflow | In progress |
| Recruiting system, website | Planned |

## Technology

- **App:** React Native, Expo SDK 58, Expo Router, TypeScript
- **Backend:** Firebase Authentication, Cloud Firestore
- **Design:** Figma (wireframes), draw.io (diagrams)
- **Tools:** VS Code, Git, GitHub, Expo Go for testing

## Run the app

1. Install Node.js and the **Expo Go** app on your phone.
2. Clone and install:
   ```
   git clone https://github.com/oibodullaev19/DriverCred.git
   cd DriverCred
   npm install
   ```
3. Create a `.env` file in the project folder with your own Firebase web app keys (this file is not uploaded to GitHub):
   ```
   EXPO_PUBLIC_FIREBASE_API_KEY=...
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   EXPO_PUBLIC_FIREBASE_APP_ID=...
   ```
4. In Firebase, enable Email/Password sign-in and publish the rules in [`firestore.rules`](firestore.rules).
5. Start: `npx expo start -c`, then scan the QR code with Expo Go.

## Project structure

```
src/app/            Screens (Expo Router): welcome, login, register, account-type,
                    forgot-password, dashboard, edit-profile, employment, job-form
src/components/     Shared UI building blocks
src/constants/      Colors, types and date helpers
src/config/         Firebase setup (reads keys from .env)
firestore.rules     Firestore security rules
docs/diagrams/      draw.io diagrams (.drawio + .png) for each sprint
docs/wireframes/    Figma wireframes (.svg + .png) for each sprint
docs/presentations/ Sprint slides
docs/feedback-log.md  Feedback received and how it was resolved
docs/testing.md     Manual test cases and results
```

## Design documentation

Each sprint includes six diagram types, all editable in [draw.io](https://app.diagrams.net) (File → Open from → Device):

| Diagram | What it shows |
|---|---|
| Use case | Who uses the app and what they can do |
| Sequence | The order of steps between user, screen, app and database |
| Hierarchical task analysis | Each goal broken into smaller tasks |
| Data & control flow | How users move between screens, and where data goes |
| Finite state machine | Each screen as a state, and what moves the app between states |


---

DriverCred — **Verified Careers. Trusted Drivers.**
