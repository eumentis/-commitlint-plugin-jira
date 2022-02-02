
## Introduction
commitlint-plugin-jira is a plugin to do linting and validate the commit messages for [Eumentis](https://eumentis.com) projects managed with JIRA.


## Getting started.
##### install dependencies
```bash
npm install --save-dev @eumentis/commitlint-plugin-jira
```
##### Configure commitlint.config.js to enable plugin rules.
```js
// commitlint.config.js
module.exports = {
  plugins: ['@eumentis/commitlint-plugin-jira'],
  rules: {
    'eumentis-jira': [2, 'always', 'ABC12'],  // ABC12 is sample project code.
  },
}
```

## Rules
##### eumentis-jira 
This rule will have three checks: 
1)Check for Jira Issue and message separator i.e. (|) .
2)Check pattern for Jira Issue i.e. (projectCode-issueId) where issue id must be in digit.
3)Check for min length of your message it should be greater than 15.

```bash
// If your project code is PQR10 and 12 is your issue id
// ❌ Bad commit messages
git commit -m "PQR10-12  my commit message" // first check failed
git commit -m "PQR10 | first commit message " // second check failed
git commit -m "PQR10-12 | message" // third check failed
// ✅ Good commit messages
git commit -m "PQR10-12 | my first commit"
```
