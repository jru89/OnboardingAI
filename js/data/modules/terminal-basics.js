// Module: Terminal Basics (FR-003, Yolan's CLI track).
//
// True beginner terminal literacy -- Yolan has never used a terminal before
// this module. Covers pwd/cd/ls, mkdir/mv/cp/rm, editing a file from the
// CLI, and running a script. First module in Yolan's track (order: 1).
//
// Shape: data-model.md's Module ({id, order, title, summary, content, labs}).
// Lab type "checklist" -- see js/views/labs/checklist-lab.js; uses the bare
// array config form, matching the existing modules' house style.

export default {
  id: "terminal-basics",
  order: 1,
  title: "Terminal Basics",
  summary:
    "The handful of commands that let you move around, make and remove " +
    "things, edit a file, and run a script -- all from the keyboard, no " +
    "mouse required.",
  content: [
    {
      heading: "What is a terminal, and why do you need one",
      body:
        "<p><strong>Before anything else: this module has nothing to do " +
        "with AI yet.</strong> No Claude Code, no chatbot, nothing " +
        "\"smart\" -- just you and your own computer. Think of it as " +
        "learning to drive before anyone hands you the keys to a " +
        "particular car. Take it slowly; there's no rush and nothing here " +
        "assumes you've touched a terminal before.</p>" +
        "<p>A <strong>terminal</strong> is a plain, text-only window where " +
        "you talk to your computer by typing <strong>commands</strong> " +
        "instead of clicking icons. You type a line, press Enter, and the " +
        "computer does exactly what you asked and prints the result. " +
        "That's the entire idea -- everything else in this module is just " +
        "specific commands built on that one pattern.</p>" +
        "<p>Why learn it at all? Your Mac can't run the version of Claude " +
        "Code that lives inside a code editor, so a few modules from now " +
        "you'll be talking to Claude Code through this same terminal " +
        "window. That's the only reason this course covers it -- it's " +
        "simply the tool for the job on your machine, not a harder or " +
        "lesser way of doing things.</p>",
      glossaryTerms: [
        {
          term: "terminal",
          definition:
            "A plain, text-only window where you type commands for your " +
            "computer to run, and see the results printed back as text.",
        },
        {
          term: "command",
          definition:
            "A single instruction you type into the terminal and run by " +
            "pressing Enter -- for example, `pwd` or `ls`.",
        },
      ],
    },
    {
      heading: "Finding your way around",
      body:
        "<p>Three commands answer \"where am I, and what's here?\" Try " +
        "them now, in order:</p>" +
        "<pre>pwd\ncd Documents\nls</pre>" +
        "<ul>" +
        "<li><code>pwd</code> (\"print working directory\") shows the " +
        "full path of the <strong>directory</strong> (folder) you're " +
        "currently in.</li>" +
        "<li><code>cd</code> (\"change directory\") moves you into a " +
        "different folder -- <code>cd Documents</code> above moves into " +
        "a folder named Documents inside the one you're in now. " +
        "<code>cd ..</code> moves up one level (to the parent folder), " +
        "and <code>cd ~</code> jumps straight back to your home folder " +
        "from anywhere.</li>" +
        "<li><code>ls</code> (\"list\") shows what's inside the current " +
        "folder. Adding an <strong>argument</strong> -- extra text after " +
        "the command that changes what it does -- like " +
        "<code>ls -la</code> also shows hidden files (ones whose name " +
        "starts with a dot) and more detail about each one. Here, " +
        "<code>-la</code> is a <strong>flag</strong>: an argument that " +
        "turns on an option rather than naming a file.</li>" +
        "</ul>" +
        "<p>A <strong>directory</strong> and a <strong>folder</strong> " +
        "are the same thing -- \"directory\" is just the term the " +
        "terminal world tends to use.</p>",
      glossaryTerms: [
        {
          term: "directory",
          definition:
            "The terminal's word for a folder -- a container that holds " +
            "files and other directories.",
        },
        {
          term: "argument",
          definition:
            "Extra text you type after a command to tell it what to act " +
            "on or how to behave -- for example, the folder name in " +
            "`cd Documents`.",
        },
        {
          term: "flag",
          definition:
            "A special kind of argument that turns an option on, usually " +
            "starting with a dash -- for example, the `-la` in `ls -la`.",
        },
      ],
    },
    {
      heading: "Making and moving things",
      body:
        "<p>Four commands cover creating, renaming, copying, and removing " +
        "files and folders. You'll use these constantly once you start " +
        "working on real projects -- including setting up Git repos later " +
        "in this course, which are really just folders like any other, " +
        "with Git quietly keeping track of them.</p>" +
        "<p>Try them now on a throwaway test file:</p>" +
        "<pre>mkdir notes\ntouch notes/somefile.txt\nmv " +
        "notes/somefile.txt notes/renamed.txt\ncp notes/renamed.txt " +
        "notes/backup.txt\nrm notes/backup.txt</pre>" +
        "<ul>" +
        "<li><code>mkdir</code> (\"make directory\") creates a new " +
        "folder -- the first line above creates one named notes.</li>" +
        "<li><code>touch</code> creates a new, empty file if it doesn't " +
        "already exist -- used above just to have something to practice " +
        "on.</li>" +
        "<li><code>mv</code> (\"move\") both moves and renames -- it's " +
        "the same operation either way; above, it renames somefile.txt " +
        "to renamed.txt.</li>" +
        "<li><code>cp</code> (\"copy\") makes a copy, leaving the " +
        "original alone -- above, backup.txt is a new second file.</li>" +
        "<li><code>rm</code> (\"remove\") deletes a file -- above, " +
        "backup.txt is deleted permanently, but renamed.txt stays.</li>" +
        "</ul>" +
        "<p><strong>Be careful with <code>rm</code>:</strong> unlike " +
        "dragging a file to the Trash in Finder, there is no undo and no " +
        "trash can to recover from. Once a file is removed this way, " +
        "it's gone. Double-check the filename before you press Enter.</p>",
    },
    {
      heading: "Editing a file from the CLI",
      body:
        "<p>You can open and edit a text file without ever leaving the " +
        "terminal. macOS ships with a simple, beginner-friendly editor " +
        "called <code>nano</code> -- no surprise modes or unfamiliar " +
        "keyboard languages to learn first.</p>" +
        "<p>To open (or create) a file in the editor, run:</p>" +
        "<pre>nano somefile.txt</pre>" +
        "<p>Type normally to add or change text. The " +
        "bottom of the screen lists the available shortcuts, using " +
        "<code>^</code> to mean the Control key -- the two you'll use " +
        "most are <strong><code>Control+O</code></strong> (\"Write " +
        "Out\") to save, followed by Enter to confirm the filename, and " +
        "<strong><code>Control+X</code></strong> to exit back to your " +
        "terminal prompt.</p>",
      glossaryTerms: [
        {
          term: "CLI",
          definition:
            "Short for \"command-line interface\" -- the general name " +
            "for interacting with software by typing commands in a " +
            "terminal, rather than clicking a graphical interface.",
        },
      ],
    },
    {
      heading: "Running a script",
      body:
        "<p>A <strong>script</strong> is just a text file full of " +
        "commands, saved so you can run them all at once instead of " +
        "typing them one by one -- like a little recipe. Try making a " +
        "tiny one now, using the same <code>nano</code> skill from a " +
        "moment ago:</p>" +
        "<pre>nano setup.sh</pre>" +
        "<p>Type one line -- <code>echo \"Hello from my script\"</code> " +
        "-- then save and exit the same way as before. Run it with:</p>" +
        "<pre>bash setup.sh</pre>" +
        "<p>That tells the <code>bash</code> program to read and run the " +
        "commands in that file, one after another, exactly as if you'd " +
        "typed each one yourself -- here, just that one " +
        "<code>echo</code> line, but the exact same idea scales to a " +
        "script with a hundred lines. That's genuinely all you need for " +
        "now.</p>",

      glossaryTerms: [
        {
          term: "script",
          definition:
            "A text file containing a sequence of commands, saved so " +
            "they can all be run together instead of typed one at a " +
            "time.",
        },
      ],
    },
  ],
  labs: [
    {
      id: "module-terminal-basics-checklist",
      type: "checklist",
      graded: false,
      config: [
        {
          id: "ran-pwd-cd-ls",
          label: "Ran `pwd`, `cd`, and `ls` to see and move around your folders",
        },
        {
          id: "ran-mkdir-mv-cp-rm",
          label: "Tried `mkdir`, `mv`, `cp`, and `rm` on a test file or folder",
        },
        {
          id: "edited-a-file",
          label: "Opened and edited a file with `nano`, then saved and exited",
        },
        {
          id: "ran-a-script",
          label: "Ran a script with `bash setup.sh`",
        },
      ],
    },
  ],
};
