import { filledButton, h2, h3, ul } from "../data/classNames"

export const PrivacyPolicy = () => {
    return (
        <>
            <div className="text-justify mx-[5%] px-[5%] my-[2.5%] py-[2.5%] border">
                <h1 id="title" className="text-center">Privacy Policy</h1>
                <h2 id="title-1" className={h2}>1. Introduction</h2>
                <p>Life Tree is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our phylogenetic tree platform and services.</p>
                <h2 id="title-2" className={h2}>2. Information We Collect</h2>
                <h3 id="title-2-1" className={h3}>2.1. Personal Information</h3>
                <ul className={ul}>
                    <li><strong>Account Information</strong>: Email address, username, password, profile photo</li>
                    <li><strong>Profile Data</strong>: Description, account preferences, subscription plan (Free, Pro, Premium, Institutional)</li>
                    <li><strong>Billing Information</strong>: Subscription type, billing cycle (monthly/annual), payment history</li>
                    <li><strong>Communication Data</strong>: Contact messages, support inquiries</li>
                </ul>
                <h3 id="title-2-2" className={h3}>2.2. Content and Usage Information</h3>
                <ul className={ul}>
                    <li><strong>Phylogenetic Trees</strong>: Tree data, species information, evolutionary relationships</li>
                    <li><strong>Collaboration Data</strong>: Collaborator lists, shared tree access</li>
                    <li><strong>Social Interactions</strong>: Comments, likes, follows, notifications</li>
                </ul>
                <h3 id="title-2-3" className={h3}>2.3. Technical Information</h3>
                <ul className={ul}>
                    <li><strong>Device Information</strong>: IP address, browser type, operating system</li>
                    <li><strong>Cookies and Tokens</strong>: Authentication tokens, session data, API keys</li>
                    <li><strong>Log Data</strong>: Server logs, error reports, performance metrics</li>
                </ul>
                <h2 id="title-3" className={h2}>3. How We Use Your Information</h2>
                <h3 id="title-3-1" className={h3}>3.1. Service Provision</h3>
                <ul className={ul}>
                    <li>Create and manage user accounts</li>
                    <li>Enable phylogenetic tree creation, editing, and collaboration</li>
                    <li>Process subscriptions and payments</li>
                    <li>Provide customer support</li>
                    <li>Send notifications and updates</li>
                </ul>
                <h3 id="title-3-2" className={h3}>3.2. Platform Improvement</h3>
                <ul className={ul}>
                    <li>Analyze usage patterns to enhance user experience</li>
                    <li>Develop new features and functionality</li>
                    <li>Optimize platform performance and security</li>
                    <li>Conduct research and development</li>
                </ul>
                <h3 id="title-3-3" className={h3}>3.3. Communication</h3>
                <ul className={ul}>
                    <li>Send service-related announcements</li>
                    <li>Respond to user inquiries</li>
                    <li>Provide technical support</li>
                    <li>Send promotional communications (with user consent)</li>
                </ul>
                <h3 id="title-3-4" className={h3}>3.4. Legal Compliance</h3>
                <ul className={ul}>
                    <li>Enforce our Terms and Conditions</li>
                    <li>Comply with legal obligations</li>
                    <li>Prevent fraud and abuse</li>
                    <li>Protect our rights and users' safety</li>
                </ul>
                <h2 id="title-4" className={h2}>4. Information Sharing and Disclosure</h2>
                <h3 id="title-4-1" className={h3}>4.1. With Your Consent</h3>
                <p>We share information when you direct us to, such as:</p>
                <ul className={ul}>
                    <li>Making trees public or sharing with specific users</li>
                    <li>Adding collaborators to your phylogenetic trees</li>
                    <li>Connecting with other users through follows and interactions</li>
                </ul>
                <h3 id="title-4-2" className={h3}>4.2. Service Providers</h3>
                <p>We may share information with third-party vendors who perform services on our behalf, including:</p>
                <ul className={ul}>
                    <li>Payment processors (PayPal)</li>
                    <li>Cloud storage providers (Cloudinary)</li>
                    <li>Email service providers</li>
                    <li>Analytics services</li>
                </ul>
                <h3 id="title-4-3" className={h3}>4.3. Legal Requirements</h3>
                <p>We may disclose information if required to do so by law or in response to valid requests by public authorities.</p>
                <h3 id="title-4-4" className={h3}>4.4. Business Transfers</h3>
                <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</p>
                <h2 id="title-5" className={h2}>5. Data Retention</h2>
                <h3 id="title-5-1" className={h3}>5.1. Account Data</h3>
                <p>We retain your personal information for as long as your account is active or as needed to provide services. You may delete your account at any time through the settings panel.</p>
                <h3 id="title-5-2" className={h3}>5.2. Content Data</h3>
                <ul className={ul}>
                    <li><strong>User Content</strong>: Phylogenetic trees and related data are retained according to your privacy settings</li>
                    <li><strong>Public Scientific Data</strong>: Publicly shared trees may be preserved for community access</li>
                    <li><strong>Backup Data</strong>: Regular backups are maintained for disaster recovery purposes</li>
                </ul>
                <h3 id="title-5-3" className={h3}>5.3. Technical Data</h3>
                <p>Log files and technical data are typically retained for up to 12 months for security and operational purposes.</p>
                <h2 id="title-6" className={h2}>6. Your Rights and Choices</h2>
                <h3 id="title-6-1" className={h3}>6.1. Access and Correction</h3>
                <p>You can access and update your personal information through your account settings:</p>
                <ul className={ul}>
                    <li>Update profile information</li>
                    <li>Change password and security settings</li>
                    <li>Modify privacy preferences</li>
                    <li>Manage subscription details</li>
                </ul>
                <h3 id="title-6-2" className={h3}>6.2. Deletion Rights</h3>
                <ul className={ul}>
                    <li>Delete individual trees or species</li>
                    <li>Remove your profile photo</li>
                    <li>Delete your entire account and associated data</li>
                </ul>
                <h3 id="title-6-3" className={h3}>6.3. Communication Preferences</h3>
                <p>You can control notification settings and opt out of promotional communications.</p>
                <h2 id="title-7" className={h2}>7. Information Security</h2>
                <h3 id="title-7-1" className={h3}>7.1. Protection Measures</h3>
                <ul className={ul}>
                    <li>Encryption of sensitive data in transit and at rest</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication mechanisms</li>
                </ul>
                <h3 id="title-7-2" className={h3}>7.2. Data Handling</h3>
                <ul className={ul}>
                    <li>Limited access to personal information on a need-to-know basis</li>
                    <li>Secure storage infrastructure</li>
                    <li>Regular backup procedures</li>
                    <li>Incident response protocols</li>
                </ul>
                <h2 id="title-8" className={h2}>8. International Data Transfers</h2>
                <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.</p>
                <h2 id="title-9" className={h2}>9. Children's Privacy</h2>
                <p>Life Tree is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.</p>
                <h2 id="title-10" className={h2}>10. Cookies and Tracking Technologies</h2>
                <p>We use cookies and similar technologies to:</p>
                <ul className={ul}>
                    <li>Authenticate users and maintain sessions</li>
                    <li>Store preferences and settings</li>
                    <li>Analyze platform usage and performance</li>
                    <li>Enable social features and collaborations</li>
                </ul>
                <h2 id="title-11" className={h2}>11. Third-Party Services</h2>
                <h3 id="title-11-1" className={h3}>11.1. Integrated Services</h3>
                <ul className={ul}>
                    <li><strong>PayPal</strong>: Payment processing</li>
                    <li><strong>Cloudinary</strong>: Image storage and management</li>
                    <li><strong>Email Services</strong>: Transactional and notification emails</li>
                </ul>
                <h3 id="title-11-2" className={h3}>11.2. External Links</h3>
                <p>Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.</p>
                <h2 id="title-12" className={h2}>12. Scientific Data Usage</h2>
                <h3 id="title-12-1" className={h3}>12.1. Public Data</h3>
                <p>Publicly shared phylogenetic trees and species data may be:</p>
                <ul className={ul}>
                    <li>Accessed and used by other platform users</li>
                    <li>Included in research and educational materials</li>
                    <li>Analyzed for platform improvement</li>
                </ul>
                <h3 id="title-12-2" className={h3}>12.2. Anonymous Data</h3>
                <p>We may use anonymized, aggregated data for:</p>
                <ul className={ul}>
                    <li>Scientific research</li>
                    <li>Platform analytics</li>
                    <li>Feature development</li>
                    <li>Performance optimization</li>
                </ul>
                <h2 id="title-13" className={h2}>13. Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any material changes:</p>
                <ul className={ul}>
                    <li>Through platform notifications</li>
                    <li>Via email for significant changes</li>
                    <li>By updating the "Last Updated" date</li>
                </ul>
                <p>Continued use of Life Tree after changes constitutes acceptance of the updated policy.</p>
                <h2 id="title-14" className={h2}>14. Contact Information</h2>
                <p>If you have questions about this Privacy Policy or our data practices, please contact us through the contact form in the application.</p>
                <h2 id="title-15" className={h2}>15. Governing Law</h2>
                <p>This Privacy Policy is governed by and construed in accordance with the laws applicable to your jurisdiction, as outlined in our Terms and Conditions.</p>
            </div>
            <div className="text-center pb-[2.5%]">
                <a href="/auth?register=true" target="_blank">
                    <button className={filledButton}>
                        Go back to auth
                    </button>
                </a>
            </div>
        </>
    )
}