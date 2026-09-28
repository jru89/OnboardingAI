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
        "<p>A <strong>terminal</strong> is a plain, text-only window where " +
        "you talk to your computer by typing <strong>commands</strong> " +
        "instead of clicking icons. You type a line, press Enter, and the " +
        "computer does exactly what you asked and prints the result.</p>" +
        "<p>Your Mac can't run the version of Claude Code that lives " +
        "inside a code editor as a panel, so the terminal is how you'll " +
        "talk to Claude Code directly -- it's simply the tool for the job " +
        "on your machine, not a harder or lesser way of doing things. " +
        "Everything in this module is a skill you'll use constantly once " +
        "you start working with Claude Code from the command line.</p>",
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
        "<p>Three commands answer \"where am I, and what's here?\"</p>" +
        "<ul>" +
        "<li><code>pwd</code> (\"print working directory\") shows the " +
        "full path of the <strong>directory</strong> (folder) you're " +
        "currently in.</li>" +
        "<li><code>cd</code> (\"change directory\") moves you into a " +
        "different folder -- for example, <code>cd Documents</code> " +
        "moves into a folder named Documents inside the one you're in " +
        "now. <code>cd ..</code> moves up one level (to the parent " +
        "folder), and <code>cd ~</code> jumps straight back to your home " +
        "folder from anywhere.</li>" +
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
        "files and folders:</p>" +
        "<ul>" +
        "<li><code>mkdir</code> (\"make directory\") creates a new " +
        "folder -- <code>mkdir notes</code> creates a folder named " +
        "notes.</li>" +
        "<li><code>touch somefile.txt</code> creates a new, empty file " +
        "named <code>somefile.txt</code> if it doesn't already exist.</li>" +
        "<li><code>mv</code> (\"move\") both moves and renames -- it's " +
        "the same operation either way. <code>mv old.txt new.txt</code> " +
        "renames a file in place; <code>mv notes.txt notes/</code> moves " +
        "it into the notes folder.</li>" +
        "<li><code>cp</code> (\"copy\") makes a copy -- " +
        "<code>cp notes.txt backup.txt</code> leaves the original alone " +
        "and creates a second file.</li>" +
        "<li><code>rm</code> (\"remove\") deletes a file -- " +
        "<code>rm old.txt</code> deletes it permanently.</li>" +
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
        "<p>Run <code>nano somefile.txt</code> to open (or create) that " +
        "file in the editor. Type normally to add or change text. The " +
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
        "typing them one by one. If you have a script file named " +
        "<code>setup.sh</code>, you can run it one of two ways:</p>" +
        "<ul>" +
        "<li><code>bash setup.sh</code> -- tells the `bash` program to " +
        "read and run the commands in that file directly.</li>" +
        "<li><code>chmod +x setup.sh</code> once, to mark the file as " +
        "\"executable\" (allowed to run on its own), and then " +
        "<code>./setup.sh</code> from then on to run it directly.</li>" +
        "</ul>" +
        "<p>That's all you need for now -- writing your own scripts is a " +
        "topic for later. The goal here is just recognizing what a " +
        "script is and knowing how to run one someone else wrote.</p>",

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
          label: "Ran a script with `bash somefile.sh` or `./somefile.sh`",
        },
      ],
    },
  ],
};
