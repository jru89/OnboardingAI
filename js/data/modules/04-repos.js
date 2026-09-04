// Module 4: Repos (FR-007).
//
// What a repository and repo folder are, and typical contents (README,
// source folders, config, docs) -- references assets/svg/repo-folder-tree.svg
// (WP10 creates the file; this path is correct ahead of that WP landing).
//
// Lab type "match" -- lab.config is a bare array of
// {prompt, options, correctOption, visual?, id?}. Matches common file/folder
// names to short descriptions of what belongs there. `visual` (added by
// WP05's T024 pass) carries a small ASCII folder-tree illustration.

export default {
  id: "repos",
  order: 4,
  title: "Repos",
  summary:
    "What a repository is, what typically lives inside one, and how to " +
    "recognize common files and folders on sight.",
  content: [
    {
      heading: "What's a repo?",
      body:
        "<p>A <strong>repository</strong> -- almost always shortened to " +
        "<strong>repo</strong> -- is a folder of files that make up one " +
        "project, tracked over time by a version-control system (most " +
        "commonly one called Git) so every change is recorded and can be " +
        "undone. You'll sometimes hear the whole folder called the " +
        "<strong>repo folder</strong>; that's just the project folder " +
        "itself, sitting on your computer (or on a hosting site like " +
        "GitHub).</p>" +
        "<p>Two words come up constantly around repos, so it's worth " +
        "knowing them even though you may not use them directly yet: a " +
        "<strong>commit</strong> is a saved snapshot of the files at one " +
        "point in time, with a short note describing what changed; a " +
        "<strong>clone</strong> is making your own local copy of someone " +
        "else's repo so you can work on it.</p>",
      diagram: "assets/svg/repo-folder-tree.svg",
      glossaryTerms: [
        {
          term: "repository (repo)",
          definition:
            "A folder of project files tracked over time by a " +
            "version-control system, so every change is recorded and can " +
            "be undone.",
        },
        {
          term: "repo folder",
          definition:
            "The actual folder on disk (or on a hosting site) that holds " +
            "a repository's files.",
        },
        {
          term: "commit",
          definition:
            "A saved snapshot of a repo's files at one point in time, " +
            "with a short note describing what changed.",
        },
        {
          term: "clone",
          definition:
            "Making your own local copy of someone else's repo so you " +
            "can open and work on it.",
        },
      ],
    },
    {
      heading: "What's usually inside",
      body:
        "<p>Repos vary a lot, but most follow a similar layout. Knowing " +
        "these names on sight will help you orient yourself in almost any " +
        "project, including your own graduation project later in this " +
        "course.</p>" +
        "<ul>" +
        "<li><strong>README.md</strong> -- the front door. Explains what " +
        "the project is, and usually how to run or use it. Almost always " +
        "the first file worth opening.</li>" +
        "<li><strong>src/</strong> -- short for \"source.\" Holds the " +
        "actual code that makes the project work.</li>" +
        "<li><strong>docs/</strong> -- longer written guides and " +
        "reference material, for readers who want more detail than the " +
        "README gives.</li>" +
        "<li><strong>.gitignore</strong> -- a plain list of files and " +
        "folders that should NOT be tracked or shared (for example, " +
        "files with secrets in them -- see Module 3).</li>" +
        "<li><strong>Config files</strong> (e.g. a file named " +
        "<code>config.json</code> or a <strong>config/</strong> folder) " +
        "-- settings the project reads to control its own behavior, " +
        "rather than code or documentation.</li>" +
        "</ul>",
      glossaryTerms: [
        {
          term: "README",
          definition:
            "The file, almost always named README.md, that explains what " +
            "a project is and how to use it -- the natural first thing " +
            "to open in any repo.",
        },
      ],
    },
    {
      heading: "How do I know what changed?",
      body:
        "<p>Once Claude Code has done some work in your repo, you'll want " +
        "a quick way to check what it actually did. The mental model is " +
        "simple: <strong>Before</strong> -- this is what the project " +
        "looked like. <strong>After</strong> -- these are the things " +
        "Claude changed. <strong>Review</strong> -- do those changes make " +
        "sense, given what you asked for?</p>" +
        "<p>Here's a small example. Say you asked Claude Code to add a " +
        "contact page to a simple website. Before, the project's files " +
        "looked like this:</p>" +
        "<pre>my-site/\n" +
        "  index.html\n" +
        "  about.html\n" +
        "  styles.css</pre>" +
        "<p>After, they look like this:</p>" +
        "<pre>my-site/\n" +
        "  index.html\n" +
        "  about.html\n" +
        "  contact.html\n" +
        "  styles.css</pre>" +
        "<p>Which things changed? Comparing the two listings, one new " +
        "file appeared -- <strong>contact.html</strong> -- and " +
        "<strong>styles.css</strong> is there in both, but that alone " +
        "doesn't tell you whether its contents changed too; the file " +
        "list is only a starting point, not the whole picture.</p>" +
        "<p>Which change would you want to look at more closely before " +
        "accepting it? A brand-new file is usually worth opening and " +
        "reading in full, since there's nothing to compare it to. A file " +
        "that already existed is worth a closer look too, especially if " +
        "you weren't expecting it to be touched at all -- an unexpected " +
        "change is exactly the kind of thing this before/after habit is " +
        "meant to catch.</p>",
    },
  ],
  labs: [
    {
      id: "module-4-match",
      type: "match",
      graded: false,
      config: [
        {
          id: "readme",
          prompt: "README.md",
          visual:
            "my-project/\n" +
            "  README.md\n" +
            "  src/\n" +
            "  docs/\n" +
            "  .gitignore",
          options: [
            "Explains what the project is and how to use it",
            "Stores the project's compiled output",
            "Lists people banned from contributing",
            "A backup copy of the whole repo",
          ],
          correctOption: "Explains what the project is and how to use it",
        },
        {
          id: "src-folder",
          prompt: "src/",
          options: [
            "Where the project's actual source code lives",
            "Where downloaded videos are stored",
            "A folder Claude Code is not allowed to open",
            "The project's saved chat history",
          ],
          correctOption: "Where the project's actual source code lives",
        },
        {
          id: "docs-folder",
          prompt: "docs/",
          options: [
            "Written guides and reference material about the project",
            "A folder that only contains images",
            "The project's password list",
            "Old, deleted files",
          ],
          correctOption:
            "Written guides and reference material about the project",
        },
        {
          id: "gitignore",
          prompt: ".gitignore",
          options: [
            "A list of files and folders that should NOT be tracked or shared",
            "The main entry point of the program",
            "A required license file",
            "A list of every contributor's email address",
          ],
          correctOption:
            "A list of files and folders that should NOT be tracked or shared",
        },
        {
          id: "config-file",
          prompt: "config/ (or a file like config.json)",
          options: [
            "Settings the project reads to control its behavior",
            "The project's marketing copy",
            "A folder of unused draft files",
            "The project's issue tracker",
          ],
          correctOption: "Settings the project reads to control its behavior",
        },
      ],
    },
  ],
};
