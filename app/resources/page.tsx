"use client";

import { useState } from "react";
import { HeroCentered } from "@/components/sections/HeroCentered";
import { ResourceCard } from "@/components/sections/ResourceCard";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { resources, resourceCategories } from "@/content/pages/resources";

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? resources
      : resources.filter((r) => r.category === activeCategory);

  return (
    <>
      <HeroCentered
        eyebrow="Resources"
        heading="Insights on the future of local commerce"
        subheading="Explore practical thinking on merchant ownership, orchestration, neighborhood demand, and AI-assisted operations."
        primaryCta={{ label: "Subscribe for Updates", href: "#newsletter" }}
      />

      <section className="bg-white py-16 md:py-24">
        <Container>
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {resourceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-cobalt-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((r) => (
                <ResourceCard key={r.href} resource={r} />
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500 py-16">
              No resources in this category yet. Check back soon.
            </p>
          )}
        </Container>
      </section>

      {/* Newsletter section */}
      <section id="newsletter" className="gradient-dark py-16 md:py-24">
        <Container size="lg" className="text-center">
          <SectionIntro
            heading="Stay current on local commerce"
            subheading="Get new resources, insights, and platform updates delivered to your inbox."
            dark
          />
          <div className="flex justify-center">
            <NewsletterForm dark placeholder="Your work email" buttonLabel="Subscribe for Updates" />
          </div>
        </Container>
      </section>
    </>
  );
}
