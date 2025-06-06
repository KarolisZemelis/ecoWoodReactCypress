# Dynamic React Form

This is a dynamic form built with React, based on a provided `formSchema`.

✅ The form generates fields dynamically.  
✅ Conditional visibility logic is fully implemented (based on `visibleIf` and `visibleIfAll`).  
✅ Required field validation is implemented.  
✅ Field-specific validation (First Name cannot contain numbers).  
✅ Minimal clean UI inspired by Microsoft Navision look & feel.

---

## Features

- ✅ **Dynamic generation** of form fields based on schema
- ✅ **Conditional visibility** of fields:
    - Email visible if Age >= 18
    - Student ID visible if Age < 26
    - Discount Code visible if Age < 26 AND Student ID is filled
    - Maternity Leave visible if Gender == Moteris
- ✅ **Required field validation** on submit
- ✅ **First Name validation** → cannot contain numbers
- ✅ **Alert** on successful submit → shows visible & filled fields as JSON
- ✅ **Responsive layout** (with minimal CSS)

---

## How to run

1️⃣ Clone this project locally  
2️⃣ Install dependencies:

```bash
npm install
```

3️⃣ Start the React app:

```bash
npm start
```

The form will be available at:

```
http://localhost:3000/
```

---

## Testing

✅ Cypress E2E tests are provided (local run only).  

**NOTE:** CodeSandbox does not support Cypress runner — run tests locally.

### Testable version with Cypress:

👉 A full testable version with Cypress is available at:  
👉 [https://github.com/KarolisZemelis/ecoWoodReactCypress.git](https://github.com/KarolisZemelis/ecoWoodReactCypress.git)

To run Cypress tests locally:

```bash
npx cypress open
```

The full test suite covers:

- Required field validation
- Field-specific validation
- Conditional field visibility logic
- Full happy path (successful form submission with correct visible fields)

---

## Limitations

❌ CodeSandbox cannot run Cypress tests → this is expected.  
✅ React app can be fully tested visually in CodeSandbox.

---

## Notes

This project was built as part of a React coding task — functionality is prioritized over styling.

---

✅ **Author:** Karolis  
✅ **Date:** June 2025  
✅ **Project status:** Complete & tested