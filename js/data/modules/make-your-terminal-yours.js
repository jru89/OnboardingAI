// Module: Make Your Terminal Yours (FR-004, Yolan's CLI track).
//
// A prescribed default terminal-styling stack (Homebrew -> iTerm2 -> Oh My
// Zsh with a theme and 2+ plugins), then guidance on finding more add-ons
// independently. Second module in Yolan's track (order: 2).
//
// Device accuracy (NFR-004): every command here targets an Intel Mac on
// macOS Monterey 12.7.6 -- see research.md ("Ghostty vs. macOS Monterey"
// and "Homebrew install path on Intel vs. Apple Silicon"). Ghostty is
// explicitly NOT prescribed (requires macOS 13+); iTerm2 is used instead.
//
// Shape: data-model.md's Module ({id, order, title, summary, content, labs}).
// Lab type "checklist" -- bare array config form, matching house style.

export default {
  id: "make-your-terminal-yours",
  order: 2,
  title: "Make Your Terminal Yours",
  summary:
    "Install a good default terminal setup -- Homebrew, iTerm2, and Oh My " +
    "Zsh with a theme and a couple of plugins -- then learn how to find " +
    "more add-ons on your own.",
  content: [
    {
      heading: "Homebrew: installing software from the terminal",
      body:
        "<p>A <strong>package manager</strong> is a tool that installs, " +
        "updates, and removes other software for you from the terminal, " +
        "instead of downloading installers from websites one at a time. " +
        "<strong>Homebrew</strong> is the standard package manager for " +
        "Mac, and you'll use it to install everything else in this " +
        "module.</p>" +
        "<p>Go to <a href=\"https://brew.sh\" target=\"_blank\" " +
        "rel=\"noopener noreferrer\">brew.sh &#8599;</a> and copy the " +
        "install command shown on the page directly into your terminal, " +
        "then press Enter. Copying it fresh from the site (rather than " +
        "from an older tutorial) makes sure you get the current, correct " +
        "command for your Mac.</p>" +
        "<p>Near the end of the install, the installer will print a " +
        "couple of lines starting with <code>eval</code> -- copy and run " +
        "those exactly as shown. That step is what puts the " +
        "<code>brew</code> command on your <strong>PATH</strong> (the " +
        "list of places your terminal looks for commands), so skipping it " +
        "is the most common reason <code>brew</code> would say " +
        "\"command not found\" right after installing.</p>",
      glossaryTerms: [
        {
          term: "package manager",
          definition:
            "A tool that installs, updates, and removes other software " +
            "for you from the terminal, instead of downloading installers " +
            "one at a time from websites.",
        },
      ],
    },
    {
      heading: "iTerm2, not Ghostty",
      body:
        "<p>Next, install a nicer terminal app than the one macOS ships " +
        "with. This module uses <strong>iTerm2</strong> -- install it " +
        "with Homebrew:</p>" +
        "<pre>brew install --cask iterm2</pre>" +
        "<p>(Or download it directly from " +
        "<a href=\"https://iterm2.com\" target=\"_blank\" " +
        "rel=\"noopener noreferrer\">iterm2.com &#8599;</a> if you'd " +
        "rather drag it into Applications yourself.)</p>" +
        "<p>You may see other guides online recommend a newer terminal " +
        "called Ghostty instead. This module prescribes iTerm2 " +
        "specifically because Ghostty needs a newer macOS than yours " +
        "(13+) -- iTerm2 works great on Monterey and is the standard " +
        "choice for exactly this kind of setup.</p>" +
        "<p><em>Aside:</em> once you're on a newer Mac, Ghostty is worth " +
        "trying -- nothing here locks you out of switching later.</p>" +
        "<p>From here on, open <strong>iTerm2</strong> (not the built-in " +
        "Terminal app) whenever a module says \"open a terminal\" -- it's " +
        "an extra app on your Mac now, not a replacement, so look for it " +
        "in Applications or Spotlight by name.</p>",
    },
    {
      heading: "Oh My Zsh: a theme and a couple of plugins",
      body:
        "<p><strong>Oh My Zsh</strong> is a popular add-on for your " +
        "<strong>shell</strong> (the program that actually reads and runs " +
        "the commands you type -- Zsh is the shell macOS uses by " +
        "default). It adds easy theming and a large library of optional " +
        "plugins. Install it by running the command from its official " +
        "site:</p>" +
        "<pre>sh -c \"$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)\"</pre>" +
        "<p>Once it's installed, open your <strong>shell profile</strong> " +
        "-- a file your terminal reads every time it starts, located at " +
        "<code>~/.zshrc</code> -- to pick a theme and turn on plugins:</p>" +
        "<pre>nano ~/.zshrc</pre>" +
        "<p>To start, a good default <strong>theme</strong> (a preset " +
        "look for your prompt) is the one Oh My Zsh ships with by " +
        "default, <code>robbyrussell</code> -- look for a line like " +
        "<code>ZSH_THEME=\"robbyrussell\"</code> near the top of the " +
        "file. You can always try a different theme later.</p>" +
        "<p>Then find the line that starts with <code>plugins=(...)</code> " +
        "and add at least these two <strong>plugins</strong> (add-ons that " +
        "extend what your shell can do) by name, separated by spaces:</p>" +
        "<ul>" +
        "<li><code>git</code> -- shows useful git information (like the " +
        "current branch) right in your prompt when you're inside a git " +
        "project.</li>" +
        "<li><code>zsh-autosuggestions</code> -- as you type, suggests " +
        "the rest of a command based on ones you've run before, shown in " +
        "gray text you can accept with the right-arrow key.</li>" +
        "</ul>" +
        "<p>It should look like <code>plugins=(git zsh-autosuggestions)</code>. " +
        "Note that <code>zsh-autosuggestions</code> needs one extra " +
        "install step first -- " +
        "<code>brew install zsh-autosuggestions</code> -- before it will " +
        "work once added to that line. Save with " +
        "<strong><code>Control+O</code></strong>, Enter, then exit with " +
        "<strong><code>Control+X</code></strong>, and open a new terminal " +
        "tab (or run <code>source ~/.zshrc</code>) for the changes to " +
        "take effect.</p>",
      glossaryTerms: [
        {
          term: "shell",
          definition:
            "The program that reads and runs the commands you type in a " +
            "terminal window. Zsh is the shell macOS uses by default.",
        },
        {
          term: "shell profile",
          definition:
            "A file your terminal reads every time it starts -- for Zsh, " +
            "that's `~/.zshrc`. It's where settings like your theme and " +
            "plugins are configured.",
        },
        {
          term: "plugin",
          definition:
            "An add-on that extends what your shell can do -- for " +
            "example, showing git status in your prompt or suggesting " +
            "commands as you type.",
        },
        {
          term: "theme",
          definition:
            "A preset look for your terminal prompt -- what information " +
            "it shows and how it's styled.",
        },
      ],
    },
    {
      heading: "Finding more on your own",
      body:
        "<p>This module gives you one solid starting stack, not the only " +
        "options. When you're ready to explore further:</p>" +
        "<ul>" +
        "<li>Search terms like \"oh-my-zsh plugins\" or \"iTerm2 " +
        "profiles\" to see what other people recommend.</li>" +
        "<li>Before installing something new, check its GitHub page for " +
        "how many stars it has and when it was last updated -- an " +
        "actively maintained, widely used project is a safer bet than an " +
        "abandoned one.</li>" +
        "<li>Try one new thing at a time. If something breaks after a " +
        "change, you'll know exactly what caused it instead of untangling " +
        "several changes at once.</li>" +
        "</ul>",
    },
  ],
  labs: [
    {
      id: "module-make-your-terminal-yours-checklist",
      type: "checklist",
      graded: false,
      config: [
        { id: "installed-homebrew", label: "Installed Homebrew" },
        { id: "installed-iterm2", label: "Installed iTerm2" },
        { id: "installed-oh-my-zsh", label: "Installed Oh My Zsh" },
        { id: "picked-a-theme", label: "Picked a theme" },
        { id: "added-a-plugin", label: "Added at least one plugin" },
      ],
    },
  ],
};
