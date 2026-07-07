/* CONTENT PACK: SC-300 - Plan & Implement Workload Identities (sc3-workload) - 40 MCQ + 10 PBQ + 5 briefings + boss */
window.PACKS = window.PACKS || {};
window.PACKS["sc3-workload"] = {
lessons: {
"sc3-workload-1": { intro: "Vartkes the Infiltrator hides among the crew as a fake worker with forged papers. Managed identities give your real Azure workloads badges that can never be stolen or forged.",
sections: [
{ h: "What a managed identity is", b: "A managed identity gives an Azure resource (a VM, App Service, Function, Logic App) an identity in Microsoft Entra so it can authenticate to services that support Entra authentication WITHOUT any credentials stored in code or config. Azure handles the credential rotation automatically. This is the answer whenever a workload running ON Azure needs to reach Key Vault, Storage, or a database and you want to eliminate secrets.", data: "App Service -> needs Key Vault access\nUse a managed identity -> no secret in code\nAzure rotates the credential automatically" },
{ h: "System-assigned vs user-assigned", b: "System-assigned managed identity is tied to a single Azure resource and shares its lifecycle -- created with the resource, deleted when the resource is deleted (1:1). User-assigned managed identity is a standalone Azure resource with its own lifecycle that can be assigned to MANY resources -- ideal when several workloads should share one identity, or the identity must outlive any single resource.", data: "System-assigned: 1:1, dies with the resource\nUser-assigned: standalone, reusable across many resources, independent lifecycle" },
{ h: "When to use which identity", b: "Prefer a managed identity over a service principal with a secret whenever the workload runs on Azure -- there is nothing to leak. Use system-assigned when one resource needs its own identity and you want automatic cleanup. Use user-assigned when multiple resources share access, or you want to pre-create and pre-authorize the identity before deploying the workload. Grant it Azure RBAC on the target resource, scoped least-privilege." },
{ h: "Why this beats stored credentials", b: "Secrets and connection strings in code are the classic leak: checked into repos, copied into logs, never rotated. A managed identity removes the secret entirely -- the token is issued to the resource at runtime by Azure. For workloads that can't use a managed identity (outside Azure), workload identity federation (covered later) is the next-best secretless option before falling back to a service principal secret." },
],
traps: [
"Managed identities are for workloads running ON Azure authenticating to Entra-protected services -- if the workload is on Azure, the answer is usually a managed identity, not a service principal with a secret.",
"System-assigned dies with its resource (1:1); user-assigned is standalone and reusable across many resources -- match the lifecycle requirement.",
"You still grant the managed identity Azure RBAC (least privilege) on the target resource; the identity alone doesn't imply access.",
"Managed identities remove stored secrets entirely -- 'store the secret more securely' is the wrong answer when a managed identity fits." ],
keys: [
"Managed identity = Azure resource identity, no stored secret, Azure rotates it.",
"System-assigned: 1:1 with the resource; user-assigned: standalone, shareable.",
"Prefer managed identity over a service-principal secret for on-Azure workloads.",
"Grant least-privilege Azure RBAC to the identity on the target resource." ] },

"sc3-workload-2": { intro: "Vartkes forges two documents for every alias -- one filed at headquarters, one carried on the ship. Learn the app object and its service principal, and his forgeries fall apart.",
sections: [
{ h: "App registration = application object", b: "Registering an application creates an application object -- a globally unique template that lives in the app's HOME tenant. It defines the app's identity: name, redirect URIs, credentials (client secrets or certificates), the APIs/permissions it requests, and any scopes/roles it exposes. There is exactly ONE application object per app, in its home tenant.", data: "App registration creates:\n- application object (home tenant, globally unique blueprint)\n- a service principal in the home tenant" },
{ h: "Service principal = the local instance", b: "A service principal is the LOCAL representation of an application in a specific tenant -- the concrete instance that defines what the app can actually do there (its permissions, role assignments, and whether users can sign in). A multi-tenant app has one application object (home tenant) but a service principal in EACH tenant where it's used. The 'Enterprise applications' blade shows service principals.", data: "1 application object (home) -> a service principal in every tenant that uses the app\nApp registrations blade = app objects | Enterprise applications blade = service principals" },
{ h: "Single-tenant vs multi-tenant, and credentials", b: "Single-tenant apps are usable only in the home tenant; multi-tenant apps can be provisioned into other tenants (each getting its own service principal via consent). App credentials are client secrets (a string, expires, riskier) or certificates (preferred, stronger). Best practice: prefer certificates over secrets, keep them rotated, and never embed a long-lived secret in client code." },
{ h: "Choosing the right workload identity", b: "Match the identity to the scenario: managed identity for on-Azure workloads (no secret); service principal for an app/automation that needs its own identity and permissions (especially off-Azure or across tenants); a user account is NOT a workload identity (don't use a human account for automation). Application permissions on a service principal let a daemon act with no signed-in user." },
],
traps: [
"The application object (App registrations) is the blueprint in the home tenant; the service principal (Enterprise applications) is the per-tenant instance -- don't confuse the two blades.",
"A multi-tenant app has ONE application object but a service principal in each tenant it's used in.",
"Prefer certificates over client secrets for app credentials; never embed a long-lived secret in client-side code.",
"A human user account is not a workload identity -- automation should use a managed identity or service principal." ],
keys: [
"App registration -> application object (home tenant) + a service principal.",
"Service principal = local per-tenant instance defining what the app can do.",
"Multi-tenant: one app object, a service principal per consuming tenant.",
"Prefer certificates over secrets; use MI/SP for workloads, never a human account." ] },

"sc3-workload-3": { intro: "Vartkes tries to smuggle whole crews aboard through unguarded gangways. Enterprise-app SSO and provisioning are the guarded, automated gates every real app must pass through.",
sections: [
{ h: "Enterprise applications and SSO", b: "Enterprise applications are the service principals for apps used in your tenant -- where you configure single sign-on, user/group assignment, provisioning, and Conditional Access. Gallery apps are pre-integrated templates (thousands of known SaaS apps); non-gallery apps are custom apps you integrate yourself. Assigning users/groups to an enterprise app controls who can access it." },
{ h: "SSO methods: SAML, OIDC, password-based", b: "Choose the SSO method the app supports. SAML-based SSO (SAML 2.0) federates with many enterprise SaaS apps. OIDC/OAuth SSO is used by modern apps registered with Entra. Password-based SSO is for apps with only a form login -- Entra securely stores and replays the credentials into the login page (no federation available). Linked SSO just points to an existing sign-in.", data: "App supports SAML -> SAML SSO\nModern OAuth/OIDC app -> OIDC SSO\nOnly a web form login -> password-based SSO (Entra replays creds)" },
{ h: "Automatic provisioning with SCIM", b: "App provisioning automatically creates, updates, and disables user accounts IN the SaaS app based on Entra assignments, using the SCIM protocol. When a user is assigned (or leaves), provisioning pushes the change to the app -- so deprovisioning happens automatically when someone is removed or offboarded. This closes the gap where former employees keep SaaS access." },
{ h: "Assigning access and app roles", b: "You assign users and groups to an enterprise app, optionally mapping them to app roles (permissions the app defines) so the app receives role claims. Combine assignment with Conditional Access (require MFA/compliant device for the app) and provisioning. This is how access to a SaaS app is granted, governed, and automatically revoked at scale." },
],
traps: [
"Password-based SSO is the option when an app has only a form login and no federation -- Entra stores and replays the credentials; it's not the same as SAML/OIDC federation.",
"SCIM provisioning is what automatically DEPROVISIONS SaaS accounts when a user is unassigned or offboarded -- manual removal in the app is the wrong answer at scale.",
"Gallery apps are pre-integrated templates; non-gallery apps are custom integrations -- both appear under Enterprise applications.",
"Assigning users/groups (and app roles) to the enterprise app controls who can access it -- not editing the app object's manifest." ],
keys: [
"Enterprise applications = service principals: SSO, assignment, provisioning, CA.",
"SSO methods: SAML, OIDC/OAuth, password-based (form replay), linked.",
"SCIM provisioning auto-creates/updates/disables SaaS accounts from Entra.",
"Assign users/groups (+ app roles); pair with Conditional Access." ] },

"sc3-workload-4": { intro: "Vartkes's favorite con is tricking a trusting crewman into signing over the keys. Consent -- delegated versus application, user versus admin -- is where you stop the illicit grant.",
sections: [
{ h: "Delegated vs application permissions", b: "Delegated permissions let an app act ON BEHALF OF a signed-in user -- the effective access is the intersection of the app's permission and the user's own privileges. Application permissions let the app act AS ITSELF with no signed-in user (daemons, background services) -- these are powerful and ALWAYS require admin consent. Know which a scenario needs: user present -> delegated; unattended -> application.", data: "Delegated: app acts as the signed-in user (limited by that user)\nApplication: app acts as itself, no user -> ALWAYS needs admin consent" },
{ h: "The consent framework: user vs admin consent", b: "When an app requests permissions, someone must consent. Users can self-consent to low-risk delegated permissions IF the tenant allows it. High-privilege permissions, application permissions, and permissions flagged as risky require ADMIN consent -- granted tenant-wide by a privileged admin. The admin-consent workflow lets a user request admin approval instead of being blocked." },
{ h: "Restricting user consent (illicit consent grant attacks)", b: "A common attack is the illicit consent grant: a phishing app tricks users into consenting, gaining OAuth access to their data (mail, files) without a password. The defense is to restrict user consent -- allow it only for verified publishers and low-risk permissions, or disable user consent entirely and route everything through admin consent. This is a key hardening step for workload identities.", data: "Harden: user consent -> allowed only for verified publishers + low-risk\nRisky/app permissions -> admin consent only\nStops illicit-consent phishing apps" },
{ h: "Reviewing and governing consented apps", b: "Audit which apps have been granted permissions, what scopes they hold, and who consented. Remove over-privileged or unused apps and revoke risky grants. App governance (in Defender for Cloud Apps) and enterprise-app permission reviews surface OAuth apps with excessive access. Least privilege applies to apps too -- grant the narrowest scopes the app truly needs." },
],
traps: [
"Application permissions ALWAYS require admin consent (no user context); delegated permissions may allow user consent for low-risk scopes -- don't mix these up.",
"Delegated access is limited by the signed-in user's own privileges (the intersection); application permissions are not.",
"The defense against illicit consent grant attacks is restricting user consent (verified publishers/low-risk) or requiring admin consent -- not just user training alone.",
"Grant apps least-privilege scopes and review consented apps; 'grant all requested permissions' is the wrong answer." ],
keys: [
"Delegated = act as signed-in user; Application = act as itself (admin consent always).",
"User consent only for low-risk (and verified publishers); risky/app -> admin consent.",
"Restrict user consent to stop illicit consent grant (OAuth phishing) attacks.",
"Review consented apps; enforce least-privilege scopes." ] },

"sc3-workload-5": { intro: "Vartkes slips secrets off the ship and smuggles saboteurs through the old side hatch. Federation kills the secrets, Application Proxy guards the hatch, and risk detection catches the imposters.",
sections: [
{ h: "Workload identity federation (no stored secrets)", b: "Workload identity federation lets an external workload -- GitHub Actions, another cloud, a Kubernetes pod -- access Entra-protected resources WITHOUT a stored secret. You configure a trust (federated credential) so Entra accepts tokens issued by the external identity provider. This eliminates long-lived client secrets in CI/CD and cross-cloud automation, the credentials attackers love to steal.", data: "GitHub Actions -> Entra resource\nFederated credential trusts GitHub's OIDC token\n-> no client secret to leak or rotate" },
{ h: "Application Proxy for on-prem apps", b: "Microsoft Entra Application Proxy publishes an on-premises web app to remote users through Entra -- a lightweight connector runs on-prem, users authenticate to Entra first (pre-authentication), and Conditional Access/MFA apply before traffic reaches the app. It provides SSO (including Kerberos/header-based) to legacy web apps without a VPN. (Global Secure Access / Private Access is the newer, broader approach.)" },
{ h: "Securing workload identities", b: "Workload identities (service principals) can be compromised too. Microsoft Entra ID Protection (P2) detects risky workload identities -- leaked credentials, anomalous sign-ins, suspicious activity by an app. Conditional Access for workload identities can restrict a service principal (for example, block sign-in from unexpected locations). Apply the same rigor to non-human identities as to users." },
{ h: "Credential hygiene and monitoring", b: "Prefer secretless options in order: managed identity (on Azure) -> workload identity federation (external) -> certificate -> (last resort) client secret, always rotated. Monitor app sign-in logs and audit consent grants, review expiring credentials, and remove unused apps/service principals. Overprivileged, secret-laden, unmonitored app identities are exactly the infiltration path Vartkes exploits." },
],
traps: [
"Workload identity federation removes stored secrets for EXTERNAL workloads (GitHub/other clouds/K8s) -- 'store the secret in Key Vault' is inferior to eliminating it via federation when the source supports it.",
"Application Proxy pre-authenticates via Entra and applies Conditional Access to on-prem web apps without a VPN -- exposing the app directly is the wrong answer.",
"Service principals can be risky too: ID Protection detects risky workload identities and Conditional Access for workload identities restricts them (P2).",
"Prefer managed identity/federation/certificate over a client secret; rotate what remains and remove unused app identities." ],
keys: [
"Workload identity federation = secretless access for external workloads (CI/CD, other clouds).",
"Application Proxy publishes on-prem web apps with pre-auth + CA, no VPN.",
"ID Protection flags risky workload identities; CA for workload identities restricts SPs.",
"Credential order: managed identity -> federation -> certificate -> secret (rotate, monitor)." ] },
},
mcq: {
"sc3-workload-1": [
{ s: "An Azure App Service must read secrets from Key Vault. The team currently stores a client secret in app config.", e: "Goal: eliminate stored credentials", q: "Best approach?", options: [
 { t: "Use a managed identity for the App Service and grant it least-privilege access to Key Vault", c: true, w: "A managed identity removes the stored secret entirely; Azure issues and rotates the credential at runtime." },
 { t: "Move the client secret to a more secure config file", c: false, w: "Any stored secret can leak; a managed identity removes it, which is the goal." },
 { t: "Hard-code the secret in the application code", c: false, w: "Embedding secrets in code is the classic leak, the opposite of secure." },
 { t: "Use a human admin account for the app", c: false, w: "A human account is not a workload identity and shouldn't run automation." } ] },
{ s: "One identity must be shared by five VMs and must survive even if any single VM is deleted.", e: "Requirement: shared, independent lifecycle", q: "Which managed identity type?", options: [
 { t: "User-assigned managed identity", c: true, w: "User-assigned identities are standalone, reusable across many resources, and outlive any single resource." },
 { t: "System-assigned managed identity", c: false, w: "System-assigned is 1:1 and dies with its resource, so it can't be shared or outlive a VM." },
 { t: "A client secret shared by all five", c: false, w: "That reintroduces a shared secret to manage and leak." },
 { t: "Five separate human accounts", c: false, w: "Human accounts aren't workload identities and don't meet the requirement." } ] },
{ s: "A Function App needs its own identity that is automatically cleaned up when the Function is deleted.", e: "Requirement: 1:1 lifecycle, auto-cleanup", q: "Best choice?", options: [
 { t: "System-assigned managed identity", c: true, w: "System-assigned is tied 1:1 to the resource and is removed when the resource is deleted." },
 { t: "User-assigned managed identity", c: false, w: "User-assigned persists independently; it wouldn't auto-clean up with the Function." },
 { t: "A multi-tenant app registration", c: false, w: "That's for cross-tenant apps, not a single Azure resource's identity." },
 { t: "A certificate stored on disk", c: false, w: "That's a stored credential, not an auto-managed identity." } ] },
{ s: "A workload runs on Azure and needs to authenticate to an Entra-protected API.", e: "Team debates managed identity vs service principal with a secret", q: "Which is preferred and why?", options: [
 { t: "Managed identity -- there is no secret to store, leak, or rotate manually", c: true, w: "For on-Azure workloads a managed identity is preferred because it eliminates credential management." },
 { t: "Service principal with a client secret, because it's simpler", c: false, w: "That adds a secret to manage and leak; managed identity is preferred on Azure." },
 { t: "A shared user account with a password", c: false, w: "Human accounts aren't workload identities." },
 { t: "No identity; make the API public", c: false, w: "Removing authentication is a severe security failure." } ] },
{ s: "After creating a system-assigned managed identity, the app still can't read the storage account.", e: "Identity exists but access is denied", q: "What's missing?", options: [
 { t: "An Azure RBAC role assignment (least privilege) for the identity on the storage account", c: true, w: "The identity must be granted RBAC on the target resource; existence alone doesn't confer access." },
 { t: "A client secret for the identity", c: false, w: "Managed identities have no secret to add; the gap is the role assignment." },
 { t: "A second tenant", c: false, w: "Irrelevant to granting resource access." },
 { t: "Disabling the identity", c: false, w: "That removes access entirely, the opposite of the fix." } ] },
{ s: "A workload runs OUTSIDE Azure (in another cloud) and needs Entra access without a stored secret.", e: "Managed identities require the workload to run on Azure", q: "Best secretless option?", options: [
 { t: "Workload identity federation (a federated credential trusting the external IdP's token)", c: true, w: "Federation gives secretless access to Entra for external workloads that can't use a managed identity." },
 { t: "A long-lived client secret emailed to the other cloud", c: false, w: "That's exactly the stored secret to avoid." },
 { t: "A system-assigned managed identity", c: false, w: "Managed identities only work for workloads running on Azure." },
 { t: "A human account", c: false, w: "Automation shouldn't use human accounts." } ] },
{ s: "A team wants to pre-create and pre-authorize an identity before deploying several workloads that will share it.", e: "Identity must exist before the resources", q: "Which fits?", options: [
 { t: "User-assigned managed identity created and granted RBAC ahead of deployment", c: true, w: "User-assigned identities can be created and authorized first, then attached to multiple workloads." },
 { t: "System-assigned identity per resource", c: false, w: "System-assigned can't exist before its resource and isn't shared." },
 { t: "A single client secret in source control", c: false, w: "Secrets in source control are a serious leak risk." },
 { t: "A guest user account", c: false, w: "Guests are external humans, not workload identities." } ] },
{ s: "A developer proposes storing a rotating secret in Key Vault for an Azure VM to call a database.", e: "The VM runs on Azure and the DB supports Entra auth", q: "Better design?", options: [
 { t: "Give the VM a managed identity and grant it database access -- no secret at all", c: true, w: "When the workload is on Azure and the target supports Entra auth, a managed identity removes the secret entirely." },
 { t: "Keep the secret in Key Vault and rotate it monthly", c: false, w: "Better than plaintext, but a managed identity eliminates the secret and is preferred here." },
 { t: "Put the secret in an environment variable", c: false, w: "Still a stored secret that can leak." },
 { t: "Disable authentication to the database", c: false, w: "Removing auth is a severe risk." } ] } ],

"sc3-workload-2": [
{ s: "An admin asks where the app's blueprint (redirect URIs, exposed scopes, credentials) is defined versus where its tenant permissions live.", e: "Two Entra blades involved", q: "Correct mapping?", options: [
 { t: "Application object (App registrations) is the home-tenant blueprint; the service principal (Enterprise applications) is the per-tenant instance", c: true, w: "The app object defines identity/credentials/scopes in the home tenant; the service principal is the local instance in each tenant." },
 { t: "Both are the same object in the same blade", c: false, w: "They're distinct: app object (blueprint) vs service principal (instance)." },
 { t: "The service principal is the global blueprint", c: false, w: "Reversed -- the application object is the blueprint; the SP is local." },
 { t: "Redirect URIs are set on the service principal", c: false, w: "Redirect URIs and exposed scopes live on the application object." } ] },
{ s: "A multi-tenant SaaS app is used by 30 customer tenants.", e: "Question about how many of each object exist", q: "What's true?", options: [
 { t: "One application object in the home tenant, and a service principal in each of the 30 tenants", c: true, w: "A multi-tenant app has a single app object (home) and one service principal per consuming tenant." },
 { t: "30 application objects, one per tenant", c: false, w: "There's only one application object; each tenant gets a service principal." },
 { t: "One service principal shared by all tenants", c: false, w: "Each tenant has its own service principal instance." },
 { t: "No objects until an admin edits the manifest", c: false, w: "Consent provisions the service principal automatically." } ] },
{ s: "A security review flags a client secret embedded in a single-page app's browser code.", e: "Goal: secure app credentials", q: "Best guidance?", options: [
 { t: "Never embed long-lived secrets in client-side code; prefer certificates for confidential clients and use flows that don't expose secrets", c: true, w: "Secrets don't belong in client-side code; certificates are preferred and public clients use secretless flows." },
 { t: "Leave the secret; browsers are secure", c: false, w: "Anything in browser code is exposed to users and attackers." },
 { t: "Use a longer secret so it's harder to guess", c: false, w: "Length doesn't help when the secret is exposed in client code." },
 { t: "Rotate the exposed secret weekly and keep it in the code", c: false, w: "It's still exposed between rotations; remove it from client code." } ] },
{ s: "An unattended nightly job (no signed-in user) must call Microsoft Graph.", e: "Choosing the identity model", q: "Best fit?", options: [
 { t: "A service principal (app registration) with application permissions", c: true, w: "Daemon/background apps with no user use a service principal and application permissions." },
 { t: "A delegated permission tied to a specific user's sign-in", c: false, w: "There's no signed-in user for an unattended job; delegated won't apply." },
 { t: "A human admin running it manually each night", c: false, w: "Manual human execution isn't automation and isn't a workload identity." },
 { t: "An anonymous call", c: false, w: "Graph requires an authenticated identity." } ] },
{ s: "A team needs to decide between certificate and client-secret credentials for a confidential app.", e: "Goal: strongest credential hygiene", q: "Recommendation?", options: [
 { t: "Prefer a certificate over a client secret, and rotate it", c: true, w: "Certificates are stronger than secrets; both should be rotated, but certificates are preferred." },
 { t: "Always use a client secret; certificates are obsolete", c: false, w: "Certificates are the preferred, stronger option, not obsolete." },
 { t: "Use no credential and make the app anonymous", c: false, w: "Confidential apps need a credential." },
 { t: "Share one secret across all apps", c: false, w: "Credential sharing spreads risk and breaks isolation." } ] },
{ s: "Where does an admin view and manage the service principals (instances) of apps in their tenant?", e: "Distinguishing the two blades", q: "Which blade?", options: [
 { t: "Enterprise applications", c: true, w: "Enterprise applications shows the service principals -- the app instances in your tenant." },
 { t: "App registrations only", c: false, w: "App registrations shows application objects (blueprints), not the tenant instances view." },
 { t: "The recycle bin", c: false, w: "That's for deleted objects, not app instances." },
 { t: "Named locations", c: false, w: "That's a Conditional Access construct, unrelated." } ] },
{ s: "An app should be usable only within the home tenant.", e: "Setting on the app registration", q: "Which configuration?", options: [
 { t: "Single-tenant (accounts in this organizational directory only)", c: true, w: "Single-tenant restricts the app to the home tenant." },
 { t: "Multi-tenant (any organizational directory)", c: false, w: "Multi-tenant allows other tenants to provision the app." },
 { t: "Personal Microsoft accounts only", c: false, w: "That's a different audience, not home-tenant-only org access." },
 { t: "No sign-in audience at all", c: false, w: "An audience must be defined for the app to function." } ] },
{ s: "A developer wants automation to use their own user account 'to keep it simple.'", e: "Concern: accountability and security", q: "Why is that wrong?", options: [
 { t: "Automation should use a workload identity (managed identity or service principal), not a human account", c: true, w: "Human accounts for automation break accountability, MFA, and lifecycle; use a workload identity." },
 { t: "It's fine; human accounts are ideal for automation", c: false, w: "Human accounts aren't workload identities and create security/lifecycle problems." },
 { t: "Only if the developer is a Global Admin", c: false, w: "Using a privileged human account for automation is worse, not better." },
 { t: "Automation never needs an identity", c: false, w: "Authenticated automation needs a workload identity." } ] } ],

"sc3-workload-3": [
{ s: "A SaaS app supports SAML 2.0 for federation.", e: "Goal: single sign-on from Entra", q: "Which SSO method?", options: [
 { t: "SAML-based SSO", c: true, w: "When the app supports SAML 2.0, configure SAML-based SSO with Entra as the identity provider." },
 { t: "Password-based SSO", c: false, w: "Password-based is for apps with only a form login and no federation; SAML is available here." },
 { t: "No SSO is possible", c: false, w: "SAML support means SSO is possible." },
 { t: "SCIM SSO", c: false, w: "SCIM is provisioning, not an SSO protocol." } ] },
{ s: "A legacy web app has only a username/password form and no federation support.", e: "Users want single sign-on anyway", q: "Which SSO option fits?", options: [
 { t: "Password-based SSO -- Entra securely stores and replays the credentials into the login form", c: true, w: "Password-based SSO handles apps that only offer a form login by replaying stored credentials." },
 { t: "SAML-based SSO", c: false, w: "The app doesn't support SAML federation." },
 { t: "OIDC SSO", c: false, w: "The app isn't an OAuth/OIDC app." },
 { t: "No sign-on is possible", c: false, w: "Password-based SSO covers exactly this case." } ] },
{ s: "When employees are offboarded, their accounts in a SaaS app must be disabled automatically.", e: "Goal: automatic deprovisioning at scale", q: "Which capability?", options: [
 { t: "Automatic user provisioning via SCIM", c: true, w: "SCIM provisioning creates, updates, and disables SaaS accounts based on Entra assignment, auto-deprovisioning leavers." },
 { t: "Manually deleting each account in the app", c: false, w: "Manual removal doesn't scale and misses accounts." },
 { t: "Password-based SSO", c: false, w: "SSO handles sign-in, not account lifecycle in the app." },
 { t: "A dynamic license group only", c: false, w: "Licensing groups don't provision accounts into the SaaS app." } ] },
{ s: "An admin needs to control which users can access an enterprise application.", e: "Only Finance should reach the app", q: "Best approach?", options: [
 { t: "Assign the Finance users/group to the enterprise application (with app roles as needed)", c: true, w: "User/group assignment on the enterprise app controls who can access it." },
 { t: "Edit the application object's redirect URIs", c: false, w: "Redirect URIs don't control user access." },
 { t: "Give everyone Global Admin", c: false, w: "That's a severe over-grant and doesn't scope app access." },
 { t: "Delete the service principal", c: false, w: "That removes the app entirely rather than scoping access." } ] },
{ s: "A well-known SaaS product is pre-integrated in Entra's catalog.", e: "Team wants the fastest secure integration", q: "What is this called?", options: [
 { t: "A gallery application (pre-integrated template)", c: true, w: "Gallery apps are pre-integrated templates that speed up secure SSO/provisioning setup." },
 { t: "A non-gallery app requiring full custom setup", c: false, w: "Non-gallery is for custom apps not in the catalog." },
 { t: "A managed identity", c: false, w: "That's an Azure resource identity, not a SaaS app template." },
 { t: "A dynamic group", c: false, w: "Unrelated to app integration." } ] },
{ s: "A modern app registered with Entra uses OAuth 2.0 / OpenID Connect.", e: "Selecting SSO", q: "Which method?", options: [
 { t: "OIDC-based SSO", c: true, w: "Modern apps integrated via OAuth/OIDC use OIDC-based single sign-on." },
 { t: "Password-based SSO", c: false, w: "That's for form-only apps without federation." },
 { t: "SCIM", c: false, w: "SCIM is provisioning, not SSO." },
 { t: "Header-based only", c: false, w: "Header-based applies to certain proxied legacy apps, not a modern OIDC app." } ] },
{ s: "Provisioning should map Entra users to specific roles inside the SaaS app.", e: "App defines roles it expects in the token", q: "How is this achieved?", options: [
 { t: "Assign users/groups to app roles on the enterprise application so role claims are sent", c: true, w: "App-role assignment maps users to roles the app receives as claims." },
 { t: "Add users to a named location", c: false, w: "Named locations are CA conditions, not app roles." },
 { t: "Give each user a client secret", c: false, w: "Secrets aren't role mappings." },
 { t: "Use password writeback", c: false, w: "That's for on-prem password sync, unrelated to app roles." } ] },
{ s: "Security wants MFA required specifically when users access a sensitive enterprise app.", e: "Goal: app-scoped access control", q: "Best mechanism?", options: [
 { t: "A Conditional Access policy targeting that enterprise app requiring MFA", c: true, w: "CA can target a specific enterprise app and require MFA or a compliant device for it." },
 { t: "Password-based SSO settings", c: false, w: "SSO config doesn't enforce MFA conditions." },
 { t: "SCIM provisioning rules", c: false, w: "Provisioning manages accounts, not access conditions." },
 { t: "Deleting the app object", c: false, w: "That removes the app rather than protecting access." } ] } ],

"sc3-workload-4": [
{ s: "An app must call Microsoft Graph on behalf of the signed-in user, limited to what that user can see.", e: "A user is present during the call", q: "Which permission type?", options: [
 { t: "Delegated permissions", c: true, w: "Delegated permissions let the app act on behalf of the signed-in user, bounded by that user's privileges." },
 { t: "Application permissions", c: false, w: "Application permissions act as the app itself with no user context." },
 { t: "Azure RBAC Owner", c: false, w: "RBAC governs Azure resources, not Graph delegated access." },
 { t: "No permission needed", c: false, w: "Graph access requires a consented permission." } ] },
{ s: "A background daemon with no user must read all mailboxes.", e: "Unattended, tenant-wide access", q: "Which permission type and consent?", options: [
 { t: "Application permissions, which always require admin consent", c: true, w: "No-user daemons use application permissions, and those always require admin consent." },
 { t: "Delegated permissions with user consent", c: false, w: "There's no signed-in user, so delegated doesn't apply." },
 { t: "A managed identity with no permissions", c: false, w: "It still needs the appropriate application permission granted via admin consent." },
 { t: "Anonymous access", c: false, w: "Reading mailboxes requires authenticated, admin-consented access." } ] },
{ s: "Users in the tenant are being targeted by a phishing app that requests OAuth access to their mail and files.", e: "Attack: illicit consent grant", q: "Best defense?", options: [
 { t: "Restrict user consent to verified publishers and low-risk permissions (or require admin consent), routing risky requests through the admin-consent workflow", c: true, w: "Restricting user consent is the primary defense against illicit consent grant attacks." },
 { t: "Allow all user consent to reduce friction", c: false, w: "That widens the exact attack surface being exploited." },
 { t: "Only train users and change nothing technically", c: false, w: "Training helps but the technical control is restricting consent." },
 { t: "Disable MFA", c: false, w: "That weakens security and is unrelated to consent." } ] },
{ s: "A standard user tries to consent to an app requesting a high-privilege permission and is blocked.", e: "Tenant requires admin consent for risky scopes", q: "What should the user do?", options: [
 { t: "Use the admin-consent workflow to request approval from an administrator", c: true, w: "The admin-consent workflow lets users request admin approval instead of being blocked." },
 { t: "Grant themselves Global Admin", c: false, w: "Users can't and shouldn't self-elevate." },
 { t: "Embed a client secret to bypass consent", c: false, w: "That doesn't bypass consent and is insecure." },
 { t: "Disable the consent framework", c: false, w: "Users can't disable tenant consent policy, nor should they." } ] },
{ s: "Delegated access seems more limited than the permission implies.", e: "App has Files.Read delegated, user is a low-privilege user", q: "Why is effective access limited?", options: [
 { t: "Delegated access is the intersection of the app's permission and the user's own privileges", c: true, w: "With delegated permissions, the app can never exceed what the signed-in user can do." },
 { t: "Delegated permissions ignore the user's privileges", c: false, w: "They're bounded by the user's privileges -- that's the point of delegated." },
 { t: "The app needs a client secret to expand access", c: false, w: "A secret doesn't expand delegated scope beyond the user." },
 { t: "Delegated always grants tenant-wide access", c: false, w: "That describes application permissions, not delegated." } ] },
{ s: "Security wants to audit which OAuth apps hold broad permissions and who consented.", e: "Goal: govern consented apps", q: "Best action?", options: [
 { t: "Review enterprise-app permissions (and app governance in Defender for Cloud Apps), then revoke over-privileged or unused grants", c: true, w: "Auditing consented apps and pruning excessive/unused grants enforces least privilege for apps." },
 { t: "Grant every app all requested permissions to avoid tickets", c: false, w: "Blanket grants are exactly the over-privilege to avoid." },
 { t: "Ignore app permissions; only users matter", c: false, w: "Over-permissioned apps are a major risk and must be governed." },
 { t: "Delete all users", c: false, w: "Nonsensical and destructive." } ] },
{ s: "An app requests far more scopes than its function requires.", e: "Principle to apply", q: "Correct stance?", options: [
 { t: "Grant only the least-privilege scopes the app truly needs", c: true, w: "Least privilege applies to apps: grant the narrowest scopes required." },
 { t: "Grant everything requested to be safe", c: false, w: "Over-granting increases blast radius if the app is compromised." },
 { t: "Grant application permissions instead to simplify", c: false, w: "Escalating to app permissions increases risk, not safety." },
 { t: "Let the app self-approve its scopes", c: false, w: "Apps don't self-approve; consent is governed." } ] },
{ s: "An admin wants users to be able to self-consent only to low-risk delegated permissions from verified publishers.", e: "Configuring user consent settings", q: "Which setting achieves this?", options: [
 { t: "Set user consent to allow only for verified publishers and low-risk permissions", c: true, w: "This balanced setting permits safe self-service consent while blocking risky grants." },
 { t: "Allow user consent for all permissions", c: false, w: "That permits risky consent, enabling illicit-grant attacks." },
 { t: "Disable admin consent entirely", c: false, w: "Admin consent is needed for higher-risk permissions." },
 { t: "Require a client secret from each user", c: false, w: "Secrets aren't a consent control." } ] } ],

"sc3-workload-5": [
{ s: "A GitHub Actions pipeline must deploy to Azure without storing a client secret in the repo.", e: "Goal: secretless CI/CD to Entra-protected resources", q: "Best solution?", options: [
 { t: "Workload identity federation -- configure a federated credential trusting GitHub's OIDC token", c: true, w: "Federation lets external workloads like GitHub Actions authenticate to Entra with no stored secret." },
 { t: "Store a long-lived client secret as a GitHub secret", c: false, w: "That's the stored credential federation is designed to eliminate." },
 { t: "Use a system-assigned managed identity in GitHub", c: false, w: "Managed identities only work for workloads running on Azure." },
 { t: "Hard-code a certificate in the repo", c: false, w: "Embedding credentials in the repo is a leak risk." } ] },
{ s: "An on-premises web app must be reached by remote users with MFA and no VPN.", e: "Goal: secure remote publish with pre-auth", q: "Which capability?", options: [
 { t: "Microsoft Entra Application Proxy with pre-authentication and Conditional Access", c: true, w: "App Proxy publishes on-prem web apps through Entra, pre-authenticating and applying CA without a VPN." },
 { t: "Expose the app directly to the internet", c: false, w: "Direct exposure with no pre-auth is a serious risk." },
 { t: "A managed identity on the app", c: false, w: "That's for the app's outbound auth, not remote user publishing." },
 { t: "SCIM provisioning", c: false, w: "SCIM is account provisioning, not app publishing." } ] },
{ s: "A service principal shows anomalous sign-ins and possible leaked credentials.", e: "Protecting non-human identities", q: "Which capabilities apply?", options: [
 { t: "ID Protection risky workload identities plus Conditional Access for workload identities (P2)", c: true, w: "ID Protection flags risky workload identities and CA for workload identities can restrict the service principal." },
 { t: "SSPR for the service principal", c: false, w: "Apps don't self-reset via SSPR." },
 { t: "Smart lockout only", c: false, w: "That's user brute-force protection, not workload-identity risk." },
 { t: "Nothing can protect an app identity", c: false, w: "Workload identity protection exists for exactly this." } ] },
{ s: "A team ranks credential options for a new integration from most to least preferred.", e: "Goal: strongest credential hygiene", q: "Correct order?", options: [
 { t: "Managed identity (on Azure) -> workload identity federation (external) -> certificate -> client secret (rotated)", c: true, w: "Prefer secretless options first; a rotated client secret is the last resort." },
 { t: "Client secret -> certificate -> federation -> managed identity", c: false, w: "That's reversed; secrets are the least preferred." },
 { t: "Always a client secret, never anything else", c: false, w: "Secretless options are preferred when available." },
 { t: "No credentials ever, make it anonymous", c: false, w: "Authenticated access is required." } ] },
{ s: "A legacy internal app uses Kerberos and can't do modern auth, but must be published to remote staff securely.", e: "Goal: SSO to a legacy app remotely", q: "Best approach?", options: [
 { t: "Application Proxy with Kerberos-constrained delegation / header-based SSO", c: true, w: "App Proxy provides SSO (including Kerberos/header-based) to legacy web apps published through Entra." },
 { t: "Give the app a client secret and expose it publicly", c: false, w: "Public exposure with a secret doesn't provide safe pre-authenticated SSO." },
 { t: "Password writeback", c: false, w: "That's on-prem password sync, unrelated to publishing." },
 { t: "A dynamic group", c: false, w: "Groups don't publish or provide SSO to a legacy app." } ] },
{ s: "Old service principals with expiring secrets and unused apps are accumulating.", e: "Goal: reduce workload-identity risk", q: "Best practice?", options: [
 { t: "Monitor app sign-ins, review/rotate expiring credentials, and remove unused apps and service principals", c: true, w: "Ongoing hygiene -- monitoring, rotation, and removing unused identities -- shrinks the workload-identity attack surface." },
 { t: "Leave every app and secret in place indefinitely", c: false, w: "Stale, secret-laden apps are exactly the infiltration path to eliminate." },
 { t: "Give all service principals Global Admin", c: false, w: "Massive over-privilege; the opposite of hygiene." },
 { t: "Disable monitoring to reduce noise", c: false, w: "Removing visibility increases risk." } ] },
{ s: "A workload runs on Azure and a second identical workload runs in another cloud; both need Entra access without secrets.", e: "Choosing per-environment", q: "Best design?", options: [
 { t: "Managed identity for the Azure workload; workload identity federation for the other-cloud workload", c: true, w: "Use a managed identity on Azure and federation for the external cloud -- both secretless, each fit to its environment." },
 { t: "One shared client secret across both clouds", c: false, w: "A shared secret is a leak-prone single point of failure." },
 { t: "Managed identities in both clouds", c: false, w: "Managed identities only work on Azure; the other cloud needs federation." },
 { t: "Human accounts in both", c: false, w: "Human accounts aren't workload identities." } ] },
{ s: "An admin wants to block a service principal from authenticating outside expected IP ranges.", e: "Restricting a non-human identity", q: "Which control?", options: [
 { t: "Conditional Access for workload identities (location-based restriction on the service principal)", c: true, w: "CA for workload identities can restrict a service principal by conditions such as location." },
 { t: "SSPR", c: false, w: "Password reset doesn't restrict a service principal's sign-in location." },
 { t: "A named location with no policy", c: false, w: "A named location must be used within a CA policy to enforce anything." },
 { t: "Deleting all users", c: false, w: "Unrelated and destructive." } ] } ],
},
pbqs: [
{ type: "order", s: "An Azure App Service must reach Key Vault with no stored secret.", task: "Order the steps to use a system-assigned managed identity:",
 steps: ["Enable the system-assigned managed identity on the App Service", "Grant the identity least-privilege Azure RBAC on the Key Vault", "The app requests a token from the managed identity endpoint at runtime", "Azure issues and rotates the credential automatically", "The app accesses Key Vault with no stored secret"],
 x: "Enable the identity, grant it scoped RBAC, and at runtime the app gets an Azure-issued, auto-rotated token -- no secret is ever stored." },
{ type: "order", s: "A GitHub Actions pipeline needs secretless access to an Entra-protected resource.", task: "Order the workload identity federation setup:",
 steps: ["Register an application (or use an existing app/identity)", "Add a federated credential trusting GitHub's OIDC issuer/subject", "Grant the identity least-privilege access to the target resource", "GitHub Actions presents its OIDC token to Entra", "Entra validates the trust and issues an access token -- no secret stored"],
 x: "Configure a federated credential so Entra trusts GitHub's token; the pipeline then exchanges its OIDC token for Entra access with no client secret." },
{ type: "order", s: "A SaaS app must have automatic onboarding and offboarding of accounts.", task: "Order the enterprise-app provisioning setup:",
 steps: ["Add the app from the gallery as an enterprise application", "Configure SSO (e.g., SAML or OIDC)", "Assign users/groups to the application", "Configure SCIM automatic provisioning", "Users are auto-provisioned, and deprovisioned when unassigned"],
 x: "Integrate the app, set up SSO, assign users, then enable SCIM so account creation and deprovisioning follow Entra assignment automatically." },
{ type: "match", s: "Match each identity object to what it is.", task: "Assign every item:",
 cats: ["Application object", "Service principal", "Managed identity"],
 items: [
  { t: "The globally unique blueprint in the home tenant", c: "Application object" },
  { t: "The per-tenant instance defining what the app can do", c: "Service principal" },
  { t: "An Azure resource identity with no stored secret", c: "Managed identity" },
  { t: "Seen under App registrations", c: "Application object" },
  { t: "Seen under Enterprise applications", c: "Service principal" },
  { t: "System-assigned or user-assigned", c: "Managed identity" } ],
 x: "The application object is the home-tenant blueprint (App registrations); the service principal is the per-tenant instance (Enterprise applications); managed identities are secretless Azure resource identities." },
{ type: "match", s: "Match each permission/consent case correctly.", task: "Assign every item:",
 cats: ["Delegated", "Application", "Admin consent required"],
 items: [
  { t: "App acts on behalf of a signed-in user", c: "Delegated" },
  { t: "Effective access is the intersection with the user's privileges", c: "Delegated" },
  { t: "Daemon acts as itself with no user", c: "Application" },
  { t: "Always needs a privileged admin to grant tenant-wide", c: "Admin consent required" },
  { t: "High-privilege or risky scopes", c: "Admin consent required" } ],
 x: "Delegated = act as the user (bounded by their privileges); application = act as itself (no user); application permissions and risky scopes always require admin consent." },
{ type: "match", s: "Match each SSO/connectivity method to its scenario.", task: "Assign every item:",
 cats: ["SAML SSO", "Password-based SSO", "Application Proxy", "SCIM provisioning"],
 items: [
  { t: "App supports SAML 2.0 federation", c: "SAML SSO" },
  { t: "App has only a web form login, no federation", c: "Password-based SSO" },
  { t: "Publish an on-prem web app with pre-auth, no VPN", c: "Application Proxy" },
  { t: "Auto-create and disable accounts in a SaaS app", c: "SCIM provisioning" },
  { t: "Entra stores and replays credentials into the login form", c: "Password-based SSO" } ],
 x: "SAML for federating apps; password-based SSO replays credentials for form-only apps; App Proxy publishes on-prem web apps; SCIM automates account provisioning." },
{ type: "multi", s: "An on-Azure workload needs to authenticate to Key Vault securely.", e: "Team wants to eliminate secret management.", q: "Select ALL correct practices:",
 options: [
  { t: "Use a managed identity for the workload", c: true, w: "A managed identity removes the stored secret entirely." },
  { t: "Grant the identity least-privilege RBAC on the vault", c: true, w: "The identity still needs scoped access on the target." },
  { t: "Let Azure rotate the credential automatically", c: true, w: "Managed identity credentials are rotated by Azure." },
  { t: "Use system- or user-assigned depending on sharing/lifecycle needs", c: true, w: "Choose the identity type to match the lifecycle requirement." },
  { t: "Hard-code a client secret as a backup", c: false, w: "Any stored secret reintroduces the leak risk you removed." } ],
 x: "Managed identity + least-privilege RBAC + Azure rotation is the secretless pattern; a hard-coded secret defeats it." },
{ type: "multi", s: "Harden the tenant against OAuth illicit consent grant attacks.", e: "Phishing apps are requesting mail/file access.", q: "Select ALL effective controls:",
 options: [
  { t: "Restrict user consent to verified publishers and low-risk permissions", c: true, w: "This limits what users can consent to." },
  { t: "Require admin consent for risky or application permissions", c: true, w: "Routing risky requests through admins blocks the attack." },
  { t: "Use the admin-consent workflow for user requests", c: true, w: "Lets users request approval instead of being blocked, without opening consent up." },
  { t: "Review and revoke over-privileged or unused consented apps", c: true, w: "Pruning grants reduces the blast radius." },
  { t: "Allow all user consent to reduce helpdesk tickets", c: false, w: "That widens the exact attack surface being exploited." } ],
 x: "Restrict user consent, require admin consent for risky scopes, use the request workflow, and audit grants -- never open consent wide." },
{ type: "multi", s: "Select correct statements about app objects and service principals.", e: "A multi-tenant app used across many tenants.", q: "Select ALL true statements:",
 options: [
  { t: "There is one application object in the home tenant", c: true, w: "The app object is a single home-tenant blueprint." },
  { t: "Each consuming tenant gets its own service principal", c: true, w: "Consent provisions a service principal per tenant." },
  { t: "App registrations shows the application object", c: true, w: "That blade holds the app object/blueprint." },
  { t: "Enterprise applications shows the service principal", c: true, w: "That blade holds the per-tenant instance." },
  { t: "Each tenant has its own copy of the application object", c: false, w: "There is only one application object; tenants get service principals." } ],
 x: "One app object (home tenant) maps to a service principal in each tenant; App registrations = object, Enterprise applications = principal." },
{ type: "multi", s: "Choose secretless or least-secret credential strategies per environment.", e: "Workloads run on Azure, in another cloud, and a legacy confidential app.", q: "Select ALL correct choices:",
 options: [
  { t: "Managed identity for the Azure workload", c: true, w: "On-Azure workloads should use a managed identity." },
  { t: "Workload identity federation for the other-cloud workload", c: true, w: "Federation gives secretless access for external workloads." },
  { t: "A certificate (preferred over a secret) for the confidential app, rotated", c: true, w: "Certificates beat secrets when a credential is unavoidable." },
  { t: "Remove unused service principals and monitor sign-ins", c: true, w: "Hygiene reduces the workload-identity attack surface." },
  { t: "Share one client secret across all three", c: false, w: "A shared secret is a leak-prone single point of failure." } ],
 x: "Managed identity on Azure, federation off-Azure, certificate (rotated) where a credential is needed, plus removing unused identities -- never a shared secret." },
],
boss: {
 title: "Operation Counterfeit Crew: Vartkes's Infiltration",
 brief: "Vartkes the Infiltrator has smuggled forged workload identities all through Star Command's systems -- rogue apps with stolen secrets, over-consented OAuth grants, and a saboteur creeping in through the old side hatch. You hold the Entra workload-identity controls and five decisions. Go secretless, consent carefully, and expose every imposter.",
 win: "Every forged identity Vartkes planted is unmasked -- secrets replaced with managed identities and federation, consent locked down, the legacy hatch guarded by Application Proxy, and the risky service principal restricted. The infiltrator is dragged to the brig. Domain mission cleared.",
 lose: "Vartkes found a seam -- a stored secret, an over-broad consent, an exposed hatch -- and slipped an imposter through. Review where a credential leaked or consent went too wide, and deploy again.",
 stages: [
 { sit: "Vartkes's first forgery: an Azure App Service is calling Key Vault using a client secret he's already copied off the ship. Ops wants it fixed now.",
  e: "App Service on Azure -> Key Vault\nCurrent: client secret in app config (compromised)\nVartkes has a copy of the secret",
  options: [
  { t: "Replace the secret with a managed identity and grant it least-privilege RBAC on the vault", d: 0, r: 4, ev: 0, ql: "best", w: "A managed identity removes the stolen secret entirely -- nothing left for Vartkes to reuse, and Azure rotates it automatically." },
  { t: "Rotate the client secret and keep using it in config", d: 12, r: -4, ev: 0, ql: "bad", w: "Rotation buys a moment, but the stored secret is still leakable -- a managed identity eliminates the whole class of attack." },
  { t: "Move the secret into an environment variable instead", d: 14, r: -4, ev: 0, ql: "bad", w: "Still a stored secret Vartkes can lift; that's not secretless." } ]},
 { sit: "A phishing app Vartkes seeded is tricking crew into consenting to broad mailbox and file access -- an illicit consent grant in progress.",
  e: "Rogue OAuth app requests Mail.ReadWrite + Files.ReadWrite (all)\nUsers are self-consenting\nCurrent: user consent allowed for everything",
  options: [
  { t: "Restrict user consent to verified publishers and low-risk scopes, require admin consent for risky/app permissions, and revoke the rogue grant", d: 0, r: 4, ev: 1, ql: "best", w: "Locking down user consent and routing risky requests to admins is the direct defense against illicit consent grant attacks." },
  { t: "Leave user consent wide open but send a warning email", d: 16, r: -5, ev: 0, ql: "bad", w: "Training alone leaves the exact attack surface open -- the technical control is restricting consent." },
  { t: "Grant the app everything it asked for to stop the tickets", d: 20, r: -6, ev: 0, ql: "bad", w: "Approving the rogue app's broad scopes hands Vartkes tenant-wide access to mail and files." } ]},
 { sit: "A background job needs tenant-wide Graph access with no user. Vartkes suggests you 'just run it under a crewman's account with a delegated grant to keep it quiet.'",
  e: "Unattended daemon, no signed-in user\nNeeds application-level Graph access\nVartkes's angle: hide it behind a human account",
  options: [
  { t: "Use a service principal with the specific application permission, granted via admin consent, least-privilege scopes", d: 0, r: 3, ev: 2, ql: "best", w: "No-user daemons use a service principal with application permissions and admin consent -- scoped tightly, not hidden in a human account." },
  { t: "Run it under a crewman's user account with delegated permissions", d: 14, r: -4, ev: 0, ql: "bad", w: "A human account for automation breaks accountability and MFA -- exactly the cover Vartkes wants, and delegated won't work with no user." },
  { t: "Grant the service principal every Graph application permission to be safe", d: 12, r: -3, ev: 0, ql: "ok", w: "Right identity, but over-broad scopes give Vartkes a huge blast radius if the app is compromised -- least privilege." } ]},
 { sit: "A CI/CD pipeline in another cloud needs Entra access. Vartkes offers to 'helpfully' stash a long-lived client secret in the pipeline for you.",
  e: "External (non-Azure) CI/CD -> Entra-protected resource\nManaged identity not available off-Azure\nVartkes offers a long-lived stored secret",
  options: [
  { t: "Configure workload identity federation so the pipeline's OIDC token is trusted -- no stored secret", d: 0, r: 4, ev: 0, ql: "best", w: "Federation gives the external pipeline secretless access; there's no long-lived credential for Vartkes to steal." },
  { t: "Accept the long-lived client secret stashed in the pipeline", d: 16, r: -5, ev: 0, ql: "bad", w: "A stored long-lived secret in CI/CD is the credential attackers prize -- federation eliminates it." },
  { t: "Try to attach a system-assigned managed identity to the external pipeline", d: 8, r: -2, ev: 0, ql: "ok", w: "Managed identities only work on Azure; the external workload needs federation, not a managed identity." } ]},
 { sit: "Cornered, Vartkes retreats to the old side hatch -- a legacy on-prem web app with no modern auth -- and plants a service principal that's now signing in from strange locations.",
  e: "Legacy on-prem web app, no modern auth, must reach remote staff\nA service principal shows anomalous sign-ins (risky workload identity)\nGoal: guard the hatch and restrict the imposter",
  options: [
  { t: "Publish the app via Application Proxy with pre-auth + CA, and restrict the risky service principal with Conditional Access for workload identities", d: 0, r: 4, ev: 1, ql: "best", w: "App Proxy guards the legacy hatch with pre-authentication and CA, while CA for workload identities reins in the risky service principal -- both seams closed." },
  { t: "Expose the legacy app directly to the internet for convenience", d: 16, r: -5, ev: 0, ql: "bad", w: "Direct exposure with no pre-auth is the wide-open hatch Vartkes is counting on." },
  { t: "Ignore the anomalous service-principal sign-ins as noise", d: 14, r: -4, ev: -6, ql: "bad", w: "A risky workload identity signing in from odd locations is the imposter -- ignoring it lets Vartkes stay aboard." } ]},
 ],
},
};
