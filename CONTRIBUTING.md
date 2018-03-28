# Contributing to Universe2D
I really appreciate your enthusiasm to contribute to Universe2D. To help you out, I've made the process really simple!

Here are the ground rules:
1. Follow the [style guide](#styleguide).
2. Keep track of [which branch you commit to](#branches).

## Style guide
The style guide here is really simple. I recommend [Visual Studio Code](https://code.visualstudio.com) with the [Beautify](https://github.com/HookyQR/VSCodeBeautify) extension.

Set the indentation to `Spaces: 2` and make sure that the `.jsbeautifyrc` file is in your workspace root. It should automatically format your code to fit with our style.

### Additional styles
Use [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) if required and use single quotes for strings.

All `import`s should be declared at the top of each file.

Error messages should be declared in a `const errorMessages` variable immediately after the `import` statements.

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
