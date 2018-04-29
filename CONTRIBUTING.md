# Contributing to Universe2D
I really appreciate your enthusiasm to contribute to Universe2D. To help you out, I've made the process really simple!

Here are the ground rules:
1. Follow the [style guide](#styleguide).
1. Keep track of [which branch you commit to](#branches).

## Style guide
The style guide here is really simple. I recommend [Visual Studio Code](https://code.visualstudio.com) with the [Beautify](https://github.com/HookyQR/VSCodeBeautify) extension.

If you have installed both VSCode and the Beautify extension, the extension should automatically format your code whenever you save.

### Other rules
Installing Beautify will format your code to make it look prettier. Since we need to maintain consistency in other stuff as well, follow these rules:

1. Use `let` instead of `var`.
1. Use single quotes for strings and [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) if need to.
1. Use getter and setter functions unless the current class is a data structure or a development utility.
1. Use `class` instead of `function` constructors.
1. `import` statements should be mentioned at the top of each file.
1. `export`s should be mentioned at the bottom of each file. Alwas use `export default` unless you're in `src/exports.js`. If you find a need to create two `export`s in one file, you probably could split it into two separate files.
1. Do not invent your own error messages. Use existing ones in `src/dev/errors.js`, or create new ones if you don't find them useful.
1. Write meaningful commit messages. Don't leave it blank. If you've fixed a bug, give a reference to the issue that you fixed. If you're adding a new feature, write down a brief description. In other words,
    - this is good: `Add gravity controls for GameObject`
    - this is bad: `Do stuff`
1. Use JSDoc to document every single thing that you're adding. What you intended for a function or variable need not be what everyone else understands.
    - As an added bonus, the JSDoc comments can directly be used for the documentation.
    - If you're not performing type checking (for instance in a function that will be used a lot), mention it in the documentation.

By the way, here's an example for a JSDoc comment:

```javascript
/**
 * Adds 2 numbers, `a` and `b`, and returns the sum.
 * 
 * Usage:
 * ```javascript
 * let a = 10;
 * let b = 15;
 * let sum = add(a, b); // 25
 * ```
 * 
 * @summary Adds 2 numbers
 * @param {number} a First number
 * @param {number} b Second number
 * @returns {number} Sum of a and b
 */
function add(a, b) {
  return a + b;
}
```

### Additional styles
Use [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) if required and use single quotes for strings.

## Branches
Currently, we have 3 branches:

### 1. `master`
This is for stable builds. Anyone using code from this must not find stability issues and should be able to trust code from this brach.

### 2. `beta`
This branch contains builds that are in development. The code in this branch could contain bugs, and is not recommended for use in production.

### 3. `dev`
This branch is for work-in-progress code. There is absolutely no guarantee that the code in this branch will even run on your computer. This serves as a temporary cloud location to hold code that is being worked on.

Create a branch starting with the branch that you wish to push to followed by a `-` and then your username and push your changes to that branch. Start a pull request when you're done. For instance, if your username is `n-kartha` and you want to push to the `beta` branch, create a new branch called `beta-n-kartha`.

You can re-use the same branch if you want to add more changes. Just update the code and start a new pull request.
