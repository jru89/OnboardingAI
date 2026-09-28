// Module: GitHub & Hosting (FR-009, Yolan track only -- order 7).
//
// SSH keys/auth, a first real push, forks/PRs conceptually, and hosting a
// static site on GitHub Pages as a general pattern. "SSH key" itself is
// already defined by the reused Data Safety module's glossary entry
// (js/data/modules/03-data-safety.js), so this module references that
// term rather than redefining it from scratch.
//
// Lab type "checklist" -- lab.config is a bare array of {id, label}.
// Non-graded, self-marked, complete once every item is checked.

export default {
  id: "github-hosting",
  order: 7,
  title: "GitHub & Hosting",
  summary:
    "SSH keys and authentication, your first push, forks and pull " +
    "requests, and hosting a static site on GitHub Pages.",
  content: [
    {
      heading: "What GitHub is",
      body:
        "<p><strong>GitHub</strong> hosts Git repos online and adds " +
        "collaboration features on top -- issues, pull requests, project " +
        "pages, and more. It's worth keeping the two separate in your " +
        "head: Git is the version-control tool itself, and it works " +
        "completely fine with no GitHub account at all, on repos that " +
        "never leave your own machine. GitHub is one popular place " +
        "(among several) to host those repos online and collaborate with " +
        "other people on them.</p>",
      glossaryTerms: [
        {
          term: "GitHub",
          definition:
            "A hosting site for Git repos that adds collaboration " +
            "features -- issues, pull requests, and more -- on top of " +
            "Git itself.",
        },
      ],
    },
    {
      heading: "SSH keys and authenticating",
      body:
        "<p>To push to a GitHub repo from the command line, GitHub needs " +
        "a way to confirm it's really you. The most common way is an SSH " +
        "key (see the Data Safety module for what a key pair is and why " +
        "the private half must never be shared). Setting it up is a " +
        "one-time job:</p>" +
        "<pre>ssh-keygen -t ed25519 -C \"your-email@example.com\"</pre>" +
        "<p>Press Enter through the prompts to accept the defaults (a " +
        "passphrase is optional -- fine to leave blank for now). That " +
        "creates a key pair; copy the public half with:</p>" +
        "<pre>cat ~/.ssh/id_ed25519.pub</pre>" +
        "<p>Then paste that output into GitHub, under Settings -> SSH and " +
        "GPG keys -> New SSH key. After that, GitHub recognizes your " +
        "machine automatically every time you push or pull -- no password " +
        "typing required.</p>" +
        "<p>If any of this goes sideways -- a confusing error, or GitHub's " +
        "menus have moved since this was written -- this is another good " +
        "moment to just ask Claude Code to walk you through it, or even do " +
        "it for you. It can run the commands above and explain each " +
        "prompt as it goes.</p>",
    },
    {
      heading: "Your first push",
      body:
        "<p>With authentication set up, connecting a project to GitHub " +
        "for the first time follows a short, repeatable sequence: create " +
        "an empty repo on GitHub, then connect your local repo to it with " +
        "<code>git remote add origin &lt;url&gt;</code>, then push with:</p>" +
        "<pre>git push -u origin main</pre>" +
        "<p>That <code>-u</code> is only needed this one time -- it tells " +
        "Git \"this local branch and that remote branch go together from " +
        "now on,\" so every push and pull after this first one can go " +
        "back to the plain <code>git push</code> / <code>git pull</code> " +
        "from \"Git, Properly.\" Leaving off <code>-u</code> on this very " +
        "first push is a common beginner snag -- Git will refuse with an " +
        "error about no upstream branch, which this avoids entirely.</p>" +
        "<p>That <code>origin</code> is just a name " +
        "for the remote you set up -- the same \"remote\" idea from " +
        "\"Git, Properly.\" This is where that module's push and pull " +
        "commands actually go somewhere: up to this point they had " +
        "nothing to talk to.</p>",
      glossaryTerms: [
        {
          term: "origin",
          definition:
            "The default name Git gives to the remote a repo was cloned " +
            "from, or the first remote you connect with git remote add.",
        },
      ],
    },
    {
      heading: "Forks and pull requests, conceptually",
      body:
        "<p>Two terms you'll see constantly on GitHub, worth recognizing " +
        "even before you use them: a <strong>fork</strong> is your own " +
        "copy of someone else's repo, made so you can freely experiment " +
        "without needing permission to change their original. A " +
        "<strong>pull request</strong> (often shortened to \"PR\") is how " +
        "you ask the original project's owner to pull your changes -- " +
        "from your fork, or from a branch -- into theirs. That's the " +
        "whole idea behind most open-source collaboration: fork, make " +
        "changes, open a pull request, and let the owner review before " +
        "anything merges in.</p>",
      glossaryTerms: [
        {
          term: "fork",
          definition:
            "Your own copy of someone else's repo, made so you can " +
            "experiment freely without needing permission to change the " +
            "original.",
        },
        {
          term: "pull request (PR)",
          definition:
            "A request asking a repo's owner to pull your changes -- " +
            "from a fork or a branch -- into their version, usually " +
            "after they review it.",
        },
      ],
    },
    {
      heading: "Hosting a static site on GitHub Pages",
      body:
        "<p>Here's a pattern worth knowing: a repo containing plain HTML, " +
        "CSS, and JavaScript -- with no server-side code -- can be turned " +
        "on as a live website directly through GitHub's own Pages " +
        "settings, with no server of your own to set up or maintain. You " +
        "push your site's files to a repo, flip on Pages for that repo in " +
        "GitHub's settings, and GitHub serves the files at a public URL " +
        "whenever you push an update.</p>" +
        "<p>This is exactly the same pattern behind plenty of small " +
        "personal sites, project pages, and portfolios you'll come " +
        "across: write plain static files, push them to GitHub, and let " +
        "Pages handle serving them. You can apply this to any static-site " +
        "project of your own once you have one worth putting online.</p>",
      glossaryTerms: [
        {
          term: "GitHub Pages",
          definition:
            "A GitHub feature that serves a repo's plain HTML/CSS/JS " +
            "files as a live website, with no server of your own needed.",
        },
      ],
    },
  ],
  labs: [
    {
      id: "github-hosting-checklist",
      type: "checklist",
      graded: false,
      config: [
        { id: "generated-ssh-key", label: "Generated an SSH key" },
        { id: "added-key-to-github", label: "Added it to GitHub" },
        {
          id: "created-repo-and-pushed",
          label: "Created a repo and pushed to it",
        },
        {
          id: "explain-fork-and-pr",
          label: "Can explain what a fork and a pull request are",
        },
        {
          id: "knows-github-pages",
          label: "Knows how GitHub Pages hosting works",
        },
      ],
    },
  ],
};
