import type { Resource } from "@/components/sections/ResourceCard";

export const resources: Resource[] = [
  {
    category: "Insights",
    title: "Why merchant-owned commerce matters more than ever",
    excerpt:
      "The shift toward platform dependency has cost local businesses more than margin. Here is what reclaiming the customer relationship actually means in practice.",
    href: "/resources/merchant-owned-commerce",
    readTime: "5 min read",
    body: [
      "For the past decade, local businesses have traded ownership for convenience. Marketplace platforms promised reach, but the cost was the customer relationship itself. Today, merchants often have no idea who their customers are, what drives repeat behavior, or how to communicate with them directly.",
      "This is not just a margin problem. When a platform owns the customer, the merchant becomes a fulfillment node. Pricing, visibility, and promotion decisions are made by the platform, not the operator. Over time, this erodes the merchant's ability to build a brand, retain loyalty, or grow on their own terms.",
      "Merchant-owned commerce is the alternative. It means owning the ordering experience, the customer data, and the relationship. It means having the ability to run promotions, adjust pricing, and communicate directly without paying a toll to a third party.",
      "The shift does not require building everything from scratch. Infrastructure like N4Cluster gives merchants the tools to operate independently while still benefiting from shared logistics, neighborhood-level demand, and AI-driven growth. The difference is that the merchant stays in control.",
      "Reclaiming the customer relationship is not a trend. It is the foundation of sustainable local commerce. Businesses that own their channels today will be the ones that compound growth tomorrow.",
    ],
  },
  {
    category: "Insights",
    title: "Infrastructure versus marketplace dependency",
    excerpt:
      "Most businesses are building on top of someone else's infrastructure without realizing the long-term cost. A closer look at what independent operating leverage looks like.",
    href: "/resources/infrastructure-vs-marketplace",
    readTime: "6 min read",
    body: [
      "There is a fundamental difference between using a marketplace and building on infrastructure. A marketplace gives you access to customers, but the platform decides the terms. Infrastructure gives you the tools to build your own channel, on your own terms.",
      "Most local businesses default to marketplaces because they are easy to join. But ease of entry comes with hidden costs: commission rates that compress margins, customer data that stays with the platform, and algorithmic visibility that can change overnight.",
      "The infrastructure model is different. Instead of renting access to someone else's audience, you build your own. You own the storefront, the ordering flow, the customer data, and the brand experience. The infrastructure provider gives you the technology stack, but you keep the value.",
      "This is not about rejecting marketplaces entirely. Many businesses will continue to use them as one channel among several. The question is whether your primary revenue channel is something you own or something you rent.",
      "Independent operating leverage means having the ability to grow without increasing your dependency on a third party. It means your marketing spend builds your brand, not the platform's. It means your repeat customers come back to you, not to the marketplace.",
      "The businesses that understand this distinction early will have a structural advantage. Those that don't will find themselves paying more for less over time.",
    ],
  },
  {
    category: "Insights",
    title: "The role of orchestration in local commerce",
    excerpt:
      "Fragmented systems create invisible costs. Understanding how orchestration reduces operational friction and improves visibility across the order lifecycle.",
    href: "/resources/orchestration-in-local-commerce",
    readTime: "5 min read",
    body: [
      "Most local businesses run on a patchwork of disconnected tools: one system for orders, another for delivery, another for payments, and yet another for customer communication. Each works in isolation. None of them talk to each other.",
      "This fragmentation creates invisible costs. Orders get lost between systems. Delivery status is unclear. Customer issues take longer to resolve because information is scattered across multiple dashboards. Staff spend time on manual coordination that should be automated.",
      "Orchestration is the layer that connects everything. It sits between the merchant's storefront and the operational systems that fulfill orders. It routes orders to the right kitchen, assigns delivery to the right partner, tracks status in real time, and surfaces exceptions before they become problems.",
      "The value of orchestration is not just efficiency. It is visibility. When every order flows through a single orchestration layer, the merchant can see exactly what is happening at every stage. They can identify bottlenecks, measure performance, and make decisions based on data instead of intuition.",
      "N4Sync is built on this principle. It connects POS systems, delivery partners, payment processors, and customer-facing channels into a single operational flow. The result is less friction, fewer errors, and more time for merchants to focus on what they do best.",
    ],
  },
  {
    category: "Insights",
    title: "AI that supports operators instead of replacing judgment",
    excerpt:
      "AI in commerce is often oversold as automation. The more valuable application is helping operators make better decisions faster — without removing control.",
    href: "/resources/ai-for-operators",
    readTime: "4 min read",
    body: [
      "The dominant narrative around AI in commerce is automation: remove the human, let the algorithm decide. But for local businesses, fully automated decision-making is often the wrong approach. The operator knows their business, their neighborhood, and their customers better than any model.",
      "The more valuable application of AI is decision support. Instead of replacing the operator's judgment, AI should enhance it. Surface the right data at the right time. Identify patterns that are hard to see manually. Suggest actions, but let the operator decide.",
      "This is the philosophy behind N4Logic. It analyzes order patterns, customer behavior, and market conditions to generate actionable insights. But it never takes action without the merchant's approval. It never changes pricing, launches promotions, or adjusts operations autonomously.",
      "There are hard guardrails built into the system. N4Logic will never share customer data across merchants. It will never optimize for platform revenue at the merchant's expense. It will never make irreversible decisions without explicit consent. These are not just policies; they are architectural constraints.",
    ],
  },
  {
    category: "Insights",
    title: "How neighborhood demand compounds over time",
    excerpt:
      "Local commerce has network effects that are often underestimated. When merchant-owned engagement replaces marketplace-driven discovery, repeat behavior changes.",
    href: "/resources/neighborhood-demand",
    readTime: "5 min read",
    body: [
      "Marketplace platforms treat every order as a new acquisition event. The customer opens the app, browses options, and the algorithm decides who gets visibility. This model benefits the platform, not the merchant.",
      "Neighborhood demand works differently. When customers order directly from a merchant's own channel, the relationship is between the customer and the business, not the customer and the platform. Repeat behavior is driven by the merchant's brand, quality, and engagement, not by algorithmic placement.",
      "This creates a compounding effect. Each satisfied direct order increases the likelihood of a repeat order. Each repeat order reduces acquisition cost. Over time, the merchant builds a base of loyal customers who come back because they want to, not because an algorithm showed them a coupon.",
      "The Neighborhood Hub in N4Cluster amplifies this effect. When multiple merchants in a neighborhood operate on the same infrastructure, they create shared demand density. A customer who discovers one merchant through the Hub is exposed to others nearby. Delivery becomes more efficient because routes are denser. The entire neighborhood benefits.",
      "This is the network effect that marketplaces capture for themselves. With merchant-owned infrastructure, the value stays local. The merchants grow, the neighborhood grows, and the customers get a better experience without the platform tax.",
    ],
  },
  {
    category: "Playbooks",
    title: "Designing a better local commerce stack",
    excerpt:
      "A practical framework for evaluating your current tools, identifying fragmentation, and building toward a more coherent operating infrastructure.",
    href: "/resources/local-commerce-stack",
    readTime: "8 min read",
    body: [
      "Most local businesses accumulate tools over time without a coherent strategy. A POS system chosen five years ago. A delivery integration added during the pandemic. A loyalty program from a different vendor. The result is a stack that technically works but creates friction at every seam.",
      "The first step toward a better stack is auditing what you have. List every tool involved in the order lifecycle, from the moment a customer places an order to the moment it is fulfilled and paid for. Note where data moves between systems, where manual steps are required, and where information gets lost.",
      "The second step is identifying the cost of fragmentation. How much time does staff spend on manual coordination? How often do orders fall through the cracks between systems? How much visibility do you lose because data lives in silos? These costs are often invisible but significant.",
      "The third step is defining what a coherent stack looks like for your business. The goal is not to replace everything at once. It is to identify the critical integration points where a single orchestration layer would eliminate the most friction.",
      "For most operators, the highest-value integration points are: order ingestion (bringing all channels into one flow), delivery assignment (routing to the right partner automatically), and customer communication (sending status updates without manual intervention).",
      "A platform like N4Cluster is designed to sit at these integration points. It connects your existing POS, delivery partners, and payment systems into a single flow. You keep the tools that work. You replace the manual glue with automated orchestration.",
      "The final step is measuring improvement. Track order completion rates, average fulfillment time, customer complaint frequency, and staff time spent on coordination. These metrics will tell you whether your stack is getting more coherent or more fragmented over time.",
      "Building a better stack is not a one-time project. It is an ongoing practice of reducing friction, improving visibility, and maintaining control over your operations. The businesses that invest in this practice will operate more efficiently and grow more sustainably than those that don't.",
    ],
  },
];

export const resourceCategories = ["All", "Insights", "Playbooks", "Comparisons", "Case Studies", "Announcements"];
