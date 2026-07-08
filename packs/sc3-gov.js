/* CONTENT PACK: SC-300 - Plan & Implement Identity Governance (sc3-gov) - 40 MCQ + 10 PBQ + 5 briefings + boss */
window.PACKS = window.PACKS || {};
window.PACKS["sc3-gov"] = {
lessons: {
"sc3-gov-1": { intro: "The Valkyran Raiders hoard standing power like plunder -- admin keys nobody ever takes back. Privileged Identity Management turns every key into a loan that must be requested, justified, and returned.",
sections: [
{ h: "What PIM does: eligible vs active", b: "Privileged Identity Management (Entra ID P2) removes STANDING privilege. Instead of a permanent (active) role assignment, you make a user ELIGIBLE for a role -- they hold nothing until they ACTIVATE it just-in-time, for a limited time window, then it expires. This is the core Zero Trust move: no one carries admin rights around when they aren't using them, shrinking the attack surface the Raiders plunder.", data: "Active assignment: standing rights, always on (avoid)\nEligible assignment: nothing until activated JIT, time-bound, auto-expires (preferred)" },
{ h: "Activation controls: MFA, justification, approval", b: "When a user activates an eligible role, PIM can require MFA, a business justification, and approval by a designated approver before the role is granted -- and only for a bounded duration. You can also require a ticket number. These activation settings are configured per role, letting sensitive roles (Global Administrator) demand approval while lower roles activate with just MFA and justification.", data: "Activation policy (per role): require MFA + justification + approval\n-> role granted for e.g. 4 hours, then auto-revoked" },
{ h: "PIM scope: Entra roles, Azure resources, and groups", b: "PIM governs Microsoft Entra directory roles, Azure resource (RBAC) roles, and PIM for Groups (privileged access groups) -- making membership of a sensitive group itself eligible/JIT. Use PIM for Groups when several roles or resources should be activated together, or to bring JIT to things that aren't natively PIM-enabled by governing the group that grants them." },
{ h: "Alerts, audit, and discovery", b: "PIM provides an audit history (role assignments and activations, typically the last 30 days by default; route to Azure Monitor for longer retention), alerts (for example, too many Global Admins, or roles assigned outside PIM), and Discovery and Insights to find standing permanent assignments and convert them to JIT. This is how you prove least privilege to auditors and continuously reduce standing access." },
],
traps: [
"Eligible = nothing until activated JIT (preferred); active = standing rights (avoid). When a scenario wants to remove standing privilege, the answer is making the role eligible in PIM.",
"Activation can require MFA, justification, AND approval -- configured per role; sensitive roles should require approval.",
"PIM for Groups brings JIT to a group's membership -- use it to govern access that isn't natively PIM-enabled, or to activate several things together.",
"PIM (P2) is the just-in-time answer; a permanent (active) assignment is the wrong answer when the goal is least standing privilege." ],
keys: [
"PIM removes standing privilege: eligible + JIT activation, time-bound, auto-expiring.",
"Activation controls (per role): require MFA, justification, approval, duration.",
"Scope: Entra roles, Azure resource roles, and PIM for Groups.",
"Use audit history, alerts, and Discovery & Insights to prove and reduce standing access." ] },

"sc3-gov-2": { intro: "The Raiders keep looted access long after a mission ends. Access reviews are the roll-call that forces every holder to justify their access -- or lose it.",
sections: [
{ h: "What access reviews do", b: "An access review periodically re-certifies who should keep access to a group, application, or role. Reviewers approve or deny each person's continued access; denied access is removed. This is the control that catches access sprawl -- the contractor who still has a group membership months after the project ended, the leaver nobody deprovisioned." },
{ h: "Reviewers, recurrence, and auto-apply", b: "You choose the reviewers (the resource owner, the users' managers, selected reviewers, or the users themselves via self-review), the recurrence (one-time, weekly, monthly, quarterly, annually), and critically what happens if reviewers don't respond: you can set 'if reviewers don't respond' to remove access (deny by default) so unreviewed access is revoked automatically. Decisions can auto-apply.", data: "Reviewer: Managers of users | recurrence: Quarterly\nIf reviewers don't respond -> Remove access (deny by default)\nAuto-apply results -> access removed automatically" },
{ h: "Access reviews for Entra roles live in PIM", b: "Critical exam point: to review who holds a privileged Entra directory role (like Global Administrator), you create the access review inside PIM (PIM > Entra roles > Access reviews), NOT in the general Identity Governance Access Reviews blade. General access reviews cover groups and applications; privileged-role reviews are a PIM feature. Choosing the wrong location is a classic wrong answer.", data: "Review a group's members -> Identity Governance > Access reviews\nReview Global Administrator role holders -> PIM > Entra roles > Access reviews" },
{ h: "Reviewing guests and closing the loop", b: "Access reviews are ideal for recertifying guest (B2B) access -- guests accumulate and are easily forgotten. You can review all guests' access to a group/app and auto-remove those denied. Pair recurring reviews with entitlement management so external access expires, and send decisions to auditors as evidence. Reviews turn 'who still needs this?' from a manual guess into a governed, recurring control." },
],
traps: [
"Access reviews for privileged Entra ROLES must be created in PIM, not the general Access Reviews blade -- that blade is for groups and applications.",
"Set 'if reviewers don't respond' to Remove access for a deny-by-default posture; leaving it as 'no change' lets stale access persist.",
"Reviewers can be the resource owner, managers, selected users, or self-review -- match the reviewer to the requirement (e.g., 'Managers of users').",
"Access reviews are the right tool for recurring recertification of guests and role holders -- not Conditional Access (which blocks) or a manual reminder." ],
keys: [
"Access reviews periodically re-certify access; denied access is removed.",
"Configure reviewers, recurrence, and 'if no response -> remove access'; auto-apply results.",
"Privileged Entra role reviews are created IN PIM; group/app reviews in Identity Governance.",
"Use reviews to recertify guests and roles; send decisions to auditors." ] },

"sc3-gov-3": { intro: "The Raiders slip aboard by begging one favor at a time until they hold the whole ship. Entitlement management bundles access into governed packages that grant, approve, and expire as one.",
sections: [
{ h: "Entitlement management and access packages", b: "Entitlement management governs access lifecycle at scale. An access package bundles multiple resources -- group memberships, app roles, and SharePoint sites -- that are granted together through a single request-and-approval workflow. When a new contractor needs a group, an app role, and a SharePoint site, you don't assign three things manually; you publish one access package they request, and everything is provisioned and later removed together.", data: "Access package 'New Finance Analyst' bundles:\n- Finance group membership\n- Finance app role\n- Finance SharePoint site\n-> one request, one approval, one expiration" },
{ h: "Catalogs, policies, and self-service requests", b: "Resources live in a catalog (a container an access-package manager owns). Access packages have policies defining who can request, who approves, and how long access lasts. Users request access through the My Access portal -- self-service, with approval routed to the right approver (a manager, sponsor, or resource owner). This delegates access management to business owners while keeping it governed and auditable." },
{ h: "Expiration and automatic removal", b: "Access packages have a defined lifecycle: access can require periodic access-review recertification and can EXPIRE automatically after a set time (e.g., a 6-month contractor package). At expiration all bundled resources are removed together -- gracefully removing the specific access, unlike Conditional Access which merely blocks. This is the correct answer for time-boxed project or contractor access to multiple resources.", data: "Contractor package: expires in 6 months -> all bundled access auto-removed\n(vs group-lifecycle expiration, which only affects the group)" },
{ h: "Connected organizations and external lifecycle", b: "Entitlement management onboards external users: connected organizations define trusted partner domains whose users can request access packages, with approval before they enter your directory. When an external user's last access package expires, they can be automatically removed from the directory -- governing the full guest lifecycle from onboarding to offboarding without manual cleanup." },
],
traps: [
"Access packages are the answer when MULTIPLE resources (group + app role + site) must be granted together with request/approval and auto-expiration -- not manual per-resource assignment.",
"Access-package expiration gracefully removes the specific bundled resources; Conditional Access only blocks and group expiration only affects the group.",
"Requesters use the My Access portal; approval is routed by policy to managers/sponsors/owners -- it's self-service but governed.",
"Connected organizations govern external users' onboarding via access packages, and their last-package expiration can remove them from the directory." ],
keys: [
"Access packages bundle multiple resources with one request/approval/expiration.",
"Catalogs contain resources; policies set who can request, who approves, how long.",
"Access auto-expires and is removed together; recertify via access reviews.",
"Connected organizations onboard external users; last-package expiry offboards them." ] },

"sc3-gov-4": { intro: "The Raiders exploit the chaos of arrivals and departures -- new crew with no access, old crew whose keys were never pulled. Lifecycle workflows automate joiner, mover, and leaver so nothing slips through.",
sections: [
{ h: "Lifecycle workflows: joiner, mover, leaver", b: "Lifecycle Workflows automate identity lifecycle events. Joiner: when a new hire arrives, run tasks (enable the account, send a welcome, generate a Temporary Access Pass, add to groups). Leaver: when someone departs, automatically disable the account, remove group/app access, and revoke sessions. Mover handles role changes. These run on attribute-based triggers relative to a date (e.g., employeeHireDate, employeeLeaveDateTime).", data: "Joiner: TAP + group adds N days before hire date\nLeaver: disable account + remove access + revoke sessions on leave date\nMover: adjust access when department/attributes change" },
{ h: "Why automate the leaver process", b: "The offboarding gap -- a former employee whose access lingered -- is a top governance and audit failure. Lifecycle Workflows close it by triggering deprovisioning automatically on the leave date, so access removal doesn't depend on someone remembering. This complements SCIM deprovisioning (which handles SaaS accounts) and access reviews (which catch what automation missed)." },
{ h: "Terms of use", b: "A terms of use (ToU) policy presents a document (PDF) users must accept before accessing resources -- enforced via Conditional Access as a grant control ('require terms of use'). You can require re-acceptance on a schedule and per-language documents, and audit who accepted and when. ToU is how you get legally-recordable consent to acceptable-use or compliance terms as a condition of access." },
{ h: "Choosing the right governance tool", b: "The exam constantly tests 'which feature?': remove STANDING privilege -> PIM; RE-CERTIFY who still needs access -> access reviews; bundle and time-box MULTIPLE resources with self-service request -> entitlement management/access packages; AUTOMATE joiner/mover/leaver tasks -> lifecycle workflows; require acceptance of a policy document -> terms of use. Read the requirement and map to the one feature that meets ALL of it." },
],
traps: [
"Lifecycle Workflows automate joiner/mover/leaver tasks on date/attribute triggers -- the answer for automated onboarding/offboarding, not a manual checklist or calendar reminder.",
"The leaver workflow closes the offboarding gap automatically; don't rely on someone remembering to deprovision.",
"Terms of use is enforced through Conditional Access ('require terms of use') and records acceptance -- it's the answer for requiring policy acceptance as a condition of access.",
"Map the requirement to the RIGHT feature: PIM (standing privilege), access reviews (recertify), entitlement management (bundle/expire), lifecycle workflows (automate JML), ToU (policy acceptance)." ],
keys: [
"Lifecycle Workflows automate joiner/mover/leaver via date/attribute triggers.",
"Automated leaver deprovisioning closes the offboarding gap.",
"Terms of use presents an acceptance-required document, enforced via Conditional Access.",
"Match requirement to feature: PIM / reviews / entitlement mgmt / lifecycle workflows / ToU." ] },

"sc3-gov-5": { intro: "The Raiders count on no one watching the logs or the score. Monitoring, Identity Secure Score, and audit evidence are the watchtower that spots them and proves you held the line.",
sections: [
{ h: "The three log types", b: "Entra ID provides sign-in logs (who signed in, from where, with what result, and which Conditional Access policies applied), audit logs (what changed in the directory -- role assignments, group edits, policy changes, consent grants), and provisioning logs (SCIM provisioning activity to/from apps). Know which log answers which question: 'why was access blocked?' -> sign-in logs; 'who changed this role?' -> audit logs; 'did the SaaS account provision?' -> provisioning logs." },
{ h: "Exporting logs and querying with KQL", b: "Configure diagnostic settings to route Entra logs to a Log Analytics workspace (for KQL querying and workbooks), a storage account (cheap long-term archive), or an Event Hub (streaming to a SIEM like Sentinel). Entra retains logs only for a limited period by default, so exporting is how you keep them longer and analyze them. You query Log Analytics with KQL and visualize with workbooks.", data: "Diagnostic settings destinations:\n- Log Analytics -> KQL queries + workbooks\n- Storage account -> long-term archive\n- Event Hub -> stream to SIEM (Sentinel)" },
{ h: "Identity Secure Score", b: "Identity Secure Score is a percentage measure of your identity security posture with prioritized, actionable improvement recommendations (e.g., enable MFA, reduce Global Admins, turn on risk policies) and lets you track the trend over time. It's the built-in scorecard for continuously improving identity hardening and demonstrating progress to leadership." },
{ h: "Governance as evidence", b: "The governance controls produce audit evidence: PIM activation history, access-review decisions, entitlement approvals, and ToU acceptances all create records that prove least privilege and recertification to auditors. Route them to long-term storage, build workbooks for reporting, and you can answer 'who had access, why, and who approved it' -- exactly what audits and compliance demand. That evidence trail is what finally locks the Raiders out for good." },
],
traps: [
"Match the log to the question: sign-in logs (access/CA results), audit logs (directory changes), provisioning logs (SCIM activity) -- don't reach for the wrong one.",
"Entra retains logs briefly by default; export via diagnostic settings (Log Analytics/Storage/Event Hub) for longer retention and analysis -- KQL runs against Log Analytics.",
"Identity Secure Score gives prioritized hardening recommendations and a trend -- it's the posture scorecard, not a log.",
"Governance records (PIM history, review decisions, approvals, ToU acceptance) are the audit evidence of least privilege -- retain and report on them." ],
keys: [
"Sign-in / audit / provisioning logs answer different questions -- pick the right one.",
"Export logs via diagnostic settings to Log Analytics (KQL/workbooks), Storage, or Event Hub.",
"Identity Secure Score = prioritized identity hardening recommendations and trend.",
"Governance produces audit evidence: PIM history, review decisions, approvals, ToU." ] },
},
mcq: {
"sc3-gov-1": [
{ s: "A company wants admins to hold no standing privileged rights, activating them only when needed.", e: "Goal: eliminate permanent admin access", q: "Best approach?", options: [
 { t: "Make the roles eligible in PIM so admins activate them just-in-time, time-bound", c: true, w: "Eligible + JIT activation removes standing privilege, the core PIM value." },
 { t: "Assign the roles as permanent active assignments", c: false, w: "Active assignments are exactly the standing privilege to eliminate." },
 { t: "Give all admins Global Administrator permanently", c: false, w: "That maximizes standing privilege, the opposite of the goal." },
 { t: "Disable the roles entirely", c: false, w: "Admins still need to activate roles when working; disabling isn't the fix." } ] },
{ s: "Activating the Global Administrator role should require approval, MFA, and a justification.", e: "Sensitive role hardening", q: "Where is this configured?", options: [
 { t: "In the PIM role activation settings for that role", c: true, w: "PIM activation policies per role can require MFA, justification, approval, and a bounded duration." },
 { t: "In the group-based licensing settings", c: false, w: "Licensing doesn't control role activation." },
 { t: "In named locations", c: false, w: "Named locations are a Conditional Access construct." },
 { t: "In SSPR configuration", c: false, w: "SSPR is password reset, unrelated to role activation." } ] },
{ s: "Several roles and resources should be activatable together, and JIT is needed for access that isn't natively PIM-enabled.", e: "Goal: bring JIT to a group's membership", q: "Which capability?", options: [
 { t: "PIM for Groups (privileged access groups)", c: true, w: "PIM for Groups makes group membership eligible/JIT, governing access granted through the group." },
 { t: "A dynamic membership group", c: false, w: "Dynamic groups auto-populate by attribute; they don't provide JIT activation." },
 { t: "A static assigned group with permanent members", c: false, w: "That's standing access, not JIT." },
 { t: "Password writeback", c: false, w: "Unrelated to privileged access." } ] },
{ s: "An auditor asks for proof of who activated privileged roles in the last month.", e: "Need role activation evidence", q: "Where do you look?", options: [
 { t: "PIM audit history (role assignments and activations)", c: true, w: "PIM audit history records assignments and activations, provable to auditors." },
 { t: "The recycle bin", c: false, w: "That's for deleted objects, not activation history." },
 { t: "The provisioning logs only", c: false, w: "Provisioning logs cover SCIM app provisioning, not PIM activations." },
 { t: "Identity Secure Score", c: false, w: "That's a posture score, not an activation record." } ] },
{ s: "Security wants to find permanent standing role assignments and convert them to just-in-time.", e: "Reduce standing access at scale", q: "Which PIM feature helps?", options: [
 { t: "Discovery and Insights (find permanent assignments and convert to JIT)", c: true, w: "Discovery and Insights surfaces standing assignments and helps convert them to eligible/JIT." },
 { t: "Smart lockout", c: false, w: "That's brute-force protection, unrelated to role assignments." },
 { t: "A terms of use policy", c: false, w: "ToU is policy acceptance, not privilege discovery." },
 { t: "Named locations", c: false, w: "A CA condition, not a PIM discovery tool." } ] },
{ s: "A user is eligible for a role but currently holds no privileges.", e: "They need the role for a 2-hour task", q: "What must happen?", options: [
 { t: "They activate the eligible role in PIM for a bounded duration, then it auto-expires", c: true, w: "Eligible roles confer nothing until activated JIT; they expire after the set duration." },
 { t: "Nothing; eligible means they already have the rights", c: false, w: "Eligible means no rights until activation -- that's the distinction." },
 { t: "An admin must permanently assign the role", c: false, w: "A permanent assignment defeats the JIT model." },
 { t: "They reset their password", c: false, w: "Password reset doesn't grant a role." } ] },
{ s: "PIM should retain activation audit data longer than the default 30 days.", e: "Long-term audit retention", q: "Best approach?", options: [
 { t: "Route PIM/audit data to Azure Monitor (e.g., a storage account) for long-term retention", c: true, w: "Exporting to Azure Monitor/storage retains audit data beyond the default window." },
 { t: "Nothing can extend retention", c: false, w: "Azure Monitor export extends retention." },
 { t: "Delete old data to make room", c: false, w: "That destroys the evidence you need to keep." },
 { t: "Increase the PIM license count", c: false, w: "Licensing doesn't change retention; export does." } ] },
{ s: "An alert should fire when there are too many Global Administrators or roles are assigned outside PIM.", e: "Governance alerting", q: "Which PIM capability?", options: [
 { t: "PIM alerts", c: true, w: "PIM alerts flag conditions like excessive Global Admins or assignments made outside PIM." },
 { t: "Access package expiration", c: false, w: "That's entitlement management, not PIM alerting." },
 { t: "Dynamic groups", c: false, w: "Membership automation, not alerting on privileged roles." },
 { t: "Password protection", c: false, w: "That governs passwords, not role assignment alerts." } ] } ],

"sc3-gov-2": [
{ s: "The org must recertify quarterly who still belongs in a sensitive group, auto-removing anyone not approved.", e: "Goal: recurring recertification with deny-by-default", q: "Best solution?", options: [
 { t: "An access review with quarterly recurrence and 'if reviewers don't respond -> remove access', results auto-applied", c: true, w: "Access reviews recertify membership on a schedule; deny-by-default removes unreviewed access automatically." },
 { t: "A Conditional Access policy blocking the group", c: false, w: "CA blocks access; it doesn't recertify who should remain a member." },
 { t: "A one-time manual audit", c: false, w: "One-time and manual doesn't provide recurring, governed recertification." },
 { t: "Group-based licensing", c: false, w: "Licensing doesn't recertify membership." } ] },
{ s: "You must review who holds the Global Administrator role and remove those not confirmed.", e: "Reviewing a privileged Entra directory role", q: "Where do you create this review?", options: [
 { t: "In PIM (PIM > Entra roles > Access reviews)", c: true, w: "Access reviews for privileged Entra roles are created within PIM, not the general Access Reviews blade." },
 { t: "In the general Identity Governance Access Reviews blade", c: false, w: "That blade covers groups and apps; role reviews live in PIM." },
 { t: "In Conditional Access", c: false, w: "CA doesn't run access reviews." },
 { t: "In the enterprise application's SSO settings", c: false, w: "SSO settings don't review role holders." } ] },
{ s: "Reviewers should be each user's manager for an access review.", e: "Configuring reviewers", q: "Which reviewer setting?", options: [
 { t: "Managers of users", c: true, w: "'Managers of users' routes each person's review to their manager." },
 { t: "The break-glass account", c: false, w: "Break-glass is for emergency access, not a reviewer role." },
 { t: "A dynamic group rule", c: false, w: "Group rules define membership, not review reviewers." },
 { t: "Every guest in the tenant", c: false, w: "That's not a sensible reviewer assignment." } ] },
{ s: "Guest (B2B) accounts have accumulated access to an app and need periodic recertification.", e: "Goal: recurring guest access recertification", q: "Best tool?", options: [
 { t: "An access review targeting the guests' access, with auto-removal of denied access", c: true, w: "Access reviews are ideal for recurring recertification and cleanup of guest access." },
 { t: "Delete all guests nightly", c: false, w: "Destructive and indiscriminate; reviews recertify who should remain." },
 { t: "A password protection policy", c: false, w: "Unrelated to guest access recertification." },
 { t: "Named locations", c: false, w: "A CA condition, not a recertification control." } ] },
{ s: "Access-review decisions must be sent to auditors as compliance evidence.", e: "Goal: audit evidence from reviews", q: "What supports this?", options: [
 { t: "Access reviews record decisions that can be provided to auditors as evidence", c: true, w: "Review decisions form an auditable record of who recertified access and when." },
 { t: "Reviews leave no record", c: false, w: "Reviews produce a decision record precisely for audit." },
 { t: "Only sign-in logs can prove reviews", c: false, w: "The review itself records decisions; sign-in logs are separate." },
 { t: "Identity Secure Score replaces review records", c: false, w: "Secure Score is a posture score, not a review decision record." } ] },
{ s: "In an access review, reviewers often don't respond in time.", e: "Goal: ensure stale access is removed anyway", q: "Which setting?", options: [
 { t: "Set 'if reviewers don't respond' to Remove access", c: true, w: "Deny-by-default on no response ensures unreviewed access is revoked." },
 { t: "Set it to 'No change'", c: false, w: "That leaves stale access in place -- the opposite of the goal." },
 { t: "Set it to 'Approve access'", c: false, w: "Auto-approving on no response keeps unneeded access." },
 { t: "Disable the review", c: false, w: "That removes the control entirely." } ] },
{ s: "A team wants to recertify membership of a standard security group (not a role).", e: "Group recertification", q: "Where is this review created?", options: [
 { t: "In Identity Governance > Access reviews", c: true, w: "Group and application access reviews are created in the Identity Governance Access Reviews blade." },
 { t: "In PIM > Entra roles", c: false, w: "PIM role reviews are for privileged directory roles, not standard groups." },
 { t: "In Conditional Access", c: false, w: "CA doesn't run access reviews." },
 { t: "In SSPR settings", c: false, w: "SSPR is unrelated to reviews." } ] },
{ s: "An access review should let the users themselves attest whether they still need access.", e: "Reviewer type selection", q: "Which reviewer option?", options: [
 { t: "Self-review (users review their own access)", c: true, w: "Self-review has users attest to their own continued need for access." },
 { t: "Managers of users", c: false, w: "That routes to managers, not the users themselves." },
 { t: "The Global Administrator only", c: false, w: "Not self-attestation; and doesn't scale for self-review." },
 { t: "No reviewer at all", c: false, w: "A review needs a reviewer; self-review assigns it to the users." } ] } ],

"sc3-gov-3": [
{ s: "A new contractor needs a group membership, an app role, and a SharePoint site, granted together with approval and auto-removal in 6 months.", e: "Multiple resources, self-service, time-boxed", q: "Best solution?", options: [
 { t: "An entitlement management access package bundling the resources with an approval workflow and 6-month expiration", c: true, w: "Access packages bundle multiple resources with request/approval and automatic expiration -- exactly this scenario." },
 { t: "Assign each resource manually and set a calendar reminder", c: false, w: "Manual and error-prone; no self-service or automatic removal." },
 { t: "A Conditional Access policy that blocks the contractor after 6 months", c: false, w: "CA blocks access; it doesn't gracefully grant and remove specific resources." },
 { t: "Group expiration on one group", c: false, w: "Group expiration affects only the group, not the bundled app role and site." } ] },
{ s: "Resources for access packages must be organized in a container an access-package manager owns.", e: "Entitlement management structure", q: "What is this container?", options: [
 { t: "A catalog", c: true, w: "A catalog contains the resources that access packages draw from, owned by an access-package manager." },
 { t: "A named location", c: false, w: "That's a CA condition, not an entitlement container." },
 { t: "A dynamic group", c: false, w: "A group isn't the entitlement catalog." },
 { t: "A Log Analytics workspace", c: false, w: "That's for logs, not access packages." } ] },
{ s: "Users should request access themselves and have it routed to an approver.", e: "Self-service access requests", q: "How is this delivered?", options: [
 { t: "Publish an access package with a policy; users request via the My Access portal and approval routes to the defined approver", c: true, w: "Access-package policies enable self-service requests through My Access with governed approval." },
 { t: "Users email the helpdesk for every resource", c: false, w: "Manual and ungoverned; access packages provide self-service with approval." },
 { t: "Give everyone Global Admin to self-provision", c: false, w: "A catastrophic over-grant." },
 { t: "Disable all access requests", c: false, w: "That blocks the legitimate self-service need." } ] },
{ s: "An external partner's users should be able to request access, with approval, before entering the directory.", e: "Governed external onboarding", q: "Which capability?", options: [
 { t: "Connected organizations in entitlement management, granting access via access packages", c: true, w: "Connected organizations let trusted external users request access packages with approval before entering the directory." },
 { t: "A custom banned-password list", c: false, w: "Unrelated to external onboarding." },
 { t: "Smart lockout", c: false, w: "Brute-force protection, not onboarding." },
 { t: "A dynamic device group", c: false, w: "Device grouping doesn't onboard external users." } ] },
{ s: "When an external user's last access package expires, they should be removed from the directory automatically.", e: "External lifecycle offboarding", q: "What enables this?", options: [
 { t: "Entitlement management external user lifecycle (removal when the last access package expires)", c: true, w: "Entitlement management can remove an external user from the directory when their last package expires." },
 { t: "Conditional Access", c: false, w: "CA blocks access but doesn't remove the directory object." },
 { t: "Password writeback", c: false, w: "Unrelated to external offboarding." },
 { t: "Group-based licensing", c: false, w: "Licensing doesn't offboard external users." } ] },
{ s: "Access granted via an access package should be re-certified periodically while it remains active.", e: "Ongoing recertification of package access", q: "How is this achieved?", options: [
 { t: "Attach access reviews to the access package", c: true, w: "Access packages can require periodic access-review recertification of who retains access." },
 { t: "Delete and recreate the package weekly", c: false, w: "Disruptive and unnecessary; reviews recertify in place." },
 { t: "Use a named location", c: false, w: "A CA condition, not recertification." },
 { t: "Disable the package", c: false, w: "That removes access rather than recertifying it." } ] },
{ s: "A policy on an access package must define who is allowed to request it and how long access lasts.", e: "Access-package policy elements", q: "What does the policy control?", options: [
 { t: "Who can request, who approves, and the access duration/expiration", c: true, w: "Access-package policies define requesters, approvers, and lifecycle/expiration." },
 { t: "The tenant's DNS records", c: false, w: "Unrelated to access-package policy." },
 { t: "The FIDO2 method settings", c: false, w: "That's authentication methods, not entitlement policy." },
 { t: "Sign-in log retention", c: false, w: "Retention is a diagnostic setting, not an access-package policy." } ] },
{ s: "Compare access-package expiration to Conditional Access for removing time-boxed access to several resources.", e: "Graceful removal vs blocking", q: "Which statement is correct?", options: [
 { t: "Access-package expiration gracefully removes the specific bundled resources; CA only blocks access", c: true, w: "Access packages remove the granted resources at expiration; CA blocks but doesn't deprovision resources." },
 { t: "They do exactly the same thing", c: false, w: "One removes granted access; the other blocks at sign-in." },
 { t: "Conditional Access removes group memberships", c: false, w: "CA doesn't remove memberships; it evaluates access at sign-in." },
 { t: "Access packages can't expire", c: false, w: "Automatic expiration is a core access-package feature." } ] } ],

"sc3-gov-4": [
{ s: "New hires must automatically get a Temporary Access Pass and group memberships a few days before their start date.", e: "Automated onboarding", q: "Which feature?", options: [
 { t: "A Lifecycle Workflow joiner workflow triggered relative to the hire date", c: true, w: "Lifecycle Workflows automate joiner tasks (TAP, group adds) on date/attribute triggers." },
 { t: "A manual onboarding checklist", c: false, w: "Manual processes are error-prone and don't scale; workflows automate them." },
 { t: "Conditional Access", c: false, w: "CA controls access conditions, not onboarding task automation." },
 { t: "A custom banned-password list", c: false, w: "Unrelated to onboarding." } ] },
{ s: "When employees leave, their accounts must be disabled and access removed automatically on the leave date.", e: "Closing the offboarding gap", q: "Best solution?", options: [
 { t: "A Lifecycle Workflow leaver workflow triggered on the leave date", c: true, w: "A leaver workflow auto-disables the account and removes access on the departure date, closing the offboarding gap." },
 { t: "Rely on managers to remember to file a ticket", c: false, w: "Relying on memory is exactly the offboarding gap to eliminate." },
 { t: "A quarterly access review only", c: false, w: "Reviews catch leftovers but don't provide timely automated offboarding." },
 { t: "Group-based licensing", c: false, w: "Licensing doesn't deprovision a leaver." } ] },
{ s: "Users must accept an acceptable-use document before accessing apps, with acceptance recorded.", e: "Policy acceptance as a condition of access", q: "Which feature?", options: [
 { t: "A terms of use policy enforced via Conditional Access ('require terms of use')", c: true, w: "Terms of use presents a document users must accept, enforced through CA and recorded for audit." },
 { t: "A dynamic group", c: false, w: "Groups don't present acceptance documents." },
 { t: "Password writeback", c: false, w: "Unrelated to terms acceptance." },
 { t: "Identity Secure Score", c: false, w: "A posture score, not a consent mechanism." } ] },
{ s: "A requirement reads: 'remove standing admin rights; admins activate roles just-in-time with approval.'", e: "Feature selection", q: "Which feature meets this?", options: [
 { t: "Privileged Identity Management (PIM)", c: true, w: "PIM removes standing privilege with JIT activation and approval." },
 { t: "Entitlement management", c: false, w: "That governs resource access packages, not JIT role activation." },
 { t: "Access reviews", c: false, w: "Reviews recertify access; they don't provide JIT activation." },
 { t: "Terms of use", c: false, w: "ToU is policy acceptance, not privileged access." } ] },
{ s: "A requirement reads: 'bundle a group, an app role, and a site; let users request them; auto-expire in 90 days.'", e: "Feature selection", q: "Which feature meets ALL of it?", options: [
 { t: "Entitlement management access packages", c: true, w: "Access packages bundle multiple resources with self-service request and expiration." },
 { t: "PIM", c: false, w: "PIM governs privileged roles, not bundled resource requests." },
 { t: "Lifecycle Workflows", c: false, w: "Workflows automate JML tasks, not self-service resource bundles." },
 { t: "Conditional Access", c: false, w: "CA controls sign-in conditions, not resource bundling/expiration." } ] },
{ s: "A requirement reads: 'periodically confirm who still needs membership in a sensitive group.'", e: "Feature selection", q: "Which feature meets this?", options: [
 { t: "Access reviews", c: true, w: "Access reviews periodically recertify who should retain access." },
 { t: "Lifecycle Workflows", c: false, w: "Workflows automate JML events, not periodic recertification." },
 { t: "Terms of use", c: false, w: "ToU is policy acceptance, not membership recertification." },
 { t: "Managed identities", c: false, w: "Those are workload identities, unrelated." } ] },
{ s: "A mover changes departments and needs their access adjusted to match the new role.", e: "Role-change automation", q: "Which lifecycle workflow type?", options: [
 { t: "A mover workflow triggered by attribute change (e.g., department)", c: true, w: "Mover workflows adjust access when a user's attributes/role change." },
 { t: "A joiner workflow", c: false, w: "Joiner handles new arrivals, not role changes." },
 { t: "A leaver workflow", c: false, w: "Leaver handles departures, not internal moves." },
 { t: "A Conditional Access policy", c: false, w: "CA governs sign-in conditions, not lifecycle access adjustment." } ] },
{ s: "Terms of use should require re-acceptance on a schedule and support multiple languages.", e: "ToU capabilities", q: "What is true of terms of use?", options: [
 { t: "It supports scheduled re-acceptance, per-language documents, and records who accepted when", c: true, w: "ToU supports periodic re-acceptance, multiple languages, and auditable acceptance records." },
 { t: "It can only be accepted once and never re-presented", c: false, w: "Re-acceptance can be scheduled." },
 { t: "It cannot be audited", c: false, w: "Acceptances are recorded for audit." },
 { t: "It replaces Conditional Access", c: false, w: "ToU is enforced through CA, not a replacement for it." } ] } ],

"sc3-gov-5": [
{ s: "An admin must find out why a user's access was blocked and which policy applied.", e: "Choosing the right log", q: "Which log?", options: [
 { t: "Sign-in logs (with the Conditional Access tab)", c: true, w: "Sign-in logs show sign-in results and which CA policies applied and why." },
 { t: "Audit logs", c: false, w: "Audit logs show directory changes, not per-sign-in access results." },
 { t: "Provisioning logs", c: false, w: "Those cover SCIM app provisioning, not sign-in blocks." },
 { t: "Identity Secure Score", c: false, w: "A posture score, not a sign-in diagnostic." } ] },
{ s: "You need to know who changed a role assignment and when.", e: "Choosing the right log", q: "Which log?", options: [
 { t: "Audit logs (directory changes)", c: true, w: "Audit logs record directory changes such as role assignments, group edits, and consent grants." },
 { t: "Sign-in logs", c: false, w: "Those show authentications, not who changed a role." },
 { t: "Provisioning logs", c: false, w: "SCIM provisioning activity, not directory change history." },
 { t: "The recycle bin", c: false, w: "That holds deleted objects, not change history." } ] },
{ s: "Entra retains logs only briefly by default, but you must keep them for a year and run KQL queries.", e: "Long-term log analysis", q: "Best approach?", options: [
 { t: "Configure diagnostic settings to send logs to a Log Analytics workspace", c: true, w: "Log Analytics enables long-term retention plus KQL queries and workbooks." },
 { t: "Do nothing; default retention is enough", c: false, w: "Default retention is limited; export is required for a year of data." },
 { t: "Screenshot the logs weekly", c: false, w: "Not queryable or reliable; use diagnostic settings." },
 { t: "Disable logging to save space", c: false, w: "That removes the data entirely." } ] },
{ s: "Logs must stream to Microsoft Sentinel for SIEM correlation.", e: "Choosing the diagnostic destination", q: "Which destination?", options: [
 { t: "An Event Hub (to stream into Sentinel/SIEM)", c: true, w: "Event Hub streams Entra logs into a SIEM like Sentinel." },
 { t: "A storage account only", c: false, w: "Storage is for cheap archive, not live SIEM streaming." },
 { t: "The recycle bin", c: false, w: "Not a log destination." },
 { t: "A dynamic group", c: false, w: "Not a diagnostic destination." } ] },
{ s: "Leadership wants a prioritized list of identity hardening actions and a way to track improvement.", e: "Posture improvement", q: "Which tool?", options: [
 { t: "Identity Secure Score", c: true, w: "Identity Secure Score gives prioritized recommendations and tracks the posture trend over time." },
 { t: "Provisioning logs", c: false, w: "Those record SCIM activity, not posture recommendations." },
 { t: "A terms of use policy", c: false, w: "ToU is policy acceptance, not a posture score." },
 { t: "Named locations", c: false, w: "A CA condition, not a posture tool." } ] },
{ s: "You need cheap, long-term archival of Entra logs for compliance, without querying them regularly.", e: "Choosing the destination", q: "Which destination?", options: [
 { t: "A storage account", c: true, w: "A storage account is the low-cost long-term archive destination." },
 { t: "A Log Analytics workspace only", c: false, w: "Log Analytics suits active KQL analysis; storage is cheaper for pure archive." },
 { t: "An Event Hub", c: false, w: "Event Hub is for streaming to a SIEM, not cheap archive." },
 { t: "The recycle bin", c: false, w: "Not a log archive." } ] },
{ s: "An auditor asks you to prove least privilege: who had access, why, and who approved it.", e: "Governance as evidence", q: "What provides this?", options: [
 { t: "Governance records: PIM activation history, access-review decisions, and entitlement approvals", c: true, w: "These governance records form the audit trail proving least privilege and approvals." },
 { t: "Only the sign-in logs", c: false, w: "Sign-in logs show authentications, not approvals and recertification decisions." },
 { t: "Identity Secure Score alone", c: false, w: "A score isn't a per-access evidence trail." },
 { t: "Nothing records approvals", c: false, w: "PIM, reviews, and entitlement management all record decisions/approvals." } ] },
{ s: "You must confirm whether a SaaS account was successfully provisioned via SCIM.", e: "Choosing the right log", q: "Which log?", options: [
 { t: "Provisioning logs", c: true, w: "Provisioning logs record SCIM provisioning activity to and from apps." },
 { t: "Sign-in logs", c: false, w: "Those show authentications, not provisioning results." },
 { t: "Audit logs", c: false, w: "Audit logs show directory changes, not SCIM provisioning detail." },
 { t: "Identity Secure Score", c: false, w: "A posture score, not a provisioning record." } ] } ],
},
pbqs: [
{ type: "order", s: "You must convert a permanent Global Administrator to just-in-time access with approval.", task: "Order the PIM steps:",
 steps: ["Onboard the role into PIM", "Change the permanent assignment to an eligible assignment", "Configure the activation policy (require MFA, justification, approval)", "User activates the eligible role just-in-time when needed", "Role auto-expires after the set duration"],
 x: "Bring the role into PIM, make the assignment eligible, set activation controls, and the user then activates JIT with the role auto-expiring -- removing standing privilege." },
{ type: "order", s: "A contractor needs several resources for six months via self-service.", task: "Order the entitlement management setup:",
 steps: ["Create a catalog and add the resources (group, app role, site)", "Create an access package bundling those resources", "Define a policy: who can request, who approves, and 6-month expiration", "Contractor requests the package via the My Access portal", "Access is provisioned on approval and auto-removed at expiration"],
 x: "Stage resources in a catalog, bundle them in an access package, set the request/approval/expiration policy, then the user self-requests and access is granted and later removed automatically." },
{ type: "order", s: "You must recertify who holds a privileged Entra role, removing the unconfirmed.", task: "Order the access review steps:",
 steps: ["Open PIM > Entra roles > Access reviews", "Create a review for the privileged role", "Set reviewers to 'Managers of users' and recurrence to quarterly", "Set 'if reviewers don't respond' to Remove access", "Enable auto-apply so denied access is removed automatically"],
 x: "Privileged-role reviews are created in PIM; configure reviewers, recurrence, deny-by-default, and auto-apply so unconfirmed access is revoked." },
{ type: "match", s: "Match each requirement to the correct governance feature.", task: "Assign every requirement:",
 cats: ["PIM", "Access reviews", "Entitlement management", "Lifecycle Workflows"],
 items: [
  { t: "Remove standing admin rights; activate roles JIT with approval", c: "PIM" },
  { t: "Periodically recertify who still needs group membership", c: "Access reviews" },
  { t: "Bundle a group, app role, and site with self-service and expiration", c: "Entitlement management" },
  { t: "Automatically disable accounts and remove access on the leave date", c: "Lifecycle Workflows" },
  { t: "Auto-generate a TAP and add groups before a hire date", c: "Lifecycle Workflows" },
  { t: "Just-in-time activation of a privileged role", c: "PIM" } ],
 x: "PIM = standing-privilege/JIT; access reviews = recertification; entitlement management = bundled self-service access with expiration; Lifecycle Workflows = automated joiner/mover/leaver." },
{ type: "match", s: "Match each PIM concept to its meaning.", task: "Assign every item:",
 cats: ["Eligible assignment", "Active assignment", "Activation control"],
 items: [
  { t: "Holds no rights until activated just-in-time", c: "Eligible assignment" },
  { t: "Standing rights that are always on", c: "Active assignment" },
  { t: "Require MFA, justification, and approval to activate", c: "Activation control" },
  { t: "Auto-expires after a set duration once activated", c: "Eligible assignment" },
  { t: "The assignment type to avoid for least privilege", c: "Active assignment" } ],
 x: "Eligible = JIT, nothing until activated (preferred); active = standing (avoid); activation controls gate how an eligible role is turned on." },
{ type: "match", s: "Match each question to the log that answers it.", task: "Assign every item:",
 cats: ["Sign-in logs", "Audit logs", "Provisioning logs"],
 items: [
  { t: "Why was this sign-in blocked and which CA policy applied?", c: "Sign-in logs" },
  { t: "Who changed this role assignment and when?", c: "Audit logs" },
  { t: "Did the SCIM account provision to the SaaS app?", c: "Provisioning logs" },
  { t: "Which consent grant was recorded in the directory?", c: "Audit logs" },
  { t: "From what location did the user authenticate?", c: "Sign-in logs" } ],
 x: "Sign-in logs = authentications and CA results; audit logs = directory changes; provisioning logs = SCIM app provisioning activity." },
{ type: "multi", s: "Design PIM to remove standing privilege for sensitive roles.", e: "Goal: least standing privilege with accountability.", q: "Select ALL correct practices:",
 options: [
  { t: "Make roles eligible rather than active", c: true, w: "Eligible + JIT removes standing rights." },
  { t: "Require MFA, justification, and approval on activation", c: true, w: "Activation controls add accountability to sensitive roles." },
  { t: "Set a bounded activation duration so the role auto-expires", c: true, w: "Time-boxed activation prevents lingering privilege." },
  { t: "Use Discovery and Insights to convert permanent assignments to JIT", c: true, w: "It surfaces standing assignments to move them to eligible." },
  { t: "Assign Global Administrator permanently for convenience", c: false, w: "Permanent Global Admin is the standing privilege to eliminate." } ],
 x: "Eligibility, activation controls, bounded duration, and converting standing assignments to JIT are the PIM pattern; permanent Global Admin is the anti-pattern." },
{ type: "multi", s: "Configure a recurring access review for a sensitive group with deny-by-default.", e: "Goal: recertify and auto-remove stale access.", q: "Select ALL correct settings:",
 options: [
  { t: "Choose appropriate reviewers (e.g., Managers of users or the resource owner)", c: true, w: "Reviewers must be the people who can judge continued need." },
  { t: "Set a recurrence (e.g., quarterly)", c: true, w: "Recurring reviews provide ongoing recertification." },
  { t: "Set 'if reviewers don't respond' to Remove access", c: true, w: "Deny-by-default removes unreviewed access." },
  { t: "Enable auto-apply of results", c: true, w: "Auto-apply enforces decisions without manual steps." },
  { t: "Set 'if reviewers don't respond' to Approve access", c: false, w: "Auto-approving on no response keeps stale access." } ],
 x: "Right reviewers, recurrence, deny-by-default on no response, and auto-apply produce a governed, self-cleaning review." },
{ type: "multi", s: "A contractor engagement needs multiple resources, self-service, approval, and time-boxing.", e: "Requirement bundles several needs.", q: "Select ALL true statements about the best solution:",
 options: [
  { t: "An access package can bundle a group, app role, and SharePoint site", c: true, w: "Access packages bundle multiple resource types." },
  { t: "The policy defines who can request and who approves", c: true, w: "Access-package policies govern requesters and approvers." },
  { t: "Access can auto-expire, removing all bundled resources together", c: true, w: "Expiration removes the granted resources gracefully." },
  { t: "Connected organizations can let external partners request it", c: true, w: "Connected orgs onboard trusted external requesters." },
  { t: "Conditional Access is the correct tool to gracefully remove the resources", c: false, w: "CA blocks access; it doesn't deprovision bundled resources -- access packages do." } ],
 x: "Access packages bundle resources with governed request/approval and graceful expiration; CA only blocks, so it's the wrong tool here." },
{ type: "multi", s: "Set up identity monitoring and evidence for an audit.", e: "Goal: retain logs, analyze, and prove governance.", q: "Select ALL correct choices:",
 options: [
  { t: "Export logs via diagnostic settings to Log Analytics for KQL and workbooks", c: true, w: "Log Analytics enables retention plus KQL analysis." },
  { t: "Archive to a storage account for cheap long-term retention", c: true, w: "Storage is the low-cost archive destination." },
  { t: "Stream to an Event Hub for Sentinel/SIEM correlation", c: true, w: "Event Hub feeds a SIEM." },
  { t: "Use PIM history, access-review decisions, and approvals as audit evidence", c: true, w: "Governance records prove least privilege and approvals." },
  { t: "Rely only on default Entra retention with no export", c: false, w: "Default retention is limited; export is required for long-term evidence." } ],
 x: "Route logs to Log Analytics/Storage/Event Hub as needed, and use governance records as the audit trail; default retention alone is insufficient." },
],
boss: {
 title: "Operation Standing Plunder: The Valkyran Raiders",
 brief: "The Valkyran Raiders have looted Star Command's access controls -- standing admin keys, stale guest badges, sprawling permissions, and an offboarding gap wide enough to fly a raider through. You hold the Identity Governance console and five decisions. Make every key a loan, recertify every holder, and automate the gates. Clear this and SC-300 is complete.",
 win: "Every looted key is reclaimed -- privilege made just-in-time, access recertified, resources bundled and time-boxed, joiners and leavers automated, and the whole trail logged as evidence. The Raiders are driven off empty-handed. Domain mission cleared -- SC-300 is within your grasp!",
 lose: "The Raiders found standing plunder you left lying around -- a permanent admin key, an unreviewed guest, an open offboarding gate. Review where privilege lingered, and deploy again.",
 stages: [
 { sit: "The Raiders' first haul: a dozen admins hold permanent Global Administrator, standing keys they never surrender. Ops wants least privilege without blocking real work.",
  e: "12 permanent (active) Global Administrator assignments\nGoal: remove standing privilege, keep admins able to work\nP2 licensing available",
  options: [
  { t: "Make the roles eligible in PIM with JIT activation requiring MFA, justification, and approval", d: 0, r: 4, ev: 0, ql: "best", w: "Eligible + JIT with activation controls removes standing privilege while letting admins activate when needed -- exactly the Raiders' plunder, reclaimed." },
  { t: "Leave the permanent assignments; changing them is disruptive", d: 18, r: -5, ev: 0, ql: "bad", w: "Standing Global Admin is the looted key the Raiders count on -- permanent assignments are the anti-pattern." },
  { t: "Delete all twelve admin accounts", d: 12, r: -4, ev: 0, ql: "ok", w: "Too blunt -- admins still need to work; make the roles eligible rather than destroying the accounts." } ]},
 { sit: "Stale guest badges litter a sensitive group -- partners from projects that ended months ago. The Raiders wear them to walk right in.",
  e: "Sensitive group full of long-forgotten B2B guests\nGoal: recurring recertification, auto-remove the unconfirmed",
  options: [
  { t: "Create a recurring access review with 'if reviewers don't respond -> Remove access' and auto-apply", d: 0, r: 4, ev: 1, ql: "best", w: "Access reviews recertify membership on a schedule; deny-by-default auto-removes the stale guests the Raiders exploit." },
  { t: "Leave the guests; someone will clean them up eventually", d: 16, r: -5, ev: 0, ql: "bad", w: "Access sprawl is exactly the plunder -- forgotten guests are open doors for the Raiders." },
  { t: "Block the whole group with Conditional Access", d: 10, r: -3, ev: 0, ql: "ok", w: "CA blocks everyone, including legitimate members -- reviews recertify who should remain instead." } ]},
 { sit: "A contractor crew needs a group, an app role, and a SharePoint site for six months. The Raiders love manual grants -- they're never cleaned up.",
  e: "Multiple resources, self-service desired, must auto-expire in 6 months\nManual assignment would leave access lingering",
  options: [
  { t: "Publish an entitlement management access package bundling the resources with approval and 6-month expiration", d: 0, r: 4, ev: 0, ql: "best", w: "Access packages bundle the resources with governed request/approval and automatic removal at expiration -- no lingering plunder." },
  { t: "Assign each resource by hand and set a calendar reminder", d: 14, r: -4, ev: 0, ql: "bad", w: "Manual grants with a reminder are error-prone and exactly what the Raiders rely on outlasting." },
  { t: "Grant the contractors permanent access to be safe", d: 16, r: -5, ev: 0, ql: "bad", w: "Permanent access for temporary contractors is standing plunder handed straight to the Raiders." } ]},
 { sit: "The Raiders thrive in the churn of arrivals and departures -- new crew with nothing, departed crew whose keys were never pulled.",
  e: "Onboarding is manual and slow; leavers keep access for weeks\nGoal: automate joiner and leaver reliably",
  options: [
  { t: "Configure Lifecycle Workflows: a joiner workflow (TAP + groups before hire date) and a leaver workflow (disable + remove access + revoke on leave date)", d: 0, r: 4, ev: 1, ql: "best", w: "Lifecycle Workflows automate joiner and leaver on date triggers, closing the offboarding gap the Raiders slip through." },
  { t: "Keep relying on managers to remember to file tickets", d: 16, r: -5, ev: 0, ql: "bad", w: "Relying on memory is the offboarding gap itself -- automation is the fix." },
  { t: "Run a yearly access review and call it covered", d: 10, r: -3, ev: 0, ql: "ok", w: "A yearly review catches leftovers late; timely automated offboarding is what closes the gap." } ]},
 { sit: "Cornered, the Raiders bet you can't prove any of it. The auditor arrives asking who had access, why, who approved it, and demands a year of logs.",
  e: "Audit demands: least-privilege evidence + 1 year of queryable logs\nEntra default retention is far shorter\nGoal: prove governance and retain evidence",
  options: [
  { t: "Export logs via diagnostic settings (Log Analytics for KQL, Storage for archive) and present PIM history, access-review decisions, and entitlement approvals as evidence", d: 0, r: 4, ev: 0, ql: "best", w: "Exported logs plus governance records prove who had access, why, and who approved -- the evidence trail that locks the Raiders out for good." },
  { t: "Rely on default Entra retention and hope it covers the year", d: 14, r: -4, ev: 0, ql: "bad", w: "Default retention is too short; without export the evidence is gone and the audit fails." },
  { t: "Tell the auditor the governance 'just works' with no records", d: 16, r: -6, ev: -8, ql: "bad", w: "Unprovable governance is no governance to an auditor -- the records are the whole point." } ]},
 ],
},
};
