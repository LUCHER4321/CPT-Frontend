import { aText, filledButton, h2, h3, ul } from "../data/classNames";

export const TermsAndConditions = () => {
    return (
        <>
            <div className="text-justify mx-[5%] px-[5%] my-[2.5%] py-[2.5%] border">
                <h1 id="title" className="text-center">Terms and Conditions</h1>
                <h2 id="title-1" className={h2}>1. Acceptance of Terms</h2>
                <p>By accessing and using Life Tree, you agree to be legally bound by these Terms and Conditions. If you do not agree with any of these terms, you may not use our Service.</p>
                <h2 id="title-2" className={h2}>2. Service Description</h2>
                <p>Life Tree is a web platform that allows users to create, manage, share, and collaborate on phylogenetic trees. The Service includes:</p>
                <ul className={ul}>
                    <li>Creation and editing of phylogenetic trees</li>
                    <li>Storage of species data and evolutionary relationships</li>
                    <li>Collaboration features among users</li>
                    <li>Comment and like system</li>
                </ul>
                <h2 id="title-3" className={h2}>3. Account Registration</h2>
                <h3 id="title-3-1" className={h3}>3.1. Requirements</h3>
                <ul className={ul}>
                    <li>Must be over 13 years old or have parental consent</li>
                    <li>Provide truthful and up-to-date information</li>
                    <li>Maintain the confidentiality of your credentials</li>
                </ul>
                <h3 id="title-3-2" className={h3}>3.2. Responsibilities</h3>
                <ul className={ul}>
                    <li>You are responsible for all activity under your account</li>
                    <li>You must immediately notify any unauthorized use</li>
                    <li>You may not transfer your account to third parties</li>
                </ul>
                <h2 id="title-4" className={h2}>4. Subscription Plans</h2>
                <h3 id="title-4-1" className={h3}>4.1. Available Plans</h3>
                <ul className={ul}>
                    <li>Free: Basic features with limitations</li>
                    <li>Pro: Advanced features and greater capacity</li>
                    <li>Premium: Full access and priority support</li>
                </ul>
                <h3 id="title-4-2" className={h3}>4.2. Billing</h3>
                <ul className={ul}>
                    <li>Paid plans are billed in advance</li>
                    <li>Automatic renewal until cancellation</li>
                    <li>No refunds for unused periods</li>
                </ul>
                <h2 id="title-5" className={h2}>5. User Content</h2>
                <h3 id="title-5-1" className={h3}>5.1. Ownership</h3>
                <p>You retain all intellectual property rights over the content you create and share on Life Tree.</p>
                <h3 id="title-5-2" className={h3}>5.2. License</h3>
                <p>By posting content, you grant us a worldwide, non-exclusive, royalty-free license to:</p>
                <ul className={ul}>
                    <li>Store, reproduce, and display your content</li>
                    <li>Distribute it to other users according to your privacy settings</li>
                    <li>Improve and operate the Service</li>
                </ul>
                <h3 id="title-5-3" className={h3}>5.3. Content Responsibility</h3>
                <ul className={ul}>
                    <li>You are responsible for the content you post</li>
                    <li>You may not post illegal, offensive, or infringing content</li>
                    <li>We reserve the right to remove inappropriate content</li>
                </ul>
                <h2 id="title-6" className={h2}>6. Acceptable Use</h2>
                <h3 id="title-6-1" className={h3}>6.1. Prohibited Conduct</h3>
                <p>You may not use the Service for:</p>
                <ul className={ul}>
                    <li>Illegal or fraudulent activities</li>
                    <li>Harassing, threatening, or intimidating other users</li>
                    <li>Distributing malware or performing cyberattacks</li>
                    <li>Impersonating others</li>
                    <li>Violating intellectual property rights</li>
                </ul>
                <h3 id="title-6-2" className={h3}>6.2. Technical Limits</h3>
                <ul className={ul}>
                    <li>No automated scraping without authorization</li>
                    <li>Do not overload servers with excessive requests</li>
                </ul>
                <h2 id="title-7" className={h2}>7. Privacy and Data</h2>
                <h3 id="title-7-1" className={h3}>7.1. Data Protection</h3>
                <p>Our use of your personal data is governed by our <a href="/privacy-policy" target="_blank" className={aText}>Privacy Policy</a>, which forms an integral part of these terms.</p>
                <h3 id="title-7-1" className={h3}>7.1. Data Protection</h3>
                <ul className={ul}>
                    <li>Publicly shared scientific data may be used by the community</li>
                    <li>We respect each user's privacy settings</li>
                    <li>Anonymous data may be used to improve the service</li>
                </ul>
                <h2 id="title-8" className={h2}>8. Intellectual Property</h2>
                <h3 id="title-8-1" className={h3}>8.1. Platform</h3>
                <p>Life Tree and all its content, features, and functionality are the property of Life Tree and are protected by copyright, trademarks, and other intellectual property laws.</p>
                <h3 id="title-8-2" className={h3}>8.2. User Content</h3>
                <p>Users retain rights over their phylogenetic trees and related content.</p>
                <h2 id="title-9" className={h2}>9. Limitation of Liability</h2>
                <h3 id="title-9-1" className={h3}>9.1. "AS IS" Service</h3>
                <p>The Service is provided "as is" and "as available". We do not guarantee:</p>
                <ul className={ul}>
                    <li>Uninterrupted or error-free availability</li>
                    <li>Scientific accuracy of user-generated content</li>
                    <li>Absolute data security</li>
                </ul>
                <h3 id="title-9-2" className={h3}>9.2. Damages</h3>
                <p>To the maximum extent permitted by law, we shall not be liable for:</p>
                <ul className={ul}>
                    <li>Indirect, incidental, or consequential damages</li>
                    <li>Loss of data or content</li>
                    <li>Service interruptions</li>
                </ul>
                <h2 id="title-10" className={h2}>10. Termination</h2>
                <h3 id="title-10-1" className={h3}>10.1. By the User</h3>
                <p>You may delete your account at any time from the settings.</p>
                <h3 id="title-10-2" className={h3}>10.2. By the Platform</h3>
                <p>We may suspend or terminate your access to the Service if:</p>
                <ul className={ul}>
                    <li>You violate these terms</li>
                    <li>You engage in fraudulent activities</li>
                    <li>You jeopardize the security of other users</li>
                </ul>
                <h2 id="title-11" className={h2}>11. Modifications to the Terms</h2>
                <p>We reserve the right to modify these terms at any time. Modifications will take effect:</p>
                <ul className={ul}>
                    <li>30 days after notice for substantial changes</li>
                    <li>Immediately for non-substantial changes</li>
                </ul>
                <h2 id="title-12" className={h2}>12. General Provisions</h2>
                <h3 id="title-12-1" className={h3}>12.1. Entire Agreement</h3>
                <p>These terms constitute the entire agreement between you and Life Tree.</p>
                <h3 id="title-12-2" className={h3}>12.2. Severability</h3>
                <p>If any provision is found invalid, the remaining provisions shall remain in effect.</p>
                <h3 id="title-12-3" className={h3}>12.3. Waiver</h3>
                <p>Failure to exercise any rights shall not constitute a waiver of those rights.</p>
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