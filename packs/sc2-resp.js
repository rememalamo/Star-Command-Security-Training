/* CONTENT PACK: SC-200 - Respond to Security Incidents (sc2-resp) - 40 MCQ + 10 PBQ + 5 briefings + boss */
window.PACKS = window.PACKS || {};
window.PACKS["sc2-resp"] = {
lessons: {
"sc2-resp-1": { intro: "NOS-4-A2 the energy vampire drains a device dry, then leaps to the next. Contain it on the endpoint before it spreads, Ranger -- in the right order, every time.",
sections: [
{ h: "The MDE response workflow (order matters)", b: "The single most-tested incident-response sequence: on a compromised endpoint, ISOLATE the device first (contain), THEN collect the investigation package, THEN run an antivirus scan in the contained state, and restrict app execution as needed. Jumping to remediation before containment lets the attacker move laterally. Contain first -- always -- then investigate and clean.", data: "MDE response order:\n1. Isolate device (contain -- stop lateral spread)\n2. Collect investigation package (evidence)\n3. Run antivirus scan (in contained state)\n4. Restrict app execution\n(Remediation before containment = lateral movement)" },
{ h: "Device isolation and live response", b: "Device isolation cuts the machine off from the network (except its connection to Defender) so an active threat like ransomware can't spread while you work. Live Response gives you a remote shell on the device to collect artifacts, run scripts, and remediate. The investigation package bundles forensic data (running processes, network connections, logs) for offline analysis." },
{ h: "Endpoint response actions", b: "Defender for Endpoint response actions include isolate device, collect investigation package, run antivirus scan, restrict app execution (allow only Microsoft-signed apps), stop and quarantine a file across the org, and initiate an automated investigation. You pick the action for the situation -- containment actions first when an attack is active, then evidence, then cleanup." },
{ h: "Attack Surface Reduction context", b: "Attack Surface Reduction (ASR) rules proactively shrink what attackers can exploit (blocking risky Office macro behaviors, credential theft, and script abuse). Tamper protection prevents attackers from changing antivirus/security settings via apps, scripts, or registry edits. These reduce the damage NOS-4-A2 can do before you ever respond -- prevention that supports response." },
],
traps: [
"MDE order is ISOLATE (contain) -> collect investigation package -> scan -> restrict. Running a scan or remediating BEFORE isolating allows lateral movement (the trap answer).",
"Device isolation keeps the machine connected only to Defender so you can still investigate while it's contained.",
"Tamper protection stops attackers from changing AV/security settings via apps/scripts/registry -- know it by that description.",
"Live Response is the remote shell for hands-on artifact collection and remediation on a device." ],
keys: [
"MDE workflow: isolate -> collect investigation package -> AV scan -> restrict app execution.",
"Contain before you clean; remediation before containment enables lateral movement.",
"Isolation, Live Response, and the investigation package are core endpoint response tools.",
"ASR rules + tamper protection are prevention that reduces what you must respond to." ] },

"sc2-resp-2": { intro: "NOS-4-A2 splits its attack across ship systems to confuse you. Defender XDR pulls the pieces into one incident so you fight the whole vampire, not its shadows.",
sections: [
{ h: "The incident queue and correlation", b: "Defender XDR correlates related alerts from Endpoint, Identity, Office 365, and Cloud Apps into a single INCIDENT in the incident queue. You triage the queue by severity and status, then investigate the incident holistically -- seeing the full attack story (which device, which user, which mailbox) rather than chasing isolated alerts. Understand the whole chain before you respond." },
{ h: "Investigating incidents: alerts, entities, evidence", b: "An incident contains its alerts, the entities involved (users, devices, files, IPs, mailboxes, URLs), and an evidence list (files, processes, persistence). The attack story / graph visualizes how they connect. You pivot across entities to scope the attack -- this account touched these devices, which contacted this IP -- exactly like building an incident timeline.", data: "Incident = correlated alerts + entities (user/device/file/IP/mailbox)\n+ evidence + an attack story graph\n-> investigate holistically, pivot across entities to scope" },
{ h: "Automated Investigation and Response (AIR) and the Action Center", b: "AIR automatically investigates alerts, determines verdicts, and recommends or takes remediation actions (quarantine a file, isolate a device) based on the device group's automation level. The Action Center is where you review pending and completed remediation actions -- approving automated actions (in semi-auto) and auditing what AIR did. It's the single place to manage remediation across the XDR estate." },
{ h: "Automatic attack disruption", b: "Automatic attack disruption uses high-confidence Defender XDR signals (including AI/ML) to immediately contain an IN-PROGRESS attack -- isolating a device, suspending a compromised user, or blocking a malicious URL tenant-wide -- for attacks like ransomware and business email compromise. Distinguish it from AIR: disruption is the fast, high-confidence CONTAINMENT of active attacks; AIR is the broader investigation-and-remediation engine.", data: "Automatic attack disruption = immediate containment of in-progress attacks\n(device isolation / user suspension / URL block, high-confidence + AI)\nAIR = broader auto investigation + remediation (per automation level)" },
],
traps: [
"Defender XDR correlates multi-product alerts into ONE incident -- investigate the incident holistically, not each alert alone.",
"Automatic attack disruption = immediate high-confidence containment of active attacks (ransomware/BEC); AIR = broader auto investigation/remediation. Don't confuse them.",
"The Action Center is where you review and approve remediation actions across XDR.",
"Pivot across entities (user/device/file/IP) to scope the full attack before responding." ],
keys: [
"XDR correlates alerts into incidents; triage the queue, investigate holistically.",
"Incidents hold alerts, entities, evidence, and an attack-story graph -- pivot to scope.",
"AIR auto-investigates and remediates per automation level; Action Center reviews actions.",
"Automatic attack disruption immediately contains in-progress attacks (ransomware/BEC)." ] },

"sc2-resp-3": { intro: "NOS-4-A2 feeds on every unwatched system. Match each victim to the right Defender product and remediate where the vampire actually struck.",
sections: [
{ h: "Remediate email threats (Defender for Office 365)", b: "For phishing, malware, and business email compromise, Defender for Office 365 provides investigation and remediation: soft-delete or purge malicious mail from mailboxes (Threat Explorer / remediation actions), and prevention via Safe Links (URL detonation) and Safe Attachments (attachment detonation). Automatic attack disruption can act on in-progress BEC. Remediate the mailbox where the email threat lives." },
{ h: "Remediate identity threats (Defender for Identity and Entra)", b: "For on-prem AD attacks (lateral movement, Pass-the-Hash, recon) Defender for Identity provides the identity timeline and alerts; remediation may include disabling/resetting the compromised account and revoking sessions. For cloud identity risk, Entra ID Protection remediates risky users (require password change) and risky sign-ins (require MFA). Respond at the identity that was compromised.", data: "On-prem AD attack -> Defender for Identity (timeline, disable/reset, revoke)\nCloud identity risk -> Entra ID Protection (password change / MFA)" },
{ h: "Remediate SaaS threats (Defender for Cloud Apps)", b: "Defender for Cloud Apps investigates and controls SaaS activity: detect anomalous behavior (impossible travel, mass download), suspend or require re-auth for a compromised user, and apply session policies to control risky actions in real time. Remediate the SaaS session/account and tighten app governance where the vampire fed." },
{ h: "Case management and documentation", b: "Case management groups incidents, evidence, and tasks into a case for coordinated investigation and hand-off -- tracking who's doing what and preserving the record. Documenting response actions, verdicts, and outcomes provides the audit trail and feeds lessons learned. Choosing the RIGHT product to remediate each part of a multi-domain attack, and recording it, is the heart of this domain." },
],
traps: [
"Remediate where the threat lives: email -> Defender for Office 365 (purge mail), on-prem identity -> Defender for Identity, cloud identity -> Entra ID Protection, SaaS -> Defender for Cloud Apps.",
"Safe Links (URL detonation) and Safe Attachments (attachment detonation) are Defender for Office 365 protections -- know them by function.",
"For a compromised cloud account, require a secure password change (user risk) or MFA (sign-in risk) via Entra ID Protection.",
"Case management coordinates multi-incident investigations and preserves the record -- use it for complex, multi-domain attacks." ],
keys: [
"Match remediation to the product: Office 365 (email), Identity (on-prem AD), Entra (cloud id), Cloud Apps (SaaS).",
"Purge malicious mail; Safe Links/Safe Attachments detonate URLs/attachments.",
"Remediate compromised identities: disable/reset, revoke sessions, force password/MFA.",
"Use case management to coordinate and document multi-domain response." ] },

"sc2-resp-4": { intro: "NOS-4-A2 hides its trail in the SIEM's ocean of logs. In Sentinel, enrich the incident, read the entities, and check the watchlist to expose the vampire.",
sections: [
{ h: "Sentinel incidents and investigation", b: "Sentinel incidents are generated by analytics rules (or ingested from Defender XDR). You triage the incident queue, assign owners, set severity/status, and open the investigation graph to explore related entities and alerts visually. Sentinel is the SIEM view -- correlating across ALL connected sources, Microsoft and third-party -- while Defender XDR handles product-specific remediation.", data: "Sentinel incident: from analytics rules / ingested XDR alerts\n-> triage queue, assign owner, set severity/status\n-> investigation graph to explore entities & related alerts" },
{ h: "Entities and UEBA (entity behavior)", b: "Sentinel maps entities (users, hosts, IPs) so you can pivot and see an entity's full activity. User and Entity Behavior Analytics (UEBA) baselines normal behavior and surfaces anomalies (a user suddenly accessing unusual resources, abnormal sign-in patterns) -- behavioral detection that enriches investigation beyond signature rules. The entity behavior page shows an entity's timeline and anomalies." },
{ h: "Watchlists and threat intelligence enrichment", b: "Watchlists are reference lists you import (VIP users, high-value assets, terminated employees, known-bad IPs) and join in KQL to enrich or scope detections and investigations. Threat intelligence indicators enrich incidents by flagging entities matching known-bad IOCs. Enrichment turns a raw alert into context: is this IP on a watchlist, does this user match a TI indicator?", data: "Watchlist: imported reference data (VIPs, assets, known-bad IPs)\n-> join in KQL to enrich/scope detections & investigations\nTI indicators -> flag entities matching known-bad IOCs" },
{ h: "Bookmarks and livestream (investigation aids)", b: "During hunting or investigation, BOOKMARKS save interesting query results (with notes) so you can preserve findings and promote them into an incident. LIVESTREAM runs a query continuously to watch for a specific activity in near real time during an active investigation. These tie proactive hunting into the response workflow -- capturing evidence and monitoring as an incident unfolds." },
],
traps: [
"Sentinel (SIEM) correlates across ALL sources and handles incident investigation/enrichment; Defender XDR handles product-specific remediation -- know the division of labor.",
"UEBA/entity behavior baselines normal and flags anomalies -- it's behavioral, not signature-based; its exam weight has grown.",
"Watchlists are imported reference data joined in KQL to enrich/scope -- not detections themselves.",
"Bookmarks preserve hunting findings (and promote to incidents); Livestream monitors a query in near real time -- don't swap them." ],
keys: [
"Sentinel incidents: triage, assign, and investigate via the entity graph (SIEM view).",
"UEBA baselines behavior and surfaces entity anomalies to enrich investigation.",
"Watchlists (imported reference data) + TI indicators enrich and scope incidents.",
"Bookmarks save/promote hunting findings; Livestream watches a query in near real time." ] },

"sc2-resp-5": { intro: "NOS-4-A2 strikes faster than any analyst can react. Automation rules and playbooks are the self-charging defenses that respond the instant the vampire feeds.",
sections: [
{ h: "Automation rules vs playbooks", b: "Automation rules are Sentinel-native, fast, simple orchestration: when an incident is created/updated, automatically assign an owner, add tags, change severity, close false positives, or RUN A PLAYBOOK. Playbooks are Logic Apps -- more complex and flexible -- that perform the actual response actions. Automation rules decide WHAT happens to the incident; playbooks DO the heavy work.", data: "Automation rule (Sentinel-native): assign/tag/severity/close/trigger playbook\nPlaybook (Logic App): the response actions themselves\nAutomation rule orchestrates; playbook executes" },
{ h: "Playbooks and SOAR response actions", b: "A playbook (Logic App) chains connectors to respond: isolate a machine via the Defender for Endpoint connector, disable a user in Entra, block an IP on a firewall, open a ticket, and post to Teams. Playbooks can be triggered by an incident, an alert, or manually. This is Sentinel's SOAR -- orchestrating response across many systems from one workflow." },
{ h: "Incident triggers and approvals", b: "Configure SOAR with the right trigger: incident-triggered playbooks run on the correlated incident (recommended for most response), alert-triggered run per alert. For high-impact actions (isolating a server, disabling an exec's account), build APPROVAL steps into the playbook so a human authorizes before the action executes -- balancing speed with control." },
{ h: "Choosing automation depth", b: "Match automation to risk: auto-close obvious false positives and auto-enrich freely; gate destructive/high-impact actions behind approvals; reserve full auto-remediation for high-confidence detections and trusted scopes. The exam rewards knowing WHEN to automate fully versus require approval -- speed for the routine, human oversight for the consequential." },
],
traps: [
"Automation rules (Sentinel-native, simple, fast) orchestrate incidents and can TRIGGER playbooks; playbooks (Logic Apps) perform the actual response actions. Confusing them is the classic wrong answer.",
"Incident-triggered playbooks act on the correlated incident (usual choice); alert-triggered act per alert -- pick by need.",
"Gate high-impact actions (isolate a server, disable an exec) behind approval steps; auto-run only low-risk/high-confidence actions.",
"Analytics rules DETECT; automation rules + playbooks RESPOND -- keep detection and response distinct." ],
keys: [
"Automation rules orchestrate incidents (assign/tag/close/trigger); playbooks (Logic Apps) execute.",
"Playbooks chain connectors: isolate device, disable user, block IP, ticket, Teams.",
"Incident-triggered playbooks are the usual choice; add approvals for high-impact actions.",
"Automate the routine fully; require human approval for consequential actions." ] },
},
mcq: {
"sc2-resp-1": [
{ s: "An endpoint shows active ransomware encrypting files and beginning to spread.", e: "Attack is in progress on one device", q: "What should you do FIRST?", options: [
 { t: "Isolate the device to contain it, then collect the investigation package and scan in the contained state", c: true, w: "Contain first -- isolation stops lateral spread; investigation and cleanup follow." },
 { t: "Run a full antivirus scan before isolating", c: false, w: "Scanning first lets ransomware keep spreading; isolate to contain first." },
 { t: "Reimage the device immediately", c: false, w: "Reimaging before containment and evidence collection destroys the trail and may miss scope." },
 { t: "Do nothing until the scan schedule runs", c: false, w: "Waiting lets the active attack spread; act to contain now." } ] },
{ s: "After isolating a compromised device, you need forensic artifacts for analysis.", e: "Device is contained", q: "Next action?", options: [
 { t: "Collect the investigation package (processes, connections, logs)", c: true, w: "The investigation package bundles forensic data for analysis after containment." },
 { t: "Restrict app execution and stop", c: false, w: "That's a later hardening step; collect evidence first after containment." },
 { t: "Un-isolate the device to let it run normally", c: false, w: "Removing containment while investigating risks renewed spread." },
 { t: "Delete all files on the device", c: false, w: "Destructive and premature; collect evidence, then remediate." } ] },
{ s: "An analyst wants a remote shell on a device to collect artifacts and run remediation scripts.", e: "Hands-on endpoint work", q: "Which capability?", options: [
 { t: "Live Response", c: true, w: "Live Response provides a remote shell to collect artifacts and remediate on the device." },
 { t: "A Sentinel watchlist", c: false, w: "Watchlists are reference data, not a device shell." },
 { t: "An analytics rule", c: false, w: "Analytics rules detect; they don't give a device shell." },
 { t: "A workbook", c: false, w: "Workbooks visualize; they don't provide remote access." } ] },
{ s: "Security wants to stop attackers from changing antivirus settings via apps, scripts, or registry edits.", e: "Protecting the security agent itself", q: "Which feature?", options: [
 { t: "Tamper protection", c: true, w: "Tamper protection prevents changes to AV/security settings through apps, scripts, or registry." },
 { t: "Device isolation", c: false, w: "Isolation cuts network access; it doesn't lock AV settings." },
 { t: "A watchlist", c: false, w: "Unrelated to protecting AV settings." },
 { t: "Safe Links", c: false, w: "Safe Links detonates URLs in email, unrelated to AV settings." } ] },
{ s: "A team wants to proactively shrink exploitable behaviors like risky Office macros and script abuse.", e: "Prevention that reduces attack surface", q: "Which feature?", options: [
 { t: "Attack Surface Reduction (ASR) rules", c: true, w: "ASR rules block risky behaviors (macro abuse, credential theft, scripts) to shrink attack surface." },
 { t: "A Sentinel automation rule", c: false, w: "That orchestrates incidents; it doesn't reduce endpoint attack surface." },
 { t: "A watchlist", c: false, w: "Reference data, not attack surface reduction." },
 { t: "Device groups", c: false, w: "Those scope permissions/automation, not ASR behaviors." } ] },
{ s: "A malicious file is found on one device but may exist across the organization.", e: "Org-wide file response", q: "Best action?", options: [
 { t: "Stop and quarantine the file across the organization", c: true, w: "This response action removes the malicious file tenant-wide, not just on one device." },
 { t: "Only delete it on the one device", c: false, w: "That leaves copies elsewhere; act org-wide." },
 { t: "Ignore it if AV didn't flag it", c: false, w: "Known-malicious files should be quarantined regardless." },
 { t: "Add it to a watchlist and stop", c: false, w: "A watchlist doesn't remove the file; quarantine it." } ] },
{ s: "During an active attack, remediation was attempted before the device was contained.", e: "Understanding why order matters", q: "What is the risk?", options: [
 { t: "The attacker can move laterally while remediation proceeds uncontained", c: true, w: "Remediation before containment allows lateral movement -- contain first." },
 { t: "There is no risk; order does not matter", c: false, w: "Order is central: contain before you clean." },
 { t: "The device will run faster", c: false, w: "Irrelevant and false; the risk is lateral spread." },
 { t: "Evidence is automatically preserved", c: false, w: "Uncontained remediation can lose evidence and allow spread." } ] },
{ s: "You need to allow only Microsoft-signed apps to run on a compromised device while investigating.", e: "Limit execution during response", q: "Which action?", options: [
 { t: "Restrict app execution", c: true, w: "Restrict app execution allows only trusted (Microsoft-signed) apps during response." },
 { t: "Collect the investigation package", c: false, w: "That gathers evidence; it doesn't restrict execution." },
 { t: "Add the device to a watchlist", c: false, w: "Watchlists don't restrict app execution." },
 { t: "Disable tamper protection", c: false, w: "That weakens security; the opposite of what's needed." } ] } ],

"sc2-resp-2": [
{ s: "Alerts from Endpoint, Identity, and Office 365 all belong to one attack.", e: "Goal: see the full attack chain", q: "How does Defender XDR present this?", options: [
 { t: "As a single correlated incident to investigate holistically", c: true, w: "XDR correlates multi-product alerts into one incident showing the whole attack." },
 { t: "As separate unrelated alerts to handle individually", c: false, w: "Correlation into one incident is the value; separate handling hides the chain." },
 { t: "As a workbook dashboard only", c: false, w: "Workbooks visualize; the incident is the investigation unit." },
 { t: "As a watchlist entry", c: false, w: "Watchlists are reference data, not correlated incidents." } ] },
{ s: "Ransomware is actively spreading and Defender XDR has high-confidence signals.", e: "Immediate containment of an in-progress attack", q: "Which capability acts automatically?", options: [
 { t: "Automatic attack disruption (isolate device / suspend user / block URL)", c: true, w: "Attack disruption immediately contains active high-confidence attacks like ransomware and BEC." },
 { t: "A scheduled analytics rule", c: false, w: "That detects on a schedule; it isn't immediate containment." },
 { t: "A watchlist", c: false, w: "Reference data, not automated containment." },
 { t: "A workbook", c: false, w: "Visualization, not containment." } ] },
{ s: "An analyst must review and approve pending automated remediation actions across XDR.", e: "Central place for remediation actions", q: "Where do they go?", options: [
 { t: "The Action Center", c: true, w: "The Action Center reviews pending/completed remediation actions across XDR." },
 { t: "The watchlist page", c: false, w: "Watchlists are reference data, not remediation review." },
 { t: "A Logic App designer", c: false, w: "That's for building playbooks, not reviewing XDR actions." },
 { t: "The data connectors page", c: false, w: "Connectors ingest data; they don't review remediation." } ] },
{ s: "A colleague conflates AIR with automatic attack disruption.", e: "Two different automation concepts", q: "Correct distinction?", options: [
 { t: "Attack disruption is immediate high-confidence containment of active attacks; AIR is broader auto investigation and remediation", c: true, w: "Disruption contains in-progress attacks fast; AIR investigates and remediates more broadly." },
 { t: "They are the same feature", c: false, w: "They are distinct: fast containment vs broad investigation/remediation." },
 { t: "AIR only blocks URLs", c: false, w: "AIR investigates and remediates across the estate; URL blocking is a disruption action." },
 { t: "Attack disruption never isolates devices", c: false, w: "Device isolation is a core disruption action." } ] },
{ s: "An analyst triages the Defender XDR incident queue.", e: "Many incidents of varying severity", q: "Best triage approach?", options: [
 { t: "Prioritize by severity and status, then investigate each incident holistically", c: true, w: "Triage the queue by severity/status and investigate the correlated incident end-to-end." },
 { t: "Work strictly oldest-first regardless of severity", c: false, w: "Severity and impact should drive triage, not just age." },
 { t: "Close all high-severity incidents to clear the queue", c: false, w: "Closing without investigation misses real attacks." },
 { t: "Ignore the queue and wait for email", c: false, w: "Active triage of the queue is the analyst's job." } ] },
{ s: "To scope an attack, an analyst must see which devices an account touched and what they contacted.", e: "Understanding the attack spread", q: "How is this done in an incident?", options: [
 { t: "Pivot across the incident's entities (user, device, IP) using the attack story graph", c: true, w: "Pivoting across entities in the incident graph reveals the full scope." },
 { t: "Read a single alert and stop", c: false, w: "One alert doesn't show the full scope; pivot across entities." },
 { t: "Delete the incident", c: false, w: "Destroying the incident loses the investigation." },
 { t: "Check the billing page", c: false, w: "Unrelated to attack scoping." } ] },
{ s: "AIR automatically quarantined a file on a device group set to full automation.", e: "Why did this happen without approval?", q: "Correct explanation?", options: [
 { t: "The device group's automation level was full, so AIR remediated without approval", c: true, w: "AIR remediation depends on the automation level configured for the device group." },
 { t: "A watchlist forced the action", c: false, w: "Watchlists don't remediate files." },
 { t: "An analyst manually approved it", c: false, w: "Full automation means no manual approval was required." },
 { t: "Attack disruption did it by default", c: false, w: "This was AIR at full automation, not necessarily disruption." } ] },
{ s: "An incident contains alerts, users, devices, files, and IPs plus a visual of how they connect.", e: "Understanding incident structure", q: "What is the visual called?", options: [
 { t: "The attack story / investigation graph", c: true, w: "The attack story graph visualizes how the incident's entities and alerts connect." },
 { t: "A data collection rule", c: false, w: "DCRs govern ingestion, not incident visualization." },
 { t: "A workbook template", c: false, w: "Workbooks are separate dashboards, not the incident graph." },
 { t: "An automation rule", c: false, w: "Automation rules orchestrate; they aren't the graph." } ] } ],

"sc2-resp-3": [
{ s: "A phishing email with a malicious link reached dozens of mailboxes.", e: "Email-borne threat", q: "Which product remediates, and how?", options: [
 { t: "Defender for Office 365 -- soft-delete/purge the malicious mail from mailboxes", c: true, w: "Office 365 remediation purges malicious email where it lives -- the mailboxes." },
 { t: "Defender for Identity -- reset AD accounts", c: false, w: "That's on-prem identity, not email remediation." },
 { t: "Defender for Endpoint -- isolate devices", c: false, w: "Endpoint handles devices, not mailbox email removal." },
 { t: "A Sentinel watchlist", c: false, w: "Watchlists don't remove email." } ] },
{ s: "On-prem Active Directory shows lateral movement and Pass-the-Hash by a compromised account.", e: "On-prem identity attack", q: "Which product and remediation?", options: [
 { t: "Defender for Identity -- review the identity timeline, disable/reset the account, revoke sessions", c: true, w: "Defender for Identity handles on-prem AD attacks; remediate the compromised account." },
 { t: "Entra ID Protection -- cloud risk policy", c: false, w: "That's cloud identity; this is on-prem AD." },
 { t: "Defender for Office 365 -- purge mail", c: false, w: "Email remediation doesn't address AD lateral movement." },
 { t: "Defender for Cloud Apps -- session policy", c: false, w: "That's SaaS control, not on-prem AD." } ] },
{ s: "A cloud account is flagged high-risk (leaked credentials) in Entra ID Protection.", e: "Cloud identity risk remediation", q: "Best remediation?", options: [
 { t: "Require a secure password change (user risk) via a risk-based policy", c: true, w: "High user risk from leaked credentials is remediated by a forced secure password change." },
 { t: "Purge the user's email", c: false, w: "Email purge doesn't remediate a leaked-credential account." },
 { t: "Isolate their laptop only", c: false, w: "Device isolation doesn't address the compromised cloud identity." },
 { t: "Add the user to a watchlist and stop", c: false, w: "A watchlist doesn't remediate the risky account." } ] },
{ s: "Defender for Cloud Apps detects impossible travel and mass download by a user in a SaaS app.", e: "SaaS anomaly", q: "Appropriate remediation?", options: [
 { t: "Suspend or require re-auth for the user and apply a session policy to control risky actions", c: true, w: "Cloud Apps remediates the SaaS session/account and controls risky actions in real time." },
 { t: "Reset the on-prem AD account only", c: false, w: "The threat is in the SaaS session; address it there." },
 { t: "Purge the user's mailbox", c: false, w: "Email purge doesn't address SaaS anomalies." },
 { t: "Isolate a firewall", c: false, w: "Not a Cloud Apps remediation for a SaaS session." } ] },
{ s: "A complex multi-domain attack needs coordinated investigation, tasks, and hand-off across analysts.", e: "Organizing a big investigation", q: "Which capability?", options: [
 { t: "Case management (group incidents, evidence, and tasks into a case)", c: true, w: "Case management coordinates multi-incident investigations and preserves the record." },
 { t: "A single analytics rule", c: false, w: "One rule doesn't coordinate an investigation." },
 { t: "A data collection rule", c: false, w: "DCRs govern ingestion, not case coordination." },
 { t: "A workbook only", c: false, w: "Workbooks visualize; case management coordinates the work." } ] },
{ s: "The SOC wants URLs and attachments in email detonated before users can be harmed.", e: "Email prevention", q: "Which Defender for Office 365 features?", options: [
 { t: "Safe Links (URL detonation) and Safe Attachments (attachment detonation)", c: true, w: "Safe Links and Safe Attachments detonate URLs and attachments to protect email." },
 { t: "ASR rules only", c: false, w: "ASR is endpoint behavior reduction, not email detonation." },
 { t: "Watchlists", c: false, w: "Reference data, not email protection." },
 { t: "Device isolation", c: false, w: "That's an endpoint action, not email prevention." } ] },
{ s: "A multi-domain attack hit email, an on-prem account, and a SaaS app.", e: "Choosing where to remediate each part", q: "Best approach?", options: [
 { t: "Remediate each part in its product: Office 365 (email), Defender for Identity (on-prem account), Cloud Apps (SaaS)", c: true, w: "Remediate where each threat lives, coordinated as one investigation." },
 { t: "Handle everything only in Defender for Endpoint", c: false, w: "Endpoint doesn't remediate mailboxes, AD accounts, or SaaS sessions." },
 { t: "Only purge the email and ignore the rest", c: false, w: "That leaves the identity and SaaS compromise active." },
 { t: "Wait for automatic disruption to fix all of it", c: false, w: "Disruption contains active attacks but you still remediate each domain." } ] },
{ s: "After response, the SOC must preserve the record of actions, verdicts, and outcomes.", e: "Audit trail and lessons learned", q: "Why document in the case?", options: [
 { t: "It provides the audit trail and feeds lessons learned for future response", c: true, w: "Documentation preserves the record and enables improvement." },
 { t: "Documentation is unnecessary once resolved", c: false, w: "The record is essential for audit and learning." },
 { t: "It automatically re-runs the attack", c: false, w: "Nonsensical; documentation records the response." },
 { t: "It deletes all evidence", c: false, w: "Documentation preserves, not deletes, evidence." } ] } ],

"sc2-resp-4": [
{ s: "A team debates which tool investigates incidents correlated across all sources vs product-specific remediation.", e: "Division of labor", q: "Which statement is correct?", options: [
 { t: "Sentinel (SIEM) correlates across all sources and investigates; Defender XDR handles product-specific remediation", c: true, w: "Sentinel is the cross-source SIEM investigation view; XDR remediates within its products." },
 { t: "Sentinel remediates endpoints directly with no XDR", c: false, w: "Product-specific remediation is XDR's role; Sentinel orchestrates and investigates." },
 { t: "Defender XDR ingests third-party firewall logs as the SIEM", c: false, w: "Broad third-party ingestion is Sentinel's SIEM role." },
 { t: "They cannot share incident data", c: false, w: "XDR incidents can flow into Sentinel; they integrate." } ] },
{ s: "Sentinel should baseline normal behavior and surface anomalies like a user accessing unusual resources.", e: "Behavioral detection", q: "Which capability?", options: [
 { t: "User and Entity Behavior Analytics (UEBA / entity behavior)", c: true, w: "UEBA baselines normal behavior and surfaces anomalies beyond signature rules." },
 { t: "A scheduled analytics rule with static thresholds", c: false, w: "Static rules aren't behavioral baselining; UEBA is." },
 { t: "A data connector", c: false, w: "Connectors ingest data; they don't baseline behavior." },
 { t: "A workbook", c: false, w: "Workbooks visualize; they don't perform UEBA." } ] },
{ s: "An analyst wants to enrich detections by joining a list of VIP users and known-bad IPs.", e: "Reference data for enrichment", q: "Which Sentinel feature?", options: [
 { t: "Watchlists (imported reference data joined in KQL)", c: true, w: "Watchlists provide reference data to enrich and scope detections and investigations." },
 { t: "An automation rule", c: false, w: "That orchestrates incidents, not reference-data enrichment." },
 { t: "A playbook", c: false, w: "Playbooks respond; they aren't reference lists." },
 { t: "A device group", c: false, w: "Device groups are a Defender for Endpoint construct." } ] },
{ s: "During a hunt, an analyst finds a suspicious result and wants to preserve it and promote it into an incident.", e: "Capturing a finding", q: "Which feature?", options: [
 { t: "A bookmark", c: true, w: "Bookmarks save hunting findings (with notes) and can be promoted into incidents." },
 { t: "Livestream", c: false, w: "Livestream monitors a query in near real time; it doesn't save a finding." },
 { t: "A watchlist", c: false, w: "Watchlists are reference data, not saved findings." },
 { t: "A workbook", c: false, w: "Workbooks visualize; they don't bookmark findings." } ] },
{ s: "An analyst wants to watch for a specific activity in near real time during an active investigation.", e: "Live monitoring of a query", q: "Which feature?", options: [
 { t: "Livestream", c: true, w: "Livestream runs a query continuously to watch for activity in near real time." },
 { t: "A bookmark", c: false, w: "Bookmarks save findings; they don't monitor live." },
 { t: "A retention tier", c: false, w: "Retention governs storage, not live monitoring." },
 { t: "A data collection rule", c: false, w: "DCRs govern ingestion, not live query monitoring." } ] },
{ s: "A Sentinel incident needs an owner and a severity so the team can track it.", e: "Incident triage basics", q: "What does the analyst do?", options: [
 { t: "Assign an owner and set severity/status, then investigate via the entity graph", c: true, w: "Triage assigns ownership and severity/status before investigation." },
 { t: "Immediately delete the incident", c: false, w: "Deleting loses the investigation." },
 { t: "Convert it to a watchlist", c: false, w: "Incidents aren't converted to reference lists." },
 { t: "Ignore it until it closes itself", c: false, w: "Incidents require active triage." } ] },
{ s: "An entity page shows a user's timeline and flags an abnormal sign-in pattern.", e: "Interpreting entity behavior", q: "What is this?", options: [
 { t: "A UEBA anomaly on the entity's behavior timeline", c: true, w: "The entity behavior page surfaces UEBA anomalies against the baseline." },
 { t: "A data connector error", c: false, w: "This is behavioral analytics, not a connector issue." },
 { t: "A watchlist match only", c: false, w: "Watchlist matches are reference joins, not behavioral anomalies." },
 { t: "A playbook action", c: false, w: "Playbooks respond; they don't surface behavior anomalies." } ] },
{ s: "A threat intelligence indicator flags an IP in an incident as known-bad.", e: "TI enrichment", q: "What is the value?", options: [
 { t: "It enriches the incident by flagging entities matching known-bad IOCs for faster triage", c: true, w: "TI indicators add context so analysts recognize known-bad entities quickly." },
 { t: "It automatically closes the incident", c: false, w: "TI enriches context; it doesn't auto-close incidents." },
 { t: "It deletes the IP from logs", c: false, w: "TI flags, it doesn't delete data." },
 { t: "It replaces the need to investigate", c: false, w: "Enrichment aids investigation; it doesn't replace it." } ] } ],

"sc2-resp-5": [
{ s: "When an incident is created, it should auto-assign an owner, tag it, and run a response workflow.", e: "Simple, fast incident orchestration", q: "Which Sentinel feature?", options: [
 { t: "An automation rule (assign/tag and trigger a playbook)", c: true, w: "Automation rules are Sentinel-native orchestration that can trigger playbooks." },
 { t: "A scheduled analytics rule", c: false, w: "That detects; it doesn't orchestrate incident handling." },
 { t: "A watchlist", c: false, w: "Reference data, not orchestration." },
 { t: "A workbook", c: false, w: "Visualization, not orchestration." } ] },
{ s: "A response must isolate a machine, disable a user, block an IP, and post to Teams.", e: "Multi-system response actions", q: "What performs these?", options: [
 { t: "A playbook (Logic App) chaining the relevant connectors", c: true, w: "Playbooks chain connectors to perform response actions across systems." },
 { t: "An automation rule by itself", c: false, w: "Automation rules trigger playbooks; the playbook performs the actions." },
 { t: "A scheduled analytics rule", c: false, w: "That detects; it doesn't execute response actions." },
 { t: "A watchlist", c: false, w: "Reference data, not response execution." } ] },
{ s: "A colleague says automation rules and playbooks are the same thing.", e: "Distinguishing the two", q: "Correct clarification?", options: [
 { t: "Automation rules are Sentinel-native, simple orchestration; playbooks are Logic Apps that perform the actions", c: true, w: "Automation rules orchestrate incidents; playbooks (Logic Apps) execute the response." },
 { t: "They are identical", c: false, w: "They're distinct components with different roles." },
 { t: "Playbooks orchestrate and automation rules execute actions", c: false, w: "Reversed -- automation rules orchestrate, playbooks execute." },
 { t: "Both only detect threats", c: false, w: "Detection is analytics rules' job; these two respond." } ] },
{ s: "A playbook will isolate a production server and disable an executive's account.", e: "High-impact actions", q: "Best practice before executing?", options: [
 { t: "Build an approval step so a human authorizes the high-impact action", c: true, w: "High-impact actions should require approval to balance speed and control." },
 { t: "Always run it fully automatically with no approval", c: false, w: "Consequential actions need human oversight to avoid harm." },
 { t: "Never automate any response", c: false, w: "Automate the routine; gate only high-impact actions behind approvals." },
 { t: "Delete the playbook", c: false, w: "That removes the capability instead of adding an approval." } ] },
{ s: "Most response playbooks should act on the correlated incident rather than each raw alert.", e: "Choosing the trigger", q: "Which trigger is usually preferred?", options: [
 { t: "Incident-triggered (acts on the correlated incident)", c: true, w: "Incident-triggered playbooks act on the correlated incident -- the usual choice." },
 { t: "Alert-triggered for everything", c: false, w: "Alert-triggered acts per alert; incident-triggered is usually preferred for response." },
 { t: "Manual-only always", c: false, w: "Manual has its place, but incident triggers automate the common case." },
 { t: "Schedule-triggered", c: false, w: "Playbooks respond to incidents/alerts, not schedules." } ] },
{ s: "The SOC wants to auto-close obvious false positives but require approval for destructive actions.", e: "Matching automation to risk", q: "Best approach?", options: [
 { t: "Auto-close/enrich low-risk items; gate high-impact/destructive actions behind approvals", c: true, w: "Automate the routine fully; require human approval for consequential actions." },
 { t: "Fully automate every action including destructive ones", c: false, w: "Destructive actions need oversight to avoid unintended harm." },
 { t: "Require manual approval for every single action", c: false, w: "That negates automation's speed for routine items." },
 { t: "Never close false positives", c: false, w: "Auto-closing obvious false positives is a good use of automation." } ] },
{ s: "An analytics rule detects a threat; then a response must run automatically.", e: "Detection vs response components", q: "How do they connect?", options: [
 { t: "The analytics rule detects and raises the incident; an automation rule then triggers a response playbook", c: true, w: "Detection (analytics rule) raises the incident; automation rule + playbook respond." },
 { t: "The analytics rule performs the response itself", c: false, w: "Analytics rules detect; response is automation rules + playbooks." },
 { t: "The playbook detects the threat", c: false, w: "Detection is the analytics rule's job, not the playbook's." },
 { t: "A watchlist runs the response", c: false, w: "Watchlists are reference data, not response." } ] },
{ s: "A playbook needs to isolate a device in Defender for Endpoint as part of response.", e: "Cross-product action", q: "How does the playbook do this?", options: [
 { t: "It uses the Defender for Endpoint connector within the Logic App", c: true, w: "Playbooks use product connectors (like Defender for Endpoint) to perform actions." },
 { t: "It edits a data collection rule", c: false, w: "DCRs govern ingestion, not device isolation." },
 { t: "It changes a retention tier", c: false, w: "Retention is storage, not a response action." },
 { t: "It creates a workbook", c: false, w: "Workbooks visualize; they don't isolate devices." } ] } ],
},
pbqs: [
{ type: "order", s: "A compromised endpoint shows active ransomware.", task: "Order the MDE response workflow:",
 steps: ["Isolate the device (contain to stop lateral spread)", "Collect the investigation package (evidence)", "Run an antivirus scan in the contained state", "Restrict app execution as needed", "Document the actions taken"],
 x: "Contain first, then collect evidence, then scan and harden -- remediating before containment allows lateral movement." },
{ type: "order", s: "A multi-domain attack must be worked in Defender XDR.", task: "Order the incident response steps:",
 steps: ["Triage the incident queue by severity/status", "Open the correlated incident and review its alerts and entities", "Pivot across entities using the attack story graph to scope", "Remediate each part in the correct product", "Review actions in the Action Center and document the case"],
 x: "Triage, investigate the correlated incident holistically, scope by pivoting entities, remediate per product, then review and document." },
{ type: "order", s: "A Sentinel incident needs automated response with a safeguard.", task: "Order the SOAR setup:",
 steps: ["An analytics rule detects and raises the incident", "An automation rule triggers on incident creation", "The automation rule assigns an owner and tags the incident", "The automation rule runs a response playbook (Logic App)", "The playbook requires approval before high-impact actions"],
 x: "Detection raises the incident; the automation rule orchestrates and triggers the playbook; the playbook gates high-impact actions behind approval." },
{ type: "match", s: "Match each threat to the product that remediates it.", task: "Assign every case:",
 cats: ["Defender for Office 365", "Defender for Identity", "Entra ID Protection", "Defender for Cloud Apps"],
 items: [
  { t: "Purge a phishing email from mailboxes", c: "Defender for Office 365" },
  { t: "Pass-the-Hash on on-prem AD", c: "Defender for Identity" },
  { t: "Leaked-credential cloud account", c: "Entra ID Protection" },
  { t: "Impossible travel in a SaaS app", c: "Defender for Cloud Apps" },
  { t: "Business email compromise", c: "Defender for Office 365" },
  { t: "Mass download in a SaaS session", c: "Defender for Cloud Apps" } ],
 x: "Remediate where the threat lives: email (Office 365), on-prem AD (Identity), cloud identity (Entra), SaaS (Cloud Apps)." },
{ type: "match", s: "Match each capability to what it does.", task: "Assign every item:",
 cats: ["Automatic attack disruption", "AIR", "Action Center", "Live Response"],
 items: [
  { t: "Immediately contains an active ransomware/BEC attack", c: "Automatic attack disruption" },
  { t: "Auto-investigates and remediates per automation level", c: "AIR" },
  { t: "Central review of pending/completed remediation actions", c: "Action Center" },
  { t: "Remote shell to collect artifacts and remediate a device", c: "Live Response" },
  { t: "Suspends a compromised user on high-confidence signals", c: "Automatic attack disruption" } ],
 x: "Disruption = fast containment of active attacks; AIR = broad auto investigation/remediation; Action Center = review actions; Live Response = remote device shell." },
{ type: "match", s: "Match each Sentinel feature to its role.", task: "Assign every item:",
 cats: ["Watchlist", "UEBA", "Bookmark", "Livestream"],
 items: [
  { t: "Imported reference data joined in KQL (VIPs, known-bad IPs)", c: "Watchlist" },
  { t: "Baselines behavior and surfaces entity anomalies", c: "UEBA" },
  { t: "Saves a hunting finding and can promote it to an incident", c: "Bookmark" },
  { t: "Watches a query in near real time during investigation", c: "Livestream" },
  { t: "Flags a user with an abnormal sign-in pattern", c: "UEBA" } ],
 x: "Watchlists enrich with reference data; UEBA is behavioral; bookmarks save findings; Livestream monitors a query live." },
{ type: "multi", s: "An endpoint is actively compromised and forensics are needed.", e: "Attack in progress; evidence matters.", q: "Select ALL correct actions, in principle:",
 options: [
  { t: "Isolate the device first to contain it", c: true, w: "Containment stops lateral spread before anything else." },
  { t: "Collect the investigation package for evidence", c: true, w: "Evidence collection follows containment." },
  { t: "Run an antivirus scan in the contained state", c: true, w: "Scanning is safe once contained." },
  { t: "Restrict app execution to trusted apps", c: true, w: "Hardens the device during response." },
  { t: "Reimage immediately before collecting any evidence", c: false, w: "Reimaging first destroys the evidence trail." } ],
 x: "Isolate, collect, scan, and restrict -- contain before cleaning and preserve evidence before destructive steps." },
{ type: "multi", s: "Design remediation for a multi-domain attack.", e: "Email, on-prem AD, cloud identity, and SaaS are all involved.", q: "Select ALL correct remediation choices:",
 options: [
  { t: "Purge the malicious email via Defender for Office 365", c: true, w: "Email remediation happens in Office 365." },
  { t: "Disable/reset the on-prem account via Defender for Identity", c: true, w: "On-prem AD attacks are handled in Defender for Identity." },
  { t: "Force password change / MFA via Entra ID Protection", c: true, w: "Cloud identity risk is remediated in Entra ID Protection." },
  { t: "Suspend the SaaS session via Defender for Cloud Apps", c: true, w: "SaaS anomalies are remediated in Cloud Apps." },
  { t: "Handle all of it only in Defender for Endpoint", c: false, w: "Endpoint can't remediate mailboxes, AD accounts, or SaaS sessions." } ],
 x: "Remediate each part where it lives; no single product covers email, on-prem identity, cloud identity, and SaaS." },
{ type: "multi", s: "Configure Sentinel SOAR safely.", e: "Mix of routine and high-impact response actions.", q: "Select ALL correct practices:",
 options: [
  { t: "Use automation rules to orchestrate incidents and trigger playbooks", c: true, w: "Automation rules are the orchestration layer." },
  { t: "Use playbooks (Logic Apps) to perform the response actions", c: true, w: "Playbooks execute cross-system actions." },
  { t: "Prefer incident-triggered playbooks for most response", c: true, w: "Incident triggers act on the correlated incident." },
  { t: "Add approval steps for high-impact actions", c: true, w: "Human oversight for consequential actions." },
  { t: "Fully automate isolating production servers with no approval", c: false, w: "High-impact actions should require approval." } ],
 x: "Automation rules orchestrate, playbooks execute, incident triggers are usual, and high-impact actions get approval steps." },
{ type: "multi", s: "Distinguish detection from response in Sentinel/XDR.", e: "Team keeps mixing up the components.", q: "Select ALL correct statements:",
 options: [
  { t: "Analytics rules detect and raise incidents", c: true, w: "Detection is the analytics rule's job." },
  { t: "Automation rules orchestrate incidents (assign/tag/trigger)", c: true, w: "Automation rules handle orchestration." },
  { t: "Playbooks perform response actions via connectors", c: true, w: "Playbooks execute the response." },
  { t: "Defender XDR handles product-specific remediation", c: true, w: "XDR remediates within its products." },
  { t: "Playbooks are what detect the threats", c: false, w: "Detection is analytics rules; playbooks respond." } ],
 x: "Rules detect; automation rules orchestrate; playbooks respond; XDR remediates per product -- keep the roles distinct." },
],
boss: {
 title: "Operation Energy Drain: NOS-4-A2's Feast",
 brief: "NOS-4-A2, the energy vampire, is draining Star Command system by system -- an infected endpoint, a poisoned mailbox, a stolen identity, a rogue SaaS session. You hold the Defender XDR and Sentinel response console and five decisions. Contain first, remediate where it fed, and automate the counter -- and the vampire starves.",
 win: "The vampire is cornered and drained of power -- the endpoint contained, the mailbox purged, the identities reset, the SaaS session cut, and automation catching the next strike. NOS-4-A2 is powered down for good. Domain mission cleared.",
 lose: "NOS-4-A2 leapt to a system you left unguarded -- a device cleaned before containment, a threat remediated in the wrong product. Review where the response slipped, and deploy again.",
 stages: [
 { sit: "NOS-4-A2's first feast: a workstation is actively encrypting files and starting to spread. A junior Ranger wants to run a full scan right away.",
  e: "MDE alert: ransomware in progress, lateral movement beginning\nForensics will be needed",
  options: [
  { t: "Isolate the device first (contain), then collect the investigation package and scan in the contained state", d: 0, r: 4, ev: 1, ql: "best", w: "Contain first to stop lateral spread; evidence and scanning follow -- the correct MDE order." },
  { t: "Run a full antivirus scan before isolating", d: 16, r: -5, ev: 0, ql: "bad", w: "Scanning first lets the ransomware keep spreading; isolate to contain first." },
  { t: "Reimage the workstation immediately", d: 12, r: -3, ev: -10, ql: "ok", w: "Reimaging before containment and evidence collection destroys the forensic trail and may miss scope." } ]},
 { sit: "The vampire's attack fractures across endpoint, identity, and email. Separate alerts scatter through the portal.",
  e: "Related alerts firing in Defender for Endpoint, Identity, and Office 365 -- clearly one attack",
  options: [
  { t: "Investigate the single correlated Defender XDR incident holistically, pivoting across entities to scope", d: 0, r: 4, ev: 1, ql: "best", w: "XDR correlation shows the whole attack chain; pivoting entities reveals the full scope." },
  { t: "Chase each product's alert separately", d: 14, r: -4, ev: 0, ql: "bad", w: "Siloed alert-chasing misses the chain; the correlated incident is the point." },
  { t: "Close the alerts to clear the queue", d: 18, r: -6, ev: -6, ql: "bad", w: "Closing correlated attack alerts lets the vampire keep feeding unseen." } ]},
 { sit: "Scoping reveals the vampire hit three systems at once: a phishing mailbox, an on-prem AD account, and a SaaS session.",
  e: "Malicious email in mailboxes | Pass-the-Hash on on-prem AD | mass download in a SaaS app",
  options: [
  { t: "Remediate each where it lives: purge mail (Office 365), disable/reset the AD account (Defender for Identity), suspend the SaaS session (Cloud Apps)", d: 0, r: 4, ev: 0, ql: "best", w: "Remediate each part in its own product -- no single tool covers email, on-prem identity, and SaaS." },
  { t: "Handle all three only in Defender for Endpoint", d: 16, r: -5, ev: 0, ql: "bad", w: "Endpoint can't purge mailboxes, reset AD accounts, or cut SaaS sessions." },
  { t: "Only purge the email and move on", d: 12, r: -4, ev: 0, ql: "ok", w: "That leaves the identity and SaaS compromise active for the vampire to exploit." } ]},
 { sit: "NOS-4-A2 strikes faster than the team can react, hitting incident after incident.",
  e: "Confirmed incidents need instant ownership, tagging, and an isolate + disable + block response -- but one action would take down a production server",
  options: [
  { t: "Use automation rules to orchestrate and trigger a playbook, with an approval step gating the high-impact server isolation", d: 0, r: 4, ev: 1, ql: "best", w: "Automation rules orchestrate; the playbook responds; approval gates the consequential action -- speed with control." },
  { t: "Fully automate every action including isolating the production server", d: 12, r: -4, ev: 0, ql: "ok", w: "Un-gated high-impact actions risk an outage; add an approval step." },
  { t: "Handle every incident manually", d: 14, r: -4, ev: 0, ql: "bad", w: "Manual-only can't match the vampire's pace; automate the routine." } ]},
 { sit: "The vampire makes a last dash to hide in the SIEM's ocean of logs. You must expose and track it in Sentinel.",
  e: "Need to enrich the incident, spot behavioral anomalies, and preserve findings for hand-off",
  options: [
  { t: "Enrich with watchlists and TI, use UEBA to surface the anomaly, and bookmark findings into the case for coordinated hand-off", d: 0, r: 4, ev: 0, ql: "best", w: "Watchlist/TI enrichment plus UEBA exposes the vampire, and bookmarks/case management preserve the record." },
  { t: "Ignore behavioral signals and rely only on signature alerts", d: 12, r: -4, ev: 0, ql: "bad", w: "Signatures miss the anomaly; UEBA is what surfaces the hidden behavior." },
  { t: "Delete the incident to clean up the queue", d: 16, r: -6, ev: -8, ql: "bad", w: "Deleting the incident destroys the investigation and lets the vampire escape unrecorded." } ]},
 ],
},
};
