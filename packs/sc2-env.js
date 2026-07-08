/* CONTENT PACK: SC-200 - Manage a Security Operations Environment (sc2-env) - 40 MCQ + 10 PBQ + 5 briefings + boss */
window.PACKS = window.PACKS || {};
window.PACKS["sc2-env"] = {
lessons: {
"sc2-env-1": { intro: "XL, the shape-shifting hulk, only grows stronger when your SOC tools work in isolation. Unify them under Defender XDR and his tricks fall apart.",
sections: [
{ h: "XDR vs SIEM/SOAR: the core distinction", b: "Microsoft Defender XDR is an Extended Detection and Response platform: it automatically correlates alerts across endpoints, identities, email, and cloud apps into a single INCIDENT. Microsoft Sentinel is the SIEM (ingests and correlates data from anything -- Microsoft and third-party) and SOAR (orchestrates automated response). The most-tested idea: XDR feeds cross-domain signals; Sentinel is the single pane that ingests everything and automates. Don't conflate them.", data: "Defender XDR = XDR: auto-correlates M365 signals into one incident\nSentinel = SIEM (ingest/correlate any source) + SOAR (automate response)\nXDR signals can flow INTO Sentinel" },
{ h: "The Defender product family", b: "Know each product's scope: Defender for Endpoint (devices/EDR), Defender for Office 365 (email and collaboration -- Teams, SharePoint, OneDrive), Defender for Identity (on-prem Active Directory identity attacks like Pass-the-Hash, Kerberoasting, recon), Defender for Cloud Apps (SaaS/CASB app discovery and control), and Defender for Cloud (cloud workload protection). Matching a threat to the right product is a recurring exam skill.", data: "Endpoint -> devices (EDR)\nOffice 365 -> email/Teams/SharePoint/OneDrive\nIdentity -> on-prem AD attacks (NOT cloud/Entra)\nCloud Apps -> SaaS/CASB\nDefender for Cloud -> cloud workloads" },
{ h: "Defender for Identity vs Entra ID Protection", b: "A classic trap: Microsoft Defender for Identity monitors ON-PREMISES Active Directory for identity-based attacks. Entra ID Protection (from the SC-300 world) covers CLOUD identity risk (leaked credentials, risky sign-ins). Don't attribute cloud identity risk detection to Defender for Identity, or on-prem AD attacks to Entra ID Protection." },
{ h: "Incident correlation and the unified portal", b: "Defender XDR groups related alerts from multiple products into one correlated incident so you investigate the whole attack chain, not scattered alerts. The unified Microsoft Defender portal is the single console for XDR and Sentinel together (unified SecOps). Investigate the incident holistically before responding -- that end-to-end view is exactly what a unified platform gives you and what XL fears." },
],
traps: [
"Defender XDR = XDR (auto-correlates M365 signals into incidents); Sentinel = SIEM+SOAR (ingests everything and automates). Swapping their roles is the classic wrong answer.",
"Defender for Identity is ON-PREM Active Directory; Entra ID Protection is CLOUD identity risk -- never mix them.",
"Match the threat to the right Defender product (email -> Office 365, device -> Endpoint, SaaS -> Cloud Apps).",
"Investigate the correlated INCIDENT holistically, not individual alerts, to see the full attack chain." ],
keys: [
"Defender XDR (XDR) correlates M365 signals into incidents; Sentinel is SIEM+SOAR.",
"Know each Defender product's scope (Endpoint/Office 365/Identity/Cloud Apps/Cloud).",
"Defender for Identity = on-prem AD; Entra ID Protection = cloud identity.",
"The unified Defender portal runs XDR + Sentinel together (unified SecOps)." ] },

"sc2-env-2": { intro: "XL floods your sensors with noise so real threats slip by. Tune Defender XDR settings -- notifications, suppression, RBAC -- and the signal cuts through.",
sections: [
{ h: "Alert tuning, suppression, and correlation", b: "When a detection generates too many false positives, you TUNE it -- adjust thresholds, add entity exclusions, refine the logic, or suppress specific known-benign patterns. The critical exam principle: never simply DISABLE a detection to quiet noise, because that creates a blind spot. Tuning reduces noise while preserving detection. Correlation groups related alerts to cut redundant noise.", data: "Too noisy? TUNE it:\n- add entity exclusions\n- adjust thresholds\n- refine query logic / suppress known-benign\nNEVER just disable -> that is a blind spot" },
{ h: "Notifications: incidents, actions, threat analytics", b: "Defender XDR email notification rules alert the right people about new incidents, remediation actions taken, and relevant threat analytics. You scope notifications by severity, device group, or service source so responders aren't buried. Configuring these correctly means the SOC hears about what matters and ignores what doesn't." },
{ h: "Role-based access control for SOC tiers", b: "Assign least-privilege roles so Tier 1 analysts, Tier 2 responders, and admins each get exactly the access they need. Defender XDR uses Unified RBAC (and Entra roles) to scope who can view alerts, run response actions, or change settings. Device groups (in Defender for Endpoint) let you scope permissions and automation levels to subsets of machines -- e.g., delegating a region's devices to a regional team." },
{ h: "Automated Investigation and Response (AIR) and automation levels", b: "Automated Investigation and Response automatically investigates alerts and can remediate (quarantine a file, isolate a device) based on the configured AUTOMATION LEVEL per device group -- from no automation, to semi-automatic (require approval), to full automation. Higher automation speeds response but needs trust in the environment; you set the level per device group to balance speed and control." },
],
traps: [
"To fix a noisy detection, TUNE it (exclusions/thresholds/refine) -- disabling it removes coverage and creates a blind spot (the trap answer).",
"Automation levels are set PER DEVICE GROUP in Defender for Endpoint -- from no automation to full auto; match the level to how much you trust that group.",
"Scope notifications and RBAC by severity/device group so responders get the right signals and least-privilege access.",
"Device groups scope both permissions AND automation levels -- they're how you delegate and tier the SOC." ],
keys: [
"Tune noisy detections (exclusions/thresholds/refine); never just disable them.",
"Configure notification rules for incidents, actions, and threat analytics.",
"Use RBAC + device groups to give each SOC tier least-privilege scoped access.",
"AIR remediates automatically at the automation level set per device group." ] },

"sc2-env-3": { intro: "XL's raw power is nothing without a place to land his blows. Design the Sentinel workspace right -- the foundation every detection and response stands on.",
sections: [
{ h: "The Sentinel workspace and Log Analytics", b: "Microsoft Sentinel is built on a Log Analytics workspace -- the store where all ingested security data lives and where KQL queries run. Designing the workspace (region, single vs multiple workspaces, RBAC, and which data to bring in) is foundational: it affects cost, query scope, and access boundaries. Sentinel adds SIEM/SOAR capabilities on top of that workspace." },
{ h: "Sentinel roles", b: "Sentinel has purpose-built roles: Microsoft Sentinel Reader (view), Responder (view + manage incidents), and Contributor (create/edit analytics rules, playbooks, etc.), plus Playbook Operator and Automation Contributor for automation. Assign least privilege: a Tier 1 analyst triaging incidents needs Responder, not Contributor. Workspace-level Log Analytics permissions also apply.", data: "Sentinel Reader -> read-only\nSentinel Responder -> manage incidents\nSentinel Contributor -> create/edit rules & playbooks\n(least privilege per SOC role)" },
{ h: "Data retention and tiers", b: "Data retention is managed per table across tiers: the Analytics tier (fully queryable, interactive, higher cost) for hot detection data; longer-term/archive and the emerging Data Lake tier for cheaper long-term storage; and XDR tiers for Defender data. You set retention to balance investigation needs, compliance, and cost -- keeping hot data queryable and archiving the rest." },
{ h: "SOC optimization and workbooks", b: "SOC optimization recommendations help you tune coverage and cost -- surfacing unused data, gaps in detection coverage (mapped to MITRE ATT&CK), and tables you're paying to ingest but not using. Workbooks provide interactive dashboards/visualizations over your data for monitoring and reporting. Together they keep the workspace efficient and the coverage visible." },
],
traps: [
"Sentinel runs on a Log Analytics workspace -- workspace design (region, count, RBAC, data) is a foundational planning decision, not an afterthought.",
"Assign the least-privileged Sentinel role for the task: Responder manages incidents; Contributor edits rules -- don't over-grant Contributor to triage analysts.",
"Retention is per-table across tiers (Analytics hot/queryable vs archive/data lake cheaper) -- balance query needs, compliance, and cost.",
"SOC optimization surfaces coverage gaps (MITRE) and wasted ingestion -- use it to tune, not ignore." ],
keys: [
"Sentinel = SIEM/SOAR on a Log Analytics workspace (the data store for KQL).",
"Sentinel roles: Reader/Responder/Contributor -- assign least privilege per tier.",
"Retention is per-table across Analytics/archive/data lake/XDR tiers (balance cost).",
"SOC optimization + workbooks keep coverage visible and ingestion efficient." ] },

"sc2-env-4": { intro: "XL cuts your supply lines so the SOC starves for data. Data connectors are those lines -- pick the right one for each source or you fly blind.",
sections: [
{ h: "Data connectors and choosing by source", b: "Data connectors bring telemetry into Sentinel. You select the connector based on the SOURCE: native connectors for Microsoft services (Entra ID, Defender XDR, Office 365, Azure Activity), and standards-based connectors (Syslog, CEF) for third-party appliances like firewalls. Choosing the wrong ingestion path means missing data -- match the connector to what the source emits.", data: "Microsoft service -> native connector (Entra, Defender, Office 365)\nThird-party firewall/appliance -> CEF or Syslog\nWindows security events -> Windows Security Events via AMA\nAzure resource logs -> diagnostic settings" },
{ h: "Windows events: AMA and data collection rules (WEF)", b: "Collect Windows Security events using the Windows Security Events connector via the Azure Monitor Agent (AMA), configured with Data Collection Rules (DCRs) that define which events to gather and from where. For scale, Windows Event Forwarding (WEF) consolidates events to collectors that AMA then ships. DCRs are the control plane for what Windows telemetry you ingest.", data: "Windows Security Events via AMA + Data Collection Rule (DCR)\nDCR defines which events to collect\nWEF consolidates events at scale before AMA ships them" },
{ h: "Syslog and CEF via AMA", b: "For Linux and network/appliance logs, use Syslog via AMA (raw syslog) or Common Event Format (CEF) via AMA (a structured, normalized syslog format many security appliances emit). CEF gives richer, parsed fields; plain Syslog is more generic. You route these through AMA with the appropriate DCR. Match CEF vs Syslog to what the appliance actually sends." },
{ h: "Azure activity, custom logs, and threat intelligence", b: "Ingest Azure control-plane activity via the Azure Activity connector (using Azure Policy / diagnostic settings), and create custom log tables to store non-standard ingested data. Threat intelligence connectors bring in threat indicators (IOCs) -- feeding TI so detections and hunting can match against known-bad domains, IPs, and hashes. Diagnostic settings are how Azure resources export their logs into the workspace." },
],
traps: [
"Choose the connector by SOURCE: native for Microsoft services, CEF/Syslog for third-party appliances, Windows Security Events via AMA for Windows logs.",
"Windows event collection is configured via AMA + Data Collection Rules (DCRs); WEF consolidates at scale -- DCRs define WHAT you collect.",
"CEF is structured/normalized syslog (richer fields); plain Syslog is generic -- pick based on what the appliance emits.",
"Azure resource logs reach the workspace via diagnostic settings; threat intelligence connectors ingest IOCs for matching." ],
keys: [
"Select connectors by source: native (MS) vs CEF/Syslog (third-party) vs AMA (Windows).",
"Windows Security Events via AMA uses Data Collection Rules; WEF scales collection.",
"Syslog via AMA (generic) vs CEF via AMA (structured) for Linux/appliances.",
"Azure Activity via diagnostic settings; custom log tables + TI connectors for IOCs." ] },

"sc2-env-5": { intro: "XL strikes fast, so your traps must trigger themselves. Analytics rules and automation are the self-arming defenses that catch and counter him without waiting on you.",
sections: [
{ h: "Analytics rule types", b: "Sentinel analytics rules detect threats and raise alerts/incidents. Know the types: SCHEDULED (a KQL query on a recurring schedule -- the workhorse, fully customizable), NEAR-REAL-TIME (NRT) (runs about every minute for fast detection), MICROSOFT SECURITY (auto-creates Sentinel incidents from other Microsoft product alerts), FUSION / MACHINE LEARNING (multi-stage attack and anomaly detection via ML), and THREAT INTELLIGENCE (matches your data against TI indicators). Pick the type by the detection need.", data: "Scheduled -> custom KQL on a schedule (most flexible)\nNRT -> ~1-minute latency for speed\nML/Fusion -> multi-stage/anomaly correlation\nThreat Intelligence -> match data to IOC indicators\nMicrosoft Security -> incidents from MS product alerts" },
{ h: "Analytics rules vs playbooks (distinct roles)", b: "A frequently confused pair: ANALYTICS RULES detect (they generate alerts/incidents). PLAYBOOKS respond (they automate actions). They are separate components -- a rule finds the threat, a playbook (a Logic App) reacts to it. Don't mix their functions on the exam.", data: "Analytics rule = DETECT (raise alert/incident)\nPlaybook = RESPOND (automate action, built on Logic Apps)" },
{ h: "Automation rules and playbooks (SOAR)", b: "Automation rules orchestrate incident handling -- automatically assigning, tagging, changing severity, suppressing, or triggering playbooks when incidents are created or updated. Playbooks are Logic Apps that perform response actions (isolate a machine via the Defender connector, disable a user, post to Teams, open a ticket). Together they are Sentinel's SOAR: automation rules decide what happens, playbooks do the work." },
{ h: "MITRE ATT&CK coverage and custom detections", b: "Map analytics rules to MITRE ATT&CK tactics/techniques to visualize and close coverage gaps -- the ATT&CK coverage view shows where you can and can't detect. Create custom analytics rules (a scheduled KQL query with entity mappings and incident settings) to detect organization-specific threats the built-in rules miss. Entity mapping enriches alerts so investigation and correlation work well." },
],
traps: [
"Analytics rules DETECT (raise alerts/incidents); playbooks RESPOND (automate actions). Confusing the two is the classic wrong answer.",
"Pick the rule type by need: Scheduled (custom KQL), NRT (~1-min speed), ML/Fusion (multi-stage/anomaly), Threat Intelligence (IOC match).",
"Automation rules orchestrate incident handling (assign/tag/severity/trigger playbooks); playbooks (Logic Apps) do the response work.",
"Map rules to MITRE ATT&CK to see and close coverage gaps; use entity mapping so alerts enrich and correlate." ],
keys: [
"Analytics rule types: Scheduled, NRT, ML/Fusion, Threat Intelligence, Microsoft Security.",
"Analytics rules DETECT; playbooks (Logic Apps) RESPOND -- distinct components.",
"Automation rules orchestrate incidents and trigger playbooks (Sentinel SOAR).",
"Map to MITRE ATT&CK for coverage; custom scheduled rules with entity mapping." ] },
},
mcq: {
"sc2-env-1": [
{ s: "A team debates whether Defender XDR or Sentinel is the SIEM.", e: "One ingests any source and automates response; one auto-correlates M365 signals", q: "Which statement is correct?", options: [
 { t: "Defender XDR is the XDR that correlates M365 signals into incidents; Sentinel is the SIEM/SOAR that ingests any source and automates", c: true, w: "XDR correlates cross-domain M365 signals; Sentinel is the SIEM (ingest/correlate anything) plus SOAR (automate)." },
 { t: "Defender XDR is the SIEM and Sentinel is the XDR", c: false, w: "Reversed -- Sentinel is the SIEM/SOAR; Defender XDR is the XDR." },
 { t: "They are the same product", c: false, w: "They are distinct: XDR vs SIEM/SOAR." },
 { t: "Neither ingests third-party data", c: false, w: "Sentinel ingests third-party data broadly as a SIEM." } ] },
{ s: "An on-premises Active Directory shows Pass-the-Hash and Kerberoasting activity.", e: "Identity-based attacks on on-prem AD", q: "Which product detects this?", options: [
 { t: "Microsoft Defender for Identity", c: true, w: "Defender for Identity monitors on-prem AD for identity attacks like Pass-the-Hash and Kerberoasting." },
 { t: "Entra ID Protection", c: false, w: "Entra ID Protection covers cloud identity risk, not on-prem AD attacks." },
 { t: "Defender for Office 365", c: false, w: "That protects email/collaboration, not AD identity attacks." },
 { t: "Defender for Endpoint only", c: false, w: "Endpoint is device EDR; AD identity attacks are Defender for Identity's scope." } ] },
{ s: "A phishing email with a malicious link targets users in Teams and SharePoint.", e: "Email and collaboration threat", q: "Which Defender product is responsible?", options: [
 { t: "Microsoft Defender for Office 365", c: true, w: "Defender for Office 365 protects email and collaboration (Teams, SharePoint, OneDrive)." },
 { t: "Defender for Identity", c: false, w: "That's on-prem AD identity, not email/collaboration." },
 { t: "Defender for Cloud", c: false, w: "That's cloud workload protection, not email." },
 { t: "Entra ID Protection", c: false, w: "That's cloud identity risk, not email threats." } ] },
{ s: "Alerts from endpoint, identity, and email all relate to one attack.", e: "Goal: see the whole attack chain", q: "How does Defender XDR help?", options: [
 { t: "It correlates the related alerts into a single incident to investigate holistically", c: true, w: "XDR groups related cross-product alerts into one incident for end-to-end investigation." },
 { t: "It keeps each alert separate so nothing is missed", c: false, w: "Correlation into one incident is the value; scattered alerts hide the chain." },
 { t: "It deletes duplicate alerts", c: false, w: "It correlates, not merely deletes; the point is the unified incident view." },
 { t: "It forwards alerts to email only", c: false, w: "Notifications are separate; correlation builds the incident." } ] },
{ s: "A SaaS app (unsanctioned) is being used to exfiltrate data.", e: "Shadow IT / CASB scenario", q: "Which product discovers and controls it?", options: [
 { t: "Microsoft Defender for Cloud Apps", c: true, w: "Defender for Cloud Apps (CASB) discovers and controls SaaS app usage." },
 { t: "Defender for Endpoint", c: false, w: "Endpoint is device EDR, not SaaS discovery." },
 { t: "Defender for Identity", c: false, w: "That's on-prem AD identity." },
 { t: "Entra ID Protection", c: false, w: "That's cloud identity risk, not SaaS app control." } ] },
{ s: "Cloud identity risk (leaked credentials, risky sign-ins) must be detected.", e: "Cloud identity, not on-prem", q: "Which product?", options: [
 { t: "Entra ID Protection", c: true, w: "Entra ID Protection detects cloud identity risk like leaked credentials and risky sign-ins." },
 { t: "Microsoft Defender for Identity", c: false, w: "That's on-prem AD identity attacks, not cloud identity risk." },
 { t: "Defender for Office 365", c: false, w: "That's email/collaboration." },
 { t: "Defender for Endpoint", c: false, w: "That's device EDR." } ] },
{ s: "An analyst wants one console for both Defender XDR and Sentinel.", e: "Unified SecOps experience", q: "What provides this?", options: [
 { t: "The unified Microsoft Defender portal", c: true, w: "The unified Defender portal runs XDR and Sentinel together for unified SecOps." },
 { t: "The Azure billing portal", c: false, w: "Billing is unrelated to SecOps consoles." },
 { t: "A Logic App", c: false, w: "Logic Apps power playbooks, not the unified console." },
 { t: "A data collection rule", c: false, w: "DCRs govern data collection, not the portal." } ] },
{ s: "A device (endpoint) shows EDR alerts for suspicious process behavior.", e: "Device-level detection and response", q: "Which product owns this?", options: [
 { t: "Microsoft Defender for Endpoint", c: true, w: "Defender for Endpoint is the EDR for devices." },
 { t: "Defender for Office 365", c: false, w: "That's email/collaboration, not devices." },
 { t: "Defender for Cloud Apps", c: false, w: "That's SaaS/CASB, not device EDR." },
 { t: "Entra ID Protection", c: false, w: "That's cloud identity risk, not device EDR." } ] } ],

"sc2-env-2": [
{ s: "A Sentinel analytics rule is generating too many false positives.", e: "SOC is overwhelmed with benign alerts", q: "Best action?", options: [
 { t: "Tune the rule (add entity exclusions, adjust the threshold, or refine the KQL)", c: true, w: "Tuning reduces noise while preserving detection -- the correct approach to false positives." },
 { t: "Disable the rule to stop the noise", c: false, w: "Disabling creates a blind spot -- the classic wrong answer." },
 { t: "Delete all incidents it created", c: false, w: "That hides symptoms without fixing the noisy rule." },
 { t: "Ignore the alerts", c: false, w: "Ignoring real-plus-false alerts risks missing true positives." } ] },
{ s: "Automated Investigation and Response should auto-remediate on a trusted set of servers but require approval elsewhere.", e: "Different trust per group", q: "How is this configured?", options: [
 { t: "Set the automation level per device group (full auto for trusted, semi/approval elsewhere)", c: true, w: "Automation levels are set per device group to balance speed and control." },
 { t: "One global automation level for the whole tenant", c: false, w: "Per-device-group levels allow differentiated trust." },
 { t: "Disable AIR entirely", c: false, w: "That removes automated response instead of tiering it." },
 { t: "Use a Sentinel analytics rule", c: false, w: "Analytics rules detect; AIR automation levels are a Defender for Endpoint setting." } ] },
{ s: "A Tier 1 analyst needs to triage incidents but must not change detection rules.", e: "Least privilege for a triage role", q: "Best approach?", options: [
 { t: "Grant a role scoped to view and manage incidents, not edit rules", c: true, w: "Least privilege: triage needs incident management, not rule-editing (Contributor) rights." },
 { t: "Grant full administrator to be safe", c: false, w: "Over-granting violates least privilege." },
 { t: "Grant no access and have them ask others", c: false, w: "They can't do their job without incident access." },
 { t: "Give them the ability to delete the workspace", c: false, w: "Wildly excessive and dangerous." } ] },
{ s: "Notifications are burying responders in low-value emails.", e: "Goal: right signals to right people", q: "Best tuning?", options: [
 { t: "Scope notification rules by severity, device group, or source so responders get what matters", c: true, w: "Scoped notification rules deliver relevant alerts without noise." },
 { t: "Turn off all notifications", c: false, w: "That risks missing critical incidents entirely." },
 { t: "Send every alert to everyone", c: false, w: "That's the noise problem being solved." },
 { t: "Disable all detections", c: false, w: "That removes coverage; it doesn't fix notification scope." } ] },
{ s: "A regional team should manage only their region's devices in Defender for Endpoint.", e: "Scoped delegation of devices", q: "Which feature?", options: [
 { t: "Device groups scoping permissions (and automation levels) to that region", c: true, w: "Device groups scope both RBAC and automation to subsets of machines." },
 { t: "A single global admin role for everyone", c: false, w: "That grants tenant-wide power, not regional scope." },
 { t: "A Sentinel watchlist", c: false, w: "Watchlists are data references, not device-permission scoping." },
 { t: "A data collection rule", c: false, w: "DCRs govern data ingestion, not device permissions." } ] },
{ s: "A detection is mostly noise but occasionally catches a real threat.", e: "One benign source causes most false positives", q: "Best tuning technique?", options: [
 { t: "Add an entity exclusion for the known-benign source while keeping the rule active", c: true, w: "Excluding the benign entity cuts noise while preserving detection for everything else." },
 { t: "Disable the rule", c: false, w: "Disabling loses the real detections it occasionally catches." },
 { t: "Raise severity to critical", c: false, w: "That worsens noise, not reduces it." },
 { t: "Delete the workspace", c: false, w: "Absurd and destructive." } ] },
{ s: "The SOC wants email alerts for new incidents, actions taken, and relevant threat analytics.", e: "Defender XDR notifications", q: "What do you configure?", options: [
 { t: "Email notification rules for incidents, actions, and threat analytics", c: true, w: "Defender XDR notification rules cover incidents, remediation actions, and threat analytics." },
 { t: "A Logic App playbook only", c: false, w: "Playbooks can notify, but the built-in notification rules are the direct answer." },
 { t: "A data collection rule", c: false, w: "DCRs govern ingestion, not notifications." },
 { t: "A watchlist", c: false, w: "Watchlists are reference data, not notifications." } ] },
{ s: "AIR quarantined a file automatically on a device group set to full automation.", e: "Understanding AIR behavior", q: "What determined this outcome?", options: [
 { t: "The device group's automation level was set to full automation", c: true, w: "AIR remediation depends on the automation level configured for that device group." },
 { t: "A Sentinel playbook ran the quarantine", c: false, w: "This was AIR at the group's automation level, not necessarily a playbook." },
 { t: "The analyst manually approved it", c: false, w: "Full automation means no manual approval was needed." },
 { t: "Notifications triggered it", c: false, w: "Notifications inform; they don't remediate." } ] } ],

"sc2-env-3": [
{ s: "An engineer asks what Microsoft Sentinel is built on.", e: "Where ingested data lives and KQL runs", q: "Correct answer?", options: [
 { t: "A Log Analytics workspace", c: true, w: "Sentinel is built on a Log Analytics workspace -- the data store where KQL queries run." },
 { t: "A SharePoint site", c: false, w: "SharePoint is collaboration, not the Sentinel data store." },
 { t: "A device group", c: false, w: "Device groups are a Defender for Endpoint construct." },
 { t: "A Logic App", c: false, w: "Logic Apps power playbooks, not the data store." } ] },
{ s: "A Tier 1 analyst should manage Sentinel incidents but not edit analytics rules.", e: "Least-privilege Sentinel role", q: "Which role?", options: [
 { t: "Microsoft Sentinel Responder", c: true, w: "Responder can manage incidents without the rule-editing power of Contributor." },
 { t: "Microsoft Sentinel Contributor", c: false, w: "Contributor can create/edit rules -- more than a triage analyst needs." },
 { t: "Microsoft Sentinel Reader", c: false, w: "Reader is read-only and can't manage incidents." },
 { t: "Owner of the subscription", c: false, w: "Far too broad for incident triage." } ] },
{ s: "A detection engineer must create and edit analytics rules and playbooks.", e: "Role selection", q: "Which Sentinel role fits?", options: [
 { t: "Microsoft Sentinel Contributor", c: true, w: "Contributor can create and edit analytics rules and playbooks." },
 { t: "Microsoft Sentinel Reader", c: false, w: "Reader can't create or edit anything." },
 { t: "Microsoft Sentinel Responder", c: false, w: "Responder manages incidents but doesn't edit rules." },
 { t: "No role is needed", c: false, w: "Editing rules requires an appropriate role." } ] },
{ s: "Hot detection data must stay queryable, while old data should be archived cheaply.", e: "Retention across tiers", q: "Best approach?", options: [
 { t: "Set per-table retention: Analytics tier for hot queryable data, archive/data lake for cheap long-term", c: true, w: "Per-table retention across tiers balances query needs and cost." },
 { t: "Keep everything in the Analytics tier forever", c: false, w: "That's expensive; archive cheaper tiers for old data." },
 { t: "Delete all data after a day", c: false, w: "That destroys investigation and compliance value." },
 { t: "Store nothing", c: false, w: "You need data to detect and investigate." } ] },
{ s: "The SOC wants to find detection coverage gaps and wasted ingestion.", e: "Optimize coverage and cost", q: "Which capability?", options: [
 { t: "SOC optimization recommendations (coverage gaps mapped to MITRE, unused data)", c: true, w: "SOC optimization surfaces coverage gaps and wasted ingestion to tune." },
 { t: "A single analytics rule", c: false, w: "One rule doesn't assess overall coverage/cost." },
 { t: "A device group", c: false, w: "Device groups are Defender for Endpoint scoping." },
 { t: "A Logic App", c: false, w: "Logic Apps automate response, not coverage analysis." } ] },
{ s: "Leadership wants interactive dashboards over Sentinel data for monitoring.", e: "Visualization need", q: "Which feature?", options: [
 { t: "Workbooks", c: true, w: "Workbooks provide interactive dashboards/visualizations over workspace data." },
 { t: "Automation rules", c: false, w: "Those orchestrate incidents, not dashboards." },
 { t: "Data collection rules", c: false, w: "DCRs govern ingestion, not visualization." },
 { t: "Watchlists", c: false, w: "Watchlists are reference data, not dashboards." } ] },
{ s: "An architect plans whether to use one Sentinel workspace or several.", e: "Foundational design decision", q: "Why does this matter?", options: [
 { t: "Workspace design affects cost, query scope, RBAC boundaries, and data residency", c: true, w: "Workspace count/region/RBAC/data are foundational and shape cost and access." },
 { t: "It has no impact on cost or access", c: false, w: "It significantly impacts both." },
 { t: "Sentinel doesn't use workspaces", c: false, w: "Sentinel is built on a Log Analytics workspace." },
 { t: "Only device groups matter", c: false, w: "Device groups are a Defender for Endpoint concept, not workspace design." } ] },
{ s: "A read-only auditor needs to view Sentinel content but change nothing.", e: "Least-privilege read access", q: "Which role?", options: [
 { t: "Microsoft Sentinel Reader", c: true, w: "Reader provides read-only visibility without change rights." },
 { t: "Microsoft Sentinel Contributor", c: false, w: "Contributor can edit -- more than read-only." },
 { t: "Microsoft Sentinel Responder", c: false, w: "Responder can manage incidents -- more than viewing." },
 { t: "Subscription Owner", c: false, w: "Far too broad for a read-only auditor." } ] } ],

"sc2-env-4": [
{ s: "A third-party firewall appliance must send logs to Sentinel.", e: "Appliance emits standardized security events", q: "Which connector approach?", options: [
 { t: "CEF (Common Event Format) via AMA, or Syslog via AMA", c: true, w: "Third-party appliances typically send CEF or Syslog, ingested via AMA." },
 { t: "The native Defender XDR connector", c: false, w: "Native connectors are for Microsoft services, not a third-party firewall." },
 { t: "Windows Security Events via AMA", c: false, w: "That's for Windows event logs, not a firewall appliance." },
 { t: "No connector is possible", c: false, w: "CEF/Syslog connectors exist for exactly this." } ] },
{ s: "Windows Security events must be collected from servers into Sentinel.", e: "Choosing the ingestion path", q: "Best approach?", options: [
 { t: "Windows Security Events via AMA, configured with a Data Collection Rule", c: true, w: "The Windows Security Events connector uses AMA with a DCR defining which events to collect." },
 { t: "CEF via AMA", c: false, w: "CEF is for appliances, not native Windows security events." },
 { t: "The Office 365 connector", c: false, w: "That's for Office 365 data, not Windows events." },
 { t: "A watchlist", c: false, w: "Watchlists are reference data, not event collection." } ] },
{ s: "An engineer must define exactly which Windows events are collected and from where.", e: "Control plane for AMA collection", q: "Which construct?", options: [
 { t: "A Data Collection Rule (DCR)", c: true, w: "DCRs define which events AMA collects and from which sources." },
 { t: "An analytics rule", c: false, w: "Analytics rules detect; DCRs govern collection." },
 { t: "A playbook", c: false, w: "Playbooks automate response, not collection." },
 { t: "A workbook", c: false, w: "Workbooks visualize; they don't define collection." } ] },
{ s: "At scale, Windows events should be consolidated before shipping to Sentinel.", e: "Large fleet event collection", q: "Which mechanism?", options: [
 { t: "Windows Event Forwarding (WEF) to collectors, then AMA ships them", c: true, w: "WEF consolidates events at scale; AMA forwards from the collectors." },
 { t: "CEF via AMA on each server", c: false, w: "CEF is for appliances; WEF is the Windows consolidation approach." },
 { t: "A single watchlist", c: false, w: "Watchlists don't collect events." },
 { t: "The Azure Activity connector", c: false, w: "That's for Azure control-plane logs, not Windows events." } ] },
{ s: "Azure control-plane operations (who did what in Azure) must reach Sentinel.", e: "Azure resource/activity logs", q: "Which connector/mechanism?", options: [
 { t: "The Azure Activity connector using Azure Policy / diagnostic settings", c: true, w: "Azure Activity is ingested via the connector using Azure Policy and diagnostic settings." },
 { t: "Windows Security Events via AMA", c: false, w: "That's for Windows events, not Azure activity." },
 { t: "CEF via AMA", c: false, w: "CEF is for third-party appliances." },
 { t: "A Defender for Endpoint device group", c: false, w: "Device groups don't ingest Azure activity." } ] },
{ s: "A Linux host must send its syslog to Sentinel with generic, unstructured events.", e: "Linux logging", q: "Which connector?", options: [
 { t: "Syslog via AMA", c: true, w: "Syslog via AMA ingests generic Linux syslog events." },
 { t: "Windows Security Events via AMA", c: false, w: "That's for Windows, not Linux syslog." },
 { t: "The Office 365 connector", c: false, w: "Unrelated to Linux syslog." },
 { t: "A watchlist", c: false, w: "Watchlists are reference data, not log ingestion." } ] },
{ s: "Non-standard application data must be stored in a table you define.", e: "Custom ingestion target", q: "What do you create?", options: [
 { t: "A custom log table in the workspace", c: true, w: "Custom log tables store non-standard ingested data." },
 { t: "A new Sentinel role", c: false, w: "Roles govern access, not data storage." },
 { t: "A device group", c: false, w: "That's Defender for Endpoint scoping, not a data table." },
 { t: "An automation rule", c: false, w: "Automation rules orchestrate incidents, not storage." } ] },
{ s: "The SOC wants detections to match against known-bad IPs, domains, and hashes.", e: "Bringing in indicators of compromise", q: "Which connector type?", options: [
 { t: "A threat intelligence connector that ingests threat indicators (IOCs)", c: true, w: "TI connectors bring in indicators so detections and hunting can match known-bad artifacts." },
 { t: "The Windows Security Events connector", c: false, w: "That collects Windows events, not TI indicators." },
 { t: "A workbook", c: false, w: "Workbooks visualize; they don't ingest TI." },
 { t: "A device group", c: false, w: "Device groups don't ingest threat intelligence." } ] } ],

"sc2-env-5": [
{ s: "A detection engineer needs a fully custom KQL detection running on a schedule.", e: "Maximum flexibility", q: "Which analytics rule type?", options: [
 { t: "Scheduled analytics rule (custom KQL on a recurring schedule)", c: true, w: "Scheduled rules run custom KQL on a schedule -- the most flexible type." },
 { t: "Machine learning rule", c: false, w: "ML rules detect anomalies/multi-stage attacks, not arbitrary custom KQL." },
 { t: "Microsoft Security rule", c: false, w: "That auto-creates incidents from MS product alerts, not custom KQL." },
 { t: "Threat intelligence rule", c: false, w: "TI rules match indicators, not arbitrary custom logic." } ] },
{ s: "A detection must fire with minimal delay (about a minute).", e: "Low-latency detection", q: "Which rule type?", options: [
 { t: "Near-real-time (NRT) analytics rule", c: true, w: "NRT rules run about every minute for fast detection." },
 { t: "Scheduled rule with a daily cadence", c: false, w: "Daily scheduling is far slower than NRT." },
 { t: "A workbook", c: false, w: "Workbooks visualize; they don't detect." },
 { t: "A watchlist", c: false, w: "Watchlists are reference data, not detections." } ] },
{ s: "The SOC wants to detect multi-stage attacks by correlating anomalies across signals.", e: "Advanced correlation", q: "Which rule type?", options: [
 { t: "Fusion / machine learning analytics rules", c: true, w: "Fusion/ML rules correlate multi-stage attacks and anomalies." },
 { t: "A single scheduled rule", c: false, w: "A basic scheduled rule doesn't do ML multi-stage correlation." },
 { t: "Threat intelligence rule", c: false, w: "TI matches indicators; it isn't multi-stage ML correlation." },
 { t: "A workbook", c: false, w: "Workbooks visualize, not correlate detections." } ] },
{ s: "An analyst confuses analytics rules with playbooks.", e: "One detects, one responds", q: "Correct distinction?", options: [
 { t: "Analytics rules detect (raise alerts/incidents); playbooks respond (automate actions via Logic Apps)", c: true, w: "Rules detect; playbooks (Logic Apps) automate the response -- distinct components." },
 { t: "Analytics rules automate response; playbooks detect", c: false, w: "Reversed -- rules detect, playbooks respond." },
 { t: "They are the same thing", c: false, w: "They are separate Sentinel components." },
 { t: "Both only send email", c: false, w: "Rules detect and playbooks perform many response actions." } ] },
{ s: "When an incident is created, it should be auto-assigned, tagged, and trigger a response playbook.", e: "Incident orchestration", q: "Which Sentinel feature?", options: [
 { t: "An automation rule", c: true, w: "Automation rules orchestrate incident handling (assign/tag/severity) and trigger playbooks." },
 { t: "A scheduled analytics rule", c: false, w: "That detects; it doesn't orchestrate incident handling." },
 { t: "A data collection rule", c: false, w: "DCRs govern ingestion, not incident orchestration." },
 { t: "A workbook", c: false, w: "Workbooks visualize, not orchestrate." } ] },
{ s: "A playbook must isolate a machine, disable a user, and post to Teams when triggered.", e: "Automated response actions", q: "What is a playbook built on?", options: [
 { t: "A Logic App with connectors (e.g., Defender for Endpoint, Entra, Teams)", c: true, w: "Playbooks are Logic Apps using connectors to perform response actions." },
 { t: "A KQL scheduled query", c: false, w: "That's a detection, not the response automation." },
 { t: "A data collection rule", c: false, w: "DCRs collect data; they don't run response actions." },
 { t: "A watchlist", c: false, w: "Watchlists are reference data, not automation." } ] },
{ s: "The SOC wants to visualize where its detections do and don't cover the attack lifecycle.", e: "Coverage mapping", q: "What should analytics rules be mapped to?", options: [
 { t: "MITRE ATT&CK tactics and techniques", c: true, w: "Mapping rules to MITRE ATT&CK visualizes and closes coverage gaps." },
 { t: "Device groups", c: false, w: "Device groups scope permissions, not detection coverage mapping." },
 { t: "Log Analytics retention tiers", c: false, w: "Tiers govern storage, not attack-technique coverage." },
 { t: "Notification rules", c: false, w: "Notifications inform; they don't map coverage." } ] },
{ s: "Alerts from a custom rule lack the entity context needed for investigation.", e: "Enrich alerts for correlation", q: "What should the rule include?", options: [
 { t: "Entity mapping so alerts enrich with accounts, hosts, IPs for investigation and correlation", c: true, w: "Entity mapping enriches alerts so investigation and correlation work well." },
 { t: "A higher retention tier", c: false, w: "Retention doesn't add entity context to alerts." },
 { t: "A device group", c: false, w: "Device groups don't map entities in analytics rules." },
 { t: "A workbook", c: false, w: "Workbooks visualize; they don't map rule entities." } ] } ],
},
pbqs: [
{ type: "order", s: "You must stand up a new Sentinel-based SOC from scratch.", task: "Order the environment setup steps:",
 steps: ["Design and create the Log Analytics workspace (region, RBAC)", "Enable Microsoft Sentinel on the workspace", "Connect data sources with the appropriate connectors", "Create and tune analytics rules (map to MITRE ATT&CK)", "Configure automation rules and playbooks for response"],
 x: "Build the workspace foundation, enable Sentinel, ingest data, add detections mapped to ATT&CK, then automate response -- collection precedes detection precedes response." },
{ type: "order", s: "Windows Security events must be collected at scale into Sentinel.", task: "Order the collection setup:",
 steps: ["Deploy the Azure Monitor Agent (AMA) to the sources", "Create a Data Collection Rule defining which events to collect", "Use Windows Event Forwarding to consolidate at scale", "Enable the Windows Security Events via AMA connector", "Verify events arrive in the workspace"],
 x: "AMA plus a DCR define collection; WEF consolidates at scale; the connector wires it to Sentinel; then you verify ingestion." },
{ type: "order", s: "A noisy analytics rule is flooding the SOC.", task: "Order the correct tuning workflow:",
 steps: ["Investigate the false-positive pattern", "Identify the benign entity or condition causing noise", "Add an entity exclusion or adjust the threshold/KQL", "Keep the rule enabled and monitor the new signal-to-noise", "Document the tuning change"],
 x: "Diagnose the noise, target the benign cause, tune (never disable) while keeping detection, then verify and document -- tuning preserves coverage." },
{ type: "match", s: "Match each threat to the Microsoft product that handles it.", task: "Assign every case:",
 cats: ["Defender for Endpoint", "Defender for Office 365", "Defender for Identity", "Entra ID Protection"],
 items: [
  { t: "Suspicious process behavior on a laptop", c: "Defender for Endpoint" },
  { t: "Phishing email with a malicious link", c: "Defender for Office 365" },
  { t: "Pass-the-Hash on on-prem Active Directory", c: "Defender for Identity" },
  { t: "Leaked-credential risk on a cloud account", c: "Entra ID Protection" },
  { t: "Malware detonating on a managed device", c: "Defender for Endpoint" },
  { t: "Kerberoasting against on-prem AD", c: "Defender for Identity" } ],
 x: "Endpoint = devices; Office 365 = email/collaboration; Defender for Identity = on-prem AD attacks; Entra ID Protection = cloud identity risk." },
{ type: "match", s: "Match each Sentinel role to the least-privilege task it fits.", task: "Assign every item:",
 cats: ["Sentinel Reader", "Sentinel Responder", "Sentinel Contributor"],
 items: [
  { t: "View dashboards and incidents, change nothing", c: "Sentinel Reader" },
  { t: "Triage and manage incidents", c: "Sentinel Responder" },
  { t: "Create and edit analytics rules and playbooks", c: "Sentinel Contributor" },
  { t: "Read-only auditor access", c: "Sentinel Reader" },
  { t: "Detection engineer building rules", c: "Sentinel Contributor" } ],
 x: "Reader = view only; Responder = manage incidents; Contributor = create/edit rules and playbooks -- assign least privilege per role." },
{ type: "match", s: "Match each data source to the correct connector approach.", task: "Assign every item:",
 cats: ["Native connector", "CEF/Syslog via AMA", "Windows Security Events via AMA", "Diagnostic settings"],
 items: [
  { t: "Microsoft Entra ID sign-in logs", c: "Native connector" },
  { t: "Third-party firewall appliance", c: "CEF/Syslog via AMA" },
  { t: "Windows Server security event log", c: "Windows Security Events via AMA" },
  { t: "Azure resource activity logs", c: "Diagnostic settings" },
  { t: "Defender XDR alerts", c: "Native connector" },
  { t: "Linux host syslog", c: "CEF/Syslog via AMA" } ],
 x: "Native connectors for Microsoft services, CEF/Syslog via AMA for appliances/Linux, Windows Security Events via AMA for Windows logs, diagnostic settings for Azure resource logs." },
{ type: "multi", s: "A Sentinel analytics rule produces excessive false positives.", e: "The SOC must reduce noise without losing coverage.", q: "Select ALL correct tuning actions:",
 options: [
  { t: "Add entity exclusions for known-benign sources", c: true, w: "Excludes noise while keeping detection." },
  { t: "Adjust the rule threshold", c: true, w: "Raising a threshold can cut false positives." },
  { t: "Refine the KQL query logic", c: true, w: "Better logic reduces benign matches." },
  { t: "Keep the rule enabled while tuning", c: true, w: "Tuning preserves coverage; disabling would not." },
  { t: "Disable the rule to stop all alerts", c: false, w: "Disabling creates a blind spot -- the wrong answer." } ],
 x: "Tune via exclusions, thresholds, and KQL while keeping the rule enabled; never disable it and lose coverage." },
{ type: "multi", s: "Design data collection for a mixed environment.", e: "Sources: Entra ID, a third-party firewall, Windows servers, and Azure resources.", q: "Select ALL correct connector choices:",
 options: [
  { t: "Native connector for Entra ID", c: true, w: "Microsoft services use native connectors." },
  { t: "CEF or Syslog via AMA for the firewall", c: true, w: "Third-party appliances send CEF/Syslog." },
  { t: "Windows Security Events via AMA (with a DCR) for the servers", c: true, w: "Windows logs use the AMA connector and DCR." },
  { t: "Diagnostic settings for the Azure resource logs", c: true, w: "Azure resource logs export via diagnostic settings." },
  { t: "Windows Security Events via AMA for the firewall", c: false, w: "That connector is for Windows events, not a firewall appliance." } ],
 x: "Match each source to its connector: native (MS), CEF/Syslog (appliances), Windows Security Events via AMA (Windows), diagnostic settings (Azure)." },
{ type: "multi", s: "Choose the right Sentinel analytics rule type per need.", e: "Requirements vary by detection.", q: "Select ALL correct pairings:",
 options: [
  { t: "Custom KQL on a schedule -> Scheduled rule", c: true, w: "Scheduled rules run custom KQL on a schedule." },
  { t: "About one-minute latency -> NRT rule", c: true, w: "NRT rules run roughly every minute." },
  { t: "Multi-stage/anomaly correlation -> ML/Fusion rule", c: true, w: "ML/Fusion detects multi-stage attacks and anomalies." },
  { t: "Match data to known IOCs -> Threat Intelligence rule", c: true, w: "TI rules match against threat indicators." },
  { t: "Automate isolating a device -> Scheduled rule", c: false, w: "That's a playbook's job (response), not an analytics rule (detection)." } ],
 x: "Scheduled/NRT/ML/TI are detection rule types; automating response is a playbook, not an analytics rule." },
{ type: "multi", s: "Set up Sentinel SOAR for incident handling.", e: "Goal: orchestrate incidents and automate response.", q: "Select ALL correct statements:",
 options: [
  { t: "Analytics rules detect and raise incidents", c: true, w: "Rules are the detection component." },
  { t: "Automation rules orchestrate incidents (assign/tag/severity/trigger)", c: true, w: "Automation rules handle incident orchestration." },
  { t: "Playbooks (Logic Apps) perform response actions", c: true, w: "Playbooks automate the actual response." },
  { t: "Automation rules can trigger playbooks", c: true, w: "Automation rules can invoke playbooks on incidents." },
  { t: "Playbooks detect threats instead of analytics rules", c: false, w: "Detection is the analytics rule's job; playbooks respond." } ],
 x: "Rules detect, automation rules orchestrate, playbooks respond -- together they form Sentinel's SOAR." },
],
boss: {
 title: "Operation Signal Storm: XL's Overload",
 brief: "XL, the shape-shifting hulk, is smashing Star Command's SOC from every direction at once -- siloed tools, alert floods, severed data lines, and detections that never fire. You hold the unified Defender and Sentinel console and five decisions. Unify, tune, connect, and automate -- and XL's brute force has nothing to land on.",
 win: "The SOC stands unified and self-arming -- signals correlated into clear incidents, noise tuned out without blind spots, every data line connected, and automation catching XL before he can grow. The hulk is contained. Domain mission cleared.",
 lose: "XL found the gap -- a disabled detection, a severed connector, a siloed tool -- and grew stronger in the blind spot. Review where the SOC lost coverage, and deploy again.",
 stages: [
 { sit: "XL's opening smash scatters related alerts across endpoint, identity, and email so no one sees the whole attack. A junior analyst starts chasing them one by one.",
  e: "Alerts firing separately in Defender for Endpoint, Defender for Identity, and Defender for Office 365\nAll appear related to one intrusion",
  options: [
  { t: "Use Defender XDR incident correlation to investigate the single correlated incident holistically", d: 0, r: 4, ev: 0, ql: "best", w: "XDR groups related cross-product alerts into one incident so you see the full attack chain -- exactly what defeats a multi-domain smash." },
  { t: "Chase each alert independently in its own product", d: 16, r: -5, ev: 0, ql: "bad", w: "Siloed alert-chasing is the blind spot XL feeds on; correlation is the whole point of XDR." },
  { t: "Dismiss the alerts as unrelated noise", d: 18, r: -6, ev: -10, ql: "bad", w: "Dismissing correlated attack signals lets the intrusion proceed unseen." } ]},
 { sit: "XL floods a detection with false positives from one noisy benign source. The SOC is drowning and someone reaches for the off switch.",
  e: "One scheduled analytics rule: hundreds of benign alerts from a known service account\nIt occasionally catches a real threat",
  options: [
  { t: "Tune the rule -- add an entity exclusion for the benign source (or adjust threshold/KQL) and keep it enabled", d: 0, r: 4, ev: 1, ql: "best", w: "Tuning cuts the noise while preserving detection; the rule still catches the real threats it occasionally finds." },
  { t: "Disable the rule to stop the flood", d: 18, r: -5, ev: 0, ql: "bad", w: "Disabling creates a blind spot -- precisely the coverage gap XL wants." },
  { t: "Delete every incident the rule created and move on", d: 12, r: -3, ev: -4, ql: "ok", w: "Clearing incidents hides symptoms without fixing the noisy rule -- and may bury a real detection." } ]},
 { sit: "XL severs a supply line: the third-party firewall and the Windows servers stop reporting to Sentinel. The SOC goes partly blind.",
  e: "Firewall appliance (emits CEF) and Windows Server security logs no longer reaching Sentinel\nNeed the right connectors restored",
  options: [
  { t: "Reconnect the firewall via CEF via AMA and the servers via Windows Security Events via AMA with a DCR", d: 0, r: 3, ev: 2, ql: "best", w: "Match each source to its connector -- CEF for the appliance, Windows Security Events via AMA (DCR) for the servers -- restoring full visibility." },
  { t: "Point both sources at the native Defender XDR connector", d: 14, r: -4, ev: 0, ql: "bad", w: "Native connectors are for Microsoft services; a third-party firewall and Windows logs need CEF and the Windows connector respectively." },
  { t: "Wait and hope the data comes back on its own", d: 12, r: -4, ev: 0, ql: "bad", w: "Passive waiting leaves the SOC blind while XL operates in the gap." } ]},
 { sit: "XL strikes faster than humans can react. The SOC needs incidents handled and responses fired the instant they appear.",
  e: "Confirmed incidents need auto-assignment, tagging, and an immediate isolate-machine + disable-user response",
  options: [
  { t: "Create automation rules to orchestrate incidents and trigger a playbook (Logic App) that isolates the machine and disables the user", d: 0, r: 4, ev: 0, ql: "best", w: "Automation rules orchestrate; the playbook performs the response actions -- Sentinel SOAR reacting at machine speed." },
  { t: "Build one scheduled analytics rule to do the response", d: 14, r: -4, ev: 0, ql: "bad", w: "Analytics rules detect; they don't perform response -- that's a playbook's job." },
  { t: "Rely on analysts to react manually every time", d: 10, r: -3, ev: 0, ql: "ok", w: "Manual-only response can't keep pace with XL; automation is what wins the speed race." } ]},
 { sit: "XL makes a final bid to hide in an uncovered technique. Leadership asks whether the SOC can even see where it's blind.",
  e: "Question: are there detection coverage gaps, and is ingestion efficient?\nTools available: MITRE ATT&CK mapping, SOC optimization",
  options: [
  { t: "Map analytics rules to MITRE ATT&CK and use SOC optimization to find and close coverage gaps and trim wasted ingestion", d: 0, r: 4, ev: 0, ql: "best", w: "ATT&CK mapping plus SOC optimization make blind spots visible and coverage measurable -- leaving XL nowhere to hide." },
  { t: "Assume coverage is fine and skip the review", d: 14, r: -4, ev: 0, ql: "bad", w: "Unexamined coverage is exactly where XL slips through; visibility is the point." },
  { t: "Ingest every possible log at maximum retention regardless of cost or use", d: 8, r: -2, ev: 0, ql: "ok", w: "More data isn't more coverage; SOC optimization tunes both gaps AND wasted spend." } ]},
 ],
},
};
