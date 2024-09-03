# Todo App UI

## Demo & Snippets

[Link to live]() (NOT YET DEPLOYED)

---

## Requirements / Purpose

This project is the frontend/UI for a Todo list app. The aim is to create a functional and responsive app where users can track, add, edit, and delete tasks and categories of tasks. Project backend can be found here: [todo-api](https://github.com/vadien/todo-app-backend)

##### Stack:

- ReactJS
- Sass (SCSS)
- HTML5
- [react-hook-form](https://react-hook-form.com/)
- [Zod](https://zod.dev/) (data validation)
- [DayJS](https://day.js.org/) (Time display)
- [Phosphoricons](https://phosphoricons.com/) (Icons)

---

## Design Goals / Approach

#### Goals:

- To implement a functional and complete frontend experience for a todo app with responsive styling.
- To successfully integrate the app with the backend database.
- To follow separation of concerns and DRY coding principles.

---

## Features

- Todo creation/editing/deletion/completion
- Task category creation
- Dynamic page updates on events
- Data validation
- Displaying errors from backend

---

## Known issues

- No user feedback on todo completion
- Created categories do not immediately become available for use

---

## Future Goals

(Data-related goals listed in the [backend readme](https://github.com/vadien/todo-app-backend))

- Component testing using React Testing Library
- Implement CI/CD using github workflow
- Docker deployment to cloud
- Styling pass
- Full refactoring pass

---

## Change logs

##### 2024-09-03

-

##### 2024-09-02

- Update typing and schema data to match backend
- Update README
- Implement icons

##### 2024-09-01

- Create form/schema for category creation
- Create associated category services
- Fix bug in Todo form preventing category validation
- Styling first pass

##### 2024-08-31

- Implement frontend form and services
- Implement dynamic updates to UI
- Update Todo form for reuse in todo editing
- Implement relative time updates using DayJS library

---

## What did you struggle with?

- Implementing Zod validation for a select dropdown in a React form caused issues that took a while to nail down due to lack of feedback from the validator. Lesson: when code fails, investigate from the first point the error may be caused rather than working backwards from the point of failure.

---

## Licensing Details

MIT License

Copyright (c) 2024 David Neill

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
