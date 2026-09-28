// Module: Git, Properly (FR-008, Yolan track only -- order 6).
//
// Replaces "Repos" in the Yolan profile's module list. Per
// /spec-kitty.analyze finding I2, the shared conceptual "Repos" module is
// excluded from Yolan's 15-module list entirely, so this module opens with
// its own brief "what's a repo" grounding before going hands-on with real
// Git commands -- it does not re-teach the shared module's full "what's
// usually inside a repo" file-listing content, just enough context for
// "repo," "commit," and "clone" to land.
//
// Lab type "match" -- lab.config is a bare array of
// {prompt, options, correctOption, id?}. Five scenario -> command pairs.

export default {
  id: "git-properly",
  order: 6,
  title: "Git, Properly",
  summary:
    "Hands-on Git: cloning, branching, the commit loop, push/pull, and " +
    "reading a diff before you trust it.",
  content: [
    {
      heading: "What's a repo, briefly",
      body:
        "<p>A <strong>repository</strong> -- usually shortened to " +
        "<strong>repo</strong> -- is a folder of project files tracked " +
        "over time by Git, so every change is recorded and can be undone. " +
        "That's the whole idea: instead of a project just being whatever " +
        "state it's currently in, Git keeps a history of every saved " +
        "change, so you can always see what happened or roll something " +
        "back.</p>" +
        "<p>The rest of this module is about actually working with a " +
        "repo from the command line: getting a copy of one, saving your " +
        "own changes to it, and sharing those changes with others.</p>",
      glossaryTerms: [
        {
          term: "repository (repo)",
          definition:
            "A folder of project files tracked over time by Git, so " +
            "every change is recorded and can be undone.",
        },
      ],
    },
    {
      heading: "Cloning a repo",
      body:
        "<p><code>git clone &lt;url&gt;</code> downloads a full copy of a " +
        "project onto your own machine -- not just the current files, " +
        "but its entire recorded history. Once it finishes, you have a " +
        "normal folder you can open, edit, and run like any other " +
        "project; Git is just quietly keeping track of it in the " +
        "background.</p>",
    },
    {
      heading: "Branches",
      body:
        "<p>A <strong>branch</strong> is a separate line of work that " +
        "doesn't touch the main version of the project until you're " +
        "ready. This module teaches <code>git switch -c " +
        "&lt;branch-name&gt;</code> to create and switch to a new branch " +
        "in one step -- it's the more modern, clearer form (you may also " +
        "see the older <code>git checkout -b &lt;branch-name&gt;</code>, " +
        "which does the same thing).</p>" +
        "<p>Working on a branch means you can try something, make a " +
        "mess, or take your time, without affecting the main copy of the " +
        "project until you decide the work is ready.</p>",
      glossaryTerms: [
        {
          term: "branch",
          definition:
            "A separate line of work that doesn't touch the main version " +
            "of a project until you're ready to bring it back together.",
        },
      ],
    },
    {
      heading: "The commit loop",
      body:
        "<p>Saving your work in Git is a repeatable loop, not a one-time " +
        "sequence -- you'll run these three commands over and over, many " +
        "times a day:</p>" +
        "<ul>" +
        "<li><code>git status</code> -- what has changed since your last " +
        "commit?</li>" +
        "<li><code>git add &lt;file&gt;</code> -- stage the changes you " +
        "want to include in the next commit.</li>" +
        "<li><code>git commit -m \"&lt;message&gt;\"</code> -- save a " +
        "snapshot of the staged changes, with a short note describing " +
        "what changed.</li>" +
        "</ul>" +
        "<p>Check status, stage, commit -- then keep working and do it " +
        "again.</p>",
      glossaryTerms: [
        {
          term: "stage / staged",
          definition:
            "Marking a change as \"included in the next commit\" with " +
            "git add, before actually saving it with git commit.",
        },
      ],
    },
    {
      heading: "Push and pull",
      body:
        "<p>Your commits start out only on your own machine. A " +
        "<strong>remote</strong> is a copy of the repo hosted somewhere " +
        "else -- almost always on GitHub in this course -- that you and " +
        "others can sync with. <code>git push</code> sends your local " +
        "commits up to the remote; <code>git pull</code> brings down " +
        "commits from the remote that you don't have yet.</p>",
      glossaryTerms: [
        {
          term: "remote",
          definition:
            "A copy of a repo hosted somewhere else (like GitHub) that " +
            "you push commits to and pull commits from.",
        },
      ],
    },
    {
      heading: "Reading a diff before trusting it",
      body:
        "<p><code>git diff</code> shows exactly what's changed in your " +
        "files that isn't staged yet, line by line. <code>git diff " +
        "--staged</code> shows the same thing for changes you've already " +
        "staged with <code>git add</code>, so you can review precisely " +
        "what's about to be committed.</p>" +
        "<p>This is the same before/after review habit taught elsewhere " +
        "in this app, applied to real Git output instead of a " +
        "plain-language description of it: before you commit or push " +
        "something Claude Code just changed, skim the diff. Does it " +
        "actually match what you asked for? A diff is the most direct, " +
        "unfiltered answer to that question -- it's worth the ten seconds " +
        "it takes to read.</p>",
    },
    {
      heading: "Log",
      body:
        "<p><code>git log</code> answers a simple question: what " +
        "happened, and when? It lists past commits with their messages, " +
        "authors, and dates. Add <code>--oneline</code> " +
        "(<code>git log --oneline</code>) for a compact, one-line-per-" +
        "commit view that's much easier to scan than the full default " +
        "output.</p>",
    },
  ],
  labs: [
    {
      id: "git-properly-match",
      type: "match",
      graded: false,
      config: [
        {
          id: "see-changes-before-commit",
          prompt: "You want to see exactly what changed before committing.",
          options: ["git diff", "git log", "git push", "git status"],
          correctOption: "git diff",
        },
        {
          id: "start-new-line-of-work",
          prompt:
            "You want to start a new line of work without touching your " +
            "main code yet.",
          options: [
            "git switch -c",
            "git commit -m",
            "git pull",
            "git clone",
          ],
          correctOption: "git switch -c",
        },
        {
          id: "save-changes-with-message",
          prompt: "You want to save your current changes with a message.",
          options: ["git commit -m", "git add", "git log", "git diff"],
          correctOption: "git commit -m",
        },
        {
          id: "send-commits-to-github",
          prompt: "You want to send your commits to GitHub.",
          options: ["git push", "git pull", "git clone", "git switch -c"],
          correctOption: "git push",
        },
        {
          id: "see-past-commits",
          prompt: "You want to see a list of past commits.",
          options: ["git log", "git status", "git diff --staged", "git add"],
          correctOption: "git log",
        },
      ],
    },
  ],
};
