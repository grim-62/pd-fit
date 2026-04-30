---
name: Kinetic Pulse
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#424656'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737687'
  outline-variant: '#c2c6d9'
  surface-tint: '#0053da'
  primary: '#004cca'
  on-primary: '#ffffff'
  primary-container: '#0062ff'
  on-primary-container: '#f3f3ff'
  inverse-primary: '#b4c5ff'
  secondary: '#006e2f'
  on-secondary: '#ffffff'
  secondary-container: '#6bff8f'
  on-secondary-container: '#007432'
  tertiary: '#7b4d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#9c6300'
  on-tertiary-container: '#fff2e7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#6bff8f'
  secondary-fixed-dim: '#4ae176'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005321'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Lexend
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  h1:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  h2:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  h3:
    fontFamily: Lexend
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 12px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-margin: 1.25rem
  gutter: 1rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 1.5rem
  section-gap: 2.5rem
---

## Brand & Style

This design system is built for a high-performance fitness environment, balancing professional-grade data tracking with an energetic, motivating atmosphere. The brand personality is disciplined yet encouraging, aimed at users who value precision in their health journey.

The aesthetic follows a **Modern / Corporate** direction with a focus on high-fidelity execution. It utilizes a mobile-first philosophy, prioritizing one-handed ergonomics and glanceable information architecture. The interface is characterized by generous whitespace to reduce cognitive load during high-intensity workouts, ensuring that the user's focus remains on their metrics and progress.

## Colors

The palette revolves around "Active Blue" as the primary driver for action and branding, and "Success Green" for positive reinforcement and health milestones. 

- **Primary (Active Blue):** Used for main CTAs, active states, and progress indicators. It conveys trust and energy.
- **Secondary (Success Green):** Reserved for completion states, positive trend lines, and "achieved" status indicators.
- **Neutral:** A deep slate-navy is used for typography and icons to maintain higher contrast than pure black, providing a more premium, modern feel.
- **Surface:** The background uses a soft off-white (#F8FAFC) to differentiate from pure white card components, creating subtle depth.

## Typography

This design system employs a dual-font strategy. **Lexend** is used for headings and data displays; its athletic, rhythmic quality makes it highly legible for numbers and short titles. **Inter** is used for all body copy and functional UI labels, providing a systematic and neutral foundation that ensures clarity in dense data environments. 

Large "Display" sizes are reserved for "Hero Metrics" (e.g., daily step count or heart rate), while "Label-MD" is utilized for category headers above data grids to maintain a professional, organized hierarchy.

## Layout & Spacing

The design system utilizes a **Fluid Grid** model optimized for mobile viewports. A standard 4-column grid is used for mobile devices, expanding to 12 columns for tablet and web.

- **Margins:** A consistent 20px (1.25rem) outer margin ensures content doesn't bleed into device edges or rounded corners.
- **Rhythm:** An 8pt spatial system governs all padding and margins. 
- **Data Grids:** Key-value pairs and metric cards should use a 16px (1rem) gutter to maintain visual separation while appearing unified as a dashboard.

## Elevation & Depth

To maintain a clean and professional look, this design system avoids heavy shadows. Depth is primarily achieved through **Tonal Layers** and **Ambient Shadows**.

- **Surface Tiers:** The base background is slightly grey (#F8FAFC). Cards and primary containers are pure white (#FFFFFF), creating a natural lift.
- **Shadows:** Use very soft, diffused shadows with a blue-tinted neutral color (e.g., `rgba(15, 23, 42, 0.08)`) with a high blur radius (12-16px) and low Y-offset (4px).
- **Interactive States:** High-priority cards may feature a subtle 1px border (#E2E8F0) to ensure definition on all screen brightness levels.

## Shapes

The shape language is "Rounded," reflecting the organic nature of health and the human body while maintaining professional structure. 

- **Standard Cards:** Use a 16px (1rem) corner radius.
- **Buttons:** Use a 12px (0.75rem) radius or fully pill-shaped for secondary actions.
- **Inputs:** Use an 8px (0.5rem) radius to feel more precise and structured.
- **Progress Bars:** Should always be pill-shaped (fully rounded) to imply fluid movement and completion.

## Components

- **Buttons:** Primary buttons use a solid 'Active Blue' fill with white text. Secondary buttons use a light blue ghost style or outline. Padding is generous (16px vertical) for easy tapping during physical activity.
- **Data Cards:** The core of the experience. Cards should have a clear title, a primary metric in Lexend, and a secondary trend indicator (e.g., +5% this week).
- **Chips:** Small, rounded indicators for workout types (e.g., "Cardio," "Strength"). Use low-saturation background tints of the primary/secondary colors.
- **Inputs:** Field labels should be persistent. Focus states are indicated by a 2px 'Active Blue' border.
- **Progress Rings:** Used for daily goals. Use a thick stroke (8-12px) with rounded caps for a modern, tactile feel.
- **Activity Feed:** List items with high-contrast icons to represent different activity types. Each list item should have a 1px bottom divider with 16px of vertical padding.