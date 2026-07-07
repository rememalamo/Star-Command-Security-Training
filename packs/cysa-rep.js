/* CONTENT PACK: CySA+ · Reporting & Communication (cysa-rep) — 40 MCQ + 10 PBQ + 5 briefings + boss */
window.PACKS = window.PACKS || {};
window.PACKS["cysa-rep"] = {
lessons: {
"cysa-rep-1": { intro: "Crumford Lorak twists every story he touches. The Ranger who beats him writes the truth so plainly that no one can bend it — and writes it differently for the bridge than for the engine room.",
sections: [
{ h: "Know your audience", b: "The single most-tested idea in this domain: the same findings are reported differently depending on who reads them. Executives and the board need business impact, risk, and decisions — money, downtime, exposure — in plain language. Technical teams need the details: IoCs, affected hosts, ATT&CK mapping, remediation steps. Giving the board a 40-page packet-capture walkthrough fails as badly as handing engineers a one-line 'we're fine.'" },
{ h: "The executive summary", b: "An executive summary states, briefly and in business terms: what happened, the impact, what was done, and what's recommended — no jargon, no raw logs. It leads with the bottom line (risk and decision needed) and puts technical depth in an appendix. Executives read to decide, not to analyze; write for the decision they must make.", data: "Executive summary skeleton:\n- What happened (1-2 sentences, plain language)\n- Business impact (cost, downtime, data, risk)\n- Actions taken / status\n- Recommendations + decision needed\n(technical detail → appendix)" },
{ h: "Precision and defensible language", b: "Report exactly what the evidence supports — no more. Say 'no evidence of data exfiltration was identified,' never 'no data was stolen,' because you can't prove a negative and overclaiming creates liability when later discovery contradicts you. Distinguish confirmed facts from assessments, and state confidence levels. Under pressure, accurate, measured wording protects both the truth and the organization." },
{ h: "The core incident report elements", b: "A complete incident report answers who, what, when, where, and why, plus: a timeline of events, the impact and scope, the evidence, and specific recommendations. These are the building blocks the exam expects — the report tells the whole story end-to-end and turns it into assignable next steps, not just a narrative." },
],
traps: [
"The right report depends on the audience — an answer that gives executives deep technical detail (or gives engineers only a business summary) is wrong.",
"'No data was stolen' overclaims; 'no evidence of exfiltration was identified' is the defensible phrasing. The exam tests this exact distinction.",
"Executive summaries lead with business impact and the decision needed, not with technical methodology.",
"Separate confirmed facts from assessments; don't present analysis as proven fact." ],
keys: [
"Tailor the report to the audience: executives = business risk; technical = details.",
"Executive summary = what happened, impact, actions, recommendation — no jargon.",
"Use defensible language: report only what evidence supports; avoid provable-negative claims.",
"Cover who/what/when/where/why + timeline, impact, scope, evidence, recommendations." ] },

"cysa-rep-2": { intro: "Lorak loves a vague number he can spin. Hard metrics — measured the same way every time — are the numbers he can't twist.",
sections: [
{ h: "The core IR metrics", b: "Mean Time to Detect (MTTD): from compromise to detection. Mean Time to Respond (MTTR): from detection to response/containment. Mean Time to Remediate: from detection to full remediation. Alert volume: how many alerts the SOC handles (and the alert-to-incident ratio). Dwell time: how long an attacker was present before eviction. These quantify SOC performance and, trended over time, prove whether changes help.", data: "MTTD  = detect_time  - compromise_time\nMTTR  = respond_time - detect_time\nMTTRem= remediated   - detect_time\nDwell time = eviction - initial_compromise\n(lower is better on all)" },
{ h: "Vulnerability-program KPIs", b: "Beyond IR: vulnerability closure/remediation rate, mean time to remediate vulnerabilities, vulnerability aging (how long findings stay open), recurrence rate (do fixed issues come back), and coverage/scan cadence. A rising backlog or aging trend signals a program falling behind; a high recurrence rate signals fixes that don't stick or a root cause left open." },
{ h: "SLAs, SLOs, and elapsed-time math", b: "A Service-Level Agreement (SLA) is a committed target (e.g., 'critical vulnerabilities remediated within 15 days'); a Service-Level Objective (SLO) is an internal goal. Reporting tracks whether you're meeting them. Expect simple elapsed-time calculations: if a critical was found on day 1 and fixed on day 20 against a 15-day SLA, you breached by 5 days — be ready to compute and state that plainly.", data: "SLA: criticals fixed <= 15 days\nFound: Jun 1 · Fixed: Jun 20 → 19 days elapsed → SLA BREACH (+4 days)" },
{ h: "Trends and what metrics mean", b: "A single number is noise; the trend is the signal. Report direction over time (MTTD falling quarter over quarter is improvement) and pair metrics with context — a spike in alert volume might be a new noisy rule, not more attacks. Metrics exist to drive decisions and show whether the program is getting better; present them so leaders can act, not just admire a dashboard." },
],
traps: [
"Know precisely what each metric measures: MTTD (to detect) vs MTTR (to respond) vs mean time to remediate — the exam swaps their definitions.",
"SLA (committed/contractual target) vs SLO (internal objective) — don't conflate them.",
"Expect to compute elapsed time and compare against an SLA to judge breach/compliance.",
"One data point isn't a metric story — trends and context are what matter; a spike can be a noisy rule, not an attack surge." ],
keys: [
"MTTD = to detect · MTTR = to respond · mean time to remediate = to fix.",
"Vuln KPIs: closure rate, aging, recurrence, coverage.",
"SLA = committed target; SLO = internal goal; be ready to compute breaches.",
"Report trends with context; metrics drive decisions." ] },

"cysa-rep-3": { intro: "The instant an incident is real, Lorak races to shape who hears what. Beat him by knowing who must be told, when, and by whom — before the incident ever happens.",
sections: [
{ h: "Stakeholder identification", b: "Different incidents demand different notifications. Internal: leadership/executives, legal, IT, HR, the affected business units. External: customers, regulators, law enforcement, insurers, and sometimes the media/public relations. Part of preparation is a stakeholder/communication plan that says who is notified, in what order, and through what channel — so notification isn't improvised mid-crisis." },
{ h: "Incident declaration and escalation", b: "Someone must have the authority to formally declare an incident and trigger the response and communication plan. Escalation paths define when an incident rises to leadership, legal, or external parties based on severity and impact. Clear declaration/escalation prevents both under-reaction (a real breach handled as routine) and over-reaction (paging the CEO for a false positive).", data: "Escalation triggers (examples):\n- confirmed data breach → legal + executives + (maybe) regulators\n- active exfil of regulated data → law enforcement consideration\n- customer data exposed → customer comms + PR\n- routine malware, contained → SOC handles, no external notice" },
{ h: "Legal, regulatory, and law-enforcement coordination", b: "Regulations impose breach-notification duties with deadlines (e.g., notify affected parties/regulators within a set window when certain data is exposed). Legal decides what must be disclosed and coordinates with law enforcement when a crime is involved. Analysts don't make disclosure calls alone — they surface the facts and let legal/compliance drive external notification. Preserving evidence supports any resulting legal action." },
{ h: "Public relations and customer communication", b: "When customers or the public are affected, PR and customer communications are coordinated — accurate, timely, and consistent, without overclaiming or speculating. Premature or contradictory statements erode trust and create liability. The security team supplies verified facts; PR and legal craft the external message. One controlled channel beats a dozen conflicting voices — exactly the chaos Lorak thrives on." },
],
traps: [
"Analysts surface facts; legal/compliance decide regulatory disclosure and law-enforcement involvement — an answer where the analyst unilaterally notifies regulators or the press is usually wrong.",
"Notify based on the incident type and stakeholder plan, not everyone for everything (or no one).",
"Regulatory breach-notification has deadlines — missing the window is its own violation.",
"External statements must be accurate and coordinated; premature/speculative disclosure creates liability." ],
keys: [
"Identify stakeholders in advance: leadership, legal, IT, HR, customers, regulators, LE, PR.",
"Someone must have authority to declare/escalate incidents by severity.",
"Legal drives regulatory disclosure and LE coordination; know notification deadlines.",
"Coordinate PR/customer comms — accurate, timely, single controlled channel." ] },

"cysa-rep-4": { intro: "Lorak forges compliance paperwork for a living. Your defense is a vulnerability report so clear and well-scored that his fakes stand out like a Grub at a Ranger parade.",
sections: [
{ h: "Vulnerability management reporting", b: "Vulnerability reports communicate the state of the program to stakeholders: affected hosts, the vulnerabilities and their risk scores, trends over time, and the top/critical items (e.g., a Top 10, criticals, zero-days). Reports should be prioritized by risk (not raw CVSS alone), show progress, and give action plans — what will be remediated, by whom, and by when." },
{ h: "Action plans and remediation reporting", b: "An action plan turns findings into committed work: configuration management changes, patching schedules, compensating controls, and awareness/training where people are the gap. It names owners and target dates and reports status against them. Reporting blockers is part of the job — surface the inhibitors (MOU/SLA constraints, business-process interruption, legacy/proprietary systems, governance) so leadership can decide.", data: "Action-plan line item:\nFinding: internet-facing CVE (KEV) · Owner: Web team\nAction: patch in Sat window · Interim: WAF virtual patch\nTarget: Jun 20 · Status: on track" },
{ h: "Compliance reports and mapping", b: "Compliance reports show adherence to a standard or regulation (PCI DSS, HIPAA, etc.) — which controls are met, which are gaps, and remediation plans for gaps. CySA+ V4 expects fluency in framework/governance language (e.g., NIST CSF 2.0 terminology) so security findings translate into the governance and audit vocabulary leadership and auditors use." },
{ h: "Risk scoring and defensible reporting", b: "Report risk, not just severity: combine CVSS with exploitability (KEV/EPSS), exposure, and asset value so the report reflects real business risk. Document exceptions (accepted risks with owner and expiry). Present findings so a reader can act — clear risk ratings, prioritized lists, and trends — rather than an undifferentiated dump of scanner output, which no stakeholder can use." },
],
traps: [
"Vulnerability reports should be risk-prioritized and audience-ready — a raw, unfiltered scanner export is not a report.",
"Reporting inhibitors/blockers is expected, not a failure — leadership needs to know why something can't be remediated.",
"Compliance reporting maps findings to a standard's controls; know the governance vocabulary (e.g., NIST CSF 2.0).",
"Action plans need owners and dates; 'we'll fix it eventually' isn't an action plan." ],
keys: [
"Vuln reports: affected hosts, risk scores, trends, top/critical items — prioritized.",
"Action plans assign owners and dates and report blockers/inhibitors.",
"Compliance reports map controls to standards; speak governance (CSF 2.0) language.",
"Report business risk (severity + exploitability + exposure + value), not raw CVSS." ] },

"cysa-rep-5": { intro: "The final report is where Lorak makes his last stand — twisting blame, hiding causes, burying lessons. Write it straight: root cause found, lessons banked, recommendations owned. Then he's finished.",
sections: [
{ h: "Root cause analysis in the report", b: "The after-action/incident report must state the root cause, clearly separated from the trigger and contributing factors. 'A user clicked a link' is the trigger; 'no attachment-detonation control existed' is the root cause. Techniques like the 5 Whys get you there. Reporting the true root cause is what lets the organization fix the right thing — and denies Lorak the vague, mis-assigned blame he feeds on." },
{ h: "Lessons learned and recommendations", b: "Document what worked, what didn't, and specific, owned, measurable recommendations. 'Be more careful' is not a recommendation; 'deploy attachment sandboxing to all mail flows by Q3, owner: Email team' is. Lessons feed back into detections, playbooks, and preparation — closing the loop so the same incident doesn't recur.", data: "Recommendation (good): deploy macro-block GPO fleet-wide by Aug 15 (owner: Endpoint) \nRecommendation (bad): 'improve security awareness'  ← vague, unowned, unmeasurable" },
{ h: "The after-action report structure", b: "A complete after-action report includes: executive summary, timeline, scope and impact, evidence, root cause, response actions taken, effectiveness metrics (MTTD/MTTR/dwell), and recommendations with owners and dates. It serves two audiences at once via layering — business summary up top, technical detail below — so both leadership and future responders get what they need." },
{ h: "Blameless culture and honest reporting", b: "After-action reviews and reports are blameless by design. The goal is systemic improvement, not punishing individuals — because blame suppresses the honest reporting future response depends on. A report that scapegoats a person instead of fixing the process guarantees the next incident and poisons the reporting culture. Truth over blame is both the ethical and the effective choice." },
],
traps: [
"State the root cause, not just the trigger — 'the user clicked' is the trigger; the missing control is the root cause.",
"Recommendations must be specific, owned, and measurable; vague exhortations aren't outcomes.",
"After-action reports layer business summary over technical detail to serve both audiences.",
"Keep it blameless — a report that blames an individual for a systemic gap is the classic wrong answer." ],
keys: [
"Report root cause distinct from trigger/contributing factors (5 Whys).",
"Lessons → specific, owned, measurable recommendations that feed back into defenses.",
"After-action report: summary, timeline, scope/impact, evidence, root cause, metrics, recommendations.",
"Blameless reporting protects honesty and drives real fixes." ] },
},
mcq: {
"cysa-rep-1": [
{ s: "You must brief the board an hour after a contained breach.", e: "Facts: no encryption executed, entry vector patched, 3 servers touched, no evidence of exfiltration", q: "What belongs in the executive summary?", options: [
 { t: "Business impact, actions taken, and recommendations in plain language — with 'no evidence of exfiltration identified'", c: true, w: "Executives need business risk and decisions, and the defensible phrasing that reports only what evidence supports." },
 { t: "The full ATT&CK-mapped technical timeline and packet captures", c: false, w: "Right content for engineers, wrong audience — the board needs business impact, not methodology." },
 { t: "A definitive statement that no data was stolen", c: false, w: "You can't prove a negative; overclaiming creates liability if discovery later contradicts it." },
 { t: "Only the sentence 'the incident is handled'", c: false, w: "Too little — the board needs impact and the decision required, not a one-liner." } ] },
{ s: "The same intrusion must be documented for two audiences.", e: "Readers: the executive team and the SOC engineers", q: "How should the reports differ?", options: [
 { t: "Executives get business impact and decisions; engineers get IoCs, hosts, and remediation steps", c: true, w: "Audience-appropriate reporting is the core skill: tailor depth and language to who reads it." },
 { t: "Both get the identical 40-page technical report", c: false, w: "Executives won't extract decisions from raw technical depth; one-size-fits-all fails." },
 { t: "Both get a single sentence to keep it simple", c: false, w: "Engineers need the technical detail to act; oversimplifying fails them." },
 { t: "Engineers get the business summary; executives get the packet captures", c: false, w: "Reversed audiences — each gets what the other needs." } ] },
{ s: "A draft report states a conclusion the evidence doesn't fully support.", e: "Evidence: exfil not observed. Draft says: 'No data left the network.'", q: "Best revision?", options: [
 { t: "'No evidence of data exfiltration was identified' — report only what evidence supports", c: true, w: "Defensible language avoids the unprovable negative and the liability of overclaiming." },
 { t: "Keep 'no data left the network' — it's more reassuring", c: false, w: "Reassuring but indefensible; it claims more than the evidence proves." },
 { t: "'Data was definitely stolen' to be safe", c: false, w: "Equally unsupported in the other direction; state what evidence shows." },
 { t: "Omit the exfiltration question entirely", c: false, w: "Stakeholders need the finding; state it in defensible terms rather than dropping it." } ] },
{ s: "An incident report is being structured.", e: "Goal: tell the whole story and enable action", q: "Which set of elements should it cover?", options: [
 { t: "Who, what, when, where, why, plus timeline, impact, scope, evidence, and recommendations", c: true, w: "These are the standard building blocks of a complete incident report." },
 { t: "Only the malware's file hash", c: false, w: "A single IoC doesn't tell the story or enable decisions." },
 { t: "Just the analyst's personal opinion", c: false, w: "Reports are evidence-based, not opinion; and they need structure." },
 { t: "The SOC's staffing budget", c: false, w: "Irrelevant to documenting the incident." } ] },
{ s: "A report mixes proven facts with the analyst's interpretation without distinction.", e: "Confirmed beacon + assessed (unconfirmed) attribution presented as equal", q: "What should the analyst do?", options: [
 { t: "Clearly separate confirmed facts from assessments and state confidence levels", c: true, w: "Distinguishing fact from assessment (with confidence) keeps the report honest and defensible." },
 { t: "Present all of it as confirmed fact for a stronger report", c: false, w: "Overstating assessments as facts is misleading and risky." },
 { t: "Remove all analysis and give only raw logs", c: false, w: "Stakeholders need interpretation — just labeled as assessment, not fact." },
 { t: "Let the reader guess which is which", c: false, w: "Ambiguity invites misuse; the analyst must delineate them." } ] },
{ s: "An executive asks 'so what does this mean for the business?'", e: "You have deep technical findings ready", q: "Best communication approach:", options: [
 { t: "Translate the findings into business risk: potential cost, downtime, data exposure, and the decision needed", c: true, w: "Executives think in business terms; translating technical findings into risk drives decisions." },
 { t: "Walk them through the raw SIEM queries line by line", c: false, w: "That answers a question they didn't ask and obscures the business meaning." },
 { t: "Tell them it's 'too technical to explain'", c: false, w: "Dismissive and unhelpful; your job is to translate, not to gatekeep." },
 { t: "Send them the full forensic report to read themselves", c: false, w: "Executives need a synthesized answer, not a document to parse." } ] },
{ s: "A stakeholder wants the report to sound more alarming than the facts warrant to secure budget.", e: "Actual impact: limited, contained quickly", q: "Correct professional response:", options: [
 { t: "Report the accurate impact; make the case for investment with real risk and trends, not exaggeration", c: true, w: "Integrity requires accurate reporting; overstating impact destroys credibility and is unethical." },
 { t: "Exaggerate the impact to get the budget approved", c: false, w: "Misrepresenting facts is dishonest and backfires when scrutinized." },
 { t: "Understate everything to avoid alarm", c: false, w: "Equally wrong in the other direction; report the truth." },
 { t: "Refuse to write any report", c: false, w: "The report is needed; the answer is accuracy, not refusal." } ] },
{ s: "Engineers receive a report that only says 'the environment is secure now.'", e: "They need to act on the findings", q: "What's missing for this audience?", options: [
 { t: "Technical specifics: affected hosts, IoCs, remediation steps, and validation", c: true, w: "Technical audiences need actionable detail; a business-level reassurance leaves them unable to act." },
 { t: "Nothing; 'secure now' is sufficient detail for engineers", c: false, w: "Engineers can't act on a vague assurance with no specifics." },
 { t: "A longer executive summary", c: false, w: "More business summary doesn't give engineers what they need." },
 { t: "The company's stock price", c: false, w: "Irrelevant to remediation work." } ] } ],

"cysa-rep-2": [
{ s: "A metrics review defines the SOC's timing measures.", e: "Compromise at T0, detected at T0+6d, contained at T0+6d+4h, remediated at T0+9d", q: "Which correctly describes MTTD?", options: [
 { t: "Mean Time to Detect = time from compromise to detection (6 days here)", c: true, w: "MTTD measures how long until the incident is detected — the 6-day gap." },
 { t: "MTTD = time from detection to containment", c: false, w: "That's response time (MTTR), not detection time." },
 { t: "MTTD = time from compromise to full remediation", c: false, w: "That's closer to mean time to remediate, not detect." },
 { t: "MTTD = total number of alerts", c: false, w: "Alert volume is a separate metric, not a time-to-detect." } ] },
{ s: "A critical vulnerability tracked against an SLA.", e: "SLA: criticals remediated within 15 days. Found Jun 1, fixed Jun 22.", q: "Was the SLA met?", options: [
 { t: "No — 21 days elapsed, breaching the 15-day SLA by 6 days", c: true, w: "Jun 1 to Jun 22 is 21 days; against a 15-day target that's a 6-day breach." },
 { t: "Yes — it was fixed, so the SLA is met", c: false, w: "Being fixed isn't enough; it must be within the committed window." },
 { t: "No — it breached by exactly 15 days", c: false, w: "The breach is the overage (6 days), not the whole SLA period." },
 { t: "Can't be determined from the dates", c: false, w: "Simple elapsed-time math determines it: 21 vs 15 days." } ] },
{ s: "Leadership confuses two service-level terms.", e: "One is a committed/contractual target; one is an internal goal", q: "Which distinction is correct?", options: [
 { t: "SLA is the committed target; SLO is the internal objective", c: true, w: "SLA = agreed/committed commitment; SLO = internal goal that supports it." },
 { t: "SLA and SLO are identical terms", c: false, w: "They differ: one is a commitment, the other an internal objective." },
 { t: "SLO is the contractual commitment; SLA is just a goal", c: false, w: "Reversed — the SLA is the commitment." },
 { t: "Both are types of malware", c: false, w: "Neither is malware; they're service-level terms." } ] },
{ s: "The SOC reports a single month's MTTD of 8 hours with no context.", e: "Leadership asks whether that's good", q: "Best way to make the metric meaningful:", options: [
 { t: "Show the trend over time and compare against targets/baselines", c: true, w: "A single number is noise; direction over time against a target is the signal." },
 { t: "State the number alone; context is unnecessary", c: false, w: "Without a trend or target, 8 hours means little to leadership." },
 { t: "Replace it with alert volume only", c: false, w: "Different metric; doesn't answer whether detection speed is good." },
 { t: "Report it as a percentage of the annual budget", c: false, w: "Nonsensical; MTTD isn't a budget fraction." } ] },
{ s: "Alert volume spiked 300% this week.", e: "Investigation: a newly deployed detection rule is noisy", q: "How should this be reported?", options: [
 { t: "As a tuning issue (noisy new rule), not an attack surge — with context explaining the spike", c: true, w: "Metrics need context; a volume spike from a noisy rule isn't more attacks." },
 { t: "As a 300% increase in attacks", c: false, w: "Misattributes a tuning artifact to real threat activity." },
 { t: "Hide the spike so the dashboard looks clean", c: false, w: "Concealing data is dishonest; explain it instead." },
 { t: "As proof the SOC is failing", c: false, w: "The spike reflects a rule to tune, not a failing SOC." } ] },
{ s: "A vulnerability program reports its health.", e: "Findings staying open longer each month; fixed issues reappearing", q: "Which two KPIs capture these problems?", options: [
 { t: "Vulnerability aging (open duration) and recurrence rate (issues coming back)", c: true, w: "Aging tracks how long findings stay open; recurrence flags fixes that don't stick or an open root cause." },
 { t: "MTTD and alert volume", c: false, w: "Those are IR/monitoring metrics, not vuln-aging or recurrence." },
 { t: "Stock price and headcount", c: false, w: "Not vulnerability KPIs." },
 { t: "SLA font size and dashboard color", c: false, w: "Cosmetic, not measurements." } ] },
{ s: "A team measures how long attackers were present before eviction.", e: "Initial compromise Mar 1, attacker evicted Mar 30", q: "This metric is:", options: [
 { t: "Dwell time (about 29 days here)", c: true, w: "Dwell time is the attacker's presence from initial compromise to eviction." },
 { t: "Alert volume", c: false, w: "That counts alerts, not attacker presence duration." },
 { t: "SLA compliance", c: false, w: "Unrelated to how long the attacker was present." },
 { t: "Mean time to respond", c: false, w: "MTTR starts at detection, not initial compromise; dwell spans the whole presence." } ] },
{ s: "Leadership asks which metric shows detection is improving quarter over quarter.", e: "Q1 MTTD 6 days, Q2 4 days, Q3 2 days", q: "Correct interpretation:", options: [
 { t: "Falling MTTD across quarters indicates faster detection — an improving trend", c: true, w: "Lower MTTD over time means the SOC detects sooner; the downward trend is the win." },
 { t: "Rising numbers would be better for MTTD", c: false, w: "Lower is better for MTTD; you want to detect faster." },
 { t: "MTTD trend says nothing about detection", c: false, w: "MTTD is precisely the detection-speed metric." },
 { t: "Only the single latest value matters, not the trend", c: false, w: "The trend is what demonstrates improvement." } ] } ],

"cysa-rep-3": [
{ s: "A confirmed breach exposes regulated customer data.", e: "Analyst wants to notify the state regulator immediately on their own", q: "Correct process?", options: [
 { t: "Surface the facts to legal/compliance, who drive regulatory disclosure within required deadlines", c: true, w: "Analysts provide facts; legal/compliance decide and execute regulatory notification." },
 { t: "The analyst emails the regulator directly without legal", c: false, w: "Disclosure decisions belong to legal/compliance, not a unilateral analyst action." },
 { t: "Tell no one outside the SOC ever", c: false, w: "Regulated-data breaches often require notification; silence can violate law." },
 { t: "Post the breach on social media for transparency", c: false, w: "Uncoordinated public disclosure creates liability and chaos." } ] },
{ s: "An organization is defining who gets notified for various incidents.", e: "Goal: no improvised notifications mid-crisis", q: "What should exist ahead of time?", options: [
 { t: "A stakeholder/communication plan mapping who is notified, in what order, via which channel", c: true, w: "Pre-defined stakeholder and comms plans prevent improvised, inconsistent notification." },
 { t: "Nothing; decide who to call once an incident hits", c: false, w: "Improvising notifications mid-crisis is exactly what the plan prevents." },
 { t: "A rule to always call every stakeholder for every alert", c: false, w: "Over-notifying for routine events causes fatigue and noise." },
 { t: "A policy to never notify anyone externally", c: false, w: "Some incidents legally require external notification." } ] },
{ s: "A routine, contained malware infection on one workstation.", e: "No data exposure, no regulated systems touched", q: "Appropriate communication?", options: [
 { t: "SOC handles it per playbook; no external notification needed", c: true, w: "Notify based on incident type — a contained routine infection doesn't warrant executive/external escalation." },
 { t: "Immediately notify regulators, media, and law enforcement", c: false, w: "Over-escalation for a routine contained event wastes goodwill and attention." },
 { t: "Page the CEO at 3 a.m.", c: false, w: "Escalation should match severity; this doesn't warrant it." },
 { t: "Issue a public press release", c: false, w: "No public impact; a press release is disproportionate." } ] },
{ s: "A breach may involve a crime, and evidence exists.", e: "Question of involving law enforcement", q: "Best practice?", options: [
 { t: "Coordinate through legal on law-enforcement involvement while preserving evidence and chain of custody", c: true, w: "Legal drives LE coordination; preserved evidence supports any resulting case." },
 { t: "The analyst calls the police and hands over the original drive with no documentation", c: false, w: "Unilateral, undocumented handoff breaks custody and bypasses legal." },
 { t: "Destroy the evidence to avoid involvement", c: false, w: "Destroying evidence is spoliation and obstructs justice." },
 { t: "Ignore the criminal aspect entirely", c: false, w: "Legal should evaluate LE involvement; ignoring it may be improper." } ] },
{ s: "Customers are affected and the press is asking questions.", e: "Security has verified facts; PR wants to respond", q: "Correct division of responsibility?", options: [
 { t: "Security supplies verified facts; PR and legal craft the coordinated external message", c: true, w: "One controlled, accurate channel: security provides facts, PR/legal shape the public statement." },
 { t: "Each analyst answers reporters independently", c: false, w: "Multiple uncoordinated voices create contradictions and liability." },
 { t: "Speculate publicly to fill the information gap", c: false, w: "Premature speculation erodes trust and creates liability." },
 { t: "Refuse to acknowledge anything ever", c: false, w: "Stonewalling when customers are affected damages trust; coordinate a truthful message." } ] },
{ s: "An incident's severity rises and must move up the chain.", e: "Confirmed data breach affecting a regulated system", q: "What defines when and how this happens?", options: [
 { t: "An escalation path with declaration authority, triggered by severity/impact", c: true, w: "Clear declaration and escalation criteria route incidents to the right parties by severity." },
 { t: "Whoever notices it decides alone what to do", c: false, w: "Ad-hoc, single-person decisions cause inconsistent handling." },
 { t: "Escalate only after the incident is fully over", c: false, w: "Escalation must be timely; waiting until it's over defeats the purpose." },
 { t: "Never escalate to keep the incident quiet", c: false, w: "Suppressing a serious breach violates policy and often law." } ] },
{ s: "A regulation requires breach notification within a fixed window.", e: "Regulated data confirmed exposed; clock is running", q: "Why does the deadline matter?", options: [
 { t: "Missing the notification window is itself a violation, independent of the breach", c: true, w: "Regulatory deadlines are binding; a late notice adds a second violation on top of the breach." },
 { t: "Deadlines are suggestions with no consequences", c: false, w: "They're legally binding with penalties for lateness." },
 { t: "You can notify whenever it's convenient", c: false, w: "Convenience doesn't override a legal deadline." },
 { t: "Only the technical fix matters, not notification", c: false, w: "Both remediation and timely notification are required." } ] },
{ s: "During a major incident, several teams want to send their own updates.", e: "Legal, PR, and two managers each drafting separate customer messages", q: "Best approach to external messaging?", options: [
 { t: "Consolidate into one coordinated, accurate message through a single controlled channel", c: true, w: "A single controlled channel prevents contradictions and preserves trust." },
 { t: "Let every team send its own version", c: false, w: "Conflicting messages confuse customers and create liability." },
 { t: "Send nothing and hope no one notices", c: false, w: "Silence when customers are affected erodes trust and may violate rules." },
 { t: "Have the SOC analyst tweet updates in real time", c: false, w: "Uncoordinated real-time posting bypasses legal/PR and risks inaccuracy." } ] } ],

"cysa-rep-4": [
{ s: "A vulnerability report is being prepared for leadership.", e: "Raw data: 1,800-line scanner export", q: "What makes it a useful report rather than a data dump?", options: [
 { t: "Risk-prioritized findings, affected hosts, trends, and top/critical items with an action plan", c: true, w: "Reports synthesize and prioritize by risk so stakeholders can act — not an unfiltered export." },
 { t: "The full 1,800-line export pasted in", c: false, w: "A raw dump isn't a report; no stakeholder can act on it." },
 { t: "Only the total count of findings", c: false, w: "A single number hides priority, hosts, and trends." },
 { t: "A list sorted alphabetically by hostname", c: false, w: "Alphabetical order ignores risk; prioritize by business risk." } ] },
{ s: "A finding can't be remediated due to a vendor contract barring changes.", e: "Report must reflect this reality", q: "How should it be handled in reporting?", options: [
 { t: "Report the inhibitor (contractual/MOU constraint) and any compensating controls so leadership can decide", c: true, w: "Surfacing inhibitors is expected — leadership needs to know why a fix is blocked." },
 { t: "Omit the finding since it can't be fixed", c: false, w: "Hiding an unremediated risk misleads stakeholders." },
 { t: "Report it as fully remediated", c: false, w: "False — it's blocked, not fixed; that's dishonest reporting." },
 { t: "Blame the vendor publicly in the report", c: false, w: "State the inhibitor factually; public blame isn't the reporting goal." } ] },
{ s: "An action plan is drafted for the remediation report.", e: "Item: 'Fix the internet-facing CVE eventually.'", q: "What's missing?", options: [
 { t: "An owner, a target date, and interim controls/status", c: true, w: "Action plans commit work with owners and dates and report status — 'eventually' isn't a plan." },
 { t: "Nothing; 'eventually' is a sufficient timeline", c: false, w: "No owner or date means it can't be tracked or held accountable." },
 { t: "The analyst's personal phone number", c: false, w: "Irrelevant; ownership means an accountable team/role, not contact trivia." },
 { t: "A longer description of the CVE's history", c: false, w: "History doesn't make it actionable; owner and date do." } ] },
{ s: "A compliance report must show adherence to a standard.", e: "Standard: PCI DSS; some controls met, some gaps", q: "What should it contain?", options: [
 { t: "Which controls are met, which are gaps, and remediation plans for the gaps", c: true, w: "Compliance reports map controls to the standard and plan for the gaps." },
 { t: "Only the controls that are already met", c: false, w: "Hiding gaps defeats the purpose of a compliance report." },
 { t: "A statement that compliance is 'probably fine'", c: false, w: "Vague assurance isn't a compliance report." },
 { t: "The SOC's lunch schedule", c: false, w: "Irrelevant to compliance." } ] },
{ s: "Leadership wants findings expressed in governance terms auditors recognize.", e: "V4 expects fluency in framework vocabulary", q: "Which is the right move?", options: [
 { t: "Map security findings to a governance framework's language (e.g., NIST CSF 2.0)", c: true, w: "Translating findings into recognized framework/governance vocabulary aligns with auditors and leadership." },
 { t: "Invent your own private terminology", c: false, w: "Custom jargon defeats the purpose of speaking the auditors' language." },
 { t: "Avoid frameworks entirely", c: false, w: "V4 expects governance-framework fluency for reporting." },
 { t: "Use only raw CVE numbers with no context", c: false, w: "CVEs alone aren't governance language for compliance reporting." } ] },
{ s: "A report ranks findings for stakeholders.", e: "Options: raw CVSS only, or CVSS plus exploitability, exposure, and asset value", q: "Which produces a business-risk-aligned report?", options: [
 { t: "Combine CVSS with exploitability (KEV/EPSS), exposure, and asset value", c: true, w: "Business risk = severity plus context; report that, not raw severity alone." },
 { t: "Raw CVSS only, always", c: false, w: "CVSS is severity, not risk; context is required for prioritization." },
 { t: "Random order to avoid bias", c: false, w: "Randomization discards prioritization entirely." },
 { t: "Whatever the scanner lists first", c: false, w: "Tool order isn't risk order." } ] },
{ s: "The report documents accepted risks.", e: "Several findings were formally accepted by owners", q: "How should exceptions appear?", options: [
 { t: "Documented with the risk owner and an expiry/review date", c: true, w: "Accepted risks are tracked with owner and expiry so they resurface for review." },
 { t: "Silently dropped from the report", c: false, w: "Undocumented acceptance hides risk from stakeholders." },
 { t: "Listed with no owner or expiry", c: false, w: "Without owner and review date, acceptances become permanent blind spots." },
 { t: "Marked as remediated", c: false, w: "Accepted is not remediated; mislabeling misrepresents status." } ] },
{ s: "A vulnerability trend report is prepared for the quarter.", e: "Data: monthly open/closed counts, top criticals, recurrence", q: "What's the value of showing trends and a Top 10?", options: [
 { t: "They show program direction and focus attention on the highest-impact items", c: true, w: "Trends reveal whether the program is improving; a Top 10 focuses limited effort on what matters most." },
 { t: "Trends are decorative and add no value", c: false, w: "Trends are the signal leadership needs to judge the program." },
 { t: "A Top 10 hides the important findings", c: false, w: "A prioritized Top 10 highlights, not hides, the critical items." },
 { t: "Only totals matter, never direction", c: false, w: "Direction over time is exactly what makes metrics actionable." } ] } ],

"cysa-rep-5": [
{ s: "The after-action report must state why the incident happened.", e: "phish clicked → macro ran → macros allowed → no attachment policy", q: "What should the report list as the root cause?", options: [
 { t: "The missing attachment/macro control policy — distinct from the trigger (the click)", c: true, w: "Root cause is the systemic gap; the click is only the trigger. Fixing the root prevents recurrence." },
 { t: "The user who clicked the link", c: false, w: "That's the trigger; blaming the user misses the systemic root cause." },
 { t: "The existence of email", c: false, w: "Too broad to act on; RCA targets the fixable control gap." },
 { t: "Bad luck", c: false, w: "Not a root cause; RCA identifies an addressable systemic gap." } ] },
{ s: "A recommendation is drafted for the after-action report.", e: "Draft: 'Improve security awareness.'", q: "Why is this inadequate?", options: [
 { t: "It's not specific, owned, or measurable — good recommendations name a change, an owner, and a date", c: true, w: "Actionable recommendations are concrete and assignable; vague exhortations can't be executed or tracked." },
 { t: "It's perfectly actionable as written", c: false, w: "'Improve awareness' has no owner, action, or deadline." },
 { t: "It's too specific", c: false, w: "The problem is the opposite — it's far too vague." },
 { t: "It should name a person to punish", c: false, w: "Reports are blameless; recommend a process change, not punishment." } ] },
{ s: "An after-action report will be read by executives and future responders.", e: "Goal: serve both audiences in one document", q: "Best structure?", options: [
 { t: "Layer a business executive summary on top with technical detail (timeline, evidence, metrics) below", c: true, w: "Layering serves executives up top and responders in the depth below — one report, both audiences." },
 { t: "Write only a technical report with no summary", c: false, w: "Executives won't extract decisions from raw technical depth." },
 { t: "Write only a business summary with no detail", c: false, w: "Future responders need the technical specifics." },
 { t: "Two totally unrelated documents with different facts", c: false, w: "The facts must be consistent; layering keeps one coherent report." } ] },
{ s: "A manager wants the report to name and blame the employee who clicked.", e: "Review goal: prevent recurrence", q: "Correct stance for the report?", options: [
 { t: "Keep it blameless and target the systemic control; blame suppresses future honest reporting", c: true, w: "Blameless reporting drives systemic fixes and preserves the reporting culture response depends on." },
 { t: "Name and blame the employee prominently", c: false, w: "Scapegoating an individual poisons reporting culture and ignores the root cause." },
 { t: "Blame the SOC instead", c: false, w: "Same anti-pattern; fix the process, don't assign blame." },
 { t: "Skip the report to avoid the conflict", c: false, w: "The report is needed; write it blameless, not not-at-all." } ] },
{ s: "The after-action report is assembled.", e: "Available: summary, timeline, scope/impact, evidence, root cause, response actions, metrics, recommendations", q: "Which represents a complete report?", options: [
 { t: "All of them: summary, timeline, scope/impact, evidence, root cause, actions, effectiveness metrics, and owned recommendations", c: true, w: "A complete after-action report tells the full story and turns it into assignable improvements." },
 { t: "Just the timeline", c: false, w: "A timeline alone omits root cause, metrics, and recommendations." },
 { t: "Only the metrics dashboard", c: false, w: "Metrics without context, cause, and actions is incomplete." },
 { t: "A single 'resolved' note", c: false, w: "Captures none of the learning or accountability." } ] },
{ s: "Lessons-learned outputs are ready.", e: "New IoCs, a detection gap, and updated TTPs identified", q: "Where should they go to close the loop?", options: [
 { t: "Feed them back into detections, playbooks, and preparation", c: true, w: "Applying lessons to monitoring and readiness closes the lifecycle loop and prevents recurrence." },
 { t: "Archive them and never revisit", c: false, w: "Unapplied lessons improve nothing." },
 { t: "Share only with the person blamed", c: false, w: "Improvements are systemic; there's no one to blame." },
 { t: "Delete them to shorten the report", c: false, w: "Discarding IoCs/TTPs throws away the incident's defensive value." } ] },
{ s: "Metrics are included to show response effectiveness in the report.", e: "Available: MTTD, MTTR, dwell time, recurrence", q: "Why include these in an after-action report?", options: [
 { t: "They quantify how the response performed and whether fixes are working over time", c: true, w: "Effectiveness metrics turn a narrative into measurable performance and track improvement." },
 { t: "They make the report look longer", c: false, w: "They're substantive, not filler." },
 { t: "They assign blame to individuals", c: false, w: "Metrics measure the program, not people to punish." },
 { t: "They replace the need for a root-cause analysis", c: false, w: "Metrics complement RCA; they don't replace it." } ] },
{ s: "An RCA cleanly separates the levels of causation.", e: "trigger (click), contributing factor (no sandboxing), root cause (no macro-block standard)", q: "Why report all three levels?", options: [
 { t: "Fixing the root cause prevents recurrence, while addressing contributing factors strengthens defense in depth", c: true, w: "Clear separation ensures the right fix (root) plus layered improvements (contributing factors)." },
 { t: "Only the trigger needs reporting", c: false, w: "Fixing the trigger without the root cause invites recurrence." },
 { t: "Listing them just pads the report", c: false, w: "It's what makes recommendations effective, not padding." },
 { t: "Contributing factors should be hidden", c: false, w: "They inform defense-in-depth improvements; report them." } ] } ],
},
pbqs: [
{ type: "order", s: "An analyst must build an incident report from scratch after a breach.", task: "Order the incident report sections logically:",
 steps: ["Executive summary (business impact, plain language)", "Timeline of events (who/what/when/where/why)", "Scope and impact", "Evidence", "Root cause analysis", "Recommendations with owners and dates"],
 x: "Lead with the executive summary for decision-makers, then the factual timeline, scope/impact, supporting evidence, the root cause, and finally the assignable recommendations." },
{ type: "order", s: "A regulated-data breach is confirmed and communication must proceed correctly.", task: "Order the stakeholder communication steps:",
 steps: ["Declare the incident via defined authority", "Notify internal leadership and legal", "Legal/compliance determine regulatory obligations and deadlines", "Coordinate customer/PR messaging through one channel", "Issue regulatory notification within the required window", "Document all communications in the report"],
 x: "Declare first, bring in leadership/legal, let legal drive regulatory decisions, coordinate a single external message, meet the notification deadline, and record it all." },
{ type: "order", s: "A quarterly vulnerability report is being assembled for leadership.", task: "Order the reporting workflow:",
 steps: ["Consolidate and validate scan findings", "Prioritize by business risk (severity + exploitability + exposure + value)", "Build action plans with owners and dates", "Note inhibitors/blockers and accepted-risk exceptions", "Present trends, Top 10, and KPIs to stakeholders"],
 x: "Validate, risk-prioritize, assign owned actions, surface blockers/exceptions, then present the risk-framed trends and KPIs leadership can act on." },
{ type: "match", s: "Match each incident-response metric to what it measures.", task: "Assign every metric:",
 cats: ["Time to detect", "Time to respond", "Attacker presence", "Volume"],
 items: [
  { t: "MTTD", c: "Time to detect" },
  { t: "MTTR (mean time to respond)", c: "Time to respond" },
  { t: "Dwell time", c: "Attacker presence" },
  { t: "Alert volume", c: "Volume" },
  { t: "Time from compromise to detection", c: "Time to detect" },
  { t: "Time from detection to containment", c: "Time to respond" } ],
 x: "MTTD = compromise-to-detection; MTTR = detection-to-response; dwell time = full attacker presence; alert volume = count of alerts handled." },
{ type: "match", s: "Match each stakeholder to when they are typically notified.", task: "Assign the correct trigger:",
 cats: ["Always (internal)", "When regulated data is exposed", "When crime is suspected", "When customers/public affected"],
 items: [
  { t: "Executive leadership and legal", c: "Always (internal)" },
  { t: "Regulators (breach notification)", c: "When regulated data is exposed" },
  { t: "Law enforcement", c: "When crime is suspected" },
  { t: "PR / customer communications", c: "When customers/public affected" },
  { t: "The affected business unit and IT", c: "Always (internal)" } ],
 x: "Internal leadership/legal/IT engage on real incidents; regulators, law enforcement, and PR are triggered by data exposure, suspected crime, and customer/public impact respectively." },
{ type: "match", s: "Classify each reporting phrase as defensible or overclaiming.", task: "Match each statement:",
 cats: ["Defensible", "Overclaiming"],
 items: [
  { t: "No evidence of data exfiltration was identified", c: "Defensible" },
  { t: "No data was stolen, guaranteed", c: "Overclaiming" },
  { t: "Assessment (moderate confidence): likely commodity malware", c: "Defensible" },
  { t: "This was definitely a nation-state actor", c: "Overclaiming" },
  { t: "Three servers were confirmed compromised", c: "Defensible" },
  { t: "The attacker got nothing of value, period", c: "Overclaiming" } ],
 x: "Defensible language reports what evidence supports and labels assessments with confidence; overclaiming asserts unprovable negatives or certainties." },
{ type: "multi", s: "You are writing an executive summary for the board after a contained breach.", e: "Facts: contained in 4 hours, entry vector patched, no evidence of exfiltration, limited to 3 servers.", q: "Select ALL elements that belong in the executive summary:",
 options: [
  { t: "Plain-language statement of what happened", c: true, w: "Executives need a clear, jargon-free description." },
  { t: "Business impact (downtime, data, risk)", c: true, w: "Impact in business terms drives their decisions." },
  { t: "Actions taken and current status", c: true, w: "Leadership needs to know it's handled and where things stand." },
  { t: "Recommendations and any decision needed", c: true, w: "The summary should surface what the board must decide." },
  { t: "Full packet captures and raw SIEM queries", c: false, w: "Technical depth belongs in an appendix, not the executive summary." } ],
 x: "Executive summaries lead with what happened, impact, status, and recommendations — technical artifacts go to the appendix." },
{ type: "multi", s: "A vulnerability report must be genuinely useful to leadership.", e: "You have 1,800 raw findings from the scanner.", q: "Select ALL practices that make it a proper report:",
 options: [
  { t: "Prioritize by business risk, not raw CVSS alone", c: true, w: "Risk context (exploitability, exposure, value) is what leadership needs." },
  { t: "Show trends over time and a Top 10 / criticals list", c: true, w: "Trends show direction; a Top 10 focuses effort." },
  { t: "Include action plans with owners and target dates", c: true, w: "Findings become committed, trackable work." },
  { t: "Surface inhibitors and accepted-risk exceptions", c: true, w: "Leadership must know what's blocked and what's been accepted." },
  { t: "Paste the entire 1,800-line scanner export", c: false, w: "A raw dump isn't a report; no one can act on it." } ],
 x: "Reports synthesize: risk-prioritized, trended, action-planned, with blockers and exceptions — never an unfiltered export." },
{ type: "multi", s: "An analyst is deciding wording and process for external communication of a breach.", e: "Regulated customer data confirmed exposed; press is asking.", q: "Select ALL correct practices:",
 options: [
  { t: "Let legal/compliance drive regulatory disclosure and deadlines", c: true, w: "Disclosure decisions belong to legal, not the analyst alone." },
  { t: "Coordinate one accurate external message through PR/legal", c: true, w: "A single controlled channel prevents contradictions." },
  { t: "Use defensible language and avoid speculation", c: true, w: "Accurate, measured statements limit liability." },
  { t: "Have the analyst personally tweet real-time updates", c: false, w: "Uncoordinated posting bypasses legal/PR and risks inaccuracy." },
  { t: "Publicly guarantee no data was misused", c: false, w: "An unprovable guarantee is overclaiming and creates liability." } ],
 x: "External comms are legal/PR-driven, coordinated, accurate, and defensible — never unilateral, speculative, or over-guaranteed." },
{ type: "multi", s: "An after-action report is being finalized.", e: "Root cause: no macro-block standard. Trigger: a user enabled macros.", q: "Select ALL practices of a strong after-action report:",
 options: [
  { t: "State the root cause distinct from the trigger", c: true, w: "The systemic gap, not the click, is the root cause to fix." },
  { t: "Give specific, owned, measurable recommendations", c: true, w: "Assignable actions are what actually get implemented." },
  { t: "Layer an executive summary over technical detail", c: true, w: "One report serves executives and future responders." },
  { t: "Include effectiveness metrics (MTTD/MTTR/dwell)", c: true, w: "Metrics quantify performance and track improvement." },
  { t: "Name and blame the user who enabled macros", c: false, w: "Blame is the classic anti-pattern; keep it blameless and systemic." } ],
 x: "Strong after-action reports are blameless, root-cause-focused, layered for both audiences, metric-backed, and full of owned recommendations." },
],
boss: {
 title: "Operation Spin Control: Crumford Lorak's Narrative",
 brief: "A breach just hit Star Command's public-facing systems, and Crumford Lorak — the galaxy's slickest informant — is already racing to twist the story: exaggerating to some, hiding facts from others, and pinning blame on the innocent. You control the reporting. Five decisions, Ranger. Write the truth so cleanly he can't bend it.",
 win: "Every audience got the right report, in the right words, at the right time — board, engineers, regulators, and customers. Lorak's spin found no cracks to work with and he slinks back to Planet Z. Domain mission cleared, and CySA+ is within reach.",
 lose: "Lorak found a gap in your reporting — an overclaim, a missed audience, a buried cause — and twisted it into chaos. Review where the story bent and deploy again.",
 stages: [
 { sit: "One hour after containment, the board convenes. Lorak has already whispered that 'everything was stolen.' You hold the verified facts.",
  e: "Confirmed: breach contained in 4h, entry vector patched, 3 servers touched\nForensics: no evidence of data exfiltration identified\nAudience: executive board, needs a decision on disclosure",
  options: [
  { t: "Executive summary in business terms — impact, actions, recommendation — using 'no evidence of exfiltration identified,' not 'nothing was stolen'", d: 0, r: 4, ev: 0, ql: "best", w: "Audience-appropriate and defensible: business framing for the board, and wording that reports only what evidence supports — the exact truth Lorak can't spin." },
  { t: "Hand the board the full 40-page technical forensic report", d: 8, r: -4, ev: 0, ql: "ok", w: "Accurate but wrong audience — the board needs decisions and business impact, not a packet-capture walkthrough." },
  { t: "Reassure the board that definitively no data was stolen", d: 12, r: -6, ev: 0, ql: "bad", w: "An unprovable negative; when discovery complicates it, Lorak turns your overclaim into a credibility crisis." } ]},
 { sit: "The SOC engineers need to act. Lorak has floated a vague 'it's all fine' memo to make them stand down. You must give them what they actually need.",
  e: "Engineers must: block IoCs, hunt for spread, verify remediation\nAvailable: C2 domains, affected host list, ATT&CK mapping, remediation steps",
  options: [
  { t: "Give the technical team the IoCs, affected hosts, ATT&CK mapping, and remediation/validation steps", d: 0, r: 3, ev: 2, ql: "best", w: "Technical audiences need actionable detail; the same incident, reported at the depth engineers can act on." },
  { t: "Forward them the board's business summary only", d: 14, r: -3, ev: 0, ql: "bad", w: "A business summary leaves engineers unable to act — exactly the stand-down Lorak wanted." },
  { t: "Tell them verbally 'it's handled, don't worry about it'", d: 10, r: -4, ev: -3, ql: "ok", w: "No IoCs, no hosts, no validation — they can't confirm the environment is clean." } ]},
 { sit: "Forensics confirms regulated customer data was exposed. Lorak urges you to 'just quietly notify the regulator yourself and skip legal.'",
  e: "Regulated PII confirmed exposed\nRegulatory breach-notification deadline is running\nLorak's suggestion: analyst notifies the regulator directly, bypassing legal",
  options: [
  { t: "Surface the facts to legal/compliance, who drive regulatory disclosure within the required window; coordinate one external message", d: 0, r: 3, ev: 1, ql: "best", w: "Analysts provide facts; legal owns disclosure decisions and deadlines — coordinated, correct, and on time." },
  { t: "Notify the regulator yourself immediately, skipping legal", d: 12, r: -5, ev: 0, ql: "bad", w: "Disclosure is a legal/compliance decision; a unilateral analyst notice risks wrong content and process — Lorak's trap." },
  { t: "Wait and notify whenever it's convenient", d: 16, r: -6, ev: 0, ql: "bad", w: "Missing the regulatory deadline is its own violation, stacked on top of the breach." } ]},
 { sit: "Customers and press are asking questions. Two managers and Lorak are each drafting their own public statement.",
  e: "Customers affected · media inquiries incoming\nMultiple uncoordinated drafts circulating\nSecurity holds the verified facts",
  options: [
  { t: "Security supplies verified facts; PR and legal craft one coordinated, accurate message through a single channel", d: 0, r: 4, ev: 0, ql: "best", w: "One controlled, truthful channel denies Lorak the contradictions he thrives on and protects trust." },
  { t: "Let each manager send their own version to move fast", d: 14, r: -5, ev: 0, ql: "bad", w: "Conflicting statements create exactly the confusion and liability Lorak is counting on." },
  { t: "Say nothing at all and hope it blows over", d: 10, r: -4, ev: 0, ql: "ok", w: "Silence when customers are affected erodes trust and may breach notification duties." } ]},
 { sit: "Time for the after-action report. Lorak's final gambit: get you to blame the employee who clicked and bury the real cause.",
  e: "RCA: root cause = no attachment-detonation/macro-block standard\nTrigger = a user enabled a macro\nMetrics ready: MTTD, MTTR, dwell time",
  options: [
  { t: "Blameless report: state the root cause, give specific owned recommendations, include effectiveness metrics, and feed lessons back into playbooks", d: 0, r: 4, ev: 0, ql: "best", w: "Root-cause-focused, blameless, metric-backed, and looped into defenses — the report that actually prevents recurrence." },
  { t: "Name and blame the employee who clicked; close the report", d: 12, r: -6, ev: 0, ql: "bad", w: "Scapegoating buries the real cause and poisons future reporting — precisely Lorak's aim." },
  { t: "Write 'incident resolved' with no root cause or recommendations", d: 10, r: -4, ev: 0, ql: "bad", w: "A hollow report forfeits every lesson; the same gap invites the next breach." } ]},
 ],
},
};
