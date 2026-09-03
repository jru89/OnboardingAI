// Module 3: Data Safety (FR-005, FR-006).
//
// What must never be pasted into an AI chat -- client/customer data,
// personal access tokens, SSH private keys, passwords/secrets -- and why
// each one is dangerous, not just a bare list.
//
// Lab type "spot-mistake" -- see js/views/labs/spot-mistake-lab.js:
// lab.config is a bare array of {id, snippet, isUnsafe, explanation}
// (NOT wrapped in {items: ...}). This lab is graded (FR-006): the engine
// itself handles scoring, immediate feedback, and unlimited retries.
//
// All example secrets below are obviously fake placeholders
// (sk-EXAMPLE.../ghp_EXAMPLE.../"BEGIN EXAMPLE ... KEY") -- none resemble a
// real credential format tied to a real service.

export default {
  id: "data-safety",
  order: 3,
  title: "Data Safety",
  summary:
    "What must never be pasted into an AI chat -- and why each one is " +
    "genuinely dangerous.",
  content: [
    {
      heading: "Why this matters",
      body:
        "<p>Claude Code and other AI chat tools are enormously useful, but " +
        "anything you paste into a chat should be treated as something " +
        "you're handing to a third party. Some kinds of information should " +
        "never be pasted in, because of how much damage it can cause if " +
        "it's misused or ever leaks. This module covers four categories " +
        "worth knowing cold.</p>",
    },
    {
      heading: "Customer or client data",
      body:
        "<p>Never paste real customer or client records -- names, emails, " +
        "account details, financial information -- into any AI chat, even " +
        "to ask for something as simple as a summary. This kind of " +
        "information is usually covered by privacy law and by promises " +
        "you or your company made to those customers. Once it's pasted " +
        "into a chat, you've lost control of where it goes, and that " +
        "alone can be a serious breach, regardless of what happens next.</p>",
    },
    {
      heading: "Personal access tokens and API keys",
      body:
        "<p>A <strong>personal access token</strong> (often shortened to " +
        "<strong>PAT</strong>) or <strong>API key</strong> is a long " +
        "string of letters and numbers that proves your identity to a " +
        "service instead of a password -- it's what lets a program act as " +
        "you, automatically, without you typing a password every time. " +
        "Anyone who has your token can do anything you can do on that " +
        "service, often without needing your username at all. Pasting one " +
        "into a chat -- even by accident, like copying a whole error " +
        "message that happens to include it -- is effectively handing a " +
        "stranger your keys.</p>",
      glossaryTerms: [
        {
          term: "personal access token (PAT)",
          definition:
            "A long code that proves your identity to a service in place " +
            "of a password, often used so a program can act as you " +
            "automatically. Anyone who has it can act as you.",
        },
        {
          term: "API key",
          definition:
            "A code that identifies and authorizes an app or script to a " +
            "service, similar in purpose and risk to a personal access " +
            "token.",
        },
      ],
    },
    {
      heading: "SSH private keys",
      body:
        "<p>An <strong>SSH key</strong> pair is a security credential used " +
        "to prove your identity to a remote computer or server without " +
        "typing a password -- one half stays secret on your machine (the " +
        "<strong>private key</strong>), and the other half is shared. The " +
        "private key is meant to never leave your computer. If it ends up " +
        "in a chat log or anywhere else, whoever has it can potentially " +
        "access every server that trusted it, and the only fix is " +
        "generating a brand-new key pair everywhere it was used.</p>",
      glossaryTerms: [
        {
          term: "SSH key",
          definition:
            "A pair of files used to prove your identity to a remote " +
            "computer without a password. The private half must never " +
            "leave your own computer or be pasted anywhere.",
        },
      ],
    },
    {
      heading: "Passwords and other secrets",
      body:
        "<p>The same logic applies to plain passwords and any other " +
        "<strong>secret</strong> -- a general term for any credential " +
        "meant to stay private, including passwords, tokens, and keys. " +
        "Even in a private-feeling chat window, treat it exactly like you " +
        "would a sticky note on a public bulletin board: assume it could " +
        "be read by someone else, and never paste it in.</p>",
      glossaryTerms: [
        {
          term: "secret",
          definition:
            "A general word for any credential meant to stay private -- " +
            "passwords, tokens, and keys are all secrets.",
        },
      ],
    },
  ],
  labs: [
    {
      id: "module-3-spot-mistake",
      type: "spot-mistake",
      graded: true,
      config: [
        {
          id: "email-decline",
          snippet:
            "Can you help me write a polite email declining a meeting " +
            "invite for Thursday?",
          isUnsafe: false,
          explanation:
            "No sensitive information here -- just a request for help " +
            "writing a message.",
        },
        {
          id: "customer-list",
          snippet:
            "Here's our customer list with names, emails, and account " +
            "balances -- can you find our top 10 spenders? [pasted " +
            "spreadsheet of 400 customer records]",
          isUnsafe: true,
          explanation:
            "This pastes real customer/client data into the chat -- " +
            "exactly the kind of information that should never leave " +
            "your own systems, even to save time.",
        },
        {
          id: "github-token",
          snippet:
            "My GitHub token is ghp_EXAMPLE1234567890abcdefEXAMPLE -- can " +
            "you check what permissions it has?",
          isUnsafe: true,
          explanation:
            "That's a personal access token -- pasting it hands over " +
            "everything that token can do, to anyone who ever sees this " +
            "chat log.",
        },
        {
          id: "blog-headline",
          snippet:
            "Here's a paragraph from our public blog post -- got a " +
            "punchier headline idea?",
          isUnsafe: false,
          explanation:
            "This is already public content, so there's nothing " +
            "sensitive being shared.",
        },
        {
          id: "ssh-key",
          snippet:
            "Not sure if I copied this SSH key right, can you check it? " +
            "-----BEGIN EXAMPLE PRIVATE KEY-----\n" +
            "MIIExampleFakeDataNotARealKey1234567890==\n" +
            "-----END EXAMPLE PRIVATE KEY-----",
          isUnsafe: true,
          explanation:
            "That's an SSH private key. It should never leave your own " +
            "computer -- treat any key that has been pasted anywhere as " +
            "compromised and replace it.",
        },
        {
          id: "shared-password",
          snippet:
            "My password is Sunshine2024! and I can't log into the " +
            "shared dashboard -- any idea what's wrong?",
          isUnsafe: true,
          explanation:
            "Never paste a real password anywhere, including into an AI " +
            "chat -- treat this the same as writing it on a public sticky " +
            "note.",
        },
      ],
    },
  ],
};
