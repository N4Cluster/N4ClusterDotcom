import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "N4Cluster Inc Privacy Policy — how we collect, use, disclose, and protect personal information across our websites, ordering experiences, merchant software, and related services.",
};

export default function PrivacyPage() {
  return (
    <section className="bg-white pt-32 pb-20">
      <Container size="md">
        <div className="prose prose-slate max-w-none">
          <h1>Privacy Policy</h1>
          <p className="text-slate-500 text-sm">Last updated: July 18, 2026</p>

          <p>
            This Privacy Policy explains how N4Cluster Inc (“N4Cluster,” “we,”
            “us,” or “our”) collects, uses, discloses, and protects personal
            information when people use our websites, restaurant ordering
            experiences, merchant software, applications, and related services
            (collectively, the “Services”). N4Cluster provides technology that
            enables restaurants to offer branded online ordering, pickup and
            delivery, payments through third-party payment processors,
            merchant-controlled and N4Cluster-supported promotions, delivery
            coordination, operational analytics, and AI-enabled capabilities.
          </p>
          <p>
            Questions or privacy requests:{" "}
            <a href="mailto:privacy@n4cluster.com">privacy@n4cluster.com</a>
          </p>

          <h2>Contents</h2>
          <ol>
            <li>
              <a href="#scope">Scope and Our Role</a>
            </li>
            <li>
              <a href="#information-we-collect">
                Personal Information We Collect
              </a>
            </li>
            <li>
              <a href="#sources">Sources of Personal Information</a>
            </li>
            <li>
              <a href="#how-we-use">How We Use Personal Information</a>
            </li>
            <li>
              <a href="#how-we-disclose">How We Disclose Personal Information</a>
            </li>
            <li>
              <a href="#payments">Payments</a>
            </li>
            <li>
              <a href="#pickup-delivery">Pickup and Delivery</a>
            </li>
            <li>
              <a href="#marketing">Marketing, Flash Sales, and Communications</a>
            </li>
            <li>
              <a href="#ai">Artificial Intelligence and Automated Technologies</a>
            </li>
            <li>
              <a href="#cookies">
                Cookies, Analytics, and Tracking Technologies
              </a>
            </li>
            <li>
              <a href="#retention">Data Retention</a>
            </li>
            <li>
              <a href="#security">Data Security</a>
            </li>
            <li>
              <a href="#children">Children’s Privacy</a>
            </li>
            <li>
              <a href="#your-rights">Your Privacy Rights and Choices</a>
            </li>
            <li>
              <a href="#state-disclosures">U.S. State Privacy Disclosures</a>
            </li>
            <li>
              <a href="#changes">Changes to This Policy</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
          </ol>

          <h2 id="scope">1. Scope and Our Role</h2>
          <p>
            This Privacy Policy applies when you visit n4cluster.com or another
            N4Cluster site that links to this Policy; use a restaurant-branded
            ordering experience powered by N4Cluster; use N4Cluster merchant
            software or applications; create an account or place an order as a
            guest; communicate with us; receive eligible transactional or
            promotional communications; or otherwise interact with the Services.
          </p>
          <p>
            N4Cluster is a technology platform provider. When a customer places
            an order through a restaurant experience powered by N4Cluster, the
            customer purchases directly from the applicable restaurant. The
            restaurant is responsible for food preparation, food quality and
            safety, allergen disclosures, menu accuracy, pricing, taxes charged
            by the restaurant, and fulfillment of the order, except to the extent
            a separate service provider is responsible for a specific service.
          </p>
          <p>
            Depending on the context and applicable law, N4Cluster may process
            personal information on behalf of a restaurant (for example, to
            facilitate restaurant-directed ordering, fulfillment, communications,
            and customer management) and may also process personal information
            for N4Cluster’s own legitimate business purposes, such as platform
            administration, security, fraud prevention, service improvement,
            legal compliance, aggregated analytics, and development of platform
            capabilities.
          </p>
          <p>
            Restaurants may have their own privacy notices and may independently
            use information they receive through the Services for order
            fulfillment, customer support, and, where permitted by law and the
            customer’s choices, marketing. N4Cluster does not provide one
            restaurant’s customer data to another restaurant, or use a
            restaurant’s customer list to market another restaurant, without the
            customer’s explicit consent.
          </p>

          <h2 id="information-we-collect">2. Personal Information We Collect</h2>
          <p>
            The information we collect depends on how you interact with the
            Services. You may use certain restaurant ordering experiences as a
            guest or through a registered account.
          </p>
          <h3>Information you provide directly</h3>
          <ul>
            <li>
              Contact and identity information, such as name, email address,
              phone number, billing address, and delivery address.
            </li>
            <li>
              Account and authentication information, such as login credentials,
              verification information, account preferences, and account
              settings.
            </li>
            <li>
              Order and transaction information, such as restaurant selected,
              menu items, quantities, pricing, discounts, promotional offers
              used, pickup or delivery preference, delivery address, special
              instructions, order history, order status, cancellations, refunds,
              and related support information.
            </li>
            <li>
              Marketing and communication preferences, including opt-in choices,
              opt-out choices, and records needed to honor communication
              preferences.
            </li>
            <li>
              Merchant and restaurant information, such as restaurant name and
              locations, owner or manager contact details, business contact
              information, menu and pricing information, promotions, operational
              settings, staff or administrator accounts, and integration
              configuration.
            </li>
            <li>
              Communications and support information that you provide when you
              contact N4Cluster or interact with customer or merchant support.
            </li>
          </ul>
          <h3>
            Dietary, allergy, accessibility, and other special instructions
          </h3>
          <p>
            Customers may voluntarily include dietary preferences, allergy
            information, accessibility needs, or other special instructions with
            an order. Such information may reveal health-related or other
            sensitive information. We use this information only as reasonably
            necessary to facilitate the requested order or service, provide
            support, comply with law, or as otherwise permitted with appropriate
            consent. We do not use voluntarily provided allergy or health-related
            order instructions for unrelated advertising or to infer sensitive
            characteristics for marketing purposes.
          </p>
          <h3>Payment-related information</h3>
          <p>
            Full payment card numbers and card security codes are collected and
            processed by third-party payment processors, such as Square and other
            processors that N4Cluster or a restaurant partner may support.
            N4Cluster does not store full payment card numbers or card security
            codes. We may receive limited payment and transaction information,
            such as transaction identifiers, payment status, amount, payment
            method type, limited card details made available by the processor,
            refund status, and fraud or risk signals.
          </p>
          <h3>Information collected automatically</h3>
          <ul>
            <li>
              Device and technical information, such as IP address, browser type,
              operating system, device type, device or application identifiers,
              and technical configuration information.
            </li>
            <li>
              Log and usage information, such as pages or screens viewed, feature
              interactions, timestamps, error logs, diagnostic events, security
              events, and performance information.
            </li>
            <li>
              Approximate location information that may be inferred from an IP
              address and location information you provide directly, such as a
              delivery address. N4Cluster does not currently request precise GPS
              location permission from customer devices.
            </li>
          </ul>

          <h2 id="sources">3. Sources of Personal Information</h2>
          <p>We may collect personal information from the following sources:</p>
          <ul>
            <li>
              You, when you place an order, create an account, use merchant
              tools, contact us, or communicate your preferences.
            </li>
            <li>
              Restaurant partners, when they use N4Cluster to manage orders,
              customer relationships, promotions, support, or operations.
            </li>
            <li>
              Payment processors, which may provide transaction status, payment
              confirmation, refund information, and fraud or risk signals.
            </li>
            <li>
              Delivery providers and restaurant-designated drivers, which may
              provide delivery status, proof of delivery, routing events, or
              service updates.
            </li>
            <li>
              Authentication, communications, cloud infrastructure, security, and
              other service providers that support operation of the Services.
            </li>
            <li>
              APIs and integrations that a restaurant or N4Cluster enables to
              provide the Services, subject to the applicable provider terms and
              permissions.
            </li>
          </ul>

          <h2 id="how-we-use">4. How We Use Personal Information</h2>
          <p>We may use personal information to:</p>
          <ul>
            <li>Provide, operate, maintain, and improve the Services.</li>
            <li>Enable guest checkout and registered-account experiences.</li>
            <li>
              Create, authenticate, secure, and manage user and merchant
              accounts.
            </li>
            <li>
              Process and route orders to the applicable restaurant and
              coordinate pickup or delivery.
            </li>
            <li>
              Facilitate payments, refunds, cancellations, and transaction
              support through third-party payment processors.
            </li>
            <li>
              Provide order confirmations, order status updates, delivery
              updates, service messages, and customer support.
            </li>
            <li>
              Enable restaurant and N4Cluster promotional communications where
              the recipient has provided the consent required by applicable law.
            </li>
            <li>
              Operate merchant tools, including menus, pricing, promotions, Flash
              Sales, customer engagement, and order management.
            </li>
            <li>
              Coordinate delivery through restaurant drivers and third-party
              delivery providers.
            </li>
            <li>
              Protect the Services, detect and prevent fraud or abuse,
              investigate security incidents, and enforce our terms.
            </li>
            <li>
              Perform analytics, forecasting, product improvement,
              troubleshooting, and research, including through aggregated or
              de-identified information where practicable.
            </li>
            <li>Develop and operate AI-enabled features as described below.</li>
            <li>
              Comply with legal obligations, respond to lawful requests, and
              establish, exercise, or defend legal claims.
            </li>
          </ul>

          <h2 id="how-we-disclose">5. How We Disclose Personal Information</h2>
          <p>
            We may disclose personal information to the following categories of
            recipients when reasonably necessary for the purposes described in
            this Policy:
          </p>
          <ul>
            <li>
              <strong>Restaurant partners.</strong> When you order from a
              restaurant, we provide the restaurant with information needed to
              accept, prepare, fulfill, support, and manage the order and
              customer relationship.
            </li>
            <li>
              <strong>Payment processors.</strong> We provide or transmit
              information needed to initiate and manage payment transactions,
              refunds, and payment-related risk controls.
            </li>
            <li>
              <strong>Delivery providers and drivers.</strong> For delivery
              orders, we may provide the restaurant’s drivers or third-party
              delivery providers with information reasonably necessary to complete
              the delivery, such as name, phone number, delivery address, order
              reference, and delivery instructions.
            </li>
            <li>
              Cloud hosting, infrastructure, database, communications,
              authentication, security, customer support, and other service
              providers that help operate the Services.
            </li>
            <li>
              <strong>AI service providers,</strong> when used to provide
              N4Cluster AI-enabled functions and subject to the safeguards
              described in Section 9.
            </li>
            <li>
              Professional advisers, regulators, law enforcement, courts, or
              other parties when disclosure is required or permitted by law or
              reasonably necessary to protect rights, safety, security, or the
              integrity of the Services.
            </li>
            <li>
              Parties to a corporate transaction, such as a merger, acquisition,
              financing, reorganization, bankruptcy, or sale of assets, subject to
              appropriate confidentiality and legal requirements.
            </li>
          </ul>
          <p>
            We do not sell personal information for money. We do not currently
            share personal information for cross-context behavioral advertising.
            If our practices change, we will update this Policy and provide
            legally required notices and choices before or when the change
            applies.
          </p>

          <h2 id="payments">6. Payments</h2>
          <p>
            Payments made through the Services are processed by third-party
            payment processors, such as Square and other processors that
            N4Cluster or the applicable restaurant may support. Payment
            processors collect and process payment credentials under their own
            privacy notices and terms. N4Cluster does not store full payment card
            numbers or card security codes.
          </p>
          <p>
            N4Cluster may process limited payment-related information needed to
            operate the Services, reconcile transactions, manage refunds, provide
            support, detect fraud, and maintain transaction records as required by
            law or legitimate business needs.
          </p>

          <h2 id="pickup-delivery">7. Pickup and Delivery</h2>
          <p>
            For pickup orders, N4Cluster provides the applicable restaurant with
            information needed to identify and fulfill the order and communicate
            order status.
          </p>
          <p>
            For delivery orders, delivery may be performed by the restaurant’s own
            personnel or by a third-party delivery provider. N4Cluster may
            disclose limited information needed for delivery, including the
            customer’s name, phone number, delivery address, order reference, and
            delivery instructions. Delivery providers may process information
            under their own privacy practices when acting independently.
          </p>

          <h2 id="marketing">8. Marketing, Flash Sales, and Communications</h2>
          <p>
            N4Cluster supports transactional communications and, where permitted,
            marketing communications. These are treated differently.
          </p>
          <h3>Transactional communications</h3>
          <p>
            We and participating restaurants may send communications necessary to
            provide the Services, such as account verification, order
            confirmations, order status, pickup notifications, delivery updates,
            security notices, and support responses. These communications are not
            promotional in nature and may continue where necessary to complete an
            active transaction or administer an account.
          </p>
          <h3>Promotional communications and Flash Sales</h3>
          <p>
            Participating restaurants may use N4Cluster tools to create promotions
            or Flash Sales and communicate them to eligible customers. N4Cluster
            may also send N4Cluster-level or restaurant-related promotional
            communications where the recipient has provided the consent required
            by applicable law. Depending on the campaign, N4Cluster may act on a
            restaurant’s instructions or may determine the content and audience
            for N4Cluster communications, in each case subject to applicable
            consent and preference requirements.
          </p>
          <p>
            Customer information associated with one restaurant will not be
            provided to another restaurant or used to promote another restaurant
            without the customer’s explicit consent.
          </p>
          <p>
            You may opt out of promotional email using the unsubscribe mechanism
            in the message. You may opt out of promotional SMS by replying STOP or
            following the instructions provided in the message. Where required by
            law, consent to marketing messages is obtained separately and is not a
            condition of purchase. Opting out of marketing does not prevent
            service-related communications necessary to complete an order, provide
            security notices, or administer your account. Message and data rates
            may apply to SMS communications, and message frequency may vary.
          </p>
          <p>
            We do not share mobile opt-in data or SMS consent records with third
            parties or affiliates for their own marketing or promotional purposes.
            We may share such information with service providers that support
            messaging, consent management, customer support, security, or other
            operational functions, subject to appropriate restrictions.
          </p>

          <h2 id="ai">
            9. Artificial Intelligence and Automated Technologies
          </h2>
          <p>
            N4Cluster may use artificial intelligence, machine learning, and
            related technologies through N4Cluster capabilities, including
            N4Logic, to support functions such as demand forecasting, operational
            analytics, recommendations, promotional insights, anomaly detection,
            merchant decision support, and product improvement.
          </p>
          <p>
            AI-enabled processing may use order, merchant, operational, and usage
            information. Where practicable, N4Cluster uses aggregated or
            de-identified data for analytics and model-related processing. We seek
            to minimize the personal information provided to AI service providers
            to what is reasonably necessary for the applicable function.
          </p>
          <p>
            N4Cluster does not permit third-party AI service providers, under the
            applicable contractual or service terms we select, to use N4Cluster
            merchant or customer production data to train their general-purpose
            models. We may use AI service providers to process information on our
            behalf to deliver N4Cluster features, subject to contractual,
            technical, and organizational safeguards appropriate to the
            processing.
          </p>
          <p>
            Our current AI-enabled features are designed primarily for operational
            and commercial insights and are not intended to make decisions about
            consumers that produce legal or similarly significant effects. If that
            changes, we will provide any notices, assessments, or choices required
            by applicable law.
          </p>
          <p>
            Where applicable, you may contact{" "}
            <a href="mailto:privacy@n4cluster.com">privacy@n4cluster.com</a> with
            questions about N4Cluster’s use of personal information in AI-enabled
            features. Certain AI-enabled functions may be integral to the Services
            and may not be individually optional, while optional features and
            legally required choices will be provided where applicable.
          </p>

          <h2 id="cookies">
            10. Cookies, Analytics, and Tracking Technologies
          </h2>
          <p>
            N4Cluster may use cookies and similar technologies that are necessary
            to operate the Services, such as technologies used for session
            management, authentication, security, load balancing, preferences, and
            core functionality. We also collect first-party logs and technical
            events needed for reliability, troubleshooting, security, and product
            operation.
          </p>
          <p>
            At the time of this Policy, N4Cluster does not use third-party
            behavioral advertising pixels or cross-site advertising trackers. We
            may introduce product analytics, performance monitoring, or
            event-measurement technologies in the future to understand feature
            usage, improve the Services, and support analytics and AI-enabled
            capabilities. Before deploying technologies that materially change our
            data practices, we will assess applicable legal requirements, update
            this Policy as appropriate, and provide consent or opt-out controls
            where required.
          </p>
          <p>
            You can control certain cookies through your browser settings.
            Disabling strictly necessary technologies may prevent parts of the
            Services from functioning correctly. See our{" "}
            <a href="/cookies">Cookie Notice</a> for more detail.
          </p>

          <h2 id="retention">11. Data Retention</h2>
          <p>
            We retain personal information for no longer than reasonably necessary
            for the purposes described in this Policy, unless a longer period is
            required or permitted by law. Retention depends on the type of
            information and the context in which it is processed. Our retention
            criteria generally include:
          </p>
          <ul>
            <li>
              <strong>Account information:</strong> for the life of the account
              and for a reasonable period afterward as needed for account closure,
              support, security, fraud prevention, dispute resolution,
              enforcement, or legal compliance.
            </li>
            <li>
              <strong>Order and transaction records:</strong> for as long as
              reasonably necessary for fulfillment, customer service, refunds,
              reconciliation, fraud prevention, tax, accounting, contractual, and
              legal obligations.
            </li>
            <li>
              <strong>Marketing preferences and consent records:</strong> for as
              long as needed to honor preferences, document consent, maintain
              suppression lists, and demonstrate compliance.
            </li>
            <li>
              <strong>Security, diagnostic, and system logs:</strong> for a
              limited period appropriate to security, troubleshooting, fraud
              prevention, and operational needs.
            </li>
            <li>
              <strong>
                Dietary, allergy, accessibility, and special instructions:
              </strong>{" "}
              as part of the applicable order record only for as long as
              reasonably necessary for fulfillment, support, dispute resolution,
              legal compliance, or other permitted purposes; not for unrelated
              advertising or sensitive-characteristic profiling.
            </li>
            <li>
              <strong>Backups:</strong> according to our normal backup and
              disaster-recovery lifecycle, after which data is deleted or
              overwritten in the ordinary course.
            </li>
          </ul>
          <p>
            When personal information is no longer needed, we may delete,
            anonymize, aggregate, or securely isolate it until deletion is
            practicable.
          </p>

          <h2 id="security">12. Data Security</h2>
          <p>
            We use administrative, technical, and organizational safeguards
            designed to protect personal information against unauthorized access,
            use, disclosure, alteration, and destruction. No system or method of
            transmission is completely secure, and we cannot guarantee absolute
            security. Users are responsible for maintaining the confidentiality of
            their account credentials and for using appropriate security practices
            when accessing the Services.
          </p>
          <p>
            If we become aware of a security incident involving personal
            information, we will investigate and provide notifications as required
            by applicable law.
          </p>

          <h2 id="children">13. Children’s Privacy</h2>
          <p>
            The Services are not directed to children under 13, and N4Cluster does
            not knowingly collect personal information online from children under
            13 without appropriate authorization. If we learn that we have
            collected personal information from a child under 13 in circumstances
            where applicable law requires parental consent or another
            authorization, we will take reasonable steps to delete or otherwise
            address the information as required by law. Parents or guardians who
            believe a child has provided personal information may contact{" "}
            <a href="mailto:privacy@n4cluster.com">privacy@n4cluster.com</a>.
          </p>

          <h2 id="your-rights">14. Your Privacy Rights and Choices</h2>
          <p>
            Depending on where you live and subject to applicable law, you may
            have rights regarding your personal information, which may include the
            right to:
          </p>
          <ul>
            <li>
              Know or confirm whether we process personal information about you.
            </li>
            <li>Access personal information we maintain about you.</li>
            <li>Correct inaccurate personal information.</li>
            <li>Delete personal information, subject to legal exceptions.</li>
            <li>Obtain a portable copy of certain personal information.</li>
            <li>
              Opt out of certain targeted advertising, sale, sharing, or
              qualifying profiling where applicable.
            </li>
            <li>
              Withdraw consent where processing is based on consent, without
              affecting processing that occurred before withdrawal.
            </li>
            <li>Appeal a decision on a privacy request where applicable.</li>
            <li>Exercise privacy rights without unlawful discrimination.</li>
          </ul>
          <p>
            To exercise a privacy right, email{" "}
            <a href="mailto:privacy@n4cluster.com">privacy@n4cluster.com</a> or use
            the contact method listed in Section 17. We may need to verify your
            identity and authority before completing certain requests. Authorized
            agents may submit requests where permitted by law, subject to
            verification requirements.
          </p>
          <p>
            You may update certain account information through your account
            settings where available. You may also request account closure. We may
            retain information after closure when required or permitted for
            security, fraud prevention, transaction records, legal compliance,
            dispute resolution, or other legitimate purposes described in this
            Policy.
          </p>
          <p>
            We currently do not sell personal information or share it for
            cross-context behavioral advertising. Because we do not currently
            engage in those practices, an opt-out mechanism for such activity is
            not presently necessary. If those practices change, we will provide
            legally required opt-out methods and honor applicable universal opt-out
            preference signals where required by law.
          </p>

          <h2 id="state-disclosures">15. U.S. State Privacy Disclosures</h2>
          <p>
            Certain U.S. state privacy laws may apply depending on the state, the
            nature of the data, and statutory applicability thresholds. Where
            applicable, the following summary describes categories of personal
            information N4Cluster may collect or process in connection with the
            Services. Not every category applies to every person.
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Examples</th>
                  <th>N4Cluster Processing</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Identifiers and contact information</td>
                  <td>
                    Name, email, phone number, account identifiers, IP address,
                    delivery or billing address
                  </td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Commercial and transaction information</td>
                  <td>
                    Orders, purchase history, promotions used, refunds,
                    transaction status
                  </td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Internet, device, and usage information</td>
                  <td>
                    Browser/device data, logs, feature interactions, diagnostics,
                    security events
                  </td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Location information</td>
                  <td>
                    Customer-provided delivery address and approximate IP-derived
                    location; no current precise GPS permission
                  </td>
                  <td>Limited</td>
                </tr>
                <tr>
                  <td>Professional or business information</td>
                  <td>
                    Restaurant owner, manager, employee, or administrator business
                    contact and role information
                  </td>
                  <td>Merchant users</td>
                </tr>
                <tr>
                  <td>Inferences and analytics</td>
                  <td>
                    Preferences or operational insights derived from order,
                    merchant, and usage data for recommendations, forecasting, or
                    analytics
                  </td>
                  <td>May be processed</td>
                </tr>
                <tr>
                  <td>Sensitive or health-related information</td>
                  <td>
                    Information voluntarily included in dietary, allergy,
                    accessibility, or other special instructions
                  </td>
                  <td>Limited / voluntary</td>
                </tr>
                <tr>
                  <td>Payment credentials</td>
                  <td>Full payment card numbers and security codes</td>
                  <td>No — processed by payment processors</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            For the preceding 12 months, N4Cluster has not sold personal
            information for money or shared personal information for cross-context
            behavioral advertising. We disclose personal information to
            restaurants and service providers for the business and operational
            purposes described in this Policy. We do not provide one restaurant’s
            customer data to another restaurant for that restaurant’s marketing
            without explicit customer consent.
          </p>
          <p>
            If information voluntarily provided in an order instruction is subject
            to a specialized state health-data or sensitive-data law, N4Cluster
            will process that information in accordance with applicable legal
            requirements. Additional notices or consents may apply where required.
          </p>

          <h2 id="changes">16. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes
            in the Services, technology, legal requirements, or our information
            practices. We will post the updated version with a revised “Last
            Updated” date. If changes are material, we may provide additional
            notice as required by law or appropriate to the circumstances.
          </p>

          <h2 id="contact">17. Contact Us</h2>
          <p>For questions, comments, or privacy requests, contact:</p>
          <address className="not-italic">
            N4Cluster Inc
            <br />
            2001 Cumberland Valley Dr
            <br />
            Franklin, TN 37064
            <br />
            United States
            <br />
            Privacy:{" "}
            <a href="mailto:privacy@n4cluster.com">privacy@n4cluster.com</a>
            <br />
            General:{" "}
            <a href="mailto:contact@n4cluster.com">contact@n4cluster.com</a>
            <br />
            Website:{" "}
            <a href="https://www.n4cluster.com">https://www.n4cluster.com</a>
          </address>
        </div>
      </Container>
    </section>
  );
}
