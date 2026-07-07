/* Core battles: Zurg final battle + Cert Trials.
   Cert trials for sc300, sc200, az500, sc100, secai arrive with their packs. */
window.PACKS = window.PACKS || {};
window.PACKS.__core = {
  zurg: {
    title: "Operation Endgame: The Fall of Star Command",
    brief: "Emperor Zurg launches everything at once: a poisoned AI model inside Star Command's defense grid, stolen Ranger identities, a compromised Sentinel workspace, and a zero-day against the fleet's cloud core. Every skill you've certified is on the line. Defeat him here and he is gone forever.",
    win: "Zurg's fortress goes dark. Commander Nebula pins the insignia on your suit himself: Galactic Security Engineer, Universe Protection Unit. The training is complete — the next mission is a real one. Update the resume, Ranger, and go apply.",
    lose: "Zurg slips into the void, laughing. Sharpen your weakest domains and return — the fortress coordinates remain unlocked.",
    stages: [
      { tag: "CySA+", sit: "Zurg opens with noise: Star Command's SIEM erupts — 4,000 alerts in ten minutes. Buried somewhere in the storm is his real entry point.",
        e: "Alert storm: 3,900x 'port scan detected' (source: known vuln scanner)\n12x 'encoded PowerShell from WINWORD.EXE' on FLEET-HR-07\n88x 'failed VPN logins' spread across 80 accounts, 1 source IP",
        options: [
          { t: "Suppress the known-scanner noise, then triage the Office-spawned PowerShell as priority one and the spray second", d: 0, r: 2, ev: 0, ql: "best", w: "Filter the known-benign, then rank by severity: macro-to-PowerShell is an active foothold; the spray is an attempt in progress. Triage discipline beats alert-by-alert panic." },
          { t: "Work the alerts oldest-first so nothing is missed", d: 20, r: -5, ev: 0, ql: "bad", w: "FIFO triage during an alert flood is exactly what Zurg wants — the foothold burrows deeper while you clear scanner noise." },
          { t: "Disable the noisy scan-detection rule entirely and focus on VPN logs", d: 12, r: -2, ev: -5, ql: "ok", w: "You found the spray, but killing a detection rule mid-attack creates a blind spot, and you deprioritized the actual foothold." },
        ]},
      { tag: "SC-300", sit: "The PowerShell host stole a session token. Zurg's agents are now signing in as Ranger d.okafor from three continents — MFA shows 'previously satisfied.'",
        e: "SigninLogs: d.okafor · Dallas 09:02 ✓ · Trade World proxy 09:31 ✓ (token reuse)\nCA policy: MFA required — satisfied by existing session",
        options: [
          { t: "Revoke all sessions/refresh tokens, reset credentials, and add risk-based Conditional Access requiring reauthentication at high sign-in risk", d: 0, r: 3, ev: 0, ql: "best", w: "Token theft beats static MFA; revocation kills the stolen session and risk-based reauth closes the class of attack, not just this instance." },
          { t: "Force a password reset only — the password must be compromised", d: 15, r: -4, ev: 0, ql: "bad", w: "The attacker holds a valid token, not the password. Resets alone leave the stolen session alive and signed in." },
          { t: "Disable the d.okafor account until further notice", d: 5, r: -8, ev: 0, ql: "ok", w: "It stops the attacker but benches a Ranger mid-battle; revoke + reauth achieves eviction with minutes of disruption." },
        ]},
      { tag: "SC-200", sit: "Zurg pivots to your SOC platform itself: a Sentinel automation rule you don't recognize is auto-closing every incident tagged 'Fleet-Core.'",
        e: "AzureActivity: automation rule 'FleetCore-Triage' created 02:14 UTC\nCreator: svc-sentinel-deploy · Action: close incidents where title contains 'Fleet-Core'\nsvc-sentinel-deploy last legitimate use: 9 months ago",
        options: [
          { t: "Disable the rogue rule, reopen auto-closed incidents, revoke the service principal's credentials, and hunt its other activity in AzureActivity/AuditLogs", d: 0, r: 2, ev: 3, ql: "best", w: "Attackers who compromise the SOC blind it first. Kill the rule, restore visibility, revoke the identity, and scope everything else it touched." },
          { t: "Delete the service principal immediately and move on", d: 10, r: 0, ev: -15, ql: "ok", w: "Deletion stops it but destroys the audit trail attached to the object and skips reopening the incidents it buried." },
          { t: "Leave the rule running and watch what it closes to learn Zurg's targets", d: 25, r: -6, ev: 2, ql: "bad", w: "You'd be letting the attacker keep suppressing your own detections during an active assault on Fleet-Core." },
        ]},
      { tag: "AZ-500", sit: "The buried incidents reveal the target: Fleet-Core's Azure storage. A misconfigured account is exposed, and Zurg's exfil ship is inbound.",
        e: "storacct fleetcoredata: public network access ENABLED\nallowBlobPublicAccess: true · no private endpoint\nDefender for Storage alert: anonymous enumeration from 185.220.x.x",
        options: [
          { t: "Disable public access and anonymous blob access, front it with a private endpoint, then review Defender for Storage logs to scope what was read", d: 0, r: 3, ev: 2, ql: "best", w: "Close the exposure at the network and data plane, then measure the blast radius from the telemetry — containment plus scoping." },
          { t: "Rotate the storage account keys and call it contained", d: 15, r: -3, ev: 0, ql: "bad", w: "Anonymous public access doesn't use account keys. Rotation here treats the wrong exposure entirely." },
          { t: "Delete the storage account to guarantee nothing more leaks", d: 12, r: -8, ev: -20, ql: "bad", w: "Fleet-Core goes down with it, and you just destroyed the evidence of what Zurg accessed." },
        ]},
      { tag: "SC-100", sit: "Commander Nebula demands an answer for the fleet: 'How do we make sure Zurg can never do this again?' You have one architecture recommendation to make.",
        e: "Findings: token theft beat static MFA · stale service principal held Owner\n· storage publicly exposed · SOC had no detection for automation-rule changes",
        options: [
          { t: "A Zero Trust roadmap: phishing-resistant MFA + risk-based CA, least-privilege/PIM for workload identities, deny-by-default network posture via policy, and detections for control-plane changes", d: 0, r: 5, ev: 0, ql: "best", w: "Architect-level thinking maps each failure to a principle — verify explicitly, least privilege, assume breach — and sequences durable controls rather than buying a point product." },
          { t: "Recommend purchasing a next-gen firewall for the fleet perimeter", d: 10, r: -5, ev: 0, ql: "bad", w: "Nothing in this attack crossed a traditional perimeter gap. Identity, misconfiguration, and control-plane blindness were the failures." },
          { t: "Mandate 14-day password rotation fleet-wide", d: 8, r: -4, ev: 0, ql: "bad", w: "Not one stage of this attack used a cracked password. Rotation adds friction and addresses none of the findings." },
        ]},
      { tag: "SecAI+", sit: "Zurg's last gambit: his agents poisoned the training data of Star Command's ML defense grid so it classifies his dreadnought signatures as 'friendly convoy.' The retrain deploys in minutes.",
        e: "Pipeline: auto-labeled telemetry → nightly retrain → auto-deploy\nHoldout evaluation gate: NONE · Data provenance tracking: NONE\nDrift report: 'friendly convoy' class grew 340% this week",
        options: [
          { t: "Halt the deploy, roll back to the last known-good model, then gate all future deploys behind a curated holdout set of known-hostile signatures and provenance-checked training data", d: 0, r: 4, ev: 2, ql: "best", w: "Stop the poisoned model from shipping, restore a trusted baseline, and fix the pipeline: validation gates and provenance are the anti-poisoning controls SecAI+ expects." },
          { t: "Let it deploy but have Rangers manually verify every convoy", d: 18, r: -5, ev: 0, ql: "bad", w: "Deploying a known-poisoned model and compensating with human vigilance at fleet scale is a plan that fails the first busy night." },
          { t: "Delete all training data and freeze the current model permanently", d: 8, r: -3, ev: -10, ql: "ok", w: "You avoid the poison but destroy the forensic dataset proving the attack, and a permanently frozen model decays against Zurg's evolving fleet." },
        ]},
    ],
  },

  certTrials: {
    sc300: {
      title: "Cert Trial: Rentwhistle Swack's Grand Con",
      brief: "Before Star Command certifies you as an Identity & Access Administrator, the con man of the cosmos runs one last grand scheme spanning every SC-300 domain — identities, authentication, workload apps, and governance, all at once.",
      win: "Swack's grand con collapses at every layer — identity, auth, workload, and governance all held the line. SC-300 certified at 100% — rank up, Ranger!",
      lose: "The con found a seam this time. Re-drill your weakest identity domain and run the gauntlet again.",
      stages: [
        { tag: "User Identities", sit: "Swack opens by social-engineering a fistful of Global Admin grants 'for efficiency' across the tenant.",
          e: "Request: 8 standing Global Administrators for routine tasks\nActual needs: password resets, group management, license assignment",
          options: [
            { t: "Deny; assign least-privileged scoped roles (Helpdesk, Groups, User Admin) and use AUs/PIM where fitting", d: 0, r: 4, ev: 0, ql: "best", w: "Least privilege plus scoping and JIT is the identity-hygiene answer; standing Global Admins are what Swack wants to hijack." },
            { t: "Grant all eight Global Administrator", d: 20, r: -6, ev: 0, ql: "bad", w: "Eight standing Global Admins is the crown-jewel foothold the whole con is built around." },
            { t: "Grant Security Administrator to all eight", d: 10, r: -3, ev: 0, ql: "ok", w: "Still over-privileged and mismatched to the tasks; scoped roles fit each need." },
          ]},
        { tag: "Authentication", sit: "Swack's phishing kit is harvesting push-approval MFA from tired users across the fleet.",
          e: "Signals: MFA-fatigue prompts at 2 a.m., some approvals\nCurrent: push-notification MFA, no number matching, no phishing-resistant methods",
          options: [
            { t: "Roll out phishing-resistant MFA (FIDO2/passkeys) for privileged users and enable number matching; add risk-based Conditional Access", d: 0, r: 4, ev: 0, ql: "best", w: "Phishing-resistant methods defeat AiTM and fatigue; number matching and risk-based CA close the gap Swack is exploiting." },
            { t: "Send more push prompts to be sure it's really the user", d: 16, r: -5, ev: 0, ql: "bad", w: "More phishable prompts feeds the fatigue attack — exactly Swack's plan." },
            { t: "Disable MFA to stop the annoying prompts", d: 22, r: -6, ev: 0, ql: "bad", w: "Removing MFA hands Swack the front door." },
          ]},
        { tag: "Workload Identities", sit: "A rogue enterprise app Swack registered is requesting sweeping admin-consented Graph permissions.",
          e: "App requests: Directory.ReadWrite.All, Mail.ReadWrite (all mailboxes), application permissions\nJustification: vague 'productivity integration'",
          options: [
            { t: "Deny/limit consent, enforce admin-consent workflow and least-privilege scopes, and review the app's publisher and need", d: 0, r: 3, ev: 2, ql: "best", w: "Over-permissioned app consent is a top workload-identity risk; admin-consent workflow and least privilege stop the grab." },
            { t: "Grant admin consent to all requested permissions", d: 18, r: -5, ev: 0, ql: "bad", w: "Tenant-wide ReadWrite.All to a shady app is a full compromise handed to Swack." },
            { t: "Grant it but only for one user first", d: 8, r: -2, ev: 0, ql: "ok", w: "Application permissions aren't per-user, and the scopes are still wildly excessive — deny and scope down." },
          ]},
        { tag: "Identity Governance", sit: "Swack has quietly amassed standing access to sensitive roles that nobody reviews.",
          e: "Findings: permanent role assignments, no access reviews, no PIM, entitlements never recertified",
          options: [
            { t: "Move privileged roles to PIM (eligible, time-bound, approval), and set recurring access reviews on sensitive groups/roles", d: 0, r: 4, ev: 0, ql: "best", w: "JIT via PIM plus access reviews strips standing privilege and recertifies access — closing the ungoverned gap Swack lives in." },
            { t: "Leave the standing assignments; reviews are busywork", d: 16, r: -5, ev: 0, ql: "bad", w: "Ungoverned standing access is precisely what lets Swack persist unnoticed." },
            { t: "Delete every privileged role assignment outright", d: 10, r: -4, ev: 0, ql: "ok", w: "Blanket deletion breaks legitimate admins; PIM plus reviews is the governed fix." },
          ]},
        { tag: "Full-spectrum", sit: "Cornered, Swack makes his escape bid: he asks you to grant a 'temporary' emergency guest account broad rights and skip logging 'just this once.'",
          e: "Ask: guest account, broad access, no audit logging, no expiry\nEverything you've certified says otherwise",
          options: [
            { t: "Refuse: least-privilege scoped access, time-bound via governance, full sign-in/audit logging retained", d: 0, r: 4, ev: 1, ql: "best", w: "Every SC-300 principle at once — least privilege, governance, and auditability — leaves Swack no seam to slip through." },
            { t: "Grant the broad, unlogged, permanent access 'just this once'", d: 20, r: -6, ev: -10, ql: "bad", w: "Broad, unlogged, permanent access is the escape hatch the entire con was engineering toward." },
            { t: "Grant it but promise to review it someday", d: 12, r: -4, ev: 0, ql: "ok", w: "Unbounded access with a vague future review is how ungoverned privilege persists — scope and time-bound it now." },
          ]},
      ],
    },
    cysa: {
      title: "Cert Trial: Warp Darkmatter's Gauntlet",
      brief: "Before Star Command certifies you as a full Cybersecurity Analyst, Zurg's top agent runs you through a live-fire gauntlet spanning every CySA+ domain — one continuous intrusion, start to finish.",
      win: "Warp Darkmatter's gauntlet is cleared. CySA+ certified at 100% — rank up, Ranger!",
      lose: "The gauntlet got you this time. Review, re-drill your weakest domain, and run it back.",
      stages: [
        { tag: "Security Operations", sit: "It begins quietly: one workstation on the finance deck starts talking to a domain registered 41 hours ago.",
          e: "proxy: WKS-FIN-0113 → cdn-sync[.]io  every 300s · 412-415B\nDNS: domain age 41h · EDR: parent chain explorer.exe→wscript.exe→powershell.exe",
          options: [
            { t: "Treat it as probable C2: pull the EDR process tree, scope the domain across all hosts, and map to ATT&CK T1071 before acting", d: 0, r: 2, ev: 2, ql: "best", w: "Periodic uniform beacons + young domain + scripted parent chain = C2. Confirm and scope before containment so you don't tip your hand blind." },
            { t: "Block the domain at the proxy and close the alert as remediated", d: 12, r: -2, ev: 0, ql: "ok", w: "The implant remains and will rotate infrastructure. Blocking without host triage trades visibility for false comfort." },
            { t: "Reimage the workstation immediately", d: 8, r: -3, ev: -20, ql: "bad", w: "You destroyed the forensic evidence and never learned the entry vector or scope." },
          ]},
        { tag: "Vulnerability Management", sit: "Host triage shows entry via an unpatched web appliance. The monthly scan had flagged it — among 1,700 other findings.",
          e: "Finding history: appliance CVE — CVSS 8.1, CISA KEV listed, internet-facing\nDeprioritized behind: CVSS 9.8 internal print server, CVSS 9.4 isolated dev box",
          options: [
            { t: "Recommend risk-based prioritization: KEV + exposure + asset criticality outrank raw CVSS in the remediation queue", d: 0, r: 3, ev: 0, ql: "best", w: "This is the CySA+ prioritization thesis: an exploited-in-the-wild perimeter 8.1 beats an internal, unexploitable 9.8 every time." },
            { t: "Recommend patching strictly by CVSS score going forward", d: 10, r: -3, ev: 0, ql: "bad", w: "That policy is exactly why this appliance got skipped. Score-only ranking recreates the same breach." },
            { t: "Recommend doubling scan frequency", d: 6, r: -1, ev: 0, ql: "ok", w: "More findings faster doesn't fix a broken prioritization model — the appliance was already flagged." },
          ]},
        { tag: "Incident Response", sit: "Scoping complete: three servers touched, encryption staged but not yet executed. Darkmatter's ransomware timer is live.",
          e: "Staged: encryptor binary on 3 hosts, scheduled task T-minus ~20 min\nBackups: offline copies verified 24h old · Legal: notified, requests preservation",
          options: [
            { t: "Contain now (isolate the 3 hosts, kill the scheduled tasks), preserve volatile evidence in parallel, then eradicate and restore from verified backups", d: 0, r: 3, ev: 3, ql: "best", w: "Containment before eradication, preservation alongside — the lifecycle order under a live timer, executed in parallel where possible." },
            { t: "Pull power on all three servers instantly", d: 5, r: -2, ev: -12, ql: "ok", w: "It stops the timer but destroys volatile memory evidence; network isolation + task kill achieves the same containment cleaner." },
            { t: "Negotiate with Darkmatter for more time", d: 22, r: -8, ev: 0, ql: "bad", w: "Engaging the attacker mid-intrusion wastes your containment window and signals desperation." },
          ]},
        { tag: "Reporting & Communication", sit: "Crisis averted. The Alliance board convenes in an hour and wants to know exactly what happened.",
          e: "Facts: no encryption executed · entry vector patched · 3 servers compromised\n· forensics: 'no evidence of data exfiltration identified'",
          options: [
            { t: "Executive summary in business terms: impact avoided, response cost, residual risk — with 'no evidence of exfiltration identified,' not 'no data left'", d: 0, r: 5, ev: 0, ql: "best", w: "Audience-appropriate, metrics-anchored, and precise: reporting exactly what evidence supports is a tested CySA+ skill and a legal shield." },
            { t: "Present the full ATT&CK-mapped technical timeline with IoCs", d: 4, r: -4, ev: 0, ql: "ok", w: "Right content, wrong audience — the board needs business impact; the ATT&CK map belongs in the technical appendix." },
            { t: "Assure the board definitively that no data left the network", d: 8, r: -6, ev: 0, ql: "bad", w: "You can't prove a negative. Overclaiming beyond the forensic finding creates liability when discovery says otherwise." },
          ]},
        { tag: "Full-spectrum", sit: "Darkmatter's parting shot: 'Your after-action report, Ranger. What actually prevents round two?'",
          e: "Root cause candidates:\nA) The appliance was unpatched\nB) Risk-based vulnerability prioritization did not exist as a process\nC) An analyst missed an alert",
          options: [
            { t: "B — the process gap is the root cause; A is a symptom and C is a contributing factor. Recommendations target the process", d: 0, r: 4, ev: 0, ql: "best", w: "Root cause analysis digs past the technical symptom and past individual blame to the systemic gap — fix B and A stops recurring." },
            { t: "A — patch the appliance and close the report", d: 8, r: -3, ev: 0, ql: "bad", w: "That fixes one device. The prioritization process that skipped it will skip the next one." },
            { t: "C — retrain the analyst who missed it", d: 10, r: -5, ev: 0, ql: "bad", w: "Blaming individuals for systemic gaps is the classic after-action anti-pattern — and it poisons future incident reporting honesty." },
          ]},
      ],
    },
  },
};
