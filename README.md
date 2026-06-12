# K Doctor 예약 Application

A modern, responsive web application for scheduling doctor appointments built with React, Vite, and Tailwind CSS.

## Features

### Step 1: Schedule View
- **Multiple Calendar Views**: Toggle between monthly and weekly calendar views
- **30-Minute Time Slots**: Demo time slots showing availability status
- **Available vs Unavailable**: Green slots are available, gray slots marked "N/A" are not available
- **Direct Navigation**: Click any available (green) time slot to automatically proceed to Patient Info page
- **Demo Data**: Realistic demo data showing mix of available and unavailable appointments
- **Month Navigation**: Navigate between different months
- **Legend**: Visual legend showing available (green) and unavailable (gray) slots
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Step 2: Reserve Page
- **Personal Information**: First name, last name, date of birth, email, phone
- **Insurance Information**: Provider, policy ID, group number
- **Medical History Checklist**: Required acknowledgments with "Check All" option
- **Patient Notes**: Optional text area for visit details and special accommodations
- **Form Validation**: All required fields validated before submission
- **Auto-formatting**: Phone numbers automatically formatted as (XXX) XXX-XXXX

### Step 3: Confirmation Page
- **Success Message**: Clear confirmation of appointment request
- **Appointment Summary**: Review of all submitted information
- **Status Indicator**: Shows "Pending Confirmation" status
- **Reset Functionality**: Schedule another appointment

## Tech Stack

- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **PostCSS & Autoprefixer**: CSS processing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
doctor-appointment/
├── src/
│   ├── components/
│   │   ├── ProgressBar.jsx       # Step progress indicator
│   │   ├── ScheduleView.jsx      # Calendar and time slot selection
│   │   ├── ReservePage.jsx       # Patient information form
│   │   └── ConfirmationPage.jsx  # Confirmation and summary
│   ├── App.jsx                    # Main application component
│   ├── main.jsx                   # Application entry point
│   └── index.css                  # Tailwind CSS imports
├── index.html                     # HTML template
├── package.json                   # Project dependencies
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
└── postcss.config.js              # PostCSS configuration
```

## Component Overview

### App.jsx
- Main container component
- Manages global state (current step, selected slot, patient data)
- Handles navigation between steps

### ProgressBar.jsx
- Visual progress indicator
- Shows current step and completed steps
- Three steps: Schedule, Patient Info, Confirmation

### ScheduleView.jsx
- Monthly and weekly calendar views
- Dynamic time slot generation
- Slot selection with state management
- Month navigation controls

### ReservePage.jsx
- Multi-section form with controlled inputs
- Personal information section
- Insurance information section
- Medical history checklist
- Patient notes
- Form validation and submission

### ConfirmationPage.jsx
- Success message display
- Appointment summary
- Reset functionality

## Key Features Implementation

### State Management
- Uses React's `useState` hook for component-level state
- Props drilling for data flow between components
- Controlled form inputs for all user data

### Responsive Design
- Tailwind CSS utility classes for responsive layouts
- Grid system that adapts to different screen sizes
- Mobile-first approach

### Form Validation
- HTML5 form validation for required fields
- Custom validation for medical history checklist
- Phone number auto-formatting

### User Experience
- Smooth transitions between steps
- Visual feedback on interactions
- Clear progress indication
- Scroll to top on page transitions

## Customization

### Colors
The application uses Tailwind's default color palette with indigo as the primary color. To change colors, modify the Tailwind classes in the components:

- Primary: `indigo-600`, `indigo-700`
- Success: `green-500`, `green-600`
- Accent: `purple-700`

### Time Slots
To modify available time slots, edit the `generateTimeSlots` function in `ScheduleView.jsx`.

### Form Fields
Add or modify form fields in `ReservePage.jsx` by updating the `formData` state and adding corresponding input fields.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Created From PRD

This application was built according to the Product Requirements Document (PRD) specifications for a Doctor Appointment Web Application.
# pjt-kdocsche-v01
