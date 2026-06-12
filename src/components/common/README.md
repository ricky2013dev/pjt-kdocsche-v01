# Common UI Components

This directory contains reusable UI components that are used throughout the application. These components follow a consistent design pattern using Tailwind CSS and provide a standardized interface for common UI elements.

## Components

### Input

A reusable input component for text, email, tel, date, and other input types.

**Props:**
- `label` (string) - Label text for the input
- `id` (string) - HTML id attribute
- `name` (string) - HTML name attribute
- `type` (string) - Input type (default: 'text')
- `value` (string) - Input value
- `onChange` (function) - Change handler
- `placeholder` (string) - Placeholder text
- `required` (boolean) - Whether the field is required (default: false)
- `className` (string) - Additional CSS classes
- `error` (string) - Error message to display
- `...props` - Any other HTML input attributes

**Usage:**
```jsx
import { Input } from './common';

<Input
  label="Email Address"
  id="email"
  name="email"
  type="email"
  value={formData.email}
  onChange={handleChange}
  required
  placeholder="user@example.com"
/>
```

---

### Button

A reusable button component with multiple style variants.

**Props:**
- `children` (node) - Button content
- `onClick` (function) - Click handler
- `type` (string) - Button type: 'button', 'submit', 'reset' (default: 'button')
- `variant` (string) - Style variant: 'primary', 'secondary', 'success', 'danger', 'outline' (default: 'primary')
- `disabled` (boolean) - Whether the button is disabled (default: false)
- `className` (string) - Additional CSS classes
- `...props` - Any other HTML button attributes

**Usage:**
```jsx
import { Button } from './common';

<Button
  onClick={handleSubmit}
  variant="primary"
  type="submit"
>
  Submit
</Button>

<Button
  onClick={handleCancel}
  variant="secondary"
>
  Cancel
</Button>
```

**Variants:**
- `primary` - Indigo background, white text
- `secondary` - Gray background, dark text
- `success` - Green background, white text
- `danger` - Red background, white text
- `outline` - White background, indigo border and text

---

### Checkbox

A reusable checkbox component with integrated label.

**Props:**
- `id` (string) - HTML id attribute
- `name` (string) - HTML name attribute
- `checked` (boolean) - Checkbox state
- `onChange` (function) - Change handler
- `label` (string) - Label text
- `className` (string) - Additional CSS classes
- `error` (string) - Error message to display
- `...props` - Any other HTML input attributes

**Usage:**
```jsx
import { Checkbox } from './common';

<Checkbox
  id="terms"
  name="terms"
  checked={formData.terms}
  onChange={handleCheckboxChange}
  label="I agree to the terms and conditions"
/>
```

---

### Radio

A reusable radio button component with integrated label.

**Props:**
- `id` (string) - HTML id attribute
- `name` (string) - HTML name attribute
- `value` (string) - Radio button value
- `checked` (boolean) - Radio button state
- `onChange` (function) - Change handler
- `label` (string) - Label text
- `className` (string) - Additional CSS classes
- `...props` - Any other HTML input attributes

**Usage:**
```jsx
import { Radio } from './common';

<Radio
  id="male"
  name="gender"
  value="male"
  checked={formData.gender === 'male'}
  onChange={handleRadioChange}
  label="Male"
/>

<Radio
  id="female"
  name="gender"
  value="female"
  checked={formData.gender === 'female'}
  onChange={handleRadioChange}
  label="Female"
/>
```

---

### Select (Dropdown)

A reusable select/dropdown component.

**Props:**
- `label` (string) - Label text for the select
- `id` (string) - HTML id attribute
- `name` (string) - HTML name attribute
- `value` (string) - Selected value
- `onChange` (function) - Change handler
- `options` (array) - Array of option objects with `value` and `label` properties
- `required` (boolean) - Whether the field is required (default: false)
- `className` (string) - Additional CSS classes
- `error` (string) - Error message to display
- `placeholder` (string) - Placeholder text (default: 'Select an option')
- `...props` - Any other HTML select attributes

**Usage:**
```jsx
import { Select } from './common';

const insuranceProviders = [
  { value: 'blue-cross', label: 'Blue Cross' },
  { value: 'aetna', label: 'Aetna' },
  { value: 'united', label: 'United Healthcare' }
];

<Select
  label="Insurance Provider"
  id="insuranceProvider"
  name="insuranceProvider"
  value={formData.insuranceProvider}
  onChange={handleChange}
  options={insuranceProviders}
  required
  placeholder="Choose your provider"
/>
```

---

### Textarea

A reusable textarea component.

**Props:**
- `label` (string) - Label text for the textarea
- `id` (string) - HTML id attribute
- `name` (string) - HTML name attribute
- `value` (string) - Textarea value
- `onChange` (function) - Change handler
- `placeholder` (string) - Placeholder text
- `required` (boolean) - Whether the field is required (default: false)
- `rows` (number) - Number of visible text rows (default: 4)
- `className` (string) - Additional CSS classes
- `error` (string) - Error message to display
- `...props` - Any other HTML textarea attributes

**Usage:**
```jsx
import { Textarea } from './common';

<Textarea
  label="Additional Comments"
  id="comments"
  name="comments"
  value={formData.comments}
  onChange={handleChange}
  placeholder="Enter your comments here..."
  rows={6}
/>
```

---

### FormSection

A container component for grouping form fields with consistent styling.

**Props:**
- `title` (string) - Section title
- `children` (node) - Section content
- `className` (string) - Additional CSS classes

**Usage:**
```jsx
import { FormSection, Input } from './common';

<FormSection title="Personal Information">
  <Input
    label="First Name"
    name="firstName"
    value={formData.firstName}
    onChange={handleChange}
    required
  />
  <Input
    label="Last Name"
    name="lastName"
    value={formData.lastName}
    onChange={handleChange}
    required
  />
</FormSection>
```

---

### Card

A container component that provides consistent card styling.

**Props:**
- `children` (node) - Card content
- `className` (string) - Additional CSS classes
- `...props` - Any other HTML div attributes

**Usage:**
```jsx
import { Card } from './common';

<Card>
  <h2>Card Title</h2>
  <p>Card content goes here...</p>
</Card>
```

---

## Import All Components

You can import multiple components at once:

```jsx
import { Input, Button, Checkbox, Select, Textarea } from './common';
```

Or import the entire module:

```jsx
import * as UI from './common';

<UI.Input ... />
<UI.Button ... />
```

---

## Styling

All components use Tailwind CSS classes and follow a consistent design pattern:

- **Primary Color:** Indigo (`indigo-600`, `indigo-700`)
- **Focus States:** Ring effect with indigo color
- **Borders:** 2px solid with gray or colored variants
- **Transitions:** All interactive elements have smooth transitions
- **Error States:** Red border and text for validation errors

---

## Best Practices

1. **Always provide labels** for form inputs to improve accessibility
2. **Use the `required` prop** instead of manually adding asterisks (the component handles this)
3. **Handle errors consistently** by passing error messages to the `error` prop
4. **Use semantic button types** (`submit`, `button`, `reset`) appropriately
5. **Group related form fields** using `FormSection` components
6. **Maintain consistent spacing** using Tailwind's margin/padding utilities

---

## Customization

All components accept a `className` prop for additional styling. The className is merged with the default styles:

```jsx
<Input
  label="Email"
  name="email"
  className="mb-8"  // Adds extra bottom margin
/>
```

For more extensive customization, you can modify the component files directly in the `src/components/common/` directory.
