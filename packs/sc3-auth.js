/* CONTENT PACK: SC-300 | Implement Authentication & Access Management (sc3-auth) -- 40 MCQ + 10 PBQ + 5 briefings + boss */
window.PACKS = window.PACKS || {};
window.PACKS["sc3-auth"] = {
lessons: {
"sc3-auth-1": { intro: "Feara feeds on weak authentication -- every reused password is a meal. Starve her, Ranger, with strong methods that phishing can't touch.",
sections: [
{ h: "The authentication methods", b: "Entra ID supports many methods, and SC-300 expects you to know each: Microsoft Authenticator (push and passwordless phone sign-in), FIDO2 security keys / passkeys, Windows Hello for Business, certificate-based authentication (CBA), Temporary Access Pass (TAP), OATH hardware/software tokens, and (weaker) SMS/voice. You enable and scope methods in the Authentication methods policy, targeting specific users/groups." },
{ h: "Phishing-resistant methods", b: "The strongest methods are phishing-resistant because the credential is bound to the origin and can't be replayed: FIDO2 security keys/passkeys, Windows Hello for Business, and certificate-based authentication. These defeat adversary-in-the-middle attacks that steal passwords and even push-approved MFA. When a scenario demands protection against phishing/AiTM, the answer is a phishing-resistant method, not another push prompt.", data: "Phishing-resistant: FIDO2/passkeys | Windows Hello for Business | CBA\nPhishable: SMS, voice, and even Authenticator push (approve prompt)" },
{ h: "Temporary Access Pass (TAP)", b: "A TAP is a time-limited passcode an admin issues to a user for onboarding or recovery -- most importantly, to bootstrap passwordless: a new user with no credential yet uses the TAP to sign in and register a FIDO2 key or Authenticator. It's the standard answer for 'user needs to register a passwordless method but has nothing to sign in with yet,' and for recovering a user who lost their only method." },
{ h: "Authentication strengths", b: "Authentication strength is a Conditional Access control that specifies which method combinations are acceptable for a given scenario -- e.g., require the built-in 'Phishing-resistant MFA' strength for admins while allowing standard MFA elsewhere. This lets you mandate FIDO2/CBA/Windows Hello for sensitive access through a CA policy, tying the method directly to risk.", data: "CA policy: target admin roles -> Grant: require authentication strength = Phishing-resistant MFA\n-> only FIDO2 / Windows Hello / CBA satisfy it" },
],
traps: [
"For anti-phishing/AiTM scenarios, the answer is a phishing-resistant method (FIDO2/passkey, Windows Hello, CBA) -- Authenticator push and SMS are phishable.",
"TAP is the bootstrap for passwordless registration and lost-method recovery -- a time-limited pass, not a permanent credential.",
"Authentication strength (a CA grant control) is how you require specific strong methods per scenario; it's not set in the methods policy alone.",
"SMS/voice are the weakest MFA and shouldn't be the answer when stronger methods are available." ],
keys: [
"Know all methods: Authenticator, FIDO2/passkeys, Windows Hello, CBA, TAP, OATH, SMS/voice.",
"Phishing-resistant = FIDO2/passkeys, Windows Hello for Business, CBA.",
"TAP bootstraps passwordless registration and recovers lost methods.",
"Authentication strengths (CA control) mandate specific strong methods per scenario." ] },

"sc3-auth-2": { intro: "Feara loves a forgotten password and a helpdesk queue a mile long. Self-service reset and password protection cut off her feast at the source.",
sections: [
{ h: "Self-Service Password Reset (SSPR)", b: "SSPR lets users reset or unlock their own accounts without the helpdesk, using registered methods (Authenticator, email, phone/SMS, security questions). You configure who it's enabled for, how many methods are required, and which methods are allowed. It reduces helpdesk load and empowers users -- a core SC-300 deployment task.", data: "SSPR config: enabled for (none/selected/all) -> number of methods required (1 or 2)\n-> allowed methods (Authenticator, email, mobile phone, security questions)" },
{ h: "SSPR and password writeback for hybrid", b: "For a synced (on-prem-mastered) user, SSPR can only change the on-premises password if password writeback is enabled in Entra Connect -- otherwise the cloud reset won't propagate down and the user's on-prem password stays unchanged. Writeback also enables self-service unlock of on-prem accounts. Writeback requires Entra ID P1." },
{ h: "Password protection: banned passwords and smart lockout", b: "Entra Password Protection blocks weak and common passwords via the global banned-password list plus a custom banned list you define (org-specific terms like the company name). Smart lockout distinguishes real users from attackers, locking out after failed attempts while tracking familiar vs unfamiliar sign-in patterns to resist brute force without punishing the legitimate user. These can extend on-prem via the Password Protection agent on domain controllers." },
{ h: "Registration campaigns and combined registration", b: "Combined security information registration lets users register MFA and SSPR methods in one experience. Registration campaigns can nudge users to set up more secure methods (like Authenticator) during sign-in. Getting users registered for strong methods is a prerequisite to enforcing MFA and passwordless -- the exam links registration to rollout success." },
],
traps: [
"SSPR resets a synced user's on-prem password only if password writeback is enabled -- without it, the cloud reset doesn't reach on-prem AD.",
"The custom banned-password list adds org-specific weak terms on top of the global list; both apply.",
"Smart lockout resists brute force while distinguishing familiar from unfamiliar locations -- it's not a blunt account-disable.",
"Users must be registered for methods before MFA/SSPR can be enforced; registration campaigns drive that adoption." ],
keys: [
"SSPR: users self-reset via registered methods; configure scope, method count, allowed methods.",
"Password writeback (P1) is required for SSPR to update on-prem passwords of synced users.",
"Password Protection: global + custom banned lists and smart lockout resist weak/guessed passwords.",
"Combined registration + campaigns get users onto strong methods before enforcement." ] },

"sc3-auth-3": { intro: "Conditional Access is the shield wall -- the Zero Trust engine that weighs every sign-in. Master it and Feara can't pass; misconfigure it and you lock out the whole fleet.",
sections: [
{ h: "The anatomy of a Conditional Access policy", b: "Every CA policy is an if-then: IF the assignments/conditions match, THEN apply the access controls. Three parts: Assignments (users/groups/roles, target resources/apps, and conditions), Conditions (sign-in risk, device platform, location, client app, device state), and Access Controls (Grant: block, or allow with requirements like MFA, compliant device, authentication strength; Session: sign-in frequency, persistent browser, app-enforced restrictions). CA requires Entra ID P1; risk-based conditions require P2.", data: "IF user in 'Admins' AND app = Azure Management AND location = untrusted\nTHEN Grant: require phishing-resistant MFA + compliant device" },
{ h: "Grant vs session controls", b: "Grant controls decide whether access is allowed and under what requirement: block, require MFA, require compliant device, require hybrid-joined device, require approved app, require authentication strength, or require terms of use. When multiple grant controls are selected you choose 'require all' or 'require one.' Session controls shape the session after grant: sign-in frequency (reauth interval), persistent browser session, app-enforced restrictions, and Conditional Access App Control (via Defender for Cloud Apps)." },
{ h: "Named locations, device conditions, and common patterns", b: "Named locations define trusted IP ranges or countries used in conditions (e.g., block sign-ins from outside allowed countries; require MFA from untrusted locations). 'Require compliant device' needs the device Intune-enrolled and marked compliant -- Entra-joined alone doesn't satisfy it. Classic policies: require MFA for all users, require phishing-resistant MFA for admins, block legacy authentication, require compliant device for sensitive apps.", data: "Common trap: 'Require compliant device' fails for an Entra-joined but NOT Intune-compliant device -- Entra join alone != compliant" },
{ h: "Safe deployment: report-only, What If, and break-glass", b: "Deploy CA safely: start policies in Report-only mode to see impact without enforcing, use the What If tool to simulate which policies apply to a given user/app/location, and check sign-in logs' Conditional Access tab to see which policies applied and why access failed. Critically, ALWAYS exclude at least one cloud-only break-glass account from all CA policies so a misconfiguration can't lock out every admin. Also know Continuous Access Evaluation (near-real-time revocation), authentication context (CA on specific actions/data), and protected actions (CA gating high-risk operations)." },
],
traps: [
"'Require compliant device' needs Intune enrollment + compliance -- an Entra-joined-only device does NOT satisfy it (a very common exam scenario).",
"Always exclude a break-glass account from all CA policies; a misconfigured policy otherwise locks out every admin.",
"Use Report-only mode and the What If tool to validate before enforcing; the sign-in logs' CA tab explains why a user was blocked.",
"CA needs P1; risk-based (sign-in/user risk) conditions need P2 -- know which features require which license." ],
keys: [
"CA = if (assignments/conditions) then (grant/session controls); needs P1 (P2 for risk).",
"Grant: block / MFA / compliant / hybrid-joined / approved app / auth strength; require all-or-one.",
"Session: sign-in frequency, persistent browser, app-enforced, CA App Control.",
"Deploy safely: report-only, What If, sign-in logs, and ALWAYS a break-glass exclusion." ] },

"sc3-auth-4": { intro: "Feara hunts leaked and impossible logins -- the risky sign-ins that scream compromise. Identity Protection turns that hunt against her, automatically.",
sections: [
{ h: "Identity Protection: user risk vs sign-in risk", b: "Microsoft Entra ID Protection (P2) detects risk in two dimensions. Sign-in risk is the probability THIS authentication isn't the legitimate user (anonymous IP, atypical/impossible travel, malware-linked IP, unfamiliar sign-in properties). User risk is the probability the account itself is compromised (leaked credentials found in a dump, or accumulated risky activity). Know which detections feed which risk type.", data: "Sign-in risk: impossible travel, anonymous IP (Tor), unfamiliar properties, malware IP\nUser risk: leaked credentials, Microsoft threat-intel on the account" },
{ h: "Risk policies and remediation controls", b: "You respond to risk via risk-based Conditional Access (recommended) or the legacy Identity Protection policies: a sign-in risk policy (e.g., require MFA when sign-in risk is medium+), and a user risk policy (e.g., require a secure password change when user risk is high). Self-remediation lets the user clear low/medium risk by completing MFA or a password reset, closing the loop automatically.", data: "Sign-in risk >= medium -> require MFA\nUser risk = high -> require secure password change (self-remediation)" },
{ h: "Investigating risky users and risky sign-ins", b: "The Risky users and Risky sign-ins reports let you investigate and act: confirm compromised (raises risk, triggers remediation), confirm safe / dismiss (lowers risk), or reset password and revoke sessions. Leaked-credential detection requires Password Hash Sync for synced users. Admin confirmation feeds Microsoft's ML to improve future detection." },
{ h: "Risky workload identities", b: "ID Protection also detects risky workload identities (service principals/apps) -- leaked credentials, anomalous sign-ins, or suspicious activity by an app identity. You can apply Conditional Access for workload identities to block or restrict a risky service principal. This extends risk-based protection beyond humans to the non-human identities apps use." },
],
traps: [
"Distinguish sign-in risk (is THIS sign-in the real user) from user risk (is the ACCOUNT compromised) -- detections map to one or the other; leaked credentials = user risk.",
"Leaked-credential detection requires PHS for synced users (federation/PTA alone won't feed it).",
"Risk-based Conditional Access is the modern way to enforce risk responses; the legacy ID Protection user/sign-in risk policies are the alternative -- both are P2.",
"ID Protection covers risky workload identities too, remediated via Conditional Access for workload identities." ],
keys: [
"Sign-in risk = this authentication; user risk = the account (leaked creds).",
"Respond via risk-based CA (or legacy risk policies); enable self-remediation.",
"Investigate Risky users/sign-ins: confirm compromised/safe, reset + revoke.",
"ID Protection (P2) also flags risky workload identities -> CA for workload identities." ] },

"sc3-auth-5": { intro: "Feara probes the seams between roles and networks. Know Entra roles versus Azure RBAC, and how modern access reaches even legacy apps, and she finds no gap.",
sections: [
{ h: "Entra roles vs Azure RBAC", b: "Two different permission systems: Microsoft Entra roles (directory roles like Global Administrator, User Administrator) control the Entra directory and Microsoft 365. Azure RBAC roles (Owner, Contributor, Reader) control Azure resources (subscriptions, resource groups, VMs). Global Administrator can elevate to manage Azure subscriptions, but the two role systems are distinct in scope. Match the role system to what's being managed.", data: "Entra roles -> directory & M365 (Global Admin, User Admin, ...)\nAzure RBAC -> Azure resources (Owner, Contributor, Reader) at mgmt group/sub/RG/resource scope" },
{ h: "Authentication vs authorization", b: "Authentication (AuthN) proves who you are (the sign-in, MFA, methods). Authorization (AuthZ) decides what you're allowed to do (roles, permissions, Conditional Access grant). Conditional Access sits at the boundary -- after authentication, it authorizes access under conditions. Keeping the concepts straight helps place features: methods/MFA are AuthN; roles/RBAC/CA grants are AuthZ." },
{ h: "Global Secure Access (SSE) and legacy apps", b: "Global Secure Access is Microsoft's Security Service Edge: Entra Private Access (a VPN-replacement that reaches private/on-prem apps like RDP/SSH/SMB via a lightweight connector, without exposing the whole network) and Entra Internet Access (secure web/SaaS access). Crucially, it lets you apply Conditional Access to legacy on-prem and non-modern-auth apps that couldn't use CA before -- extending Zero Trust to the network layer." },
{ h: "Blocking legacy authentication", b: "Legacy authentication protocols (older mail/Office clients that can't do MFA) are a top attack vector because they bypass MFA. A core hardening step is a Conditional Access policy to block legacy authentication tenant-wide. Combined with Global Secure Access for reaching legacy apps securely and phishing-resistant MFA for modern ones, you close the seams Feara probes." },
],
traps: [
"Entra roles (directory/M365) are not the same as Azure RBAC (Azure resources) -- pick the correct system for what's being managed.",
"Authentication proves identity; authorization grants access -- CA is an authorization gate applied after authentication.",
"Entra Private Access (Global Secure Access) is the VPN-replacement that also lets you apply Conditional Access to legacy on-prem apps.",
"Blocking legacy authentication via CA is essential because those protocols bypass MFA." ],
keys: [
"Entra roles = directory/M365; Azure RBAC = Azure resources -- distinct systems.",
"AuthN (who you are) vs AuthZ (what you can do); CA authorizes post-authentication.",
"Global Secure Access (SSE): Private Access (VPN replacement) + Internet Access; extends CA to legacy apps.",
"Block legacy authentication with CA -- it bypasses MFA." ] },
},
mcq: {
"sc3-auth-1": [
{ s: "Attackers are using adversary-in-the-middle phishing that captures passwords and approved push MFA.", e: "Goal: protect admins against AiTM/phishing", q: "Which method should admins use?", options: [
 { t: "Phishing-resistant methods: FIDO2 security keys/passkeys, Windows Hello for Business, or CBA", c: true, w: "These bind the credential to the origin and can't be replayed, defeating AiTM that steals passwords and push approvals." },
 { t: "Keep Microsoft Authenticator push approvals", c: false, w: "Push approvals are phishable via AiTM/fatigue -- not phishing-resistant." },
 { t: "Switch everyone to SMS codes", c: false, w: "SMS is the weakest MFA and is phishable/SIM-swappable." },
 { t: "Add security questions as a second factor", c: false, w: "Security questions are weak knowledge factors, easily phished or guessed." } ] },
{ s: "A new employee must register a passwordless method but has no existing credential to sign in with.", e: "Goal: bootstrap FIDO2/Authenticator registration", q: "What does the admin issue?", options: [
 { t: "A Temporary Access Pass (TAP)", c: true, w: "A TAP is a time-limited pass that lets a user with no credential sign in and register a passwordless method." },
 { t: "A permanent password they keep forever", c: false, w: "That reintroduces a password; TAP is the passwordless bootstrap." },
 { t: "An OATH hardware token as their only method", c: false, w: "That doesn't bootstrap FIDO2/passwordless registration the way TAP does." },
 { t: "Nothing -- they can register without signing in", c: false, w: "They need something to authenticate first; that's exactly what TAP provides." } ] },
{ s: "Admins must be forced to use only FIDO2, Windows Hello, or CBA for the Azure management portal.", e: "Standard MFA should remain acceptable elsewhere", q: "How do you enforce this?", options: [
 { t: "A Conditional Access policy requiring the 'Phishing-resistant MFA' authentication strength for admin access", c: true, w: "Authentication strength is the CA control that mandates specific strong method combinations per scenario." },
 { t: "Disable all MFA methods except FIDO2 tenant-wide", c: false, w: "That breaks standard MFA everywhere; authentication strength scopes it to the admin scenario." },
 { t: "Rely on per-user MFA settings", c: false, w: "Legacy per-user MFA can't require a specific phishing-resistant strength per app." },
 { t: "Ask admins to voluntarily use keys", c: false, w: "Voluntary use isn't enforcement; a CA authentication-strength policy enforces it." } ] },
{ s: "A user lost their only MFA method and is locked out before a trip.", e: "Need: recover access and re-register", q: "Best admin action?", options: [
 { t: "Issue a Temporary Access Pass so they can sign in and re-register methods", c: true, w: "TAP recovers a user who lost their method, letting them sign in and register a new one." },
 { t: "Permanently disable MFA for that user", c: false, w: "Removing MFA weakens the account; a TAP restores access securely." },
 { t: "Give them a shared admin account", c: false, w: "Shared accounts destroy accountability and are a security risk." },
 { t: "Do nothing until they return", c: false, w: "TAP solves this immediately; leaving them locked out is unnecessary." } ] },
{ s: "The team wants passwordless sign-in on shared kiosk-style Windows devices using tap-to-sign-in keys.", e: "Physical security keys preferred", q: "Which method fits?", options: [
 { t: "FIDO2 security keys (passkeys)", c: true, w: "FIDO2 keys provide portable, phishing-resistant passwordless sign-in ideal for shared devices." },
 { t: "SMS one-time codes", c: false, w: "SMS is phishable and not passwordless." },
 { t: "Security questions", c: false, w: "A weak knowledge factor, not passwordless or phishing-resistant." },
 { t: "Password + email OTP", c: false, w: "Still password-based, not the passwordless key approach requested." } ] },
{ s: "An admin enables authentication methods but users still can't use FIDO2.", e: "FIDO2 method not enabled/targeted in the Authentication methods policy", q: "What's the fix?", options: [
 { t: "Enable the FIDO2 method in the Authentication methods policy and target the users/groups", c: true, w: "Methods must be enabled and scoped to users in the Authentication methods policy before they can be used." },
 { t: "Buy more licenses only", c: false, w: "The blocker is the method not being enabled/targeted, not licensing." },
 { t: "Disable Conditional Access", c: false, w: "CA isn't what enables a method; the methods policy does." },
 { t: "Reset the tenant", c: false, w: "Unnecessary; just enable and target the method." } ] },
{ s: "A scenario ranks methods by phishing resistance for a design doc.", e: "Methods: SMS, Authenticator push, FIDO2 key", q: "Correct ordering (most to least phishing-resistant)?", options: [
 { t: "FIDO2 key > Authenticator push > SMS", c: true, w: "FIDO2 is phishing-resistant; push is phishable via fatigue/AiTM; SMS is the weakest." },
 { t: "SMS > FIDO2 > push", c: false, w: "SMS is the weakest, not the strongest." },
 { t: "Push > FIDO2 > SMS", c: false, w: "FIDO2 is stronger than push." },
 { t: "They're all equally secure", c: false, w: "They differ substantially in phishing resistance." } ] },
{ s: "Certificate-based authentication is being considered for a high-security agency.", e: "Requirement: phishing-resistant, PKI already in place", q: "Why is CBA a fit?", options: [
 { t: "CBA is phishing-resistant and leverages existing PKI certificates for direct Entra authentication", c: true, w: "CBA authenticates with X.509 certificates against Entra, providing phishing-resistant sign-in for PKI environments." },
 { t: "CBA is just SMS with extra steps", c: false, w: "CBA is certificate-based and phishing-resistant, unlike SMS." },
 { t: "CBA requires no credentials at all", c: false, w: "It uses certificates as the credential; it's not credential-free." },
 { t: "CBA is the weakest available method", c: false, w: "It's among the phishing-resistant methods, not the weakest." } ] } ],

"sc3-auth-2": [
{ s: "Synced users can reset cloud passwords via SSPR, but their on-prem passwords never change.", e: "Users are mastered in on-prem AD via Entra Connect", q: "What must be enabled?", options: [
 { t: "Password writeback in Entra Connect", c: true, w: "Writeback propagates cloud SSPR resets down to on-prem AD for synced users." },
 { t: "Security defaults", c: false, w: "That's an MFA baseline, unrelated to writeback." },
 { t: "A new custom domain", c: false, w: "Domain verification doesn't affect writeback." },
 { t: "FIDO2 keys", c: false, w: "Auth method choice doesn't propagate password changes to on-prem." } ] },
{ s: "Security wants to block users from setting passwords containing the company name and product names.", e: "Goal: org-specific weak-term blocking", q: "Which feature?", options: [
 { t: "A custom banned-password list in Entra Password Protection", c: true, w: "The custom banned list adds org-specific terms on top of the global banned list." },
 { t: "Smart lockout", c: false, w: "Smart lockout resists brute force; it doesn't ban specific terms." },
 { t: "Conditional Access", c: false, w: "CA governs access conditions, not banned password terms." },
 { t: "SSPR method count", c: false, w: "That controls reset methods, not banned words." } ] },
{ s: "An account faces repeated failed sign-ins from unfamiliar locations.", e: "Goal: resist brute force without locking out the real user", q: "Which protection applies?", options: [
 { t: "Smart lockout -- locks out attackers while distinguishing familiar vs unfamiliar sign-in patterns", c: true, w: "Smart lockout resists brute force and avoids punishing the legitimate user by tracking known patterns." },
 { t: "Disabling the account permanently after one failure", c: false, w: "That punishes the real user; smart lockout is the balanced control." },
 { t: "Removing all MFA", c: false, w: "That weakens security and doesn't address brute force." },
 { t: "A custom domain", c: false, w: "Unrelated to lockout behavior." } ] },
{ s: "SSPR should be rolled out, but many users haven't registered any reset methods.", e: "Enforcement fails without registered methods", q: "Best step to drive adoption?", options: [
 { t: "Use combined registration and a registration campaign to get users onto methods", c: true, w: "Combined registration plus campaigns drive method registration, a prerequisite to SSPR/MFA enforcement." },
 { t: "Enforce SSPR anyway and let users get locked out", c: false, w: "Enforcing before registration causes lockouts and support pain." },
 { t: "Disable SSPR entirely", c: false, w: "That abandons the goal; drive registration instead." },
 { t: "Give everyone the same security question", c: false, w: "Shared weak answers undermine security." } ] },
{ s: "An admin configures SSPR to require two methods before a reset.", e: "Goal: stronger self-service verification", q: "Where is this set?", options: [
 { t: "In the SSPR configuration -- number of methods required and allowed methods", c: true, w: "SSPR settings define scope, how many methods are required, and which methods are allowed." },
 { t: "In Azure RBAC", c: false, w: "RBAC governs Azure resources, not SSPR method count." },
 { t: "In the FIDO2 policy", c: false, w: "That's an authentication method, not SSPR reset configuration." },
 { t: "In named locations", c: false, w: "Named locations are for CA conditions, not SSPR." } ] },
{ s: "The global banned-password list already blocks common passwords.", e: "Question: does that cover org-specific terms?", q: "What's true about banned lists?", options: [
 { t: "The global list blocks common weak passwords; a custom list adds your org-specific terms -- both apply", c: true, w: "Global plus custom banned lists work together to block weak and org-specific passwords." },
 { t: "The global list already includes your company name", c: false, w: "Org-specific terms need the custom list; the global list is generic." },
 { t: "You can only use one list, not both", c: false, w: "Both the global and custom lists apply together." },
 { t: "Banned lists don't exist in Entra", c: false, w: "Entra Password Protection provides them." } ] },
{ s: "On-prem Active Directory should also enforce Entra's banned-password protection.", e: "Goal: extend password protection to domain controllers", q: "How?", options: [
 { t: "Deploy the Entra Password Protection agent (proxy + DC agent) on-premises", c: true, w: "The Password Protection agents extend banned-password enforcement to on-prem AD domain controllers." },
 { t: "It's automatic with no components", c: false, w: "On-prem enforcement requires the Password Protection agents." },
 { t: "Only cloud passwords can ever be protected", c: false, w: "The agent brings protection to on-prem AD too." },
 { t: "Use Conditional Access on the DCs", c: false, w: "CA doesn't run on domain controllers for password filtering." } ] },
{ s: "A user is synced from on-prem and needs full self-service unlock of their on-prem account.", e: "Requirement includes account unlock, not just reset", q: "What enables on-prem self-service unlock?", options: [
 { t: "Password writeback (P1), which also enables self-service account unlock on-prem", c: true, w: "Writeback supports both on-prem password reset and self-service unlock for synced users." },
 { t: "Security questions alone", c: false, w: "The method doesn't propagate unlock to on-prem without writeback." },
 { t: "A second tenant", c: false, w: "Irrelevant to on-prem unlock." },
 { t: "Disabling SSPR", c: false, w: "That removes the capability entirely." } ] } ],

"sc3-auth-3": [
{ s: "A user can't reach a SaaS app after a new CA policy requiring a compliant device.", e: "Device is Entra-joined but NOT Intune-enrolled/compliant", q: "Most likely cause?", options: [
 { t: "Entra join alone doesn't satisfy 'require compliant device' -- it needs Intune enrollment and a compliant state", c: true, w: "Compliant device requires Intune compliance evaluation; Entra-joined-only doesn't meet the grant control." },
 { t: "The user's password expired", c: false, w: "The scenario points to the compliant-device control, not password expiry." },
 { t: "CA doesn't apply to SaaS apps", c: false, w: "CA absolutely applies to cloud/SaaS apps." },
 { t: "The tenant lacks any licenses", c: false, w: "The specific cause is the non-compliant device, not licensing." } ] },
{ s: "You must simulate whether a CA policy will apply to a specific user, app, and location before enforcing.", e: "Goal: validate policy impact safely", q: "Which tool?", options: [
 { t: "The What If tool", c: true, w: "What If simulates which CA policies apply to a given user/app/location without enforcing them." },
 { t: "The recycle bin", c: false, w: "That's for deleted objects, not CA simulation." },
 { t: "Password writeback", c: false, w: "Unrelated to CA testing." },
 { t: "Smart lockout", c: false, w: "That's brute-force protection, not policy simulation." } ] },
{ s: "A team wants to see a new CA policy's impact on real sign-ins without blocking anyone yet.", e: "Goal: measure before enforcing", q: "Best approach?", options: [
 { t: "Set the policy to Report-only mode and review sign-in logs", c: true, w: "Report-only logs what the policy would do without enforcing, so you can validate impact safely." },
 { t: "Enable it in enforce mode immediately for everyone", c: false, w: "That risks locking users out before you understand the impact." },
 { t: "Delete all other policies first", c: false, w: "Unnecessary and destructive; report-only is the safe test." },
 { t: "Disable Conditional Access globally", c: false, w: "That removes protection instead of testing the policy." } ] },
{ s: "A CA rollout could accidentally lock out every Global Admin.", e: "Goal: guarantee recovery", q: "What must you configure?", options: [
 { t: "Exclude a cloud-only break-glass account from all CA policies", c: true, w: "A CA-excluded break-glass account ensures recovery if a policy misconfiguration locks out admins." },
 { t: "Give all users Global Admin", c: false, w: "A catastrophic security hole, not a safeguard." },
 { t: "Turn off MFA for admins", c: false, w: "That weakens the most powerful accounts." },
 { t: "Nothing; lockouts can't happen", c: false, w: "Misconfigured CA very much can lock out all admins -- hence break-glass." } ] },
{ s: "Sensitive finance apps should require MFA only when users connect from outside corporate IP ranges.", e: "Goal: location-based condition", q: "Which CA feature supports this?", options: [
 { t: "Named locations used as a CA condition (trusted IP ranges/countries)", c: true, w: "Named locations define trusted IPs/countries that CA conditions evaluate, e.g., require MFA from untrusted locations." },
 { t: "Group-based licensing", c: false, w: "Licensing isn't a location condition." },
 { t: "Password writeback", c: false, w: "Unrelated to location-based access." },
 { t: "SSPR method count", c: false, w: "That's reset config, not a CA location condition." } ] },
{ s: "A user reports being blocked; you need to see exactly which CA policy caused it and why.", e: "Goal: diagnose the block", q: "Where do you look?", options: [
 { t: "The sign-in logs' Conditional Access tab, which shows applied policies and failure reasons", c: true, w: "Sign-in logs detail which CA policies evaluated/applied and the specific reason access failed." },
 { t: "The Azure billing page", c: false, w: "Billing has nothing to do with CA diagnostics." },
 { t: "The custom banned-password list", c: false, w: "That's password protection, not CA diagnostics." },
 { t: "The recycle bin", c: false, w: "For deleted objects, not sign-in diagnostics." } ] },
{ s: "Two grant controls are selected in a policy: require MFA AND require compliant device.", e: "Admin set 'require all the selected controls'", q: "What must the user satisfy?", options: [
 { t: "Both MFA and a compliant device, because 'require all' was chosen", c: true, w: "'Require all' means every selected grant control must be met; 'require one' would need only one." },
 { t: "Only one of the two", c: false, w: "That would be 'require one'; the admin chose 'require all.'" },
 { t: "Neither; grant controls are optional", c: false, w: "Grant controls are enforced requirements, not optional." },
 { t: "Only whichever is easier", c: false, w: "'Require all' mandates both, not the easier one." } ] },
{ s: "The org wants near-real-time session revocation when a user's access is removed, plus CA on specific high-risk actions.", e: "Goal: modern session and action-level control", q: "Which capabilities apply?", options: [
 { t: "Continuous Access Evaluation for near-real-time revocation, and authentication context/protected actions for action-level CA", c: true, w: "CAE revokes access quickly; authentication context and protected actions apply CA to specific actions/operations." },
 { t: "Only sign-in frequency can do any of this", c: false, w: "Sign-in frequency sets reauth intervals but not real-time revocation or action-level CA." },
 { t: "Smart lockout", c: false, w: "That's brute-force protection, not session/action control." },
 { t: "Group-based licensing", c: false, w: "Unrelated to session or action-level control." } ] } ],

"sc3-auth-4": [
{ s: "A sign-in shows atypical travel from two countries minutes apart from an anonymous IP.", e: "Which risk dimension is this?", q: "Classify the risk:", options: [
 { t: "Sign-in risk -- signals that THIS authentication may not be the legitimate user", c: true, w: "Impossible travel and anonymous IP are sign-in risk detections about the specific authentication." },
 { t: "User risk", c: false, w: "User risk is about account compromise (e.g., leaked creds), not this sign-in's properties." },
 { t: "Licensing risk", c: false, w: "Not a risk category in ID Protection." },
 { t: "Device compliance risk", c: false, w: "Compliance isn't the ID Protection risk dimension here." } ] },
{ s: "Entra ID Protection flags an account because its credentials appeared in a breach dump.", e: "Which risk dimension is this?", q: "Classify the risk:", options: [
 { t: "User risk -- leaked credentials indicate the account itself may be compromised", c: true, w: "Leaked-credential detection is a user-risk signal about the account, not a single sign-in." },
 { t: "Sign-in risk", c: false, w: "Sign-in risk is about a specific authentication, not leaked credentials." },
 { t: "Network risk", c: false, w: "Not an ID Protection risk dimension." },
 { t: "There is no risk", c: false, w: "Leaked credentials are a serious user-risk signal." } ] },
{ s: "Policy should require MFA whenever sign-in risk is medium or higher.", e: "Goal: risk-responsive MFA", q: "Best implementation?", options: [
 { t: "A risk-based Conditional Access policy keyed to sign-in risk (P2)", c: true, w: "Risk-based CA enforces MFA when sign-in risk crosses a threshold; risk conditions require P2." },
 { t: "Security defaults", c: false, w: "Defaults can't key MFA to a sign-in-risk level." },
 { t: "A custom banned-password list", c: false, w: "That's password protection, not risk-based MFA." },
 { t: "Group-based licensing", c: false, w: "Unrelated to risk policies." } ] },
{ s: "When user risk is high, the account should be forced to change its password securely and self-remediate.", e: "Goal: automatic user-risk remediation", q: "Best control?", options: [
 { t: "A user-risk policy (via risk-based CA) requiring a secure password change, enabling self-remediation", c: true, w: "High user risk should trigger a secure password change that lets the user self-remediate and clear the risk." },
 { t: "Immediately delete the account", c: false, w: "Deletion is disproportionate; secure password change remediates." },
 { t: "Ignore it", c: false, w: "High user risk demands remediation." },
 { t: "Add the user to a dynamic group", c: false, w: "Group membership isn't risk remediation." } ] },
{ s: "Leaked-credential detection isn't firing for on-prem-synced users.", e: "Federation is in use; PHS is not enabled", q: "Why, and the fix?", options: [
 { t: "Leaked-credential detection needs Password Hash Sync; enable PHS for these synced users", c: true, w: "Without PHS, Entra can't compare against leaked-credential data for synced users." },
 { t: "It needs a custom domain", c: false, w: "Domain verification doesn't drive leaked-credential detection." },
 { t: "Turn off MFA to enable it", c: false, w: "MFA is unrelated to leaked-credential detection." },
 { t: "It only works for guests", c: false, w: "It works for members with PHS, not guests only." } ] },
{ s: "An analyst investigates the Risky users report and confirms an account is compromised.", e: "Goal: contain and remediate", q: "Appropriate actions?", options: [
 { t: "Confirm compromised, reset the password, and revoke the user's sessions", c: true, w: "Confirming compromise raises risk and triggers remediation; resetting and revoking sessions contains it." },
 { t: "Dismiss the risk without review", c: false, w: "Dismissing a truly compromised account leaves it exposed." },
 { t: "Only rename the account", c: false, w: "Renaming doesn't contain a compromise." },
 { t: "Give the account more privileges", c: false, w: "That worsens the exposure." } ] },
{ s: "A service principal (app identity) shows anomalous sign-ins and leaked credentials.", e: "Goal: protect non-human identities", q: "What capability applies?", options: [
 { t: "ID Protection risky workload identities, remediated via Conditional Access for workload identities", c: true, w: "ID Protection detects risky workload identities; CA for workload identities blocks/restricts a risky service principal." },
 { t: "SSPR for the app", c: false, w: "Apps don't self-reset passwords via SSPR." },
 { t: "Smart lockout only", c: false, w: "That's for user brute force, not workload-identity risk." },
 { t: "Nothing can protect app identities", c: false, w: "Workload identity protection exists precisely for this." } ] },
{ s: "The team debates legacy Identity Protection risk policies vs risk-based Conditional Access.", e: "Both can enforce risk responses", q: "Accurate statement?", options: [
 { t: "Risk-based CA is the modern approach; the legacy sign-in/user risk policies are the alternative -- both require P2", c: true, w: "You can enforce risk via risk-based CA (recommended) or the legacy ID Protection policies; both need Entra ID P2." },
 { t: "Risk policies are free with no license", c: false, w: "Risk-based enforcement requires Entra ID P2." },
 { t: "Only legacy policies can use risk", c: false, w: "Risk-based CA is the modern way to consume risk signals." },
 { t: "CA can never use risk signals", c: false, w: "Risk-based CA is built specifically to use risk signals." } ] } ],

"sc3-auth-5": [
{ s: "An admin needs to grant permission to manage Azure virtual machines in a resource group.", e: "This is about Azure resources, not the directory", q: "Which permission system?", options: [
 { t: "Azure RBAC (e.g., Contributor at the resource-group scope)", c: true, w: "Azure resources are governed by Azure RBAC roles scoped to management group/subscription/RG/resource." },
 { t: "An Entra directory role like User Administrator", c: false, w: "Entra roles govern the directory/M365, not Azure resource management." },
 { t: "SSPR", c: false, w: "Password reset is unrelated to Azure resource permissions." },
 { t: "A custom banned-password list", c: false, w: "Password protection, not resource authorization." } ] },
{ s: "A task requires managing users and groups in the Entra directory.", e: "This is directory administration, not Azure resources", q: "Which system?", options: [
 { t: "Microsoft Entra roles (directory roles like User Administrator)", c: true, w: "Directory/M365 administration uses Entra roles, distinct from Azure RBAC." },
 { t: "Azure RBAC Contributor", c: false, w: "That governs Azure resources, not directory objects." },
 { t: "FIDO2 policy", c: false, w: "An auth method, not a role system." },
 { t: "Named locations", c: false, w: "A CA condition, not a permission system." } ] },
{ s: "Users need to reach an internal on-prem web app (and RDP/SSH) without a full VPN, and CA should apply.", e: "Goal: VPN replacement + CA on legacy app", q: "Which capability fits?", options: [
 { t: "Entra Private Access (Global Secure Access) with a connector, extending Conditional Access to the on-prem app", c: true, w: "Private Access replaces VPN for private apps and lets you apply CA to legacy on-prem resources." },
 { t: "A custom banned-password list", c: false, w: "Password protection doesn't provide network access." },
 { t: "SSPR", c: false, w: "Password reset is unrelated to private app access." },
 { t: "Security questions", c: false, w: "A weak auth factor, not a network access solution." } ] },
{ s: "Older mail clients using legacy authentication are bypassing MFA.", e: "Goal: close the MFA-bypass vector", q: "Best action?", options: [
 { t: "Create a Conditional Access policy to block legacy authentication", c: true, w: "Blocking legacy auth via CA closes protocols that can't do MFA and are heavily abused." },
 { t: "Allow legacy auth but add SMS codes", c: false, w: "Legacy protocols can't enforce MFA; they must be blocked." },
 { t: "Ignore it", c: false, w: "Legacy auth is a top attack vector; it must be addressed." },
 { t: "Give those clients Global Admin", c: false, w: "Absurd and dangerous; block legacy auth instead." } ] },
{ s: "A colleague conflates authentication and authorization.", e: "They call MFA an 'authorization' step", q: "Correct clarification?", options: [
 { t: "MFA is authentication (proving identity); authorization decides what you can do (roles/RBAC/CA grants)", c: true, w: "AuthN proves who you are; AuthZ grants access -- CA authorizes after authentication." },
 { t: "MFA is authorization, they're right", c: false, w: "MFA verifies identity -- that's authentication, not authorization." },
 { t: "They mean the same thing", c: false, w: "They're distinct concepts on the exam." },
 { t: "Neither applies to Entra", c: false, w: "Both are core to Entra access." } ] },
{ s: "The org wants secure access to internet/SaaS with Entra-based controls at the network edge.", e: "Goal: SSE for web/SaaS traffic", q: "Which Global Secure Access component?", options: [
 { t: "Entra Internet Access (secure web/SaaS access)", c: true, w: "Internet Access is the Global Secure Access component for securing web and SaaS traffic." },
 { t: "Entra Private Access only", c: false, w: "Private Access covers private/on-prem apps; Internet Access covers web/SaaS." },
 { t: "SSPR", c: false, w: "Unrelated to network edge security." },
 { t: "OATH tokens", c: false, w: "An auth method, not an SSE component." } ] },
{ s: "A Global Administrator needs to also manage Azure subscriptions.", e: "Two role systems in play", q: "What's accurate?", options: [
 { t: "Entra roles and Azure RBAC are distinct; a Global Admin can elevate to manage Azure subscriptions but the systems remain separate", c: true, w: "The two permission systems are separate in scope; Global Admin can elevate access to Azure but they aren't the same as RBAC." },
 { t: "Global Admin automatically owns every Azure resource by default", c: false, w: "It requires the elevate-access step; the systems are distinct." },
 { t: "Azure RBAC and Entra roles are identical", c: false, w: "They govern different things (resources vs directory)." },
 { t: "Neither can manage Azure", c: false, w: "Azure RBAC (and elevated Global Admin) manage Azure resources." } ] },
{ s: "A design must apply Conditional Access to a legacy app that predates modern auth.", e: "The app can't natively use CA", q: "How is CA extended to it?", options: [
 { t: "Front it with Entra (e.g., Application Proxy or Global Secure Access/Private Access) so CA can apply", c: true, w: "Proxying legacy apps through Entra (App Proxy or Private Access) lets Conditional Access govern them." },
 { t: "CA can never protect legacy apps", c: false, w: "Fronting them with Entra brings CA to legacy apps." },
 { t: "Disable the app permanently", c: false, w: "The goal is to protect access, not remove the app." },
 { t: "Use a custom banned-password list", c: false, w: "Password protection doesn't apply CA to an app." } ] } ],
},
pbqs: [
{ type: "order", s: "A new employee must be onboarded straight to passwordless FIDO2 with no password.", task: "Order the passwordless onboarding steps:",
 steps: ["Enable the FIDO2 method in the Authentication methods policy", "Issue the user a Temporary Access Pass (TAP)", "User signs in with the TAP", "User registers a FIDO2 security key/passkey", "User authenticates passwordless with the key going forward"],
 x: "Enable the method, bootstrap sign-in with a TAP, register the FIDO2 key during that session, then the user goes fully passwordless." },
{ type: "order", s: "You must safely deploy a Conditional Access policy requiring MFA for all users.", task: "Order the safe CA deployment steps:",
 steps: ["Author the policy and exclude a break-glass account", "Set the policy to Report-only mode", "Use What If and review sign-in logs to assess impact", "Enable the policy in enforce mode for a pilot group", "Expand enforcement to all users"],
 x: "Exclude break-glass, test in report-only with What If and logs, pilot, then broaden -- the safe rollout pattern that avoids mass lockout." },
{ type: "order", s: "A risky sign-in is detected and must be handled.", task: "Order the risk response:",
 steps: ["Identity Protection flags elevated sign-in risk", "Risk-based Conditional Access requires MFA", "User completes MFA (self-remediation)", "Sign-in risk is reduced/closed", "Analyst reviews Risky sign-ins to confirm safe or compromised"],
 x: "Risk is detected, risk-based CA challenges with MFA, successful MFA self-remediates, and the analyst reviews to confirm the disposition." },
{ type: "match", s: "Match each authentication method to its phishing resistance.", task: "Classify each method:",
 cats: ["Phishing-resistant", "Phishable (MFA)", "Weakest"],
 items: [
  { t: "FIDO2 security key / passkey", c: "Phishing-resistant" },
  { t: "Windows Hello for Business", c: "Phishing-resistant" },
  { t: "Certificate-based authentication", c: "Phishing-resistant" },
  { t: "Microsoft Authenticator push approval", c: "Phishable (MFA)" },
  { t: "SMS text code", c: "Weakest" },
  { t: "Voice call verification", c: "Weakest" } ],
 x: "FIDO2, Windows Hello, and CBA are phishing-resistant; Authenticator push is MFA but phishable via AiTM/fatigue; SMS/voice are the weakest." },
{ type: "match", s: "Match each Conditional Access element to its category.", task: "Assign every item:",
 cats: ["Assignment", "Grant control", "Session control"],
 items: [
  { t: "Target users, groups, and roles", c: "Assignment" },
  { t: "Target cloud apps / resources", c: "Assignment" },
  { t: "Require MFA", c: "Grant control" },
  { t: "Require compliant device", c: "Grant control" },
  { t: "Sign-in frequency", c: "Session control" },
  { t: "Persistent browser session", c: "Session control" } ],
 x: "Assignments define who/what; grant controls decide allow/block and requirements; session controls shape the session after access is granted." },
{ type: "match", s: "Match each detection to its Identity Protection risk dimension.", task: "Classify each detection:",
 cats: ["Sign-in risk", "User risk"],
 items: [
  { t: "Impossible/atypical travel", c: "Sign-in risk" },
  { t: "Anonymous IP address (Tor)", c: "Sign-in risk" },
  { t: "Unfamiliar sign-in properties", c: "Sign-in risk" },
  { t: "Leaked credentials found in a dump", c: "User risk" },
  { t: "Malware-linked IP address", c: "Sign-in risk" },
  { t: "Microsoft threat intelligence on the account", c: "User risk" } ],
 x: "Sign-in risk is about a specific authentication (travel, anonymous IP, unfamiliar properties); user risk is about the account (leaked credentials, account-level threat intel)." },
{ type: "multi", s: "Admins must be forced onto phishing-resistant authentication for sensitive access.", e: "Standard MFA is fine for everyone else.", q: "Select ALL correct choices:",
 options: [
  { t: "Create a CA policy targeting admin roles", c: true, w: "Scope the requirement to privileged roles." },
  { t: "Require the 'Phishing-resistant MFA' authentication strength", c: true, w: "Authentication strength mandates FIDO2/Windows Hello/CBA." },
  { t: "Deploy FIDO2 keys or Windows Hello for Business to admins", c: true, w: "Admins need a phishing-resistant method to satisfy the policy." },
  { t: "Exclude a break-glass account from the policy", c: true, w: "Always keep an emergency account out of CA to avoid lockout." },
  { t: "Rely on SMS codes for admins", c: false, w: "SMS is phishable and won't satisfy phishing-resistant strength." } ],
 x: "Target admins, require phishing-resistant authentication strength, deploy FIDO2/Windows Hello, and keep a break-glass exclusion." },
{ type: "multi", s: "A CA policy requiring a compliant device is blocking a user unexpectedly.", e: "Device is Entra-joined but not Intune-enrolled.", q: "Select ALL true statements:",
 options: [
  { t: "'Require compliant device' needs Intune enrollment and a compliant state", c: true, w: "Compliance is evaluated by Intune, not implied by join." },
  { t: "Entra join alone does not satisfy the compliant-device control", c: true, w: "Joined != compliant." },
  { t: "Enrolling the device in Intune and meeting the compliance policy resolves it", c: true, w: "Compliance evaluation is the prerequisite." },
  { t: "The sign-in logs' CA tab will show the failure reason", c: true, w: "Sign-in logs reveal which control failed and why." },
  { t: "Deleting the CA policy is the only fix", c: false, w: "The fix is device compliance, not removing the policy." } ],
 x: "Compliant-device requires Intune compliance; Entra-join alone fails it; enroll to fix; and sign-in logs explain the block." },
{ type: "multi", s: "You are hardening authentication tenant-wide against modern attacks.", e: "Goals: stop MFA bypass and phishing, respond to risk.", q: "Select ALL recommended controls:",
 options: [
  { t: "Block legacy authentication via Conditional Access", c: true, w: "Legacy protocols bypass MFA and must be blocked." },
  { t: "Require phishing-resistant methods for privileged users", c: true, w: "Defeats AiTM/phishing on the highest-value accounts." },
  { t: "Use risk-based Conditional Access (P2) for sign-in/user risk", c: true, w: "Automates MFA/password-change responses to risk." },
  { t: "Enable password protection (banned lists + smart lockout)", c: true, w: "Blocks weak passwords and resists brute force." },
  { t: "Leave per-user legacy MFA enabled alongside CA MFA", c: false, w: "Conflicting per-user MFA and CA MFA causes confusing failures; retire per-user MFA." } ],
 x: "Block legacy auth, require phishing-resistant methods, use risk-based CA, and enable password protection -- while retiring conflicting per-user MFA." },
{ type: "multi", s: "Design safe, testable Conditional Access operations.", e: "Goal: avoid lockouts and diagnose issues.", q: "Select ALL correct practices:",
 options: [
  { t: "Always exclude a cloud-only break-glass account from CA", c: true, w: "Guarantees recovery from a bad policy." },
  { t: "Use Report-only mode before enforcing", c: true, w: "Measures impact without blocking users." },
  { t: "Use the What If tool to simulate policy application", c: true, w: "Predicts which policies apply to a user/app/location." },
  { t: "Check the sign-in logs' Conditional Access tab to diagnose blocks", c: true, w: "Shows applied policies and failure reasons." },
  { t: "Enforce new policies for all users immediately with no testing", c: false, w: "That risks mass lockout; test first." } ],
 x: "Break-glass exclusion, report-only, What If, and sign-in-log diagnosis are the safe-operations toolkit; never enforce untested." },
],
boss: {
 title: "Operation Nightmare Gate: Feara's Feast",
 brief: "Feara, the nightmare entity, gorges on every weak sign-in aboard Star Command -- reused passwords, phishable prompts, ungoverned risk. She's opened a nightmare gate through the authentication layer. You hold the Entra access controls and five decisions. Deploy strong methods and Conditional Access, and starve her out.",
 win: "Every seam Feara fed on is sealed -- phishing-resistant admins, risk-aware Conditional Access, blocked legacy auth, a break-glass line held open. The nightmare gate collapses. Domain mission cleared.",
 lose: "Feara found a weak sign-in you left exposed -- a phishable prompt, an untested policy, an open legacy protocol -- and feasted. Review where authentication was weak, and deploy again.",
 stages: [
 { sit: "Feara's first feast: an AiTM phishing kit is harvesting admin passwords AND their approved push MFA. Standard MFA isn't stopping her.",
  e: "Admins use Authenticator push (approve prompt)\nAiTM proxy captures password + relays the push approval\nGoal: protect privileged accounts",
  options: [
  { t: "Require phishing-resistant authentication strength (FIDO2/Windows Hello/CBA) for admins via Conditional Access", d: 0, r: 4, ev: 0, ql: "best", w: "Phishing-resistant methods bind to origin and can't be relayed -- the only real defense against AiTM that steals push approvals." },
  { t: "Send additional push prompts to be sure it's the real admin", d: 18, r: -5, ev: 0, ql: "bad", w: "More phishable prompts is more food for Feara -- push can be relayed or fatigue-approved." },
  { t: "Switch admins to SMS codes instead", d: 14, r: -4, ev: 0, ql: "bad", w: "SMS is the weakest, phishable and SIM-swappable -- a downgrade, not a defense." } ]},
 { sit: "A new batch of engineers must be onboarded to passwordless immediately -- but they have no credentials yet, and Feara is watching for any temporary weak password.",
  e: "Need: register FIDO2 keys with no existing sign-in credential\nFIDO2 method not yet enabled\nRisk: a temporary password would be a Feara target",
  options: [
  { t: "Enable FIDO2 in the methods policy, issue Temporary Access Passes, and have users register keys during the TAP session", d: 0, r: 3, ev: 2, ql: "best", w: "TAP is the passwordless bootstrap -- time-limited, no lasting password for Feara to feed on, straight to FIDO2." },
  { t: "Give each engineer a temporary reusable password to get started", d: 14, r: -4, ev: 0, ql: "bad", w: "A temporary reusable password is exactly the weak credential Feara hunts." },
  { t: "Let them register without any sign-in", d: 8, r: -2, ev: 0, ql: "ok", w: "They need something to authenticate first; without a TAP they can't register -- the enrollment stalls." } ]},
 { sit: "Feara exploits impossible-travel sign-ins and leaked credentials across the fleet. You need automatic, risk-aware defenses.",
  e: "Signals: impossible travel (sign-in risk), leaked credentials (user risk)\nEntra ID P2 available\nGoal: automated risk response",
  options: [
  { t: "Deploy risk-based Conditional Access: require MFA on medium+ sign-in risk and a secure password change on high user risk (self-remediation)", d: 0, r: 4, ev: 0, ql: "best", w: "Risk-based CA maps each risk dimension to the right automated response, letting users self-remediate and closing the risk." },
  { t: "Ignore the risk detections; they're probably noise", d: 18, r: -5, ev: 0, ql: "bad", w: "Impossible travel and leaked creds are exactly the compromise signals Feara rides -- ignoring them is a feast." },
  { t: "Block every flagged user permanently with no remediation path", d: 10, r: -3, ev: 0, ql: "ok", w: "Overly blunt -- self-remediation via MFA/password change contains risk without stranding legitimate users." } ]},
 { sit: "You roll out a tenant-wide MFA Conditional Access policy under pressure. Feara would love you to lock out every admin -- or leave a gap.",
  e: "New CA policy: require MFA for all users\nRisk: a misconfig could lock out all Global Admins\nPressure: 'just turn it on for everyone now'",
  options: [
  { t: "Exclude a cloud-only break-glass account, test in Report-only with What If, pilot, then enforce broadly", d: 0, r: 4, ev: 1, ql: "best", w: "Break-glass exclusion plus report-only/What If piloting is the safe rollout -- no lockout, no gap for Feara." },
  { t: "Enforce for everyone immediately with no exclusions or testing", d: 16, r: -5, ev: 0, ql: "bad", w: "A misconfig with no break-glass locks out every admin -- Feara's dream, and yours to recover from the hard way." },
  { t: "Skip the policy entirely to avoid any risk of lockout", d: 12, r: -4, ev: 0, ql: "bad", w: "No MFA policy leaves the whole tenant exposed -- the very weakness Feara feeds on." } ]},
 { sit: "Cornered, Feara retreats to the last seam: legacy mail protocols that bypass MFA, and a legacy on-prem app with no modern auth.",
  e: "Legacy auth (IMAP/POP) still enabled, bypassing MFA\nLegacy on-prem app can't natively use Conditional Access\nGoal: close both seams",
  options: [
  { t: "Block legacy authentication with CA, and front the on-prem app via Entra Private Access/App Proxy so Conditional Access applies", d: 0, r: 4, ev: 0, ql: "best", w: "Blocking legacy auth closes the MFA-bypass, and proxying the legacy app through Entra extends CA to it -- both seams sealed." },
  { t: "Leave legacy auth on but add a banned-password list", d: 14, r: -4, ev: 0, ql: "bad", w: "Legacy protocols can't enforce MFA at all; a password list doesn't close the bypass Feara uses." },
  { t: "Expose the on-prem app directly to the internet for convenience", d: 16, r: -5, ev: 0, ql: "bad", w: "Direct exposure with no CA is a wide-open gate -- the opposite of sealing the seam." } ]},
 ],
},
};
