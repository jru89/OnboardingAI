// js/data/modules/index.js -- aggregator for all 12 course modules (T042).
//
// Imports the six module files authored in WP07 and the six authored in
// this WP (WP08), and re-exports them as a single array ordered by each
// module's `order` field (1-12). This is the first point in the app where
// all 12 real modules are wired together; landing-view.js and
// module-view.js import from here instead of their WP02/WP03-era
// placeholder stub lists (see this WP's Activity Log for the one-line
// rationale on touching those two files).

import getOriented from "./01-get-oriented.js";
import aiVsClaudeCode from "./02-ai-vs-claude-code.js";
import dataSafety from "./03-data-safety.js";
import repos from "./04-repos.js";
import mcpServers from "./05-mcp-servers.js";
import prompting101 from "./06-prompting-101.js";
import mockUseCases from "./07-mock-use-cases.js";
import prompting201 from "./08-prompting-201.js";
import claudeVsGemini from "./09-claude-vs-gemini.js";
import automateATask from "./10-automate-a-task.js";
import mdFilesHabits from "./11-md-files-habits.js";
import graduation from "./12-graduation.js";

const modules = [
  getOriented,
  aiVsClaudeCode,
  dataSafety,
  repos,
  mcpServers,
  prompting101,
  mockUseCases,
  prompting201,
  claudeVsGemini,
  automateATask,
  mdFilesHabits,
  graduation,
].sort((a, b) => a.order - b.order);

export default modules;
