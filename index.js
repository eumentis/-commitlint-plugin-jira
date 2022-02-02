module.exports = {
  rules: {
    "eumentis-jira": (parsed, when, value) => {
      // Our Sample commit message is "JiraIssue | HeaderMessage"

      // const to store raw message
      const rawMessage = parsed.raw;

      // const to store index of issue and message separator
      const indexOfJiraAndMsgSeparator = rawMessage.indexOf("|");

      if (indexOfJiraAndMsgSeparator === -1) {
        return [
          false,
          "Commit does not contain jira issue and message separator( | ).",
        ];
      }

      // Get substring of raw msg which start  from zeroth index and end on issue and message separator
      const jiraIssue = rawMessage.substring(0, indexOfJiraAndMsgSeparator - 1);
      const jiraIssueRegex = `^(${value})-(\\d+)`;
      if (!jiraIssue.match(`${jiraIssueRegex}$`)) {
        return [
          false,
          `Commit does not contain valid jira issue pattern(${value}-12).`,
        ];
      }

      // Get substring of raw msg which start from issue and message separator and end at last index of raw msg
      const headerMsg = rawMessage.substring(indexOfJiraAndMsgSeparator + 1);
      if (headerMsg.length < 15) {
        return [false, "Commit message should contain at least 15 characters"];
      }

      // complete header sequence check
      const completeHeaderRegex = `${jiraIssueRegex} [|] .*`;
      if (!parsed.header.match(completeHeaderRegex)) {
        return [
          false,
          "Commit does not match with defined format, Please recheck for spaces and order of commit subsections.",
        ];
      }

      return [true];
    },
  },
};
