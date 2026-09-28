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

// WP04/T014: Yolan's dedicated 15-module track (FR-001/FR-002). Built from
// the 10 new module files authored in WP01/WP02/WP03 plus 5 modules reused
// by reference (same imported binding used by `modules` above -- not a
// second import, not a copy) from the shared track. See
// kitty-specs/yolan-cli-learning-track-01M3KZJ9/contracts/module-list-resolution.md
// for the full contract this function implements.

import terminalBasics from "./terminal-basics.js";
import makeYourTerminalYours from "./make-your-terminal-yours.js";
import claudeCodeCliOrientation from "./claude-code-cli-orientation.js";
import gitProperly from "./git-properly.js";
import githubHosting from "./github-hosting.js";
import mcpServersHandsOn from "./mcp-servers-hands-on.js";
import specDrivenDevelopment from "./spec-driven-development.js";
import buildingYourOwnTools from "./building-your-own-tools.js";
import claudeApiTaste from "./claude-api-taste.js";
import capstoneShipARealTool from "./capstone-ship-a-real-tool.js";

const yolanTrack = [
  terminalBasics,
  makeYourTerminalYours,
  claudeCodeCliOrientation,
  aiVsClaudeCode, // reused -- same import already used by `modules` above
  dataSafety, // reused -- same import already used by `modules` above
  gitProperly,
  githubHosting,
  mcpServersHandsOn,
  prompting101, // reused
  prompting201, // reused
  specDrivenDevelopment,
  buildingYourOwnTools,
  claudeApiTaste,
  mdFilesHabits, // reused
  capstoneShipARealTool,
]; // array order IS the display/navigation order -- no `.sort()` applied

/**
 * Resolves the active learner profile to its module track. Yolan gets her
 * own dedicated 15-module list; every other profile (including no profile
 * selected yet) falls back to the existing shared 12-module list. Pure,
 * never throws -- see contracts/module-list-resolution.md.
 */
export function getModulesForProfile(profileId) {
  if (profileId === "yolan") return yolanTrack;
  return modules;
}
