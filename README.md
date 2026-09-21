# Spreadsheet editor without using frameworks

[![Demo](https://img.shields.io/badge/Demo-Open%20editor-brightgreen?style=flat)](https://dimailim.github.io/SpreadsheetWithoutFrameworks)

---

## Overview
A simple spreadsheet editor, based on the concept of a component model with saved states for multiple spreadsheets. It has basic functionality like selecting cells, formatting cells, and working with arithmetic formulas.

This project was built during the "Advanced JavaScript" course by Result University.
The course was recorded in 2020. Webpack and Jest were configured and updated to the latest versions at the time of writing.

## Why no frameworks?
The main goal of this course was to learn concepts of modern frameworks to know how they work under the hood.
This project has its own custom framework located in the core folder.

## What's inside the core?
- **Custom state manager** - stores state through a storage abstraction using DI to choose where to store state. Currently implemented for localStorage.
- **Custom routing system** - hash-based; re-renders the main app's root element depending on the current page. Handles initializing page listeners and destroying them when switching pages.
- **Custom event bus** - uses the Observer pattern for communicating between components.
- **Custom component model** - base component class with a concept of a component's lifecycle: local state, initialization, and destroying.
- **DOM utilities** - a Facade class with methods that are needed for the application to simplify DOM manipulation.
- **Event delegation** - an optimization that is commonly used by modern frameworks. Creates a single event listener on a component's root element.

## Application structure
- **DashboardPage** - the main page contains a list of created spreadsheets and a button to create a new one.
- **SpreadsheetPage** - page that renders spreadsheet editor.
  - *Spreadsheet* - the main component that initializes all components below.
  - *Header* - contains a spreadsheet's name and buttons: "exit" to exit to the dashboard and "delete" to delete the open spreadsheet.
  - *Toolbar* - bar of buttons for formatting current or selected cells.
  - *Formula* - input field for the current cell with a simple formula preview.
  - *Table* - a table with cells.

## Formula engine
For now, it's a simple engine that supports only arithmetic operations. Calculation is done using the `eval` function and a primitive parser, which works with input data as a string, finds an '=' to recognize a formula, and tries to calculate it. Otherwise, it just returns the source data.

It's made on purpose to simplify a study project because the formula parser wasn't the main goal.

## Technical decisions

### Inline styles only for changed cells
**Decision:** Inline styles apply only to changed cells with applied formatting.
The course version used inline styles for all cells. For empty or unchanged cells, it applied default styles from constant variables in the code. This solution overrode any default styles for cells from SCSS files.

**Why:** To avoid unnecessary DOM updates and to keep the default SCSS styles for cells.

**Trade-off:**
- More complex logic for the table template part.

### Calculate formula after finishing editing the current cell
**Decision:** The inputted formula is calculated after the user finishes editing the current cell using the `formula:done` event. The course version calculated the formula on every keystroke.

**Why:** To avoid eval errors on incomplete formulas. The course version intentionally ignored any errors with input data, including real possible bugs - real problems stay invisible.

**Trade-off:**
- User doesn't see the result of the formula immediately. However, other spreadsheet editors usually do the same thing.
- Calculation works only if the `formula:done` event is triggered. Every way to finish editing must trigger this event. Otherwise, the formula will not be calculated.

### Empty initial state instead of a default state object
**Decision:** The store starts with an empty object and fills up as the user interacts with the application. The course version used a separate default state object.

**Why:** To simplify app logic. The default object wasn't needed. The state gets filled on demand, so an empty starting point is enough. This removed one module from core.

**Trade-off:**
- The full state shape is no longer described in one place. To see the structure, you have to read the code that writes to the store.
- Logic that reads the state must check undefined keys.

### Action types for state manager as a single enum-like object
**Decision:** All state action types live in one object used as an enum.
The course version exported each action type as a separate constant.

**Why:** Components import one object instead of a growing list of constants.

**Trade-off:**
- JavaScript has no real enums. A typo in a key, like `ActionTypes.TABEL_RESIZE`, silently returns `undefined`.
With named constants, a misspelled import at least produces a build warning.
- The object can be changed at runtime.

## Known limitations
- `eval` function may execute any code after the "=" sign that the user types in the input. It's not best practice, but it's the fastest way to create simple formula calculations with arithmetic operations.
  The best practice would be to create a more complex parser or use an existing library.
- The application doesn't support any complex formulas.
- Any data entered in the spreadsheet is saved in the browser's local storage. The data exists only in the user's browser and is lost if the browser storage is cleared.
- The multiple selection has no familiar visual style.
- The multiple selection doesn't work with mouse interaction.

## Tech stack
- JavaScript
- Webpack 5
- Sass 1.90
- Jest 30
- Babel 7
- ESLint 9

## Getting started

### Requirements

- Node.js 24 or later
- npm 11 or later

### Installation

```bash
git clone https://github.com/Dimailim/SpreadsheetWithoutFrameworks.git
cd SpreadsheetWithoutFrameworks
npm install
```

### Development

```bash
npm start
```

Starts the Webpack dev server at `http://localhost:8080` with live reload.

### Production build

```bash
npm run build
```

Builds an optimized version into the `dist` folder.

### Tests

```bash
npm test
```
or
```bash
npm run test:watch
```

Runs unit tests with Jest.

### Linter
```bash
npm run lint
```
Checks the code style with ESLint.