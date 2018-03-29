# Contributing to Universe2D
I really appreciate your enthusiasm to contribute to Universe2D. To help you out, I've made the process really simple!

Here are the ground rules:
1. Follow the [style guide](#styleguide).
2. Keep track of [which branch you commit to](#branches).

## Style guide
The style guide here is really simple. I recommend [Visual Studio Code](https://code.visualstudio.com) with the [Beautify](https://github.com/HookyQR/VSCodeBeautify) extension.

Set the indentation to `Spaces: 2` and make sure that the `.jsbeautifyrc` file is in your workspace root. It should automatically format your code to fit with our style. For convenience, make sure that these 2 lines are present in your User Settings (`Ctrl` + `,`).

```json
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
```

### Other rules
Installing Beautify will format your code to make it look prettier. Since we need to maintain consistency in other stuff as well, follow these rules:

1. `import` statements should be mentioned at the top of each file.
1. `export`s should be mentioned at the bottom of each file.
1. Do not invent your own error messages. Use existing ones in `src/errors.js`, or create new ones if you don't find them useful.
1. Write meaningful commit messages. Don't leave it blank. If you've fixed a bug, give a reference to the issue that you fixed. If you're adding a new feature, write down a brief description.

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
