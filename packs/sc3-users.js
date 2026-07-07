/* CONTENT PACK: SC-300 · Implement & Manage User Identities (sc3-users) — 40 MCQ + 10 PBQ + 5 briefings + boss */
window.PACKS = window.PACKS || {};
window.PACKS["sc3-users"] = {
lessons: {
"sc3-users-1": { intro: "Rentwhistle Swack forges identities across the tenant like counterfeit credits. Your first defense, Ranger, is knowing exactly who holds which keys — and scoping those keys tightly.",
sections: [
{ h: "Tenants and Microsoft Entra ID", b: "A Microsoft Entra tenant is a dedicated, isolated instance of the directory for one organization — the boundary that holds your users, groups, apps, and policies. It backs Microsoft 365 and Azure. Tenant-wide settings (like default user permissions, external collaboration settings, and security defaults) shape the whole directory, so getting them right is foundational identity hygiene." },
{ h: "Entra roles vs the least-privilege principle", b: "Entra ID has built-in directory roles that grant administrative permissions: Global Administrator (everything — guard it fiercely), User Administrator, Groups Administrator, Authentication Administrator, Helpdesk Administrator, and many scoped roles. The rule is least privilege: assign the most limited role that accomplishes the task. Handing out Global Admin because it's convenient is exactly the over-permissioning Swack exploits.", data: "Task → right role (least privilege):\n- reset passwords for standard users → Helpdesk Administrator\n- manage all users/licenses → User Administrator\n- manage groups → Groups Administrator\n- everything → Global Administrator (minimize count!)" },
{ h: "Administrative units (AUs)", b: "Administrative units scope a role's authority to a subset of the directory — a region, department, or business unit. Assign a Helpdesk Administrator over the 'Europe' AU and they can reset passwords only for users in that AU, not tenant-wide. This is how you delegate administration without granting directory-wide power — a heavily tested SC-300 concept.", data: "Delegate EU helpdesk without tenant-wide rights:\n→ create AU 'Europe' (members = EU users)\n→ assign Helpdesk Administrator scoped to that AU" },
{ h: "Global Administrator hygiene", b: "Global Admins should be few, protected by strong phishing-resistant MFA, and ideally activated just-in-time via PIM rather than standing. Microsoft recommends a small number of dedicated admin accounts (not daily-driver identities), and at least one cloud-only emergency 'break-glass' account excluded from Conditional Access so you're never locked out. Over-provisioned standing Global Admins are the crown jewels attackers hunt." },
],
traps: [
"Least privilege: pick the narrowest role for the task — 'assign Global Administrator' is almost always the wrong answer when a scoped role fits.",
"Administrative units scope a role to a subset of the directory; when a scenario says 'delegate for only one region/department without tenant-wide rights,' the answer is an AU.",
"Helpdesk Administrator can reset passwords for non-admins; it is not a full user-management role — match the role to the exact task.",
"Break-glass accounts are cloud-only and excluded from Conditional Access so a policy misconfig can't lock everyone out." ],
keys: [
"A tenant is one isolated Entra directory instance; tenant-wide settings shape everything.",
"Assign the least-privileged built-in role that does the job.",
"Administrative units scope admin authority to a subset (region/dept/BU).",
"Keep Global Admins few, MFA-protected, JIT via PIM, with break-glass accounts." ] },

"sc3-users-2": { intro: "Swack loves the sprawl — thousands of accounts and groups nobody watches. Master the lifecycle and dynamic membership, and his fakes have nowhere to hide.",
sections: [
{ h: "User account types", b: "Entra ID has cloud-only users (created in the cloud), synchronized users (mastered on-premises via Entra Connect), and guest users (external B2B identities). Know where each is mastered: a synced user's attributes are edited on-premises and flow up, so you can't change them directly in the cloud. Deleting/disabling follows the master. External guests are UserType=Guest with limited default permissions." },
{ h: "Groups: security vs Microsoft 365, assigned vs dynamic", b: "Security groups control access to resources; Microsoft 365 groups add collaboration (mailbox, SharePoint, Teams). Membership is either Assigned (you add members manually) or Dynamic (rule-based). Dynamic membership auto-adds users (or devices) whose attributes match a rule — e.g., all users in the Sales department — so membership self-maintains as attributes change.", data: "Dynamic membership rule example:\n(user.department -eq \"Sales\") -and (user.country -eq \"US\")\n→ any US Sales user is auto-added; leaves when attributes change" },
{ h: "Dynamic groups and licensing at scale", b: "Group-based licensing assigns licenses to a group so every member inherits them automatically — pair it with a dynamic group and licensing self-manages as people join/leave a department. Watch for licensing errors from insufficient available licenses or service-plan conflicts. Dynamic membership requires Entra ID P1; it's the scalable answer versus manually maintaining membership and licenses." },
{ h: "Lifecycle basics", b: "Accounts move through join → move → leave. Disabling (blocking sign-in) is reversible and preserves the object; deleting sends it to a recycle bin for 30 days before permanent removal. For a departing employee you typically block sign-in and revoke sessions immediately, then remove access — balancing security with the ability to recover mailbox/data. Dynamic groups and group-based licensing automate much of the join/move churn." },
],
traps: [
"Synchronized (on-prem-mastered) users can't have their synced attributes edited in the cloud — change them on-premises; a scenario expecting a cloud edit of a synced attribute is a trap.",
"Dynamic membership is rule/attribute-based and self-updating; 'manually add each user' is the wrong answer when attributes define the population.",
"Group-based licensing needs enough available licenses and no service-plan conflicts, or members show licensing errors.",
"Disable + revoke sessions is reversible and immediate for a leaver; deletion is recoverable only within the 30-day window." ],
keys: [
"User types: cloud-only, synced (on-prem-mastered), guest (B2B).",
"Security groups = access; M365 groups = collaboration; membership assigned or dynamic.",
"Dynamic groups + group-based licensing self-maintain at scale (needs P1).",
"Lifecycle: disable+revoke (reversible) vs delete (30-day recycle bin)." ] },

"sc3-users-3": { intro: "Swack slips in wearing a partner's face — a guest badge he never should have had. Guard the airlock between tenants with B2B and cross-tenant settings.",
sections: [
{ h: "B2B collaboration", b: "Entra B2B lets external partners access your resources using their OWN home-tenant identity — you invite them as a guest (UserType=Guest) and they authenticate at their organization, no new password in your tenant. This is the standard way to share with partners securely: their identity lifecycle stays with their employer, and you control what the guest can reach.", data: "Partner needs access to your SharePoint site:\n→ invite as B2B guest (they sign in with their own org identity)\n→ authorize the guest to the specific resource only" },
{ h: "Cross-tenant access settings", b: "Cross-tenant access settings define how your tenant trusts other Entra tenants for B2B — inbound and outbound access, which users/apps are allowed, and crucially whether you trust the partner tenant's MFA and device compliance claims. Trusting their MFA claim means your guest isn't re-prompted if they already did MFA at home. B2B direct connect (e.g., Teams Connect shared channels) is configured here too." },
{ h: "External collaboration settings and guest permissions", b: "External collaboration settings control who can invite guests, whether guests can invite others, and how much of the directory guests can see (guest permission levels). Restricting guest directory access limits reconnaissance. You can also allow/block specific partner domains for invitations — an allowlist/blocklist of collaboration partners." },
{ h: "Entra External ID (customer/CIAM)", b: "Beyond workforce B2B, Microsoft Entra External ID covers customer-facing (CIAM) scenarios — letting external customers sign up and sign in to your apps with self-service, social accounts, and custom user flows. Know the distinction: B2B collaboration is for business partners accessing your resources; External ID/CIAM is for your app's customers." },
],
traps: [
"B2B guests authenticate with their OWN home-tenant identity — you don't create a password for them; an answer that provisions them a local credential misses the point.",
"Whether a guest is re-prompted for MFA is governed by cross-tenant access settings (trusting the partner's MFA claim), not by re-inviting them.",
"External collaboration settings decide WHO can invite guests and what guests can see; tighten guest directory permissions to limit recon.",
"B2B collaboration (partners → your resources) is different from Entra External ID/CIAM (your customers → your apps)." ],
keys: [
"B2B: partners use their own home identity as your guest (UserType=Guest).",
"Cross-tenant access settings govern inbound/outbound trust, MFA/device-claim trust, direct connect.",
"External collaboration settings control who invites guests and guest directory visibility.",
"B2B (workforce partners) vs Entra External ID (customer/CIAM) are distinct." ] },

"sc3-users-4": { intro: "Swack's cleverest trick is impersonating your on-prem rangers in the cloud. Hybrid identity done right makes his forgeries fall apart at the sync boundary.",
sections: [
{ h: "Hybrid identity and Entra Connect", b: "Most organizations have on-premises Active Directory and Entra ID both. Microsoft Entra Connect (and the lighter Entra Cloud Sync) synchronizes on-prem AD objects to Entra ID so users have one identity across both. Sync creates the cloud representation of on-prem users; the on-prem AD remains the source of truth (master) for synced attributes." },
{ h: "The authentication methods: PHS, PTA, federation", b: "Three ways synced users authenticate: Password Hash Synchronization (PHS) syncs a hash-of-a-hash of the password to the cloud, so Entra validates sign-ins itself (simplest, resilient, enables leaked-credential detection). Pass-Through Authentication (PTA) validates the password against on-prem AD in real time via an agent (password never stored in cloud). Federation (AD FS) hands authentication to an on-prem identity provider (most complex). PHS is Microsoft's recommended default.", data: "PHS  → cloud validates (hash synced); resilient; enables leaked-cred detection\nPTA  → on-prem AD validates live via agent; no hash in cloud\nADFS → external IdP handles auth; most infrastructure/complexity" },
{ h: "Seamless SSO and password writeback", b: "Seamless single sign-on silently signs in domain-joined users on the corporate network (pairs with PHS or PTA). Password writeback lets cloud password changes (e.g., SSPR) flow back to on-prem AD so a user's password stays consistent in both directories — required for self-service password reset to update the on-prem password of a synced user." },
{ h: "Choosing and troubleshooting sync", b: "PHS is the recommended default for resilience and cloud features (leaked-credential detection needs PHS). Choose PTA when policy forbids any password hash in the cloud; federation only when an existing IdP or specific requirement demands it. Common issues: sync scope/filtering excluding needed OUs, duplicate/soft-matched objects, and attribute conflicts. Entra Connect Health monitors sync status." },
],
traps: [
"For a synced user, on-prem AD is the master — leaked-credential detection in Identity Protection requires PHS (federation/PTA alone don't feed it unless PHS is also enabled).",
"PTA validates against on-prem AD live and stores no hash in the cloud; PHS syncs a (double-hashed) credential and lets the cloud validate — don't swap their descriptions.",
"Password writeback is what lets cloud SSPR update a synced user's on-prem password; without it, SSPR can't reset on-prem passwords.",
"PHS is Microsoft's recommended default for resilience; pick PTA/federation only when a specific requirement forces it." ],
keys: [
"Entra Connect/Cloud Sync bridges on-prem AD to Entra; on-prem stays master.",
"PHS (cloud validates, recommended) · PTA (on-prem validates live) · federation (external IdP).",
"Leaked-credential detection requires PHS; seamless SSO silently signs in on-network users.",
"Password writeback lets cloud SSPR update on-prem passwords." ] },

"sc3-users-5": { intro: "Swack forges the little details — an unverified domain, an unmanaged device. Lock down custom domains and device identity so every genuine ranger is provably real.",
sections: [
{ h: "Custom domain names", b: "A new tenant gets a default onmicrosoft.com domain. You add and verify a custom domain (e.g., contoso.com) by proving ownership via a DNS TXT (or MX) record. Only after verification can users have @contoso.com identities. Domain verification is a common first-setup and troubleshooting topic: no verified domain means no branded UPNs.", data: "Add contoso.com:\n→ Entra gives a TXT record value\n→ publish it in contoso.com DNS\n→ Entra verifies ownership → domain usable for UPNs" },
{ h: "Device identity: registered vs joined", b: "Devices get an identity in Entra too. Entra registered (BYOD/personal) associates a personal device with a user for Conditional Access without full org management. Entra joined (cloud-only org devices) joins the device directly to Entra ID. Entra hybrid joined (on-prem AD + Entra) suits organizations still using on-prem AD/GPO alongside the cloud. Device identity is what lets Conditional Access require a managed/compliant device.", data: "Entra registered → personal/BYOD, user-associated\nEntra joined → org-owned, cloud-only\nHybrid joined → org-owned, on-prem AD + Entra (GPO + cloud)" },
{ h: "Device state, compliance, and Conditional Access", b: "A device's registration/compliance state (compliant via Intune, managed, hybrid-joined) becomes a signal Conditional Access can require — e.g., 'require a compliant device' to reach sensitive apps. This ties device identity to Zero Trust: access decisions consider not just who the user is but the health of the device they're on." },
{ h: "Where device identity fits the lifecycle", b: "Registering/joining a device creates its Entra object; stale or lost devices should be disabled/removed to shrink attack surface, just like user accounts. Device identity underpins passwordless (Windows Hello for Business binds to the device) and enables device-based Conditional Access — recurring themes that connect this domain to authentication and access management." },
],
traps: [
"A custom domain must be verified via a DNS record before it can be used for UPNs — 'just type the domain' without DNS verification is wrong.",
"Entra registered (BYOD, user-associated) vs Entra joined (org-owned cloud) vs hybrid joined (on-prem AD + Entra) — match the join type to the device ownership/management scenario.",
"Requiring a 'compliant device' in Conditional Access depends on device identity + Intune compliance state existing first.",
"Hybrid Entra join is the fit when the org still relies on on-prem AD and GPO alongside the cloud, not full cloud-only Entra join." ],
keys: [
"Add + DNS-verify custom domains before using branded UPNs.",
"Device identity: registered (BYOD) · joined (cloud org) · hybrid joined (on-prem+cloud).",
"Device compliance/state becomes a Conditional Access signal (Zero Trust).",
"Manage device objects through their lifecycle; they underpin passwordless & device-based CA." ] },
},
mcq: {
"sc3-users-1": [
{ s: "An organization wants to let the European helpdesk reset passwords for EU users only, with no tenant-wide rights.", e: "Requirement: scoped delegation to one region", q: "Which Entra feature achieves this?", options: [
 { t: "An administrative unit scoping Helpdesk Administrator to the EU users", c: true, w: "AUs scope a role's authority to a subset of the directory — exactly regional delegation without tenant-wide power." },
 { t: "Assign Global Administrator to the EU helpdesk", c: false, w: "Global Admin grants everything tenant-wide — the opposite of scoped least privilege." },
 { t: "Add them to a security group", c: false, w: "Group membership doesn't scope administrative role authority to a region." },
 { t: "Give them User Administrator tenant-wide", c: false, w: "That's tenant-wide user management, not EU-only password resets." } ] },
{ s: "A task requires resetting passwords for standard (non-admin) users only.", e: "Goal: least privilege", q: "Which built-in role fits best?", options: [
 { t: "Helpdesk Administrator", c: true, w: "Helpdesk Administrator can reset passwords for non-administrators — the narrowest role for this task." },
 { t: "Global Administrator", c: false, w: "Far too broad; violates least privilege for a password-reset task." },
 { t: "Groups Administrator", c: false, w: "That manages groups, not user password resets." },
 { t: "Application Administrator", c: false, w: "That manages app registrations, unrelated to password resets." } ] },
{ s: "A tenant has 14 standing Global Administrators used as daily accounts.", e: "Security review flags this", q: "Best remediation?", options: [
 { t: "Reduce Global Admins to a few dedicated accounts, protect with phishing-resistant MFA, and activate via PIM just-in-time", c: true, w: "Minimizing standing Global Admins, hardening them, and using JIT activation is the recommended crown-jewel protection." },
 { t: "Leave them; more admins means faster support", c: false, w: "Excess standing Global Admins are exactly the over-privileged targets attackers hunt." },
 { t: "Convert them all to User Administrators permanently", c: false, w: "Some legitimately need Global Admin occasionally; the fix is fewer, JIT, hardened — not blanket downgrade." },
 { t: "Disable MFA to speed their sign-ins", c: false, w: "Removing MFA from the most powerful accounts is the opposite of securing them." } ] },
{ s: "During a Conditional Access rollout, the team worries a misconfigured policy could lock everyone out.", e: "Need: guaranteed recovery access", q: "What safeguard is standard practice?", options: [
 { t: "A cloud-only break-glass account excluded from Conditional Access", c: true, w: "Break-glass (emergency) accounts are cloud-only and CA-excluded so a bad policy can't lock out all admins." },
 { t: "Give every user Global Admin as backup", c: false, w: "Mass Global Admin is a catastrophic security hole, not a safeguard." },
 { t: "Disable Conditional Access entirely", c: false, w: "That abandons the security control; a break-glass account is the targeted answer." },
 { t: "Store the Global Admin password in a public channel", c: false, w: "Exposing admin credentials is a severe risk, not a safeguard." } ] },
{ s: "An admin needs to manage all users and licenses across the tenant, but should not control Conditional Access or security settings.", e: "Match the least-privileged role", q: "Which role?", options: [
 { t: "User Administrator", c: true, w: "User Administrator manages users and licenses tenant-wide without broader security/CA control — least privilege for the task." },
 { t: "Global Administrator", c: false, w: "Grants far more than user/license management." },
 { t: "Security Administrator", c: false, w: "That focuses on security features, not general user/license management." },
 { t: "Helpdesk Administrator", c: false, w: "Too narrow — it can't manage all users and licensing tenant-wide." } ] },
{ s: "A company wants each of three regions administered independently without any admin having power over the other regions.", e: "Regions: Americas, EMEA, APAC", q: "Best design?", options: [
 { t: "Create an administrative unit per region and scope regional admins to their AU", c: true, w: "One AU per region with scoped role assignments delivers independent, isolated regional administration." },
 { t: "One Global Admin for all three regions", c: false, w: "That gives cross-region power, violating the isolation requirement." },
 { t: "Three separate tenants", c: false, w: "Overkill and fragmenting; AUs scope administration within one tenant." },
 { t: "Dynamic groups instead of roles", c: false, w: "Groups define membership, not scoped administrative authority." } ] },
{ s: "A junior admin asks what a Microsoft Entra tenant actually is.", e: "Context: new to Entra", q: "Best description:", options: [
 { t: "A dedicated, isolated instance of the Entra directory for one organization", c: true, w: "A tenant is the org's isolated directory boundary holding users, groups, apps, and policies." },
 { t: "A single user account", c: false, w: "A tenant is the whole directory instance, not one account." },
 { t: "A physical server in a datacenter", c: false, w: "A tenant is a logical directory instance, not specific hardware." },
 { t: "A Conditional Access policy", c: false, w: "CA policies live inside a tenant; they aren't the tenant itself." } ] },
{ s: "Security defaults vs granular control is under discussion for a growing tenant.", e: "Team wants tailored access policies per app and risk", q: "What's the tradeoff to communicate?", options: [
 { t: "Security defaults give baseline protection quickly; Conditional Access (P1) gives granular, tailored control", c: true, w: "Defaults are a quick baseline; Conditional Access provides the fine-grained policy control the team wants." },
 { t: "Security defaults and Conditional Access are identical", c: false, w: "Defaults are broad and on/off; CA is granular and conditional." },
 { t: "Conditional Access is weaker than security defaults", c: false, w: "CA is more capable and granular, not weaker." },
 { t: "You must never use either", c: false, w: "One or the other should protect the tenant; both are legitimate." } ] } ],

"sc3-users-2": [
{ s: "An admin tries to edit a user's department in Entra but the field is greyed out.", e: "User is synchronized from on-premises AD via Entra Connect", q: "Why can't they edit it in the cloud?", options: [
 { t: "The user is mastered on-premises; synced attributes must be changed in on-prem AD", c: true, w: "For synced users, on-prem AD is the source of truth; edit the attribute there and let it sync up." },
 { t: "The admin lacks a license", c: false, w: "It's greyed out because the attribute is on-prem-mastered, not a licensing issue." },
 { t: "Entra is broken and needs a restart", c: false, w: "This is expected behavior for synced attributes, not a fault." },
 { t: "Department fields are never editable anywhere", c: false, w: "They're editable — on-premises for a synced user." } ] },
{ s: "A company wants all US Sales employees automatically added to a group as they join or change roles.", e: "Membership should self-maintain by attributes", q: "Best solution?", options: [
 { t: "A dynamic membership group with a rule on department and country", c: true, w: "Dynamic groups auto-add/remove members as attributes match the rule — self-maintaining membership." },
 { t: "An assigned group with members added manually", c: false, w: "Manual maintenance doesn't self-update as people join/move." },
 { t: "A distribution list emailed weekly", c: false, w: "That doesn't control resource access or update automatically." },
 { t: "Individual role assignments per user", c: false, w: "Per-user assignment doesn't scale or self-maintain like a dynamic rule." } ] },
{ s: "A firm wants licenses assigned automatically to everyone in Marketing as staff change.", e: "Goal: hands-off licensing at scale", q: "Best approach?", options: [
 { t: "Group-based licensing on a dynamic group for Marketing", c: true, w: "A dynamic group plus group-based licensing makes membership and licensing self-manage as people join/leave." },
 { t: "Assign licenses to each user by hand monthly", c: false, w: "Manual per-user licensing doesn't scale and lags changes." },
 { t: "Buy licenses but never assign them", c: false, w: "Unassigned licenses grant nothing." },
 { t: "Use a shared account for all of Marketing", c: false, w: "Shared accounts break identity, auditing, and licensing." } ] },
{ s: "After enabling group-based licensing, some members show a licensing error.", e: "Error indicates a problem applying the license", q: "Most likely causes?", options: [
 { t: "Insufficient available licenses or a service-plan conflict", c: true, w: "Common group-licensing errors come from running out of licenses or conflicting service plans." },
 { t: "The group has too few members", c: false, w: "Member count doesn't cause licensing errors." },
 { t: "Dynamic rules are illegal", c: false, w: "Dynamic rules are supported (with P1); not a cause of the error." },
 { t: "The tenant name is too long", c: false, w: "Unrelated to licensing application." } ] },
{ s: "An employee is leaving today; security wants access cut immediately but data recoverable.", e: "Requirement: reversible, immediate", q: "Best first action?", options: [
 { t: "Disable (block sign-in) and revoke the user's sessions/refresh tokens", c: true, w: "Blocking sign-in plus revoking sessions cuts access immediately and reversibly, preserving the object and data." },
 { t: "Permanently purge the account at once", c: false, w: "Immediate hard-delete risks losing recoverable mailbox/data and is irreversible after 30 days." },
 { t: "Do nothing until the mailbox is archived next month", c: false, w: "Leaving access live for a departed employee is a security gap." },
 { t: "Reset only their password", c: false, w: "A password reset alone may not revoke active sessions/tokens." } ] },
{ s: "An admin needs to distinguish a security group from a Microsoft 365 group.", e: "Choosing the right group type for a project team's collaboration", q: "Correct distinction?", options: [
 { t: "Security groups control resource access; Microsoft 365 groups add collaboration (mailbox, SharePoint, Teams)", c: true, w: "M365 groups bundle collaboration workloads; security groups are for access control." },
 { t: "They are identical", c: false, w: "They serve different purposes and back different features." },
 { t: "Security groups include a Teams team automatically", c: false, w: "That's the M365 group; security groups don't provision Teams." },
 { t: "M365 groups can't control any access", c: false, w: "M365 groups can grant access too, but their defining extra is collaboration." } ] },
{ s: "A deleted user account must be recovered.", e: "The account was deleted 10 days ago", q: "Is recovery possible?", options: [
 { t: "Yes — deleted users are recoverable from the recycle bin for 30 days", c: true, w: "Entra retains deleted users for 30 days before permanent removal, so day-10 recovery works." },
 { t: "No — deletion is always instant and permanent", c: false, w: "There's a 30-day soft-delete window." },
 { t: "Only if a Global Admin deleted it", c: false, w: "Recovery within 30 days doesn't depend on who deleted it." },
 { t: "Only within 24 hours", c: false, w: "The window is 30 days, not 24 hours." } ] },
{ s: "A dynamic device group is desired for all Windows devices.", e: "Goal: auto-membership by device attribute", q: "What's required and how is it built?", options: [
 { t: "Create a dynamic device group (requires Entra ID P1) with a rule on device.deviceOSType", c: true, w: "Dynamic membership (P1) supports device rules like OS type to auto-populate device groups." },
 { t: "Manually add every device forever", c: false, w: "Manual maintenance defeats the purpose of dynamic membership." },
 { t: "Dynamic device groups are impossible", c: false, w: "Dynamic membership supports devices, not just users." },
 { t: "Use a user dynamic rule for devices", c: false, w: "Device groups need device rules, not user attributes." } ] } ],

"sc3-users-3": [
{ s: "A partner firm's employees need access to your SharePoint site.", e: "They already have identities at their own company", q: "Best way to grant access?", options: [
 { t: "Invite them as B2B guests so they use their own home-tenant identity", c: true, w: "B2B collaboration lets externals authenticate with their existing identity and access your resources as guests." },
 { t: "Create new internal accounts with passwords for each partner", c: false, w: "That duplicates identities and defeats B2B's whole model." },
 { t: "Share the site publicly to anyone", c: false, w: "Public sharing over-exposes; B2B scopes access to invited guests." },
 { t: "Give them a shared generic login", c: false, w: "Shared accounts break auditing and security." } ] },
{ s: "Guests from a trusted partner are being re-prompted for MFA even though they MFA'd at home.", e: "Goal: honor the partner's MFA", q: "What setting resolves this?", options: [
 { t: "Configure cross-tenant access settings to trust the partner tenant's MFA claims", c: true, w: "Trusting inbound MFA claims in cross-tenant access settings stops redundant re-prompting for already-authenticated guests." },
 { t: "Re-invite the guests", c: false, w: "Re-inviting doesn't change MFA-claim trust behavior." },
 { t: "Disable MFA in your tenant entirely", c: false, w: "That weakens security for everyone, not the targeted fix." },
 { t: "Convert guests to members", c: false, w: "Changing user type isn't how you trust a partner's MFA claim." } ] },
{ s: "Security wants to limit how much of the directory guests can see.", e: "Concern: guest reconnaissance of users/groups", q: "Where is this controlled?", options: [
 { t: "External collaboration settings — restrict guest permission (directory access) level", c: true, w: "Guest permission levels in external collaboration settings limit what guests can enumerate in the directory." },
 { t: "Conditional Access session lifetime", c: false, w: "Session lifetime doesn't govern guest directory visibility." },
 { t: "Group-based licensing", c: false, w: "Licensing is unrelated to guest directory access." },
 { t: "Password protection policy", c: false, w: "That governs passwords, not guest visibility." } ] },
{ s: "Only two named partner domains should be allowed to receive B2B invitations.", e: "All other external domains must be blocked", q: "Best control?", options: [
 { t: "Configure an allowlist of permitted domains in external collaboration settings", c: true, w: "Domain allow/block lists restrict which external domains can be invited for collaboration." },
 { t: "Delete all guest accounts nightly", c: false, w: "Destructive and doesn't restrict which domains can be invited." },
 { t: "Turn off Entra ID", c: false, w: "Disabling the directory is absurd; use domain allowlisting." },
 { t: "Require Global Admin to send every email", c: false, w: "That doesn't scope which domains are allowed." } ] },
{ s: "A team must let external customers self-sign-up to a public-facing app with social logins.", e: "Audience: consumers, not business partners", q: "Which capability fits?", options: [
 { t: "Microsoft Entra External ID (CIAM) with user flows and self-service sign-up", c: true, w: "External ID/CIAM handles customer-facing sign-up/sign-in with social accounts and custom flows." },
 { t: "B2B collaboration guest invitations", c: false, w: "B2B is for business partners accessing your resources, not consumer self-sign-up to your app." },
 { t: "Entra Connect sync", c: false, w: "Sync bridges on-prem AD, unrelated to customer sign-up." },
 { t: "Administrative units", c: false, w: "AUs scope admin delegation, not customer identity." } ] },
{ s: "A guest was invited but can't be given a password by your helpdesk.", e: "Helpdesk expects to set the guest's password", q: "Why is that expectation wrong?", options: [
 { t: "B2B guests authenticate at their home tenant; your org never sets their password", c: true, w: "The guest's credential lifecycle stays with their home organization — that's the B2B model." },
 { t: "The helpdesk lacks a license to set it", c: false, w: "It's not licensing; guests simply don't have a local password in your tenant." },
 { t: "Guests must always be Global Admins first", c: false, w: "False and unrelated to password handling." },
 { t: "You must sync them from on-prem AD", c: false, w: "Guests aren't on-prem-synced; they use their external identity." } ] },
{ s: "Two organizations want Teams shared channels connecting their users directly.", e: "Feature: B2B direct connect", q: "Where is this trust configured?", options: [
 { t: "Cross-tenant access settings (B2B direct connect inbound/outbound)", c: true, w: "B2B direct connect for shared channels is enabled and scoped in cross-tenant access settings." },
 { t: "Group-based licensing", c: false, w: "Licensing doesn't establish cross-tenant direct connect." },
 { t: "SSPR configuration", c: false, w: "Password reset is unrelated to cross-tenant connect." },
 { t: "Custom domain verification", c: false, w: "Domain verification doesn't set up direct connect trust." } ] },
{ s: "A scenario asks who is allowed to invite guests into the tenant.", e: "Company wants only admins to invite guests", q: "Where is this restricted?", options: [
 { t: "External collaboration settings — set who can invite guests", c: true, w: "Invitation permissions in external collaboration settings restrict guest-inviting to specific roles." },
 { t: "Conditional Access grant controls", c: false, w: "CA governs access conditions, not who may send guest invites." },
 { t: "PIM role settings", c: false, w: "PIM handles privileged role activation, not guest-invite permission." },
 { t: "Dynamic group rules", c: false, w: "Group rules define membership, not invitation rights." } ] } ],

"sc3-users-4": [
{ s: "An organization needs synced users to sign in, wants leaked-credential detection, and prefers resilience if on-prem is down.", e: "Choosing an authentication method", q: "Best choice?", options: [
 { t: "Password Hash Synchronization (PHS)", c: true, w: "PHS lets the cloud validate sign-ins (resilient) and is required for leaked-credential detection." },
 { t: "Pass-Through Authentication only", c: false, w: "PTA depends on on-prem agents and doesn't feed leaked-credential detection by itself." },
 { t: "AD FS federation", c: false, w: "Most complex, on-prem-dependent, and not needed for these goals." },
 { t: "No authentication method", c: false, w: "Synced users need an auth method to sign in." } ] },
{ s: "Company policy forbids storing any password hash in the cloud, but users must sign in with on-prem passwords.", e: "Constraint: no hash in cloud", q: "Which method fits?", options: [
 { t: "Pass-Through Authentication (PTA)", c: true, w: "PTA validates the password against on-prem AD in real time via an agent, storing no hash in the cloud." },
 { t: "Password Hash Synchronization", c: false, w: "PHS syncs a (double-hashed) credential to the cloud, violating the constraint." },
 { t: "Cloud-only accounts", c: false, w: "They must use on-prem passwords; cloud-only doesn't meet that." },
 { t: "Security defaults", c: false, w: "That's an MFA baseline, not a hybrid auth method." } ] },
{ s: "Self-service password reset must also reset a synced user's on-premises password.", e: "Users are synced from on-prem AD", q: "What must be enabled?", options: [
 { t: "Password writeback", c: true, w: "Password writeback flows cloud SSPR changes back to on-prem AD for synced users." },
 { t: "Nothing — SSPR always updates on-prem automatically", c: false, w: "Without writeback, SSPR can't change the on-prem password of a synced user." },
 { t: "Seamless SSO", c: false, w: "Seamless SSO handles silent sign-in, not password writeback." },
 { t: "A second tenant", c: false, w: "Irrelevant to writeback." } ] },
{ s: "Domain-joined users on the corporate network should be signed in silently without typing credentials.", e: "Using PHS or PTA already", q: "Which feature provides this?", options: [
 { t: "Seamless single sign-on", c: true, w: "Seamless SSO silently authenticates domain-joined users on the corporate network, pairing with PHS/PTA." },
 { t: "Password writeback", c: false, w: "Writeback syncs password changes down, not silent sign-in." },
 { t: "Group-based licensing", c: false, w: "Unrelated to sign-in experience." },
 { t: "Administrative units", c: false, w: "AUs scope admin delegation, not SSO." } ] },
{ s: "An engineer describes PTA as 'syncing the password hash to the cloud for the cloud to validate.'", e: "Verify the description", q: "Is this correct?", options: [
 { t: "No — that describes PHS; PTA validates live against on-prem AD and stores no hash in the cloud", c: true, w: "The engineer swapped the definitions: PHS syncs the hash (cloud validates); PTA validates on-prem in real time." },
 { t: "Yes, that's exactly PTA", c: false, w: "That's PHS, not PTA." },
 { t: "Both PHS and PTA sync the hash", c: false, w: "PTA does not store a hash in the cloud." },
 { t: "Neither method involves passwords", c: false, w: "Both handle password validation, just differently." } ] },
{ s: "Entra Connect is syncing, but a needed OU of users never appears in the cloud.", e: "Other OUs sync fine", q: "Most likely cause?", options: [
 { t: "Sync scope/OU filtering is excluding that OU", c: true, w: "Organizational-unit filtering in Entra Connect commonly excludes objects that don't appear in the cloud." },
 { t: "The tenant is out of storage", c: false, w: "Entra doesn't fail to sync an OU due to 'storage.'" },
 { t: "PHS is enabled", c: false, w: "The auth method doesn't determine which OUs are in scope." },
 { t: "The users have licenses", c: false, w: "Licensing doesn't govern sync scope." } ] },
{ s: "Leadership asks which sync authentication method Microsoft recommends by default.", e: "General guidance, no special constraints", q: "Recommended default?", options: [
 { t: "Password Hash Synchronization (PHS) for resilience and cloud security features", c: true, w: "PHS is Microsoft's recommended default: resilient, simplest, and enables leaked-credential detection." },
 { t: "AD FS federation for everyone", c: false, w: "Federation adds the most complexity and is only for specific requirements." },
 { t: "No sync at all", c: false, w: "Hybrid organizations need sync for a unified identity." },
 { t: "Manual account creation in both directories", c: false, w: "Duplicating accounts by hand defeats hybrid identity." } ] },
{ s: "A team wants to monitor the health and sync status of their hybrid identity infrastructure.", e: "Goal: visibility into Entra Connect sync", q: "Which tool?", options: [
 { t: "Microsoft Entra Connect Health", c: true, w: "Connect Health monitors sync status, agent health, and alerts for hybrid identity components." },
 { t: "Group-based licensing report", c: false, w: "That covers licensing, not sync health." },
 { t: "Conditional Access insights", c: false, w: "CA insights cover access policies, not sync infrastructure." },
 { t: "The recycle bin", c: false, w: "That's for deleted objects, not sync monitoring." } ] } ],

"sc3-users-5": [
{ s: "A new tenant needs users with @contoso.com identities instead of the default onmicrosoft.com.", e: "contoso.com is owned by the company", q: "What must happen first?", options: [
 { t: "Add the custom domain and verify ownership via the DNS TXT/MX record", c: true, w: "A custom domain must be added and DNS-verified before it can be used for UPNs." },
 { t: "Just type @contoso.com on each user", c: false, w: "Without domain verification, the domain can't be used for identities." },
 { t: "Buy a second tenant", c: false, w: "You add the domain to the existing tenant, not buy another." },
 { t: "Enable PHS", c: false, w: "Auth sync is unrelated to domain verification." } ] },
{ s: "Personal BYOD phones need to satisfy Conditional Access without full corporate management.", e: "Devices are user-owned", q: "Which device identity state fits?", options: [
 { t: "Entra registered", c: true, w: "Entra registered associates personal/BYOD devices with a user for CA without full org management." },
 { t: "Entra joined", c: false, w: "Entra joined is for org-owned cloud devices, not personal BYOD." },
 { t: "Hybrid Entra joined", c: false, w: "Hybrid join is for org-owned devices with on-prem AD, not BYOD." },
 { t: "No device identity", c: false, w: "CA needs a device identity; registration provides it for BYOD." } ] },
{ s: "An organization is fully cloud-managed and buys new corporate laptops.", e: "No on-prem AD dependency for these devices", q: "Best join type?", options: [
 { t: "Entra joined (cloud-only org devices)", c: true, w: "Entra join suits org-owned, cloud-managed devices with no on-prem AD dependency." },
 { t: "Entra registered", c: false, w: "Registration is for personal BYOD, not fully managed corporate laptops." },
 { t: "Hybrid Entra joined", c: false, w: "Hybrid join is for orgs still relying on on-prem AD/GPO." },
 { t: "Workgroup only", c: false, w: "That gives no Entra identity or management." } ] },
{ s: "A company still uses on-prem AD and GPO but also wants cloud management and CA for its domain PCs.", e: "Both on-prem AD and Entra in play", q: "Which device state fits?", options: [
 { t: "Hybrid Entra joined", c: true, w: "Hybrid join fits org-owned devices tied to on-prem AD/GPO while also registered in Entra for cloud features." },
 { t: "Entra registered", c: false, w: "Registration is BYOD-style, not full on-prem+cloud domain PCs." },
 { t: "Entra joined", c: false, w: "Pure Entra join drops the on-prem AD/GPO tie this org still needs." },
 { t: "Unmanaged", c: false, w: "Unmanaged devices can't satisfy device-based CA." } ] },
{ s: "A Conditional Access policy should require a managed, compliant device for a sensitive app.", e: "Prerequisite check", q: "What must exist first?", options: [
 { t: "Device identity in Entra plus a compliance state (e.g., via Intune)", c: true, w: "Requiring a compliant device depends on device identity and an Intune compliance signal existing." },
 { t: "Nothing; CA can require compliance with no device management", c: false, w: "Without device identity/compliance data, CA has no signal to evaluate." },
 { t: "A verified custom domain only", c: false, w: "Domain verification doesn't provide device compliance." },
 { t: "Group-based licensing", c: false, w: "Licensing isn't a device-compliance signal." } ] },
{ s: "Stale device objects accumulate in Entra after laptops are retired.", e: "Security wants to reduce attack surface", q: "Best practice?", options: [
 { t: "Disable/remove stale device objects through their lifecycle", c: true, w: "Cleaning up stale/lost device identities shrinks attack surface, like managing user accounts." },
 { t: "Leave all device objects forever", c: false, w: "Stale devices are unnecessary risk and clutter." },
 { t: "Convert them to user accounts", c: false, w: "Devices aren't users; conversion isn't a thing." },
 { t: "Give them Global Admin", c: false, w: "Absurd and dangerous for device objects." } ] },
{ s: "A domain shows 'unverified' in Entra after being added.", e: "Users can't get UPNs on it yet", q: "What resolves it?", options: [
 { t: "Publish the provided DNS record and let Entra verify ownership", c: true, w: "Adding the TXT/MX record Entra supplies proves ownership and completes verification." },
 { t: "Wait a year and it verifies itself", c: false, w: "Verification requires the DNS record; it won't self-complete." },
 { t: "Delete and recreate the tenant", c: false, w: "Unnecessary; publish the verification record." },
 { t: "Assign more licenses", c: false, w: "Licensing doesn't verify domain ownership." } ] },
{ s: "Windows Hello for Business passwordless sign-in is being planned.", e: "It binds credentials to the device", q: "Why does device identity matter here?", options: [
 { t: "Passwordless (Windows Hello) binds to the device, so device identity underpins it and enables device-based CA", c: true, w: "Device identity is foundational to passwordless and to device-based Conditional Access." },
 { t: "Device identity is irrelevant to passwordless", c: false, w: "Windows Hello for Business is tied to the device's identity." },
 { t: "Passwordless requires deleting all devices", c: false, w: "It requires managed device identities, not deletion." },
 { t: "Only guests can use Windows Hello", c: false, w: "It's for the organization's users on their devices, not guests." } ] } ],
},
pbqs: [
{ type: "order", s: "An admin must onboard a new custom domain and start issuing branded identities.", task: "Order the steps to use contoso.com for user sign-ins:",
 steps: ["Add the custom domain in Entra ID", "Publish the provided DNS TXT/MX record", "Entra verifies domain ownership", "Set the verified domain on user UPNs", "Users sign in with @contoso.com identities"],
 x: "You add the domain, prove ownership via DNS, let Entra verify, then assign the domain to UPNs before users can sign in with branded identities." },
{ type: "order", s: "Delegating regional helpdesk without tenant-wide power.", task: "Order the steps to scope EU password resets to the EU helpdesk:",
 steps: ["Create an administrative unit for the EU", "Add EU users to the administrative unit", "Assign Helpdesk Administrator scoped to that AU", "EU helpdesk resets passwords only for EU users"],
 x: "Create the AU, populate it, scope the role to the AU, and the delegated admins gain authority only over that subset." },
{ type: "order", s: "Automating licensing for a whole department at scale.", task: "Order the steps for hands-off department licensing:",
 steps: ["Create a dynamic group with a department-based rule", "Verify members auto-populate from attributes", "Apply group-based licensing to the group", "New/changed department members inherit licenses automatically"],
 x: "Build the dynamic group, confirm it populates by attribute, attach group-based licensing, and membership plus licensing then self-maintain." },
{ type: "match", s: "Match each hybrid authentication method to its defining behavior.", task: "Assign every method:",
 cats: ["PHS", "PTA", "Federation (AD FS)"],
 items: [
  { t: "Cloud validates sign-in using a synced credential hash", c: "PHS" },
  { t: "Password validated live against on-prem AD via an agent, no hash in cloud", c: "PTA" },
  { t: "Authentication handed to an external on-prem identity provider", c: "Federation (AD FS)" },
  { t: "Required for leaked-credential detection", c: "PHS" },
  { t: "Most infrastructure and complexity to maintain", c: "Federation (AD FS)" } ],
 x: "PHS syncs the hash so the cloud validates (and enables leaked-credential detection); PTA validates on-prem live with no stored hash; federation delegates auth to an external IdP with the most complexity." },
{ type: "match", s: "Match each device state to the correct scenario.", task: "Assign every device state:",
 cats: ["Entra registered", "Entra joined", "Hybrid Entra joined"],
 items: [
  { t: "Personal BYOD phone associated with a user for CA", c: "Entra registered" },
  { t: "Org-owned laptop, fully cloud-managed, no on-prem AD", c: "Entra joined" },
  { t: "Org PC tied to on-prem AD/GPO plus Entra for cloud features", c: "Hybrid Entra joined" },
  { t: "User-owned tablet needing conditional access without full management", c: "Entra registered" },
  { t: "Corporate device in a fully cloud-only organization", c: "Entra joined" } ],
 x: "Registered = personal/BYOD; joined = org-owned cloud-only; hybrid joined = org-owned with on-prem AD and Entra together." },
{ type: "match", s: "Match each identity object to how it's managed.", task: "Assign every case:",
 cats: ["Managed in cloud", "Managed on-premises", "Managed at partner tenant"],
 items: [
  { t: "A cloud-only user's attributes", c: "Managed in cloud" },
  { t: "A synchronized user's department attribute", c: "Managed on-premises" },
  { t: "A B2B guest's password and identity lifecycle", c: "Managed at partner tenant" },
  { t: "A synced user's password (with PTA)", c: "Managed on-premises" },
  { t: "A guest's home-tenant MFA registration", c: "Managed at partner tenant" } ],
 x: "Cloud-only objects are edited in Entra; synced objects are mastered on-prem; B2B guests' credentials and lifecycle stay at their home tenant." },
{ type: "multi", s: "You must minimize the risk from Global Administrator accounts.", e: "Tenant currently has many standing Global Admins used daily.", q: "Select ALL recommended practices:",
 options: [
  { t: "Reduce the number of Global Administrators", c: true, w: "Fewer highly privileged accounts shrinks the attack surface." },
  { t: "Require phishing-resistant MFA on admin accounts", c: true, w: "Strong MFA protects the crown-jewel identities." },
  { t: "Use PIM for just-in-time, time-bound activation", c: true, w: "JIT activation removes standing privilege." },
  { t: "Maintain a cloud-only break-glass account excluded from CA", c: true, w: "Emergency access prevents lockout from a bad policy." },
  { t: "Use Global Admin accounts as everyday user accounts", c: false, w: "Daily-driver Global Admins are exactly the risk to eliminate." } ],
 x: "Protect Global Admins with fewer accounts, strong MFA, JIT via PIM, and a break-glass account — never use them as daily identities." },
{ type: "multi", s: "A partner-collaboration setup must be secure and correctly scoped.", e: "External partners need access to specific resources only.", q: "Select ALL correct B2B/cross-tenant practices:",
 options: [
  { t: "Invite partners as B2B guests using their home identity", c: true, w: "B2B guests authenticate at their home tenant." },
  { t: "Use cross-tenant access settings to trust the partner's MFA claims", c: true, w: "Trusting inbound MFA avoids redundant prompts for verified guests." },
  { t: "Restrict guest directory permissions to limit recon", c: true, w: "Tighter guest visibility reduces enumeration risk." },
  { t: "Allowlist only the approved partner domains for invitations", c: true, w: "Domain allowlisting scopes who can be invited." },
  { t: "Create local passworded accounts for each partner user", c: false, w: "That defeats B2B; guests use their own home credentials." } ],
 x: "Secure B2B = invite guests on their home identity, trust MFA via cross-tenant settings, restrict guest visibility, and allowlist partner domains." },
{ type: "multi", s: "A synchronized user's details need changes and troubleshooting.", e: "User is mastered on-premises via Entra Connect.", q: "Select ALL true statements:",
 options: [
  { t: "Synced attributes are edited in on-prem AD, not the cloud", c: true, w: "On-prem AD is the source of truth for synced attributes." },
  { t: "PHS is required for leaked-credential detection on this user", c: true, w: "Identity Protection's leaked-credential detection needs PHS." },
  { t: "Password writeback is needed for cloud SSPR to reset the on-prem password", c: true, w: "Writeback flows cloud resets down to on-prem AD." },
  { t: "OU filtering can cause the user to be missing from the cloud", c: true, w: "Sync scope/OU filtering determines which objects appear." },
  { t: "You can freely edit the synced department field in the cloud", c: false, w: "Synced attributes are greyed out in the cloud; edit them on-prem." } ],
 x: "For synced users: master on-prem, PHS enables leaked-cred detection, writeback enables SSPR to on-prem, and OU filtering governs what syncs." },
{ type: "multi", s: "Design group membership and licensing that self-maintains.", e: "Goal: as staff join/move/leave a department, access and licenses adjust automatically.", q: "Select ALL correct choices:",
 options: [
  { t: "Use a dynamic membership group with an attribute-based rule", c: true, w: "Dynamic membership auto-adjusts as attributes change." },
  { t: "Apply group-based licensing to that group", c: true, w: "Members inherit/lose licenses automatically with membership." },
  { t: "Ensure enough available licenses and no service-plan conflicts", c: true, w: "Otherwise members hit licensing errors." },
  { t: "Confirm Entra ID P1 is available for dynamic membership", c: true, w: "Dynamic groups require P1 licensing." },
  { t: "Manually add and license each new hire", c: false, w: "Manual work defeats the self-maintaining design." } ],
 x: "Dynamic group + group-based licensing (with enough licenses and P1) makes membership and licensing self-manage; manual assignment is the anti-pattern." },
],
boss: {
 title: "Operation False Faces: Rentwhistle Swack's Forgeries",
 brief: "Rentwhistle Swack, the con man of the cosmos, is minting counterfeit identities all through Star Command's Entra tenant — over-privileged admins, rogue guests, unverified domains, and forged on-prem syncs. You hold the Entra admin center and five decisions. Scope tight, verify everything, and his fakes fall apart.",
 win: "Every forged badge Swack planted is revoked, scoped, or exposed — least privilege enforced, guests properly trusted, domains verified, sync locked to its rightful master. The con man is hauled off in cuffs. Domain mission cleared.",
 lose: "Swack found a gap — an over-scoped admin, an unverified domain, a mis-trusted guest — and slipped a forgery through. Review where you granted too much or verified too little, and deploy again.",
 stages: [
 { sit: "Swack's first move: he's tricked the EU helpdesk into requesting Global Admin 'to reset EU passwords faster.' The ticket is on your desk.",
  e: "Request: Global Administrator for 6 EU helpdesk staff\nActual need: reset passwords for EU users only\nSwack's angle: over-privilege he can later hijack",
  options: [
  { t: "Deny Global Admin; create an EU administrative unit and assign Helpdesk Administrator scoped to it", d: 0, r: 4, ev: 0, ql: "best", w: "Least privilege plus AU scoping grants exactly the EU password-reset authority needed — nothing Swack can escalate." },
  { t: "Grant the six Global Administrator to speed things up", d: 20, r: -6, ev: 0, ql: "bad", w: "Six new standing Global Admins is precisely the over-privileged foothold Swack is fishing for." },
  { t: "Give them tenant-wide User Administrator instead", d: 10, r: -3, ev: 0, ql: "ok", w: "Better than Global Admin, but still tenant-wide when an AU-scoped Helpdesk role is the least-privilege fit." } ]},
 { sit: "A 'partner' Swack vouches for wants in. His request: create local passworded accounts for 40 of his people, and open guest directory access wide 'for convenience.'",
  e: "Legit partner exists, but Swack pads the list\nAsk: 40 local passworded accounts + full guest directory visibility\nProper model: B2B with scoped visibility",
  options: [
  { t: "Invite verified partners as B2B guests on their home identity, allowlist the partner domain, and restrict guest directory permissions", d: 0, r: 3, ev: 2, ql: "best", w: "B2B keeps credential lifecycle at the partner, domain allowlisting scopes who's invited, and restricted visibility blocks Swack's recon." },
  { t: "Create 40 local passworded accounts as requested", d: 16, r: -5, ev: 0, ql: "bad", w: "Local accounts you control the passwords for is the opposite of B2B — and 40 unvetted identities is Swack's dream." },
  { t: "Invite them as B2B guests but leave guest directory access wide open", d: 8, r: -2, ev: 0, ql: "ok", w: "B2B is right, but wide-open guest visibility hands Swack directory reconnaissance." } ]},
 { sit: "Swack registered a lookalike domain and is pushing you to issue @contoso-star.com identities from it immediately, skipping verification 'to save time.'",
  e: "Domain contoso-star.com added but UNVERIFIED\nSwack urges: assign UPNs now, verify later\nRisk: unverified domain = unproven ownership",
  options: [
  { t: "Refuse to issue UPNs until the domain is verified via its DNS record", d: 0, r: 3, ev: 1, ql: "best", w: "Domain verification via DNS proves ownership; issuing identities on an unverified domain is exactly the shortcut Swack exploits." },
  { t: "Assign the UPNs now and verify whenever", d: 14, r: -4, ev: 0, ql: "bad", w: "Entra won't even allow branded UPNs on an unverified domain — and rushing verification is how forged domains slip in." },
  { t: "Delete the tenant and start over", d: 10, r: -3, ev: 0, ql: "ok", w: "Wildly disproportionate; just verify the domain via DNS." } ]},
 { sit: "Swack tampered with a synced user's record in the cloud to grant himself an alias — but the field won't save. He's now demanding you 'force' the cloud edit.",
  e: "User is on-prem-mastered via Entra Connect\nCloud attribute edit greyed out (expected)\nSwack: 'override it in the cloud'",
  options: [
  { t: "Recognize on-prem AD is the master; make legitimate changes there and let them sync — refuse the forced cloud override", d: 0, r: 3, ev: 2, ql: "best", w: "Synced attributes are mastered on-prem; honoring the sync boundary is exactly what defeats Swack's cloud-side forgery." },
  { t: "Find a workaround to force the edit in the cloud", d: 16, r: -5, ev: 0, ql: "bad", w: "Bypassing the sync master is how Swack's alias would take hold — the greyed-out field is the control working." },
  { t: "Convert the user to cloud-only so you can edit it", d: 10, r: -3, ev: 0, ql: "ok", w: "Breaking the hybrid model to satisfy a suspicious request plays into Swack's hands." } ]},
 { sit: "Final gambit: guests keep getting MFA-prompted, so Swack 'helpfully' suggests disabling MFA tenant-wide and making all guests members to smooth things over.",
  e: "Legit partner guests re-prompted for MFA they did at home\nSwack's fix: disable MFA + promote all guests to members\nProper fix: trust partner MFA claims",
  options: [
  { t: "Configure cross-tenant access settings to trust the partner's MFA claims; keep MFA on and guests as guests", d: 0, r: 4, ev: 0, ql: "best", w: "Trusting inbound MFA claims removes redundant prompts without weakening security or over-granting — Swack's suggestion is refused." },
  { t: "Disable MFA tenant-wide to stop the prompts", d: 20, r: -6, ev: 0, ql: "bad", w: "Killing MFA everywhere is a catastrophic weakening — exactly the opening Swack wants." },
  { t: "Promote all guests to full members", d: 12, r: -4, ev: 0, ql: "ok", w: "Over-granting guest privileges to dodge a prompt expands Swack's access instead of fixing MFA trust." } ]},
 ],
},
};
