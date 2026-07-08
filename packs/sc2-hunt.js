/* CONTENT PACK: SC-200 - Perform Threat Hunting (sc2-hunt) - 40 MCQ + 10 PBQ + 5 briefings + boss */
window.PACKS = window.PACKS || {};
window.PACKS["sc2-hunt"] = {
lessons: {
"sc2-hunt-1": { intro: "Warp Darkmatter hides in the noise between logs. KQL is your searchlight -- learn its operators and you can carve any signal out of the dark.",
sections: [
{ h: "KQL query structure and core operators", b: "Kusto Query Language reads top-down: you start with a table, then pipe (|) through operators. The essentials: where (filter rows), project (choose columns), extend (add a computed column), summarize (aggregate, e.g. count() by a field), sort/top (order), distinct (unique values), and join / union (combine tables). You must be able to READ a hunting query and MODIFY it for new conditions -- a core exam skill.", data: "TableName\n| where TimeGenerated > ago(1d)\n| where ActionType == \"ProcessCreated\"\n| summarize Count = count() by DeviceName\n| sort by Count desc" },
{ h: "Time windows", b: "Nearly every hunt is time-scoped. Use ago() for a relative window (ago(24h), ago(7d)) and between() for an explicit range. Filtering on the time column early makes queries fast and focused. Time-bounding is the difference between a targeted hunt and an unusable ocean of data.", data: "| where Timestamp > ago(7d)\n| where Timestamp between (datetime(2026-01-01) .. datetime(2026-01-07))" },
{ h: "Shaping and enriching results", b: "project keeps only the columns you need; extend adds derived fields (e.g. parse a domain out of a URL). parse extracts substructure from a string; summarize with functions like count(), dcount() (distinct count), min()/max() aggregates. let defines a reusable variable or subquery. render turns results into a chart. These shape raw rows into an investigation-ready view." },
{ h: "Joining telemetry together", b: "Real hunts correlate across tables: join links rows from two tables on a shared key (e.g. join device events to identity events on AccountName), while union stacks rows from multiple tables. Correlating process, network, and identity telemetry is how you follow an attacker across the kill chain rather than seeing one isolated event." },
],
traps: [
"You must be able to READ and MODIFY KQL, not just recognize it -- expect questions that change a condition or add a filter.",
"where filters rows; project selects columns; summarize aggregates; extend adds a computed column -- know each operator's job precisely.",
"Time-bound early with ago()/between() -- untimed queries are slow and unfocused.",
"join correlates two tables on a key; union stacks tables -- pick join to link related telemetry across the kill chain." ],
keys: [
"KQL flows top-down through pipes: table | where | project | summarize | sort.",
"Time-scope with ago() and between(); filter time early for speed.",
"Shape with project/extend/parse/summarize/let; visualize with render.",
"join correlates tables on a key; union stacks them -- correlate telemetry to follow an attack." ] },

"sc2-hunt-2": { intro: "Warp Darkmatter leaves footprints in different systems -- processes here, logons there, a suspicious email over there. Know which Advanced Hunting table holds which trail.",
sections: [
{ h: "Device (endpoint) tables", b: "Defender XDR Advanced Hunting exposes device telemetry across tables: DeviceProcessEvents (process creation, command lines), DeviceNetworkEvents (network connections), DeviceFileEvents (file create/modify/delete), DeviceLogonEvents (sign-ins to devices), DeviceRegistryEvents (registry changes), and DeviceImageLoadEvents (loaded modules). Match the artifact to the table: a suspicious command line -> DeviceProcessEvents; a beacon to a bad IP -> DeviceNetworkEvents.", data: "DeviceProcessEvents -> process creation + command lines\nDeviceNetworkEvents -> network connections\nDeviceFileEvents -> file activity\nDeviceLogonEvents -> device sign-ins\nDeviceRegistryEvents -> registry changes" },
{ h: "Identity tables", b: "For identity activity: IdentityLogonEvents (authentications across on-prem AD and cloud, seen by Defender for Identity), IdentityDirectoryEvents (directory changes, group modifications, suspicious AD operations), and IdentityQueryEvents (recon-style queries like SAMR/LDAP enumeration). Credential theft and lateral movement hunts start here.", data: "IdentityLogonEvents -> authentications (on-prem + cloud)\nIdentityDirectoryEvents -> directory/group changes\nIdentityQueryEvents -> recon queries (SAMR/LDAP)" },
{ h: "Email and cloud app tables", b: "For email: EmailEvents (message metadata -- sender, recipient, verdict), EmailAttachmentInfo (attachments), EmailUrlInfo (URLs in mail), and EmailPostDeliveryEvents (actions after delivery, like ZAP). For SaaS: CloudAppEvents (Defender for Cloud Apps activity). A phishing hunt pivots EmailEvents -> EmailUrlInfo -> DeviceNetworkEvents to see who clicked and connected.", data: "EmailEvents -> message metadata + verdict\nEmailAttachmentInfo / EmailUrlInfo -> attachments / URLs\nEmailPostDeliveryEvents -> post-delivery actions (ZAP)\nCloudAppEvents -> SaaS activity" },
{ h: "Alert tables", b: "AlertInfo (alert metadata: title, severity, category, MITRE technique) and AlertEvidence (the entities tied to an alert -- files, devices, users, IPs) let you hunt across the alerts themselves, joining evidence back to raw telemetry. Use these to pivot from a known alert to everything it touched, or to find related activity the alerts missed." },
],
traps: [
"Match the artifact to the table: command line -> DeviceProcessEvents, connection -> DeviceNetworkEvents, sign-in -> DeviceLogonEvents/IdentityLogonEvents, email verdict -> EmailEvents.",
"IdentityLogonEvents covers authentications (on-prem AD + cloud); IdentityDirectoryEvents covers directory changes -- don't swap them.",
"Phishing hunts pivot EmailEvents -> EmailUrlInfo -> DeviceNetworkEvents to trace click-through and connections.",
"AlertEvidence links an alert to its entities; use it to pivot from an alert into raw telemetry." ],
keys: [
"Device tables: Process/Network/File/Logon/Registry events -- match artifact to table.",
"Identity tables: IdentityLogonEvents (auth), IdentityDirectoryEvents (changes), IdentityQueryEvents (recon).",
"Email tables: EmailEvents/AttachmentInfo/UrlInfo/PostDeliveryEvents; CloudAppEvents for SaaS.",
"AlertInfo/AlertEvidence let you hunt across alerts and pivot to entities." ] },

"sc2-hunt-3": { intro: "Threat hunting is not waiting -- it is stalking. Form a hypothesis about where Warp Darkmatter hides, then prove or disprove it with a query.",
sections: [
{ h: "Proactive and hypothesis-driven", b: "The defining idea: threat hunting is PROACTIVE (you form a hypothesis -- 'an attacker used a living-off-the-land binary for persistence' -- and go looking), while incident response is REACTIVE (you respond to an alert that already fired). Different triggers, different workflows. A good hunt starts with a testable hypothesis, often informed by threat intelligence or a MITRE technique, then a KQL query to confirm or refute it.", data: "Hunting = PROACTIVE, hypothesis-driven, no alert required\nIncident response = REACTIVE, triggered by an alert\n(hypothesis -> KQL query -> confirm/refute -> act)" },
{ h: "Hunting in Defender XDR and Sentinel", b: "Advanced Hunting (Defender XDR) queries the raw device/identity/email/cloud tables with KQL. Sentinel Hunting provides saved hunting queries (many mapped to MITRE), the ability to run them across your SIEM data, and organized hunts. You write, run, and tune queries in both -- Defender for endpoint-centric telemetry, Sentinel for cross-source SIEM breadth." },
{ h: "From a hunting query to a custom detection", b: "When a hunting query reliably finds a real threat, you OPERATIONALIZE it: in Defender XDR create a custom detection rule from the Advanced Hunting query (it runs on a schedule and raises alerts/takes actions); in Sentinel turn the query into a scheduled analytics rule. Hunting discovers; custom detections make the discovery automatic and repeatable.", data: "Good hunting query -> create custom detection rule (Defender XDR)\n            or -> scheduled analytics rule (Sentinel)\n-> now it alerts automatically" },
{ h: "Tuning and iterating hunts", b: "Refine hunting queries to reduce noise and sharpen precision -- add conditions, exclude known-good, narrow the time window, or enrich with joins. Iteration turns a broad, noisy hunt into a reliable signal worth promoting to a detection. Save the good queries so the whole team can reuse and build on them." },
],
traps: [
"Threat hunting is PROACTIVE and hypothesis-driven; incident response is REACTIVE (alert-triggered) -- this distinction is heavily tested.",
"A reliable hunting query is operationalized as a custom detection rule (Defender XDR) or scheduled analytics rule (Sentinel) so it alerts automatically.",
"Start hunts from a testable hypothesis (often a MITRE technique or TI lead), then confirm/refute with KQL.",
"Advanced Hunting (Defender XDR) is endpoint/identity/email-centric; Sentinel Hunting adds cross-source SIEM breadth and saved queries." ],
keys: [
"Hunting is proactive/hypothesis-driven; IR is reactive/alert-driven.",
"Hunt with KQL in Defender Advanced Hunting and Sentinel Hunting (saved queries).",
"Operationalize a good hunt as a custom detection (XDR) or scheduled analytics rule (Sentinel).",
"Iterate and tune hunts to reduce noise, then save/share them." ] },

"sc2-hunt-4": { intro: "Warp Darkmatter counts on you losing your findings and misreading the map. Bookmarks preserve the trail, Livestream watches it live, and MITRE ATT&CK charts where he moves.",
sections: [
{ h: "Bookmarks: preserve and promote findings", b: "During a Sentinel hunt, a BOOKMARK saves an interesting query result -- with your notes and mapped entities -- so a finding is never lost. You can group bookmarks, add them to an investigation, and PROMOTE a bookmark into an incident when it turns out to be real. Bookmarks are how proactive hunting feeds the response workflow.", data: "Bookmark = saved hunting finding (result + notes + entities)\n-> group, annotate, and promote to an incident" },
{ h: "Livestream: near-real-time hunting", b: "LIVESTREAM runs a hunting query continuously to watch for a specific activity in near real time -- useful when you suspect an attack is unfolding and want to see new matches as they happen, or to validate that a threat has stopped after remediation. Bookmark preserves the past; Livestream watches the present. Don't confuse the two.", data: "Livestream = run a query continuously, watch matches in near real time\n(active-attack monitoring / post-remediation validation)" },
{ h: "MITRE ATT&CK: tactics vs techniques", b: "ATT&CK is the shared map of adversary behavior. A TACTIC is the WHY (the goal -- e.g. Persistence, Lateral Movement, Exfiltration); a TECHNIQUE is the HOW (the method -- e.g. T1053 Scheduled Task). Map hunts and detections to ATT&CK to target specific techniques and to see coverage gaps. Knowing tactic (why) vs technique (how) is a classic exam point.", data: "Tactic = WHY (goal: Persistence, Lateral Movement, Exfiltration)\nTechnique = HOW (method: e.g. Scheduled Task, Pass-the-Hash)" },
{ h: "Threat analytics", b: "Threat analytics (Defender XDR) is a set of expert analyst reports on active threats and campaigns -- describing the threat, showing your affected assets, and giving recommended actions and hunting queries. Use it to prioritize hunts against threats that actually target you and to jump-start a hunt with vetted queries. It turns global threat intelligence into a hunt you can run now." },
],
traps: [
"Bookmarks preserve/annotate/promote hunting findings; Livestream monitors a query in near real time -- swapping them is a classic wrong answer.",
"MITRE tactic = WHY (the goal); technique = HOW (the method) -- expect a question testing this distinction.",
"Promote a bookmark to an incident when a hunting finding proves real -- that's how hunting connects to response.",
"Threat analytics gives threat-specific reports, affected assets, recommended actions, and ready hunting queries -- use it to prioritize and start hunts." ],
keys: [
"Bookmarks save and promote hunting findings into incidents.",
"Livestream watches a query in near real time (active attack / post-remediation).",
"MITRE ATT&CK: tactic = why (goal), technique = how (method); map hunts to it.",
"Threat analytics: expert reports + affected assets + recommended actions + hunting queries." ] },

"sc2-hunt-5": { intro: "The final hunt for Warp Darkmatter demands every tool at once -- advanced notebooks, behavior baselines, and a pipeline that turns each discovery into a permanent trap.",
sections: [
{ h: "Notebooks for advanced hunting", b: "Sentinel notebooks (Jupyter, often with MSTICPy) enable advanced, repeatable hunting and investigation -- combining KQL, Python, external threat intel, and rich visualizations beyond what the query editor alone can do. Use notebooks for complex, multi-step analysis, machine-learning-assisted hunting, and documenting a hunt as reusable code." },
{ h: "Behavior and anomaly-driven hunting", b: "Beyond signatures, hunt on BEHAVIOR: use UEBA/entity behavior and anomalies to spot a user or host acting abnormally, then pivot into raw tables to investigate. Anomaly-based leads (an account suddenly querying the directory, a host beaconing on a new port) are strong hunting hypotheses. Behavioral hunting catches novel attacks that no signature covers." },
{ h: "The hunt-to-detection pipeline", b: "Tie it together: threat analytics or TI suggests a threat -> form a hypothesis -> hunt with KQL across the right tables -> bookmark findings and promote real ones to incidents -> operationalize the reliable query as a custom detection / scheduled analytics rule -> map it to MITRE ATT&CK for coverage. Each hunt permanently strengthens detection.", data: "TI/threat analytics -> hypothesis -> KQL hunt -> bookmark/promote\n-> custom detection / analytics rule -> MITRE coverage\n(each hunt becomes a permanent detection)" },
{ h: "Choosing the right hunting tool", b: "Match the tool to the need: Advanced Hunting (Defender XDR) for endpoint/identity/email KQL; Sentinel Hunting + saved queries for cross-source SIEM breadth; Livestream for near-real-time monitoring; bookmarks for preserving findings; notebooks for advanced multi-step analysis; threat analytics to prioritize. Knowing WHICH tool a scenario calls for is the capstone skill of this domain." },
],
traps: [
"Notebooks (Jupyter/MSTICPy) are for advanced, multi-step, repeatable hunting/investigation -- reach for them beyond simple query-editor hunts.",
"Behavior/anomaly leads (UEBA) make strong hunting hypotheses that catch novel attacks signatures miss.",
"The pipeline: hypothesis -> KQL hunt -> bookmark/promote -> operationalize as a detection -> map to MITRE -- each hunt should strengthen detection.",
"Match the tool to the need: Advanced Hunting vs Sentinel Hunting vs Livestream vs bookmarks vs notebooks vs threat analytics." ],
keys: [
"Notebooks (Jupyter/MSTICPy) enable advanced, repeatable, ML-assisted hunting.",
"Hunt on behavior/anomalies (UEBA) to catch novel attacks beyond signatures.",
"Pipeline: hypothesis -> hunt -> bookmark/promote -> operationalize as detection -> MITRE map.",
"Pick the right tool per scenario -- the capstone skill of threat hunting." ] },
},
mcq: {
"sc2-hunt-1": [
{ s: "An analyst must keep only rows where an action is process creation, then count by device.", e: "Filter then aggregate", q: "Which operators, in order?", options: [
 { t: "where to filter, then summarize count() by DeviceName", c: true, w: "where filters rows; summarize aggregates -- the correct combination." },
 { t: "project to filter, then extend to count", c: false, w: "project selects columns and extend adds a column; neither filters or aggregates like this." },
 { t: "render then sort", c: false, w: "Those visualize and order; they don't filter and count." },
 { t: "join then distinct", c: false, w: "join correlates tables; distinct returns unique values -- not filter-and-count." } ] },
{ s: "A hunt must cover only the last 7 days.", e: "Time-scoping a query", q: "Which expression?", options: [
 { t: "| where Timestamp > ago(7d)", c: true, w: "ago(7d) creates a relative 7-day window." },
 { t: "| project Timestamp", c: false, w: "project selects a column; it doesn't filter by time." },
 { t: "| summarize by Timestamp", c: false, w: "That aggregates; it doesn't bound the time range." },
 { t: "| render timechart", c: false, w: "render visualizes; it doesn't filter time." } ] },
{ s: "An analyst needs to add a computed column that extracts the domain from a URL.", e: "Derive a new field", q: "Which operator?", options: [
 { t: "extend (optionally with parse) to add the computed column", c: true, w: "extend adds a computed column; parse extracts substructure from a string." },
 { t: "where", c: false, w: "where filters rows; it doesn't add columns." },
 { t: "summarize", c: false, w: "summarize aggregates; it doesn't add a per-row computed field." },
 { t: "distinct", c: false, w: "distinct returns unique values, not a computed column." } ] },
{ s: "An analyst must correlate device events with identity events on a shared account.", e: "Link two tables on a key", q: "Which operator?", options: [
 { t: "join on the shared account field", c: true, w: "join correlates rows from two tables on a shared key." },
 { t: "union", c: false, w: "union stacks tables; it doesn't correlate on a key." },
 { t: "project", c: false, w: "project selects columns; it doesn't combine tables." },
 { t: "render", c: false, w: "render visualizes; it doesn't join tables." } ] },
{ s: "An analyst wants to stack rows from three device tables into one result set.", e: "Combine tables by appending rows", q: "Which operator?", options: [
 { t: "union", c: true, w: "union stacks rows from multiple tables." },
 { t: "join", c: false, w: "join correlates on a key rather than stacking." },
 { t: "summarize", c: false, w: "summarize aggregates; it doesn't append tables." },
 { t: "where", c: false, w: "where filters; it doesn't combine tables." } ] },
{ s: "A query returns too many columns; the analyst wants only DeviceName and FileName.", e: "Choose specific columns", q: "Which operator?", options: [
 { t: "project DeviceName, FileName", c: true, w: "project selects the specific columns to keep." },
 { t: "summarize DeviceName, FileName", c: false, w: "summarize aggregates; it isn't for simple column selection." },
 { t: "where DeviceName, FileName", c: false, w: "where filters rows by condition, not select columns." },
 { t: "extend DeviceName, FileName", c: false, w: "extend adds computed columns; it doesn't pare down existing ones." } ] },
{ s: "An analyst needs the count of DISTINCT devices contacting a bad IP.", e: "Distinct aggregation", q: "Which function in summarize?", options: [
 { t: "dcount(DeviceName)", c: true, w: "dcount() returns a distinct count within summarize." },
 { t: "count()", c: false, w: "count() counts rows, not distinct devices." },
 { t: "max()", c: false, w: "max() returns a maximum value, not a distinct count." },
 { t: "parse()", c: false, w: "parse extracts substructure; it doesn't count." } ] },
{ s: "An analyst wants to reuse a subquery result by name within a KQL query.", e: "Define a reusable value", q: "Which keyword?", options: [
 { t: "let", c: true, w: "let defines a reusable variable or subquery." },
 { t: "project", c: false, w: "project selects columns; it doesn't define a variable." },
 { t: "render", c: false, w: "render visualizes; it doesn't define a variable." },
 { t: "sort", c: false, w: "sort orders rows; it doesn't define a variable." } ] } ],

"sc2-hunt-2": [
{ s: "A hunt needs suspicious process command lines on endpoints.", e: "Process creation telemetry", q: "Which table?", options: [
 { t: "DeviceProcessEvents", c: true, w: "DeviceProcessEvents holds process creation and command-line data." },
 { t: "DeviceNetworkEvents", c: false, w: "That holds network connections, not process command lines." },
 { t: "EmailEvents", c: false, w: "That holds email metadata, not process data." },
 { t: "IdentityLogonEvents", c: false, w: "That holds authentications, not process command lines." } ] },
{ s: "A hunt looks for a host beaconing to a known-bad IP.", e: "Network connection telemetry", q: "Which table?", options: [
 { t: "DeviceNetworkEvents", c: true, w: "DeviceNetworkEvents records network connections from devices." },
 { t: "DeviceFileEvents", c: false, w: "That records file activity, not network connections." },
 { t: "DeviceRegistryEvents", c: false, w: "That records registry changes, not connections." },
 { t: "EmailUrlInfo", c: false, w: "That records URLs in email, not device connections." } ] },
{ s: "A hunt must review authentications across on-prem AD and cloud.", e: "Identity authentication telemetry", q: "Which table?", options: [
 { t: "IdentityLogonEvents", c: true, w: "IdentityLogonEvents captures authentications across on-prem AD and cloud." },
 { t: "IdentityDirectoryEvents", c: false, w: "That captures directory/group changes, not authentications." },
 { t: "DeviceLogonEvents", c: false, w: "That captures device sign-ins specifically, not the identity-wide view." },
 { t: "CloudAppEvents", c: false, w: "That captures SaaS activity, not identity authentications." } ] },
{ s: "A hunt investigates suspicious directory and group modifications in AD.", e: "Directory change telemetry", q: "Which table?", options: [
 { t: "IdentityDirectoryEvents", c: true, w: "IdentityDirectoryEvents captures directory changes and group modifications." },
 { t: "IdentityLogonEvents", c: false, w: "That captures authentications, not directory changes." },
 { t: "DeviceProcessEvents", c: false, w: "That captures processes, not directory changes." },
 { t: "EmailEvents", c: false, w: "That captures email metadata, not directory changes." } ] },
{ s: "A phishing hunt starts from message metadata and verdicts.", e: "Email metadata telemetry", q: "Which table first?", options: [
 { t: "EmailEvents", c: true, w: "EmailEvents holds message metadata and verdicts to start a phishing hunt." },
 { t: "DeviceNetworkEvents", c: false, w: "That's device connections; the hunt starts at the email metadata." },
 { t: "IdentityQueryEvents", c: false, w: "That's recon queries, not email metadata." },
 { t: "AlertEvidence", c: false, w: "That links alerts to entities; the phishing hunt begins with EmailEvents." } ] },
{ s: "After finding a phishing email, the analyst wants the URLs it contained.", e: "Email URL telemetry", q: "Which table?", options: [
 { t: "EmailUrlInfo", c: true, w: "EmailUrlInfo holds the URLs found in email messages." },
 { t: "EmailAttachmentInfo", c: false, w: "That holds attachments, not URLs." },
 { t: "DeviceFileEvents", c: false, w: "That holds file activity on devices, not email URLs." },
 { t: "AlertInfo", c: false, w: "That holds alert metadata, not email URLs." } ] },
{ s: "An analyst wants to pivot from an alert to the files, devices, and users it involved.", e: "Alert-to-entity mapping", q: "Which table?", options: [
 { t: "AlertEvidence", c: true, w: "AlertEvidence links an alert to its entities (files, devices, users, IPs)." },
 { t: "AlertInfo", c: false, w: "AlertInfo holds alert metadata; AlertEvidence holds the entities." },
 { t: "DeviceImageLoadEvents", c: false, w: "That holds loaded modules, not alert entities." },
 { t: "CloudAppEvents", c: false, w: "That holds SaaS activity, not alert entities." } ] },
{ s: "A recon hunt looks for SAMR/LDAP enumeration queries against AD.", e: "Reconnaissance telemetry", q: "Which table?", options: [
 { t: "IdentityQueryEvents", c: true, w: "IdentityQueryEvents captures recon-style queries like SAMR/LDAP enumeration." },
 { t: "IdentityLogonEvents", c: false, w: "That captures authentications, not recon queries." },
 { t: "DeviceRegistryEvents", c: false, w: "That captures registry changes, not AD recon." },
 { t: "EmailPostDeliveryEvents", c: false, w: "That captures post-delivery email actions, not AD recon." } ] } ],

"sc2-hunt-3": [
{ s: "A colleague says threat hunting and incident response are the same workflow.", e: "Proactive vs reactive", q: "Correct distinction?", options: [
 { t: "Hunting is proactive and hypothesis-driven; incident response is reactive and alert-triggered", c: true, w: "Hunting seeks threats without an alert; IR responds to alerts that fired." },
 { t: "Hunting is reactive; incident response is proactive", c: false, w: "Reversed -- hunting is proactive, IR is reactive." },
 { t: "Both are triggered only by alerts", c: false, w: "Hunting is not alert-triggered; it starts from a hypothesis." },
 { t: "They are identical", c: false, w: "They differ in trigger and workflow." } ] },
{ s: "A hunting query reliably catches a real threat and should now alert automatically in Defender XDR.", e: "Operationalize a good hunt", q: "What do you create?", options: [
 { t: "A custom detection rule from the Advanced Hunting query", c: true, w: "Custom detection rules turn a hunting query into an automatic, scheduled detection." },
 { t: "A watchlist", c: false, w: "Watchlists are reference data; they don't run the query as a detection." },
 { t: "A workbook", c: false, w: "Workbooks visualize; they don't detect." },
 { t: "A bookmark", c: false, w: "Bookmarks save findings; they don't create an automatic detection." } ] },
{ s: "In Sentinel, a proven hunting query should run on a schedule and raise incidents.", e: "Operationalize in Sentinel", q: "What do you create?", options: [
 { t: "A scheduled analytics rule from the query", c: true, w: "A scheduled analytics rule runs the query on a schedule and raises incidents." },
 { t: "A Livestream session", c: false, w: "Livestream monitors live; it doesn't create a persistent scheduled detection." },
 { t: "A data collection rule", c: false, w: "DCRs govern ingestion, not detection." },
 { t: "A watchlist", c: false, w: "Watchlists are reference data, not detections." } ] },
{ s: "An analyst wants a testable starting point for a hunt.", e: "How hunts begin", q: "Best practice?", options: [
 { t: "Form a hypothesis (often from a MITRE technique or TI lead), then confirm/refute with KQL", c: true, w: "Hypothesis-driven hunting starts with a testable idea and validates it with a query." },
 { t: "Run random queries until something looks odd", c: false, w: "Unfocused querying wastes time; hunts are hypothesis-driven." },
 { t: "Wait for an alert to fire", c: false, w: "Waiting is reactive IR, not proactive hunting." },
 { t: "Disable detections to reduce noise", c: false, w: "That removes coverage and doesn't start a hunt." } ] },
{ s: "An analyst needs endpoint, identity, and email KQL telemetry for a hunt.", e: "Where to run endpoint-centric hunts", q: "Which tool?", options: [
 { t: "Advanced Hunting in Defender XDR", c: true, w: "Advanced Hunting queries device/identity/email/cloud tables with KQL." },
 { t: "The Azure billing portal", c: false, w: "Unrelated to hunting." },
 { t: "A data collection rule", c: false, w: "DCRs govern ingestion, not hunting queries." },
 { t: "A workbook only", c: false, w: "Workbooks visualize; Advanced Hunting runs the KQL." } ] },
{ s: "A team wants saved, MITRE-mapped hunting queries across all their SIEM data sources.", e: "Cross-source hunting", q: "Which capability?", options: [
 { t: "Sentinel Hunting with saved hunting queries", c: true, w: "Sentinel Hunting provides saved, often MITRE-mapped queries across SIEM data." },
 { t: "Device groups", c: false, w: "Those scope permissions, not hunting queries." },
 { t: "Tamper protection", c: false, w: "That protects AV settings, unrelated to hunting." },
 { t: "A playbook", c: false, w: "Playbooks respond; they don't provide saved hunting queries." } ] },
{ s: "A broad hunting query is noisy and needs to become a reliable signal.", e: "Improve hunt precision", q: "Best approach?", options: [
 { t: "Iterate: add conditions, exclude known-good, narrow time, and enrich with joins", c: true, w: "Tuning the query sharpens precision before promoting it to a detection." },
 { t: "Delete the query and give up", c: false, w: "Iteration, not abandonment, produces a reliable hunt." },
 { t: "Promote it as-is despite the noise", c: false, w: "A noisy detection floods the SOC; tune first." },
 { t: "Disable all other detections", c: false, w: "That removes coverage and doesn't fix the query." } ] },
{ s: "A reliable hunting query should be reusable by the whole team.", e: "Team enablement", q: "Best practice?", options: [
 { t: "Save the query (as a saved hunting query) so the team can reuse and build on it", c: true, w: "Saving shares the query for reuse and iteration." },
 { t: "Keep it only on one analyst's screen", c: false, w: "That prevents reuse; save and share it." },
 { t: "Convert it to a watchlist", c: false, w: "Watchlists are reference data, not queries." },
 { t: "Email a screenshot to everyone", c: false, w: "A screenshot isn't reusable; save the query." } ] } ],

"sc2-hunt-4": [
{ s: "During a hunt, an analyst finds a suspicious result and wants to preserve it and later turn it into an incident.", e: "Capturing a finding", q: "Which feature?", options: [
 { t: "A bookmark (save with notes/entities, promote to an incident)", c: true, w: "Bookmarks preserve hunting findings and can be promoted to incidents." },
 { t: "Livestream", c: false, w: "Livestream monitors live; it doesn't save a past finding." },
 { t: "A watchlist", c: false, w: "Watchlists are reference data, not saved findings." },
 { t: "A data collection rule", c: false, w: "DCRs govern ingestion, not findings." } ] },
{ s: "An analyst suspects an attack is unfolding now and wants to see new matches as they happen.", e: "Near-real-time monitoring", q: "Which feature?", options: [
 { t: "Livestream", c: true, w: "Livestream runs a query continuously to watch matches in near real time." },
 { t: "A bookmark", c: false, w: "Bookmarks save past findings; they don't monitor live." },
 { t: "A workbook", c: false, w: "Workbooks visualize historical data, not a live query feed." },
 { t: "A retention tier", c: false, w: "Retention governs storage, not live monitoring." } ] },
{ s: "An exam item asks the difference between a MITRE tactic and a technique.", e: "ATT&CK fundamentals", q: "Which is correct?", options: [
 { t: "Tactic is the WHY (the goal); technique is the HOW (the method)", c: true, w: "Tactics are adversary goals; techniques are the methods used to achieve them." },
 { t: "Tactic is the HOW; technique is the WHY", c: false, w: "Reversed -- tactic is the goal, technique is the method." },
 { t: "They are the same thing", c: false, w: "They are distinct layers of ATT&CK." },
 { t: "Technique is a data connector", c: false, w: "A technique is an adversary method, not a connector." } ] },
{ s: "A hunting finding turns out to be a real, active threat.", e: "Connecting hunting to response", q: "Best next step?", options: [
 { t: "Promote the bookmark to an incident for response", c: true, w: "Promoting a bookmark to an incident feeds the finding into the response workflow." },
 { t: "Delete the bookmark", c: false, w: "Deleting loses the confirmed finding." },
 { t: "Convert it to a watchlist", c: false, w: "Watchlists are reference data, not incidents." },
 { t: "Ignore it since hunting is only proactive", c: false, w: "A confirmed threat must be escalated to response." } ] },
{ s: "The SOC wants expert reports on active campaigns, their affected assets, and recommended actions.", e: "Threat-specific intelligence in Defender XDR", q: "Which capability?", options: [
 { t: "Threat analytics", c: true, w: "Threat analytics provides analyst reports, affected assets, recommended actions, and hunting queries." },
 { t: "A watchlist", c: false, w: "Watchlists are reference data, not threat reports." },
 { t: "A data collection rule", c: false, w: "DCRs govern ingestion, not threat reports." },
 { t: "Device groups", c: false, w: "Those scope permissions, not provide threat intel." } ] },
{ s: "An analyst wants to jump-start a hunt with vetted queries for a threat that targets them.", e: "Prioritizing hunts", q: "Where to look?", options: [
 { t: "Threat analytics (includes ready hunting queries and affected assets)", c: true, w: "Threat analytics offers vetted hunting queries and shows your affected assets." },
 { t: "The billing page", c: false, w: "Unrelated to hunting." },
 { t: "A workbook template", c: false, w: "Workbooks visualize; they don't provide vetted threat queries." },
 { t: "Tamper protection", c: false, w: "That protects AV settings, unrelated." } ] },
{ s: "An analyst maps a hunt to a specific ATT&CK technique to check coverage.", e: "Why map to ATT&CK", q: "What is the benefit?", options: [
 { t: "It targets specific techniques and reveals coverage gaps", c: true, w: "Mapping to ATT&CK sharpens hunts and exposes where detection is missing." },
 { t: "It automatically remediates the threat", c: false, w: "Mapping informs coverage; it doesn't remediate." },
 { t: "It deletes noisy alerts", c: false, w: "Mapping doesn't tune alerts; it aids coverage analysis." },
 { t: "It ingests new data sources", c: false, w: "Mapping doesn't ingest data." } ] },
{ s: "An analyst wants to confirm a threat stopped after remediation by watching for any recurrence.", e: "Post-remediation validation", q: "Which feature?", options: [
 { t: "Livestream the query to watch for new matches in near real time", c: true, w: "Livestream validates that the activity has ceased after remediation." },
 { t: "A bookmark", c: false, w: "Bookmarks save past findings; they don't watch live." },
 { t: "A retention tier change", c: false, w: "Retention governs storage, not live validation." },
 { t: "A watchlist", c: false, w: "Watchlists are reference data, not live monitoring." } ] } ],

"sc2-hunt-5": [
{ s: "An analyst needs advanced, repeatable hunting that combines KQL, Python, external intel, and rich visuals.", e: "Beyond the query editor", q: "Which tool?", options: [
 { t: "Sentinel notebooks (Jupyter / MSTICPy)", c: true, w: "Notebooks combine KQL, Python, intel, and visualization for advanced hunting." },
 { t: "A watchlist", c: false, w: "Watchlists are reference data, not analysis notebooks." },
 { t: "A data collection rule", c: false, w: "DCRs govern ingestion, not advanced analysis." },
 { t: "Device groups", c: false, w: "Those scope permissions, not hunting analysis." } ] },
{ s: "A hunter wants leads that catch novel attacks with no known signature.", e: "Behavioral hunting", q: "Best source of hypotheses?", options: [
 { t: "UEBA / entity behavior anomalies (abnormal user or host activity)", c: true, w: "Behavioral anomalies are strong hypotheses that catch novel, signature-less attacks." },
 { t: "Only static signature rules", c: false, w: "Signatures miss novel attacks; behavior catches them." },
 { t: "The billing portal", c: false, w: "Unrelated to hunting." },
 { t: "A retention tier", c: false, w: "Retention governs storage, not hunting leads." } ] },
{ s: "A team wants each successful hunt to permanently improve detection.", e: "The hunt-to-detection pipeline", q: "Which sequence captures this?", options: [
 { t: "Hypothesis -> KQL hunt -> bookmark/promote -> operationalize as a detection -> map to MITRE", c: true, w: "This pipeline turns each hunt into a lasting, mapped detection." },
 { t: "Wait for alerts -> close them -> repeat", c: false, w: "That's reactive IR, not a proactive hunt-to-detection pipeline." },
 { t: "Ingest everything -> never query", c: false, w: "Ingesting without hunting yields no detections." },
 { t: "Disable rules -> reduce noise", c: false, w: "Disabling removes coverage; it doesn't build detections." } ] },
{ s: "A scenario needs near-real-time monitoring of a specific suspicious activity.", e: "Tool selection", q: "Which is right?", options: [
 { t: "Livestream", c: true, w: "Livestream provides near-real-time monitoring of a hunting query." },
 { t: "Notebooks", c: false, w: "Notebooks are for deep multi-step analysis, not live monitoring." },
 { t: "A watchlist", c: false, w: "Watchlists are reference data, not live monitoring." },
 { t: "A workbook", c: false, w: "Workbooks visualize historical data, not a live feed." } ] },
{ s: "A scenario needs endpoint process telemetry queried with KQL.", e: "Tool selection", q: "Which is right?", options: [
 { t: "Advanced Hunting in Defender XDR (query DeviceProcessEvents)", c: true, w: "Advanced Hunting queries endpoint tables like DeviceProcessEvents with KQL." },
 { t: "A playbook", c: false, w: "Playbooks respond; they don't run hunting queries." },
 { t: "A data collection rule", c: false, w: "DCRs govern ingestion, not hunting." },
 { t: "A watchlist", c: false, w: "Watchlists are reference data, not query tools." } ] },
{ s: "An analyst wants to preserve a hunting finding for later escalation.", e: "Tool selection", q: "Which is right?", options: [
 { t: "A bookmark", c: true, w: "Bookmarks preserve findings and can be promoted to incidents." },
 { t: "Livestream", c: false, w: "Livestream monitors live; it doesn't preserve a finding." },
 { t: "A retention tier", c: false, w: "Retention governs storage, not findings." },
 { t: "Tamper protection", c: false, w: "That protects AV settings, unrelated." } ] },
{ s: "The SOC wants to prioritize hunts against threats actually targeting the organization.", e: "Tool selection", q: "Which is right?", options: [
 { t: "Threat analytics (shows affected assets and provides hunting queries)", c: true, w: "Threat analytics prioritizes hunts by showing which active threats affect you." },
 { t: "A workbook", c: false, w: "Workbooks visualize; they don't prioritize threats with reports." },
 { t: "A device group", c: false, w: "Those scope permissions, not prioritize hunts." },
 { t: "A watchlist", c: false, w: "Watchlists are reference data, not threat prioritization." } ] },
{ s: "An analyst confirms a hunting query is reliable and maps it to ATT&CK before deploying it.", e: "Finishing the pipeline", q: "Why map to ATT&CK at this step?", options: [
 { t: "To record technique coverage and expose remaining gaps", c: true, w: "Mapping the new detection to ATT&CK documents coverage and reveals gaps." },
 { t: "To delete the query", c: false, w: "Mapping documents coverage; it doesn't delete anything." },
 { t: "To stop ingesting data", c: false, w: "Mapping is unrelated to ingestion." },
 { t: "To bypass detection entirely", c: false, w: "The goal is to add a mapped detection, not bypass it." } ] } ],
},
pbqs: [
{ type: "order", s: "Build a KQL hunt for suspicious processes beaconing out, by device.", task: "Order the query pipeline:",
 steps: ["Start from DeviceProcessEvents", "Filter with where to the last 7 days and the suspicious pattern", "Join to DeviceNetworkEvents on DeviceId to add connections", "Summarize count() by DeviceName", "Sort by the count descending"],
 x: "Pick the table, filter (time + pattern), join related telemetry, aggregate, then order -- the standard KQL hunt shape." },
{ type: "order", s: "Turn a proven hunt into a permanent detection.", task: "Order the hunt-to-detection pipeline:",
 steps: ["Form a hypothesis from a MITRE technique or threat analytics", "Write and run the KQL hunting query", "Bookmark findings and promote real ones to an incident", "Operationalize the query as a custom detection / analytics rule", "Map the new detection to MITRE ATT&CK for coverage"],
 x: "Hypothesis, hunt, capture/escalate findings, operationalize into an automatic detection, then map to ATT&CK -- each hunt strengthens detection." },
{ type: "order", s: "Trace a phishing attack across telemetry.", task: "Order the pivot path:",
 steps: ["Start in EmailEvents to find the malicious message", "Pivot to EmailUrlInfo for the URLs it contained", "Check DeviceNetworkEvents for connections to those URLs", "Correlate DeviceLogonEvents for the affected users", "Bookmark the confirmed finding and promote to an incident"],
 x: "Follow the attack from email to URL to device connection to user, then capture and escalate the finding." },
{ type: "match", s: "Match each artifact to the Advanced Hunting table that holds it.", task: "Assign every item:",
 cats: ["DeviceProcessEvents", "DeviceNetworkEvents", "IdentityLogonEvents", "EmailEvents"],
 items: [
  { t: "A suspicious command line", c: "DeviceProcessEvents" },
  { t: "A connection to a known-bad IP", c: "DeviceNetworkEvents" },
  { t: "An authentication across on-prem AD and cloud", c: "IdentityLogonEvents" },
  { t: "A phishing message verdict", c: "EmailEvents" },
  { t: "A newly spawned process", c: "DeviceProcessEvents" },
  { t: "An outbound beacon", c: "DeviceNetworkEvents" } ],
 x: "Match the artifact to its table: process/command line -> DeviceProcessEvents, connection -> DeviceNetworkEvents, auth -> IdentityLogonEvents, email verdict -> EmailEvents." },
{ type: "match", s: "Match each KQL operator to what it does.", task: "Assign every item:",
 cats: ["where", "project", "summarize", "join"],
 items: [
  { t: "Filter rows by a condition", c: "where" },
  { t: "Select specific columns", c: "project" },
  { t: "Aggregate, e.g. count by a field", c: "summarize" },
  { t: "Correlate two tables on a shared key", c: "join" },
  { t: "Keep only rows in the last 24 hours", c: "where" } ],
 x: "where filters, project selects columns, summarize aggregates, join correlates tables on a key." },
{ type: "match", s: "Match each hunting feature to its purpose.", task: "Assign every item:",
 cats: ["Bookmark", "Livestream", "Threat analytics", "Custom detection rule"],
 items: [
  { t: "Preserve a finding and promote it to an incident", c: "Bookmark" },
  { t: "Watch a query in near real time", c: "Livestream" },
  { t: "Expert reports on active threats with affected assets", c: "Threat analytics" },
  { t: "Make a proven hunting query alert automatically", c: "Custom detection rule" },
  { t: "Validate a threat stopped after remediation", c: "Livestream" } ],
 x: "Bookmarks preserve/promote findings; Livestream monitors live; threat analytics reports on active threats; custom detection rules operationalize a hunt." },
{ type: "multi", s: "Write a correct KQL hunting query.", e: "Goal: time-scoped, filtered, correlated, aggregated.", q: "Select ALL correct practices:",
 options: [
  { t: "Time-scope early with ago() or between()", c: true, w: "Early time bounding focuses and speeds the query." },
  { t: "Use where to filter to the suspicious condition", c: true, w: "where narrows to relevant rows." },
  { t: "Use join to correlate related telemetry", c: true, w: "join links tables across the kill chain." },
  { t: "Use summarize to aggregate results", c: true, w: "summarize turns rows into counts/insights." },
  { t: "Skip time filtering and query all history every run", c: false, w: "Unbounded queries are slow and unfocused." } ],
 x: "Time-scope, filter, correlate, and aggregate -- skipping time bounds makes the hunt unusable." },
{ type: "multi", s: "Distinguish hunting from incident response.", e: "Team keeps conflating the two.", q: "Select ALL correct statements:",
 options: [
  { t: "Hunting is proactive and hypothesis-driven", c: true, w: "Hunts start from a testable idea, no alert needed." },
  { t: "Incident response is reactive and alert-triggered", c: true, w: "IR responds to alerts that already fired." },
  { t: "A confirmed hunting finding can be promoted to an incident", c: true, w: "Bookmarks promote findings into the response workflow." },
  { t: "A reliable hunt can become a custom detection or analytics rule", c: true, w: "Operationalizing makes the hunt automatic." },
  { t: "Hunting only happens after an alert fires", c: false, w: "That describes reactive IR; hunting is proactive." } ],
 x: "Hunting is proactive; IR is reactive; findings promote to incidents and reliable hunts become detections." },
{ type: "multi", s: "Choose the right hunting tool for each need.", e: "Different scenarios, different tools.", q: "Select ALL correct pairings:",
 options: [
  { t: "Endpoint KQL telemetry -> Advanced Hunting (Defender XDR)", c: true, w: "Advanced Hunting queries device/identity/email tables." },
  { t: "Cross-source saved queries -> Sentinel Hunting", c: true, w: "Sentinel Hunting offers saved, MITRE-mapped queries across SIEM data." },
  { t: "Near-real-time monitoring -> Livestream", c: true, w: "Livestream watches a query live." },
  { t: "Advanced multi-step analysis -> notebooks", c: true, w: "Notebooks combine KQL, Python, and intel." },
  { t: "Preserve a finding -> a data collection rule", c: false, w: "Findings are preserved with bookmarks; DCRs govern ingestion." } ],
 x: "Advanced Hunting, Sentinel Hunting, Livestream, and notebooks each fit different needs; bookmarks (not DCRs) preserve findings." },
{ type: "multi", s: "Use MITRE ATT&CK and threat analytics well.", e: "Goal: targeted, prioritized hunting.", q: "Select ALL correct statements:",
 options: [
  { t: "A tactic is the adversary's goal (the why)", c: true, w: "Tactics are goals like Persistence or Exfiltration." },
  { t: "A technique is the method (the how)", c: true, w: "Techniques are specific methods like Scheduled Task." },
  { t: "Mapping hunts to ATT&CK reveals coverage gaps", c: true, w: "ATT&CK mapping exposes where detection is missing." },
  { t: "Threat analytics shows affected assets and provides hunting queries", c: true, w: "It prioritizes hunts against threats that target you." },
  { t: "A technique is the goal and a tactic is the method", c: false, w: "Reversed -- tactic is the goal, technique is the method." } ],
 x: "Tactic = why, technique = how; map hunts to ATT&CK for coverage and use threat analytics to prioritize." },
],
boss: {
 title: "Operation Dark Signal: Hunting Warp Darkmatter",
 brief: "Warp Darkmatter -- the rogue Space Ranger turned traitor -- has gone silent inside Star Command's own telemetry, leaving only faint traces. There are no alerts this time. You must HUNT him: form the hypothesis, query the right tables, and run him down before he strikes. Five decisions stand between you and the traitor. Clear this and SC-200 is complete.",
 win: "You stalked Warp Darkmatter through process trees, identity logs, and email trails, pinned him with a mapped detection, and promoted the proof to an incident. The traitor is dragged from the shadows at last. Domain mission cleared -- SC-200 is within reach!",
 lose: "Warp Darkmatter slipped back into the noise -- a wrong table, a passive wait, a lost finding. Re-form your hypothesis and hunt again.",
 stages: [
 { sit: "Faint traces suggest Warp Darkmatter is present, but no alert has fired. A junior Ranger wants to wait for the SIEM to flag something.",
  e: "No active alert | TI hints at a living-off-the-land persistence technique\nDecision: how to begin",
  options: [
  { t: "Form a hypothesis from the MITRE technique and hunt proactively with KQL", d: 0, r: 4, ev: 1, ql: "best", w: "Hunting is proactive -- a testable hypothesis plus a query finds an adversary who never tripped an alert." },
  { t: "Wait for an alert to fire before doing anything", d: 14, r: -4, ev: 0, ql: "bad", w: "Waiting is reactive IR; a stealthy traitor may never trip an alert -- you must hunt." },
  { t: "Run random queries with no hypothesis", d: 12, r: -3, ev: 0, ql: "ok", w: "Unfocused querying wastes precious time; hunts are hypothesis-driven." } ]},
 { sit: "Your hypothesis is a suspicious command line spawning on endpoints. You need the right table, fast.",
  e: "Looking for process creation and command-line arguments across devices",
  options: [
  { t: "Query DeviceProcessEvents, filtered to the last days and the suspicious pattern", d: 0, r: 4, ev: 1, ql: "best", w: "DeviceProcessEvents holds process creation and command lines -- the right table, time-scoped and filtered." },
  { t: "Query DeviceNetworkEvents for command lines", d: 14, r: -4, ev: 0, ql: "bad", w: "Network events hold connections, not process command lines -- wrong table." },
  { t: "Query EmailEvents for the process", d: 16, r: -5, ev: 0, ql: "bad", w: "Email metadata has no process data; you'd never see the command line." } ]},
 { sit: "The process trail suggests stolen credentials moving laterally. Warp Darkmatter is riding an identity.",
  e: "Need to follow authentications across on-prem AD and cloud, and correlate to the devices touched",
  options: [
  { t: "Query IdentityLogonEvents and join device telemetry on the account to trace the lateral movement", d: 0, r: 4, ev: 1, ql: "best", w: "IdentityLogonEvents captures the authentications; joining device telemetry follows the attacker across the kill chain." },
  { t: "Query IdentityDirectoryEvents for the authentications", d: 12, r: -3, ev: 0, ql: "ok", w: "Directory events show changes, not authentications -- IdentityLogonEvents is the auth table." },
  { t: "Give up correlating and look at one event only", d: 14, r: -4, ev: 0, ql: "bad", w: "A single event won't reveal lateral movement; correlate to follow the trail." } ]},
 { sit: "You catch a strong hit -- clear evidence of Warp Darkmatter's activity. You must preserve it and act.",
  e: "A confirmed malicious finding in your hunt results that must not be lost and needs response",
  options: [
  { t: "Bookmark the finding with notes and entities, then promote it to an incident", d: 0, r: 4, ev: 2, ql: "best", w: "Bookmarks preserve the finding and promote it into the response workflow -- hunting feeding IR." },
  { t: "Note it mentally and keep querying", d: 14, r: -4, ev: -6, ql: "bad", w: "An unsaved finding is easily lost; bookmark and escalate confirmed evidence." },
  { t: "Add the account to a watchlist and stop", d: 8, r: -2, ev: 0, ql: "ok", w: "A watchlist enriches, but it doesn't preserve the finding or trigger response -- bookmark and promote." } ]},
 { sit: "Warp Darkmatter is cornered. To make sure he can never slip back unseen, you must lock in the detection.",
  e: "Your hunting query reliably catches his technique | need it to alert automatically and prove coverage",
  options: [
  { t: "Operationalize the query as a custom detection / scheduled analytics rule and map it to MITRE ATT&CK", d: 0, r: 4, ev: 1, ql: "best", w: "Turning the proven hunt into an automatic, MITRE-mapped detection ensures the traitor is caught if he ever returns." },
  { t: "Keep re-running the query by hand forever", d: 12, r: -3, ev: 0, ql: "ok", w: "Manual re-runs don't scale; operationalize the hunt into a detection." },
  { t: "Close the hunt and create no detection", d: 16, r: -5, ev: 0, ql: "bad", w: "Without a detection, Warp Darkmatter returns unseen -- each hunt should become permanent coverage." } ]},
 ],
},
};
