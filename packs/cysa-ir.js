/* CONTENT PACK: CySA+ | Incident Response & Management (cysa-ir) -- 40 MCQ + 10 PBQ + 5 briefings + boss */
window.PACKS = window.PACKS || {};
window.PACKS["cysa-ir"] = {
lessons: {
"cysa-ir-1": { intro: "Torque multiplies faster than you can shoot. The only Ranger who survives him is the one who prepared before he ever showed up.",
sections: [
{ h: "Why preparation is the phase that wins", b: "Incident response is a lifecycle, and the phase that decides outcomes is the one that happens before any incident: Preparation. That means an incident response plan, defined roles and an incident response team (with a clear incident commander), communication plans, tooling and access ready to go, and playbooks for common incident types. You cannot assemble a fire brigade while the building burns." },
{ h: "The lifecycle models", b: "Classic NIST SP 800-61 Rev. 2 defines four phases: Preparation; Detection & Analysis; Containment, Eradication & Recovery; and Post-Incident Activity. CySA+ V4 expands this into a practical chain: detect -> analyze -> contain -> eradicate -> recover -> post-incident. The newest revision, 800-61r3, reframes IR around the NIST CSF 2.0 functions (Govern, Identify, Protect, Detect, Respond, Recover) -- know that the lifecycle is now integrated with risk management, not a separate silo.", data: "NIST 800-61r2 phases:\n1. Preparation\n2. Detection & Analysis\n3. Containment, Eradication & Recovery\n4. Post-Incident Activity\n(r3 aligns these to CSF 2.0: Govern|Identify|Protect|Detect|Respond|Recover)" },
{ h: "Playbooks, runbooks, and IR plans", b: "An IR plan is the strategic document (authority, scope, definitions, escalation). Playbooks are incident-type procedures (ransomware, phishing, data breach); runbooks are the step-by-step technical actions inside them. Good playbooks pre-decide who declares an incident, who is notified, and what the containment options are -- so responders execute instead of improvise." },
{ h: "Readiness: exercises, training, and BC/DR alignment", b: "Preparation is validated by practice: tabletop exercises (discussion-based walkthroughs), simulations, and red/blue/purple team drills expose gaps before a real incident does. IR must align with Business Continuity and Disaster Recovery planning -- recovery objectives (RTO/RPO), backups, and continuity plans are what make the Recovery phase possible. Retainers with external IR firms are arranged in advance, not mid-crisis." },
],
traps: [
"Preparation is a distinct lifecycle phase, not just 'having tools' -- plans, roles, comms, and playbooks all live here.",
"An IR plan (strategy) differs from a playbook (incident-type procedure) and a runbook (technical steps); the exam distinguishes them.",
"Tabletop exercises are discussion-based; they don't touch production -- don't confuse them with live simulations.",
"800-61r3 integrates IR with CSF 2.0 (adds Govern); it doesn't discard the phases you know." ],
keys: [
"Preparation is the phase that decides outcomes -- do it before the incident.",
"Know the NIST lifecycle; V4 chains detect->analyze->contain->eradicate->recover->post-incident.",
"IR plan = strategy | playbook = incident procedure | runbook = technical steps.",
"Validate readiness with tabletops; align IR with BC/DR (RTO/RPO, backups)." ] },

"cysa-ir-2": { intro: "Torque splits into copies to confuse you. Detection tells you he's here; analysis tells you how many, where, and how bad -- before you waste a shot.",
sections: [
{ h: "Detection vs analysis (V4 separates them)", b: "Detection is recognizing that something may be an incident (an alert fires, a user reports phishing, telemetry looks wrong). Analysis is confirming it's real, understanding what happened, and determining scope and impact. CS0-004 deliberately splits these: many 'incidents' are false alarms, so validation before escalation prevents wasted response and alert fatigue." },
{ h: "Triage, severity, and prioritization", b: "Not every incident gets the same response. Triage assigns severity based on impact (data sensitivity, systems affected, business criticality) and urgency (is it spreading, is data leaving now). A high-severity alert on a test box may be lower priority than a medium alert on a payment system. Functional impact, information impact, and recoverability drive the ranking.", data: "Severity inputs:\n- functional impact (what's degraded/down)\n- information impact (data sensitivity/exposure)\n- recoverability (effort/time to restore)\n-> combine into a priority, not just alert severity" },
{ h: "Scoping and impact determination", b: "Scoping answers: which systems, accounts, and data are involved, and how far has the attacker reached? You pivot on strong indicators (an IP, hash, account, or C2 domain) across log sources to find every affected host. Getting scope right is what makes containment effective -- contain too narrowly and the attacker persists; understand the full blast radius first." },
{ h: "Timeline building and pivoting", b: "Analysis produces a timeline: what happened, in what order, correlated across sources with synchronized timestamps. You pivot from one artifact to related ones (this account touched these hosts, which contacted this domain, which dropped this file). The timeline drives every later decision -- containment order, eradication completeness, and the eventual report. Distinguish event vs alert vs incident vs IoC precisely." },
],
traps: [
"Detection != analysis: recognizing a possible incident is not the same as confirming and scoping it -- validate before you escalate or respond.",
"A high alert severity doesn't equal high business priority; impact and asset criticality reorder the queue.",
"Impossible travel and similar signals are indicators, not proof -- corroborate before declaring compromise.",
"Containing before scoping leaves attacker footholds; understand the full blast radius first." ],
keys: [
"Detect = notice; analyze = confirm, scope, and assess impact.",
"Triage by functional impact, information impact, and recoverability.",
"Scope by pivoting strong indicators across all log sources.",
"Build a correlated timeline; know event vs alert vs incident vs IoC." ] },

"cysa-ir-3": { intro: "Now you strike. Contain Torque before he copies again, wipe every clone, and rebuild clean -- in that order, or he comes right back.",
sections: [
{ h: "Containment strategies and tradeoffs", b: "Containment stops the bleeding: isolate hosts (network quarantine), segment affected zones, disable compromised accounts, block C2 domains/IPs at egress. The core tradeoff is speed vs evidence and business impact: pulling a plug is fast but destroys volatile evidence and may tip the attacker; isolating at the network preserves memory and lets you watch. Choose based on the threat's aggressiveness and your forensic needs.", data: "Containment options:\n- network isolation (preserves memory, stops spread)\n- account disable / session + token revocation\n- egress block on C2\n- segmentation of affected VLANs\n(vs. power-off: fast but loses volatile evidence)" },
{ h: "Order of operations", b: "The sequence matters: contain before you eradicate, and eradicate before you recover. Eradicating (removing malware, closing the vector) before full containment lets the attacker re-infect from a foothold you haven't cut off. Recovering (restoring service) before eradication puts a clean system right back into a compromised environment. Preserve needed evidence before destructive steps." },
{ h: "Eradication and closing the vector", b: "Eradication removes the threat completely: delete malware and attacker tooling, remove persistence (scheduled tasks, run keys, rogue accounts, backdoors), and -- critically -- close the entry vector (patch the exploited flaw, reset compromised credentials, fix the misconfiguration). Eradication that leaves the original hole open guarantees a repeat incident. When in doubt on a deeply compromised host, rebuild from known-good rather than clean in place." },
{ h: "Recovery and validation", b: "Recovery restores systems to normal: rebuild or restore from clean backups, validate integrity, patch, and monitor closely for signs the attacker returns. Restore from backups taken before compromise, and verify the restore point is clean. Heightened monitoring after recovery catches re-entry attempts. Recovery isn't 'it's back up' -- it's 'it's back up, clean, and watched.'" },
],
traps: [
"Order is contain -> eradicate -> recover; eradicating or recovering before containment lets the attacker re-infect.",
"Pulling power is fast containment but destroys volatile (memory) evidence -- network isolation is usually better when forensics matter.",
"Eradication must close the entry vector (patch/credential reset); removing the malware alone invites reinfection.",
"Restore from a backup taken BEFORE the compromise, and validate it's clean -- a post-compromise backup reintroduces the threat." ],
keys: [
"Contain first (isolate/segment/disable), then eradicate, then recover.",
"Network isolation preserves evidence; power-off destroys volatile data.",
"Eradication = remove threat + persistence + close the entry vector.",
"Recover from pre-compromise clean backups; validate and monitor closely." ] },

"cysa-ir-4": { intro: "Every clone of Torque you defeat is evidence -- if you handle it right. Mishandle it and the case against him, and the truth of what happened, evaporates.",
sections: [
{ h: "Order of volatility", b: "When collecting evidence from a live system, capture the most fleeting data first: CPU registers/cache, then RAM (running processes, network connections, injected code, encryption keys), then disk, then remote logs and archival media. Power-off or reboot destroys everything volatile. If a payload is fileless, memory is the ONLY place it exists -- so a hasty shutdown erases the case.", data: "Order of volatility (most -> least):\n1. registers, cache\n2. RAM / running state / network connections\n3. disk (files, slack, swap)\n4. remote logs, monitoring data\n5. archival / backups" },
{ h: "Chain of custody", b: "Chain of custody is the documented, unbroken record of who collected, handled, transferred, and stored each piece of evidence, and when. It's what makes evidence admissible and defensible. Every handoff is logged; gaps or unlogged access can invalidate the evidence entirely. Label, timestamp, and secure each item; restrict access to named custodians." },
{ h: "Forensic imaging and integrity", b: "Work from copies, never originals. Create a forensic (bit-for-bit) image, use a write blocker to prevent altering the source, and hash both the original and the image (e.g., SHA-256) to prove the copy is identical and unaltered. All analysis happens on the working copy; the original is sealed under custody. A changed hash means the evidence was modified -- and is no longer trustworthy.", data: "Image the disk -> hash original + image (must match)\nAnalyze the COPY only | write-blocker on the source\nHash later to prove nothing changed" },
{ h: "Legal hold and preservation", b: "When litigation or investigation is anticipated, a legal hold requires preserving all relevant data -- suspend routine deletion/rotation that would destroy it. Preservation comes before destructive response steps: if you might need the evidence, image and secure it before you wipe or rebuild. Coordinate with legal on what must be retained and for how long." },
],
traps: [
"Order of volatility puts memory before disk -- any answer that images the disk first (or powers off first) on a live, memory-resident threat is wrong.",
"Analysis is always on a copy; touching the original breaks integrity and admissibility.",
"A broken/unlogged chain of custody can invalidate otherwise good evidence -- every handoff is documented.",
"Preserve (image + hash) BEFORE eradication/rebuild when evidence may be needed; wiping first is unrecoverable." ],
keys: [
"Collect by order of volatility: memory before disk, before archives.",
"Chain of custody = unbroken, documented handling record.",
"Image with a write blocker; hash original and copy to prove integrity.",
"Legal hold suspends deletion; preserve before destructive steps." ] },

"cysa-ir-5": { intro: "Torque is scrap -- but if you don't learn how he got in, his replacement uses the same trick tomorrow. The debrief is where one incident becomes permanent defense.",
sections: [
{ h: "The lessons-learned review", b: "After recovery, the team holds a post-incident (lessons-learned) review -- ideally within a couple weeks while memory is fresh. It answers: what happened, what did we do, what worked, what didn't, and what do we change. It's blameless by design: the goal is systemic improvement, not finding someone to punish. Blame culture kills the honest reporting future response depends on." },
{ h: "Root cause analysis", b: "RCA digs past the symptom to the underlying cause. Techniques like the 5 Whys separate the trigger (a user clicked a link) from contributing factors (no attachment sandboxing) and the true root cause (a missing control or process gap). Fixing the root cause is what prevents recurrence; fixing only the symptom guarantees a repeat.", data: "5 Whys example:\nphish succeeded -> macro ran -> macros allowed -> no policy ->\nroot cause: no email attachment detonation / macro-block standard" },
{ h: "Turning incidents into improvements", b: "The review's output is action: update detections and playbooks, close the exploited gap, add the new IoCs and TTPs to monitoring, and feed changes back into Preparation (closing the lifecycle loop). Metrics from the incident -- MTTD, MTTR, dwell time -- quantify performance and track whether changes help over time." },
{ h: "The after-action report and metrics", b: "The after-action report documents the incident end-to-end: timeline, impact, response actions, root cause, and recommendations with owners. Effectiveness metrics (detection time, containment time, recovery time, recurrence) turn a story into measurable improvement. Distinguish root cause from contributing factors clearly, and make recommendations specific and assignable -- 'improve security' is not an action item." },
],
traps: [
"Lessons-learned is blameless -- recommending you discipline the user who clicked is the classic wrong answer; fix the systemic control.",
"Root cause != trigger: 'the user clicked' is the trigger; the missing control/process is the root cause.",
"Lessons feed back into Preparation -- the lifecycle is a loop, not a dead end at recovery.",
"After-action recommendations must be specific and assignable; vague 'be more careful' items aren't outcomes." ],
keys: [
"Hold a blameless lessons-learned review while memory is fresh.",
"RCA (e.g., 5 Whys) separates trigger, contributing factors, and root cause.",
"Feed improvements back into detections, playbooks, and Preparation.",
"Measure MTTD/MTTR/dwell; write specific, owned recommendations." ] },
},
mcq: {
"cysa-ir-1": [
{ s: "A new SOC has tools but no documented process. Leadership asks what to build first.", e: "Current state: EDR, SIEM deployed; no IR plan, no roles defined", q: "What most improves incident readiness?", options: [
 { t: "An incident response plan with defined roles, comms plan, and playbooks for common incident types", c: true, w: "Preparation is the phase that decides outcomes; plans, roles, and playbooks let responders execute instead of improvise." },
 { t: "Buying a second SIEM for redundancy", c: false, w: "Tooling isn't the gap; the missing process and roles are." },
 { t: "Waiting until the first real incident to see what's needed", c: false, w: "Assembling a response capability mid-crisis is exactly what preparation prevents." },
 { t: "Increasing log retention to seven years", c: false, w: "Helpful for forensics, but it doesn't create a response capability." } ] },
{ s: "A team debates the difference between their IR documents.", e: "They have: a strategic authority/scope document, ransomware-specific procedures, and step-by-step technical actions", q: "Match the correct terms:", options: [
 { t: "IR plan = strategy/authority; playbook = incident-type procedure; runbook = technical steps", c: true, w: "These three are distinct layers, and CS0-004 expects you to tell them apart." },
 { t: "They are three names for the same document", c: false, w: "Plan, playbook, and runbook operate at different levels of detail." },
 { t: "The playbook is the strategic document", c: false, w: "The plan is strategic; the playbook is the incident-type procedure." },
 { t: "Runbooks define legal authority for response", c: false, w: "Authority lives in the IR plan; runbooks are technical steps." } ] },
{ s: "Before any incident, the CISO wants to validate the IR plan without touching production.", e: "Goal: expose gaps in roles, comms, and decisions", q: "Best readiness activity:", options: [
 { t: "A tabletop exercise -- a discussion-based walkthrough of a scenario", c: true, w: "Tabletops surface process and role gaps through discussion, with no production impact." },
 { t: "A live ransomware detonation on the production network", c: false, w: "Never validate a plan by causing a real incident on production." },
 { t: "Reading the plan aloud in a meeting once", c: false, w: "A passive read-through doesn't stress-test decisions the way a scenario does." },
 { t: "Waiting for the next real incident to test it", c: false, w: "That's not a controlled validation; it's gambling with a live event." } ] },
{ s: "During planning, the team maps how recovery will actually happen.", e: "Requirement: restore critical services within defined time/data-loss limits", q: "Which alignment makes the Recovery phase possible?", options: [
 { t: "Alignment with BC/DR: tested backups plus RTO/RPO objectives", c: true, w: "Recovery depends on continuity/disaster-recovery planning -- backups and RTO/RPO define what 'recovered' means." },
 { t: "A larger marketing budget", c: false, w: "Unrelated to technical recovery capability." },
 { t: "Disabling all backups to save storage", c: false, w: "That destroys the very capability recovery relies on." },
 { t: "Assigning recovery to whoever is free that day", c: false, w: "Ad-hoc ownership with no backups or objectives isn't recovery planning." } ] },
{ s: "An organization wants outside expertise available the moment a major breach hits.", e: "Concern: specialized forensics not available in-house", q: "What should be arranged in advance?", options: [
 { t: "An IR retainer with an external forensics/response firm, set up during Preparation", c: true, w: "Retainers are arranged before an incident so help is immediate, not negotiated mid-crisis." },
 { t: "Nothing; find a vendor after the breach starts", c: false, w: "Sourcing and contracting help during an active breach wastes critical hours." },
 { t: "A press release template only", c: false, w: "Useful for comms, but it's not external technical capability." },
 { t: "A larger firewall", c: false, w: "Doesn't provide the specialized human expertise the concern names." } ] },
{ s: "A stakeholder claims the newest NIST guidance abandons the phases they learned.", e: "They cite NIST SP 800-61r3 and CSF 2.0", q: "Accurate clarification:", options: [
 { t: "r3 integrates IR with CSF 2.0 functions (adding Govern) rather than discarding the lifecycle you know", c: true, w: "800-61r3 reframes IR around Govern/Identify/Protect/Detect/Respond/Recover, aligning it with risk management." },
 { t: "r3 deletes incident response as a concept", c: false, w: "It reframes and integrates IR; it doesn't remove it." },
 { t: "r3 says preparation no longer matters", c: false, w: "Preparation/readiness is more integrated than ever, not dropped." },
 { t: "CSF 2.0 has nothing to do with incident response", c: false, w: "r3 explicitly maps IR onto CSF 2.0 functions." } ] },
{ s: "A playbook is being written for phishing incidents.", e: "Goal: responders shouldn't have to improvise key decisions", q: "What should a good playbook pre-decide?", options: [
 { t: "Who declares the incident, who is notified, and the available containment options", c: true, w: "Pre-deciding declaration authority, notifications, and containment lets responders execute quickly and consistently." },
 { t: "Only the final report's font and layout", c: false, w: "Formatting isn't the decision content that matters mid-incident." },
 { t: "Nothing -- every phishing case should be handled from scratch", c: false, w: "Improvising core decisions each time is exactly what playbooks eliminate." },
 { t: "The marketing team's quarterly goals", c: false, w: "Irrelevant to an IR playbook." } ] },
{ s: "The IR team defines who leads during an active incident.", e: "Concern: decision paralysis when multiple seniors disagree", q: "Which role addresses this?", options: [
 { t: "A designated incident commander with decision authority for the incident", c: true, w: "A single incident commander provides clear command and prevents decision paralysis." },
 { t: "No leader; decisions by unanimous vote mid-incident", c: false, w: "Consensus voting during a live incident causes exactly the paralysis to avoid." },
 { t: "The most senior executive available, regardless of IR knowledge", c: false, w: "Command should sit with the trained IR lead, not by title alone." },
 { t: "Rotating leadership every hour", c: false, w: "Constant handoffs fragment command during a crisis." } ] } ],

"cysa-ir-2": [
{ s: "An alert fires; a junior analyst wants to immediately isolate 200 hosts.", e: "Alert: 'suspicious PowerShell' on one host, not yet validated", q: "What should happen first?", options: [
 { t: "Analysis -- confirm the alert is a true incident and determine its scope before responding", c: true, w: "Detection isn't confirmation; validate and scope before large containment actions to avoid disruption on a false positive." },
 { t: "Isolate all 200 hosts immediately", c: false, w: "Mass isolation on an unvalidated single-host alert causes needless outage." },
 { t: "Close the alert as noise without looking", c: false, w: "The opposite error -- dismissing without analysis can miss a real incident." },
 { t: "Reboot the affected host to clear it", c: false, w: "That destroys volatile evidence before analysis even begins." } ] },
{ s: "Three incidents are open at once.", e: "A: malware on an isolated test VM\nB: active data exfiltration from a payment database\nC: single failed login on an admin account", q: "Correct priority order (highest first):", options: [
 { t: "B, then A, then C -- active exfil from a critical asset dominates", c: true, w: "Triage by impact and urgency: ongoing data loss from a payment system is the clear top priority." },
 { t: "A, then B, then C -- malware always comes first", c: false, w: "Isolated test-VM malware is low impact; it doesn't outrank active exfiltration." },
 { t: "C, then B, then A -- logins are most dangerous", c: false, w: "A single failed login is a weak signal, not the top incident." },
 { t: "All equal; handle in the order reported", c: false, w: "FIFO ignores impact and urgency -- the essence of triage." } ] },
{ s: "You must determine how far an intrusion reached.", e: "Confirmed foothold on one host; strong IoC = C2 domain evil-c2[.]net", q: "Best scoping approach:", options: [
 { t: "Pivot the C2 domain across proxy/DNS/flow logs to find every host that contacted it", c: true, w: "Pivoting a strong indicator across sources reveals the full set of affected hosts -- accurate scope." },
 { t: "Assume only the one host is affected and contain just it", c: false, w: "Containing without scoping leaves other infected hosts active." },
 { t: "Reimage the first host and declare the incident over", c: false, w: "Premature closure ignores potential lateral spread." },
 { t: "Wait to see if more alerts fire on their own", c: false, w: "Passive waiting cedes initiative and time to the attacker." } ] },
{ s: "The team is assigning incident severity.", e: "Factors available: systems degraded, data sensitivity exposed, effort to recover", q: "These three factors correspond to:", options: [
 { t: "Functional impact, information impact, and recoverability", c: true, w: "NIST-style severity combines functional impact, information impact, and recoverability into priority." },
 { t: "Only the raw alert severity from the tool", c: false, w: "Tool severity is one input; impact and recoverability shape true priority." },
 { t: "The attacker's skill level exclusively", c: false, w: "Attacker sophistication isn't the severity formula here." },
 { t: "The time of day the alert fired", c: false, w: "Timing isn't a core severity factor." } ] },
{ s: "An analyst equates a SIEM alert with a confirmed incident in a report.", e: "Terms used interchangeably: event, alert, incident, IoC", q: "Which distinction is correct?", options: [
 { t: "An event is any occurrence; an alert flags a notable one; an incident is a confirmed adverse event; an IoC is evidence of compromise", c: true, w: "Precise use of event/alert/incident/IoC is explicitly tested; they are not synonyms." },
 { t: "They all mean the same thing", c: false, w: "Conflating them causes miscommunication and wrong escalation." },
 { t: "An IoC is a type of incident report", c: false, w: "An IoC is an indicator/artifact, not a report." },
 { t: "Every event is automatically an incident", c: false, w: "Most events are benign; only confirmed adverse ones are incidents." } ] },
{ s: "During analysis, timestamps across two servers don't line up.", e: "SRV-A step logged after a SRV-B step that depends on it", q: "First thing to verify before trusting the timeline:", options: [
 { t: "Time synchronization (NTP) across the systems", c: true, w: "Clock drift is the common cause of impossible ordering; verify sync before drawing conclusions." },
 { t: "That the attacker altered physics", c: false, w: "Not a real explanation; check clocks first." },
 { t: "That the SIEM should simply be rebooted", c: false, w: "Rebooting the SIEM doesn't address source clock drift." },
 { t: "That the events must be unrelated", c: false, w: "They're causally linked steps; sequencing (time sync) is the issue." } ] },
{ s: "A user reports a phishing email; the SOC must decide if it's an incident.", e: "Report received; no confirmation yet that anyone clicked or credentials were entered", q: "This stage of the process is:", options: [
 { t: "Detection feeding into analysis -- validate the report and determine impact before declaring an incident", c: true, w: "A report is a detection input; analysis confirms whether it's a real incident and its scope." },
 { t: "Recovery", c: false, w: "Recovery is far later, after containment and eradication." },
 { t: "Post-incident activity", c: false, w: "That happens after the incident is resolved." },
 { t: "Eradication", c: false, w: "You don't eradicate before confirming there's an incident." } ] },
{ s: "Analysis links an account to multiple systems and a C2 domain.", e: "compromised acct -> 4 hosts -> 1 C2 domain -> 1 dropped payload", q: "What is this analytical product called and why does it matter?", options: [
 { t: "A timeline built by pivoting artifacts; it drives containment order, eradication completeness, and the report", c: true, w: "The correlated timeline underpins every later decision in the incident." },
 { t: "A vulnerability scan report", c: false, w: "This is incident reconstruction, not a scan." },
 { t: "A risk acceptance form", c: false, w: "Unrelated to timeline reconstruction." },
 { t: "A marketing funnel", c: false, w: "Not a security artifact." } ] } ],

"cysa-ir-3": [
{ s: "A workstation is actively beaconing to C2; forensics will be needed.", e: "Host is live; memory-resident payload suspected", q: "Best containment action?", options: [
 { t: "Isolate the host at the network (quarantine) to stop spread while preserving memory evidence", c: true, w: "Network isolation halts communication and lateral movement while keeping volatile evidence intact for forensics." },
 { t: "Immediately power the host off", c: false, w: "Power-off destroys the memory-resident evidence you need." },
 { t: "Leave it connected to watch the attacker indefinitely", c: false, w: "Prolonged live connection risks spread and data loss; contain it." },
 { t: "Reimage it right away", c: false, w: "Reimaging before analysis loses scope and evidence." } ] },
{ s: "A responder wants to remove malware and restore service before cutting off the attacker's access.", e: "Foothold still active via a stolen VPN credential", q: "What's wrong with that order?", options: [
 { t: "You must contain before eradicating/recovering, or the attacker re-infects from the uncut foothold", c: true, w: "Containment first; eradicating or recovering while access remains invites immediate reinfection." },
 { t: "Nothing; order doesn't matter in IR", c: false, w: "Order is central: contain -> eradicate -> recover." },
 { t: "Recovery should always come first", c: false, w: "Recovering into a compromised environment reintroduces the threat." },
 { t: "Eradication should skip closing the vector", c: false, w: "Closing the vector is exactly what prevents reinfection." } ] },
{ s: "Eradication is underway on a compromised server.", e: "Removed: malware binary. Not yet addressed: exploited unpatched CVE and attacker's rogue admin account", q: "Is eradication complete?", options: [
 { t: "No -- must also remove persistence (rogue account) and close the entry vector (patch the CVE)", c: true, w: "Eradication removes the threat AND its persistence AND the way in; deleting the binary alone invites a repeat." },
 { t: "Yes -- deleting the malware file finishes eradication", c: false, w: "The open vector and rogue account let the attacker return immediately." },
 { t: "Yes -- patching is a separate project for later", c: false, w: "The unpatched vector is the reinfection path; it's part of eradication." },
 { t: "No -- but only because the server should be renamed", c: false, w: "Renaming does nothing; persistence and the vector are the issues." } ] },
{ s: "Recovery restores a file server from backup.", e: "Compromise began June 3. Backups: June 1 (pre-compromise), June 5 (post-compromise)", q: "Which backup should be used?", options: [
 { t: "June 1 -- the last known-good backup taken before compromise, then validate it's clean", c: true, w: "Restore from a pre-compromise point and verify integrity; a post-compromise backup reintroduces the threat." },
 { t: "June 5 -- it's the most recent", c: false, w: "The newest backup contains the compromise; recency isn't the criterion." },
 { t: "Either; both are equally safe", c: false, w: "The June 5 backup is tainted; they aren't equivalent." },
 { t: "Neither; rebuild without any backup", c: false, w: "A validated pre-compromise backup is a legitimate, faster clean-restore path." } ] },
{ s: "After recovery, the team wants to catch the attacker if they return.", e: "Systems rebuilt and patched; incident 'closed'", q: "What should accompany recovery?", options: [
 { t: "Heightened monitoring on the affected assets and identities for signs of re-entry", c: true, w: "Post-recovery monitoring catches attackers who attempt to return, closing the recovery phase properly." },
 { t: "Immediately delete all incident logs to save space", c: false, w: "Destroying logs erases evidence and the ability to detect re-entry." },
 { t: "Turn off alerting on those systems to reduce noise", c: false, w: "Disabling alerts on just-compromised systems is the opposite of prudent." },
 { t: "Nothing; once it's rebuilt the incident is fully over", c: false, w: "Recovery includes validation and watchful monitoring, not just 'it's up.'" } ] },
{ s: "A deeply compromised host has unknown persistence mechanisms.", e: "Multiple backdoors suspected; cleaning in place is uncertain", q: "Most reliable recovery approach:", options: [
 { t: "Rebuild from known-good media/images rather than cleaning in place", c: true, w: "When persistence is uncertain, rebuilding from trusted sources guarantees a clean system." },
 { t: "Delete the files you can find and hope you got them all", c: false, w: "Missed persistence means the attacker stays; hoping isn't a method." },
 { t: "Leave it as-is and just monitor", c: false, w: "Leaving a compromised host in service is not recovery." },
 { t: "Restore from a backup made after the compromise", c: false, w: "That reintroduces the compromise." } ] },
{ s: "A fast-spreading worm is moving laterally across a subnet.", e: "Priority: stop spread across the segment quickly", q: "Most effective containment:", options: [
 { t: "Segment/isolate the affected VLAN and block the propagation path to halt lateral movement", c: true, w: "Segmentation contains fast lateral spread at the network level while you work affected hosts." },
 { t: "Patch every host one at a time before isolating anything", c: false, w: "Patching is slow; the worm spreads while you work -- contain the segment first." },
 { t: "Email users asking them to stop using the network", c: false, w: "Far too slow and unreliable against automated propagation." },
 { t: "Do nothing until the full forensic image of every host is done", c: false, w: "Imaging everything first lets the worm keep spreading; contain now." } ] },
{ s: "During containment, the responder must balance evidence and business impact.", e: "Threat is aggressive and destructive; forensic value is secondary to stopping damage", q: "How does this change the containment choice?", options: [
 { t: "Prioritize rapid, aggressive containment to stop damage, accepting some evidence loss when harm is imminent", c: true, w: "The evidence-vs-impact tradeoff shifts toward speed when a destructive threat is actively causing harm." },
 { t: "Always preserve every byte of evidence, even during active destruction", c: false, w: "Rigid evidence preservation while data is being destroyed causes greater harm." },
 { t: "Never contain until legal signs off in writing", c: false, w: "Coordinate with legal, but imminent destruction demands timely action." },
 { t: "Containment strategy never depends on the threat type", c: false, w: "It very much does -- aggressiveness and forensic needs shape the choice." } ] } ],

"cysa-ir-4": [
{ s: "A live host holds a fileless, memory-resident payload. You must collect evidence.", e: "Options: image RAM, image disk, pull power, copy logs", q: "What do you collect FIRST?", options: [
 { t: "Capture a memory image before anything else", c: true, w: "Order of volatility: RAM holds the only copy of a fileless payload; collect it before disk or power-off." },
 { t: "Image the disk first because it's largest", c: false, w: "Size doesn't set order; volatility does -- the memory payload vanishes on power-off." },
 { t: "Pull power to freeze the system", c: false, w: "Power-off destroys all volatile evidence, including the payload." },
 { t: "Copy remote logs first", c: false, w: "Persisted logs aren't volatile; capture RAM before it's lost." } ] },
{ s: "An analyst opens the original seized drive to 'take a quick look.'", e: "No forensic copy made yet; no write blocker used", q: "Why is this a problem?", options: [
 { t: "Analysis must be on a forensic copy; touching the original alters it and breaks integrity/admissibility", c: true, w: "Work from a bit-for-bit image with a write blocker; the original is sealed under custody." },
 { t: "It's fine as long as they're careful", c: false, w: "Any access without a write blocker can alter the source and taint evidence." },
 { t: "Originals are always meant to be analyzed directly", c: false, w: "The opposite -- originals are preserved; copies are analyzed." },
 { t: "Only a problem if the drive is encrypted", c: false, w: "Integrity is at risk regardless of encryption." } ] },
{ s: "Evidence changes hands from collector to analyst to storage.", e: "Requirement: keep it admissible and defensible", q: "What must be maintained across every handoff?", options: [
 { t: "Chain of custody -- a documented, unbroken record of who handled it and when", c: true, w: "Unbroken, logged custody is what preserves admissibility; gaps can invalidate evidence." },
 { t: "Only the collector's name, once", c: false, w: "Every transfer must be logged, not just the first handler." },
 { t: "Nothing; handoffs don't need documentation", c: false, w: "Undocumented handling is exactly what defeats admissibility." },
 { t: "A photo of the device is sufficient", c: false, w: "A photo isn't a custody record of handling and transfers." } ] },
{ s: "You need to prove a forensic image is identical to the source and unaltered.", e: "Tools available: hashing, write blocker, imaging software", q: "Correct method:", options: [
 { t: "Hash the original and the image (e.g., SHA-256); matching hashes prove an identical, unaltered copy", c: true, w: "Cryptographic hashing before/after demonstrates integrity; a changed hash means modification." },
 { t: "Compare file counts by eye", c: false, w: "Manual counting doesn't prove bit-level integrity." },
 { t: "Trust the imaging tool without verification", c: false, w: "Verification via hashing is the standard proof step." },
 { t: "Rename the image to match the original", c: false, w: "Filenames prove nothing about content integrity." } ] },
{ s: "Litigation is anticipated over a breach.", e: "Routine log rotation would soon delete relevant data", q: "What must be enacted?", options: [
 { t: "A legal hold -- suspend routine deletion and preserve all relevant data", c: true, w: "Legal hold stops normal destruction so evidence is retained for the investigation/litigation." },
 { t: "Speed up log rotation to clear space", c: false, w: "That destroys the evidence a hold is meant to preserve." },
 { t: "Delete everything to avoid liability", c: false, w: "Destroying evidence under anticipated litigation is spoliation -- a serious offense." },
 { t: "Nothing; logs aren't evidence", c: false, w: "Logs are frequently key evidence and must be preserved under hold." } ] },
{ s: "Responders are about to wipe and rebuild a compromised server that may be evidence.", e: "Possible legal case; no image captured yet", q: "Correct sequence:", options: [
 { t: "Preserve first -- forensically image and hash the host before any destructive rebuild", c: true, w: "When evidence may be needed, imaging precedes eradication/rebuild; wiping first is unrecoverable." },
 { t: "Rebuild now; image only if someone asks later", c: false, w: "Once wiped, the evidence is gone -- you can't image it after the fact." },
 { t: "Skip imaging since the malware is already known", c: false, w: "The host holds scope, timeline, and legal evidence beyond the malware itself." },
 { t: "Delete logs first to speed the rebuild", c: false, w: "Destroying logs before preservation defeats the investigation." } ] },
{ s: "A responder lists collection order for a running system.", e: "Sources: archival backups, disk, RAM, CPU cache, remote syslog", q: "Correct order of volatility (most to least volatile):", options: [
 { t: "CPU cache -> RAM -> disk -> remote syslog -> archival backups", c: true, w: "Collect most-volatile first: registers/cache, then memory, then disk, then remote logs, then archives." },
 { t: "Archival backups -> disk -> RAM -> cache", c: false, w: "That's reversed -- least volatile first loses the fleeting data." },
 { t: "Disk -> RAM -> cache -> backups", c: false, w: "Disk before RAM/cache risks losing volatile memory evidence." },
 { t: "Remote syslog -> cache -> RAM -> disk", c: false, w: "Remote logs are among the least volatile; they aren't collected first." } ] },
{ s: "An analyst documents each evidence item.", e: "Goal: withstand courtroom scrutiny", q: "Which set of practices is correct?", options: [
 { t: "Label and timestamp each item, restrict access to named custodians, log every transfer, and store securely", c: true, w: "Labeling, restricted custody, logged transfers, and secure storage together preserve an unbroken chain." },
 { t: "Leave items on a shared desk for convenience", c: false, w: "Uncontrolled access breaks custody and admissibility." },
 { t: "Let anyone on the team handle evidence unlogged", c: false, w: "Unlogged handling creates custody gaps that invalidate evidence." },
 { t: "Store originals and working copies together unlabeled", c: false, w: "Unlabeled, commingled storage undermines integrity and traceability." } ] } ],

"cysa-ir-5": [
{ s: "After an incident, a manager proposes disciplining the employee who clicked the phishing link.", e: "Goal of the review: prevent recurrence", q: "What's the correct stance for a lessons-learned review?", options: [
 { t: "Keep it blameless and fix the systemic control (e.g., attachment sandboxing, macro blocking)", c: true, w: "Blameless review drives honest reporting and systemic fixes; punishing the clicker addresses neither root cause nor future honesty." },
 { t: "Discipline the user; they caused the breach", c: false, w: "Blame culture suppresses future reporting and ignores the missing control that let the click succeed." },
 { t: "Cancel the review; the incident is over", c: false, w: "Skipping lessons-learned wastes the chance to prevent recurrence." },
 { t: "Blame the SOC analyst who took the call", c: false, w: "Same anti-pattern -- the fix is systemic, not personal." } ] },
{ s: "RCA on a breach walks back the causes.", e: "phish clicked -> macro ran -> macros allowed -> no attachment policy", q: "Which is the ROOT cause versus the trigger?", options: [
 { t: "Root cause: the missing macro/attachment control policy; trigger: the user clicking", c: true, w: "RCA separates the trigger (the click) from the root cause (the absent control) -- fix the root to prevent repeats." },
 { t: "Root cause: the user clicking the link", c: false, w: "The click is the trigger; the systemic gap that let it succeed is the root cause." },
 { t: "Root cause: the existence of email", c: false, w: "Too broad to be actionable; RCA targets the fixable control gap." },
 { t: "There is no root cause in phishing", c: false, w: "Every incident has an addressable root cause; that's the point of RCA." } ] },
{ s: "The lessons-learned meeting produces recommendations.", e: "Draft item: 'Everyone should be more careful.'", q: "What's wrong with this recommendation?", options: [
 { t: "It's not specific or assignable; good actions have an owner and a concrete change", c: true, w: "Effective after-action items are specific, measurable, and owned -- 'be more careful' can't be executed or tracked." },
 { t: "Nothing; it's a fine action item", c: false, w: "Vague exhortations produce no measurable improvement." },
 { t: "It's too technical for leadership", c: false, w: "The problem is vagueness, not technical depth." },
 { t: "It should assign blame to a person", c: false, w: "Reviews are blameless; the fix is a specific control/process change." } ] },
{ s: "After recovery, the team wants the incident to improve future defense.", e: "New IoCs, TTPs, and a detection gap were identified", q: "Where should these outputs go?", options: [
 { t: "Feed them back into detections, playbooks, and Preparation -- closing the lifecycle loop", c: true, w: "Lessons-learned outputs update monitoring and readiness so the next incident is caught earlier." },
 { t: "File them away and never revisit", c: false, w: "Unapplied lessons don't improve anything." },
 { t: "Share only with the person who caused the incident", c: false, w: "Improvements are systemic and belong in detections/playbooks, not aimed at an individual." },
 { t: "Delete them to keep the report short", c: false, w: "Discarding IoCs/TTPs throws away the incident's defensive value." } ] },
{ s: "Leadership asks for metrics proving IR is improving.", e: "Available measures: detection time, containment time, recovery time, recurrence", q: "Which metrics best show IR effectiveness over time?", options: [
 { t: "MTTD, MTTR, dwell time, and recurrence rate trended across incidents", c: true, w: "These quantify how fast you detect/respond/recover and whether fixes prevent repeats." },
 { t: "Number of coffee cups consumed by the SOC", c: false, w: "Not a security effectiveness metric." },
 { t: "Total lines of log data stored", c: false, w: "Volume of logs doesn't measure response effectiveness." },
 { t: "Count of employees disciplined", c: false, w: "Irrelevant and counter to blameless culture." } ] },
{ s: "The after-action report is being assembled.", e: "Purpose: document the incident end-to-end for stakeholders and future teams", q: "What should it contain?", options: [
 { t: "Timeline, impact, response actions, root cause, and specific, owned recommendations", c: true, w: "A complete after-action report tells the full story and turns it into assignable improvements." },
 { t: "Only the malware's file hash", c: false, w: "A single IoC isn't an after-action report." },
 { t: "A note that says 'handled'", c: false, w: "That captures none of the learning or accountability needed." },
 { t: "The SOC's staffing budget only", c: false, w: "Budget alone doesn't document the incident or its lessons." } ] },
{ s: "The team debates when to hold the lessons-learned review.", e: "Some want it in three months when things calm down", q: "Best timing guidance:", options: [
 { t: "Hold it soon (typically within about two weeks) while details are fresh", c: true, w: "Prompt reviews capture accurate detail; waiting months erodes recall and momentum for fixes." },
 { t: "Wait at least six months for objectivity", c: false, w: "Memory and urgency fade; delaying loses the accuracy and drive to fix." },
 { t: "Never hold one; it reopens wounds", c: false, w: "Skipping it forfeits the prevention the whole domain is about." },
 { t: "Only if the same incident happens twice", c: false, w: "You review to prevent the second occurrence, not after it." } ] },
{ s: "An RCA distinguishes causes from factors.", e: "user clicked (trigger); no sandboxing (contributing); no macro-block standard (root)", q: "Why does separating these matter?", options: [
 { t: "It ensures recommendations target the root cause so the incident doesn't recur, while noting contributing factors to strengthen defense in depth", c: true, w: "Fixing the root prevents recurrence; addressing contributing factors adds layers -- both come from clear separation." },
 { t: "It doesn't matter; fix whatever is easiest", c: false, w: "Fixing only the easy symptom leaves the root open for a repeat." },
 { t: "Only the trigger should ever be fixed", c: false, w: "Fixing the trigger (the click) without the root control invites recurrence." },
 { t: "Separating causes just makes the report longer", c: false, w: "It's what makes recommendations effective, not mere length." } ] } ],
},
pbqs: [
{ type: "order", s: "A confirmed intrusion must be worked through the full lifecycle.", task: "Arrange the NIST-aligned incident response phases in order:",
 steps: ["Preparation (plans, roles, playbooks ready)", "Detection & Analysis (confirm and scope)", "Containment", "Eradication (remove threat + close vector)", "Recovery (restore clean, validate, monitor)", "Post-Incident Activity (lessons learned)"],
 x: "Preparation precedes everything; you detect/analyze before acting, contain before eradicating, eradicate before recovering, and always close with lessons learned that feed back into preparation." },
{ type: "order", s: "A live host holds a memory-resident payload and may be evidence in a legal case.", task: "Order evidence collection by order of volatility (most volatile first):",
 steps: ["CPU registers and cache", "RAM / running processes / network connections", "Disk (files, slack, swap)", "Remote logs / monitoring data", "Archival media / backups"],
 x: "Volatile data vanishes on power-off, so capture registers/cache and RAM before disk, then the less-volatile remote logs and archives." },
{ type: "order", s: "Ransomware is staged on three hosts with a live attacker foothold.", task: "Order the response actions for this active intrusion:",
 steps: ["Validate and scope the intrusion", "Preserve volatile evidence from affected hosts", "Contain (isolate hosts, revoke stolen credentials)", "Eradicate malware, persistence, and close the entry vector", "Recover from pre-compromise clean backups", "Hold a lessons-learned review"],
 x: "Scope first, preserve before destructive steps, contain before eradicating, eradicate fully (including the vector) before recovering, then learn from it." },
{ type: "match", s: "Match each activity to the correct incident response phase.", task: "Assign every activity:",
 cats: ["Preparation", "Detection & Analysis", "Containment/Eradication/Recovery", "Post-Incident"],
 items: [
  { t: "Writing a ransomware playbook and running a tabletop", c: "Preparation" },
  { t: "Confirming an alert is real and determining its scope", c: "Detection & Analysis" },
  { t: "Isolating a host and closing the exploited vector", c: "Containment/Eradication/Recovery" },
  { t: "Conducting a blameless root-cause review", c: "Post-Incident" },
  { t: "Restoring systems from clean backups and monitoring", c: "Containment/Eradication/Recovery" },
  { t: "Defining incident-commander roles before any incident", c: "Preparation" } ],
 x: "Plans/roles/exercises are Preparation; confirm-and-scope is Detection & Analysis; isolate/remove/restore is the CER phase; RCA and lessons-learned are Post-Incident." },
{ type: "match", s: "Classify each forensic practice.", task: "Match each to what it ensures:",
 cats: ["Evidence integrity", "Admissibility/handling", "Preservation"],
 items: [
  { t: "Hashing the original and the forensic image", c: "Evidence integrity" },
  { t: "Documented, unbroken chain of custody", c: "Admissibility/handling" },
  { t: "Using a write blocker during imaging", c: "Evidence integrity" },
  { t: "Enacting a legal hold to suspend log deletion", c: "Preservation" },
  { t: "Imaging a host before wiping and rebuilding it", c: "Preservation" },
  { t: "Restricting evidence access to named custodians", c: "Admissibility/handling" } ],
 x: "Hashing and write blockers prove integrity; custody records and access control govern admissibility; legal holds and pre-wipe imaging preserve evidence." },
{ type: "multi", s: "Eradication is underway on a compromised server.", e: "Attacker used an unpatched CVE, dropped malware, created a rogue admin account, and installed a scheduled-task backdoor.", q: "Select ALL actions required for COMPLETE eradication:",
 options: [
  { t: "Remove the malware binaries", c: true, w: "The payload must go, but this alone isn't enough." },
  { t: "Delete the rogue admin account", c: true, w: "Attacker-created accounts are persistence that must be removed." },
  { t: "Remove the scheduled-task backdoor", c: true, w: "Persistence mechanisms must be eradicated or the attacker returns." },
  { t: "Patch the exploited CVE (close the entry vector)", c: true, w: "Leaving the vector open guarantees reinfection." },
  { t: "Leave the CVE unpatched to avoid downtime", c: false, w: "The open vector is the reinfection path; it must be closed." } ],
 x: "Eradication = remove threat + all persistence + close the entry vector. Any leftover foothold or open vector means it isn't complete." },
{ type: "multi", s: "A destructive worm is spreading while forensics are desired.", e: "Threat is aggressive and actively encrypting data on new hosts each minute.", q: "Select ALL statements that correctly guide the containment decision:",
 options: [
  { t: "Prioritize rapid containment to stop active damage", c: true, w: "Imminent, spreading destruction shifts the balance toward speed." },
  { t: "Network isolation/segmentation can halt spread while limiting evidence loss", c: true, w: "Isolation contains without a full power-off, preserving more evidence than pulling plugs." },
  { t: "Some evidence loss may be acceptable when harm is imminent", c: true, w: "The evidence-vs-impact tradeoff favors stopping active destruction." },
  { t: "You must fully image every host before containing anything", c: false, w: "Imaging everything first lets the worm keep destroying data." },
  { t: "Do nothing until legal approves in writing", c: false, w: "Coordinate with legal, but imminent destruction demands timely action." } ],
 x: "When a destructive threat is actively spreading, contain fast (segmentation/isolation); rigidly preserving every byte first causes greater harm." },
{ type: "multi", s: "A responder plans recovery for a compromised file server.", e: "Compromise date known; backups exist before and after that date; persistence uncertain.", q: "Select ALL correct recovery practices:",
 options: [
  { t: "Restore from a backup taken before the compromise", c: true, w: "Pre-compromise restore points avoid reintroducing the threat." },
  { t: "Validate the restored system's integrity before returning to service", c: true, w: "Verification ensures the restore is actually clean." },
  { t: "Apply patches and heighten monitoring after restore", c: true, w: "Closing the vector and watching for re-entry completes recovery." },
  { t: "Rebuild from known-good media if persistence can't be ruled out", c: true, w: "When persistence is uncertain, a clean rebuild is the reliable path." },
  { t: "Use the most recent backup even if it's post-compromise", c: false, w: "A post-compromise backup reintroduces the threat." } ],
 x: "Recover from a validated pre-compromise point (or rebuild), patch the vector, and monitor -- 'newest backup' is a trap when it's tainted." },
{ type: "multi", s: "A lessons-learned review follows a phishing-driven breach.", e: "Root cause: no macro-blocking standard. Trigger: a user enabled macros.", q: "Select ALL practices of an effective post-incident review:",
 options: [
  { t: "Keep it blameless to encourage honest reporting", c: true, w: "Blameless reviews surface truth and systemic fixes." },
  { t: "Target the root cause (macro-block standard) in recommendations", c: true, w: "Fixing the root prevents recurrence." },
  { t: "Feed IoCs, TTPs, and detection gaps back into playbooks", c: true, w: "Applying lessons improves future detection and readiness." },
  { t: "Write specific, owned, measurable action items", c: true, w: "Assignable actions are what actually get done." },
  { t: "Discipline the user who enabled macros", c: false, w: "Blame undermines reporting and ignores the missing control." } ],
 x: "Effective reviews are blameless, root-cause-focused, loop lessons back into defenses, and produce specific owned actions." },
{ type: "order", s: "A device that may be evidence must be handled forensically.", task: "Order the forensic handling steps:",
 steps: ["Document and photograph the device in place", "Apply a write blocker to the source", "Create a bit-for-bit forensic image", "Hash the original and the image and confirm they match", "Analyze only the working copy", "Log every custody transfer and store the original securely"],
 x: "Document, write-block, image, verify with hashes, analyze the copy, and maintain custody -- the sequence that keeps evidence intact and admissible." },
],
boss: {
 title: "Operation Multiplication: Torque's Copies",
 brief: "Torque is loose aboard Star Command's logistics hub, and every minute you hesitate he copies himself onto another system. You have the IR console and five decisions across the full lifecycle. Move in the right order, Ranger -- contain before you clean, preserve before you wipe, and learn before you leave.",
 win: "Every copy of Torque is cornered, wiped, and locked out -- the entry vector sealed, the evidence preserved, the lessons logged. The real Torque is hauled to the brig. Domain mission cleared.",
 lose: "Torque copied faster than you contained him -- a foothold you cleaned but never cut off spun up a fresh clone. Review the order of your actions and deploy again.",
 stages: [
 { sit: "An alert fires: 'suspicious process' on one logistics server. A junior Ranger wants to isolate the entire hub immediately. Torque may already be copying.",
  e: "1 alert | LOG-SRV-04 | unvalidated\nEDR: wscript.exe -> powershell.exe (encoded) | beacon to torque-relay[.]net every 180s\nNo confirmation yet of spread",
  options: [
  { t: "Analyze and scope first -- pivot the C2 domain across the hub to find every affected host before mass action", d: 0, r: 3, ev: 2, ql: "best", w: "Detection isn't confirmation; scoping by pivoting the strong indicator reveals the true blast radius so containment is complete, not blind." },
  { t: "Isolate all 300 hub systems instantly on the single alert", d: 10, r: -5, ev: 0, ql: "ok", w: "Decisive but disproportionate -- mass isolation on one unvalidated host causes needless outage and you still don't know the real scope." },
  { t: "Reboot LOG-SRV-04 to clear the suspicious process", d: 18, r: -4, ev: -20, ql: "bad", w: "A reboot destroys the memory-resident evidence and doesn't stop Torque copying elsewhere." } ]},
 { sit: "Scoping finds three beaconing hosts. One holds a fileless payload in memory, and a legal case is likely. You must collect evidence before containing.",
  e: "Affected: LOG-SRV-04, LOG-SRV-11, LOG-DB-02\nLOG-SRV-04: fileless payload, memory-only | legal hold likely\nDecision: what to capture first",
  options: [
  { t: "Capture a memory image first (order of volatility), then disk, preserving the fileless payload as evidence", d: 0, r: 2, ev: 4, ql: "best", w: "RAM holds the only copy of a fileless payload; order of volatility means memory before disk, before power-off." },
  { t: "Image the disks first since they hold more data", d: 6, r: 0, ev: -12, ql: "ok", w: "Disk-first risks losing the memory-resident payload -- volatility, not size, sets collection order." },
  { t: "Pull power on all three to freeze them for imaging", d: 10, r: -3, ev: -22, ql: "bad", w: "Power-off destroys the volatile evidence the legal case depends on." } ]},
 { sit: "Evidence secured. Torque is still active via a stolen service-account credential. A Ranger suggests deleting the malware and bringing services back now.",
  e: "Foothold: stolen svc-logistics credential (still valid)\nStaged: Torque copy binaries on 3 hosts\nProposed: remove malware + restore service immediately",
  options: [
  { t: "Contain first: isolate the 3 hosts, revoke the stolen credential's sessions/tokens, block the C2 -- before eradicating or recovering", d: 0, r: 3, ev: 1, ql: "best", w: "Order is contain -> eradicate -> recover; cleaning or restoring while the credential still works lets Torque copy right back in." },
  { t: "Delete the malware and restore services now to minimize downtime", d: 20, r: -5, ev: 0, ql: "bad", w: "Eradicating/recovering before cutting the live foothold invites immediate reinfection -- exactly how Torque multiplies." },
  { t: "Disable only the service account and leave the hosts online", d: 12, r: -2, ev: 0, ql: "ok", w: "Revoking the credential helps, but leaving active C2 on three hosts lets the copies keep communicating." } ]},
 { sit: "Containment holds. Now eradicate. Forensics shows how Torque got in and how he persists.",
  e: "Entry vector: unpatched CVE on the logistics web app\nPersistence: rogue admin account + scheduled-task backdoor on each host\nMalware: Torque copy binaries",
  options: [
  { t: "Remove the binaries, delete the rogue account and scheduled tasks, and patch the CVE -- then rebuild any host where persistence is uncertain", d: 0, r: 3, ev: 1, ql: "best", w: "Complete eradication removes the threat AND persistence AND closes the entry vector; rebuild-from-known-good when in doubt." },
  { t: "Delete the malware binaries and call eradication done", d: 16, r: -4, ev: 0, ql: "bad", w: "The open CVE and leftover persistence spin up a new Torque the moment you look away." },
  { t: "Patch the CVE but leave the rogue admin account for later", d: 12, r: -3, ev: 0, ql: "ok", w: "Closing the vector is good, but a leftover attacker account is live persistence -- eradication isn't complete." } ]},
 { sit: "Torque is beaten. Recovery is done from clean backups. Commander Nebula wants the debrief and a fix so no copy ever returns.",
  e: "Recovered from June-1 (pre-compromise) backups, validated, monitored\nRoot cause: no patch-management SLA for the web app\nTrigger: the specific unpatched CVE",
  options: [
  { t: "Blameless lessons-learned: fix the root cause (patch-management SLA), add the C2 IoCs and new detections, feed changes into playbooks and preparation", d: 0, r: 4, ev: 0, ql: "best", w: "Post-incident review targets the systemic root cause and loops IoCs/detections back into readiness -- turning one incident into permanent defense." },
  { t: "Report 'resolved' and discipline the admin who missed the patch", d: 12, r: -6, ev: 0, ql: "bad", w: "Blame kills honest reporting and ignores the missing patch-management process that is the real root cause." },
  { t: "Close the ticket; recovery means the incident is fully over", d: 10, r: -4, ev: 0, ql: "bad", w: "Skipping lessons-learned forfeits the prevention step -- the same CVE class will let another copy in." } ]},
 ],
},
};
