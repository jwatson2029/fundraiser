import Image from "next/image";
import Link from "next/link";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, Facebook, Mail, Twitter } from "lucide-react";

import { DonateForm } from "@/components/sections/donate-form";
import { LiveImpact } from "@/components/sections/live-impact";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { FCS_LOGO_URL, OFFICIAL_HIGH_SCHOOLS } from "@/lib/constants";

export default function HomePage() {
  return (
    <main>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Image src={FCS_LOGO_URL} alt="Forsyth County Schools logo" width={42} height={42} />
            <div>
              <p className="text-sm font-semibold text-brandBlue">Forsyth County Schools Sports & Clubs Fundraiser</p>
              <p className="text-xs text-slate-600">100% split equally among all 8 high schools</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm">
              <a href="#donate">Donate Now</a>
            </Button>
          </div>
        </div>
      </header>
      <a
        href="#donate"
        className="fixed bottom-4 right-4 z-40 rounded-full bg-brandGold px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg md:hidden"
      >
        Donate Now
      </a>

      <section className="section-shell grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="inline-flex rounded-full bg-brandGold/20 px-3 py-1 text-sm font-medium text-brandBlue">
            District-wide equal impact model
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-brandBlue sm:text-5xl">
            Fueling Every Athlete and Club - Equally Across All 8 Forsyth County High Schools
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-700">
            Every dollar raised supports athletics and extracurricular clubs district-wide. Donors cannot designate a
            specific school, ensuring transparent equal funding across all eight official high schools.
          </p>
          <div className="mt-6 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-brandBlue/20 bg-white p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-brandBlue">District Size</p>
              <p className="mt-1 text-xl font-bold text-slate-900">54,000+ students</p>
            </div>
            <div className="rounded-lg border border-brandBlue/20 bg-white p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-brandBlue">Community Diversity</p>
              <p className="mt-1 text-xl font-bold text-slate-900">129 countries</p>
            </div>
            <div className="rounded-lg border border-brandBlue/20 bg-white p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-brandBlue">Language Reach</p>
              <p className="mt-1 text-xl font-bold text-slate-900">69 languages</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#donate">Donate Now</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#about">Learn More</a>
            </Button>
          </div>
        </div>
        <DonateForm />
      </section>

      <LiveImpact />

      <section id="about" className="section-shell pt-0">
        <h2 className="text-3xl font-bold text-brandBlue">About the Fundraiser</h2>
        <p className="mt-4 text-slate-700">
          The Forsyth County Schools Sports & Clubs Fundraiser exists to strengthen opportunities for every student who
          participates in athletics and extracurricular programs across the district. As participation grows, so do the
          needs for modern equipment, safe and well-maintained facilities, updated uniforms, transportation support,
          quality coaching resources, and reliable funding for club events and competitions.
        </p>
        <p className="mt-4 text-slate-700">
          This fundraiser is intentionally built around one district-wide fairness rule: <strong>100% of every donation
          is split equally among all 8 official Forsyth County high schools</strong>. Donors cannot direct funds to a
          single school. This ensures transparent, balanced support so students at Alliance Academy for Innovation,
          Denmark, East Forsyth, Forsyth Central, Lambert, North Forsyth, South Forsyth, and West Forsyth all benefit
          together.
        </p>
        <p className="mt-4 text-slate-700">
          Whether you are a parent, alumni member, local business, or community supporter, your contribution helps
          expand access, improve student experiences, and keep programs strong for current and future generations.
          Every gift, one-time or monthly, powers opportunities that extend beyond one team or one club and strengthen
          the entire Forsyth County Schools community.
        </p>
        <div className="mt-6 rounded-2xl border border-brandBlue/15 bg-gradient-to-r from-brandBlue to-blue-800 p-6 text-white">
          <h3 className="text-2xl font-bold">Why we are doing this now</h3>
          <p className="mt-3 max-w-3xl text-blue-100">
            Student participation in sports and extracurricular programs keeps growing across the district. Teams and
            clubs need updated equipment, safer facilities, travel support, and equitable resources so every student
            has access to opportunities regardless of which high school they attend.
          </p>
          <p className="mt-3 max-w-3xl text-blue-100">
            This fundraiser protects fairness: one district, one mission, one equal split across all 8 schools.
          </p>
        </div>
      </section>

      <section className="section-shell pt-0">
        <h2 className="text-3xl font-bold text-brandBlue">Schools Supported</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OFFICIAL_HIGH_SCHOOLS.map((school) => (
            <div key={`grid-${school.name}`} className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="mb-3 flex h-16 items-center justify-center overflow-hidden rounded-md bg-slate-100 p-2">
                <Image src={school.logoUrl} alt={`${school.name} logo`} width={180} height={64} className="h-full w-auto object-contain" />
              </div>
              <p className="font-medium text-slate-900">{school.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell pt-0">
        <h2 className="text-3xl font-bold text-brandBlue">Transparency & FAQ</h2>
        <Accordion.Root type="single" collapsible className="mt-6 space-y-3">
          {[
            {
              q: "How are donations distributed?",
              a: "100% of all donations are split equally among Alliance Academy for Innovation, Denmark, East Forsyth, Forsyth Central, Lambert, North Forsyth, South Forsyth, and West Forsyth High School."
            },
            {
              q: "Can I donate to just one school?",
              a: "No. To preserve district-wide fairness and transparency, donor designation by school is not permitted."
            },
            {
              q: "Are donations tax deductible?",
              a: "Consult your tax advisor. The district or fundraising partner should publish applicable 501(c)(3) or compliance documentation."
            },
            {
              q: "How quickly do schools receive funds?",
              a: "Donations are tracked in real time, then distributed in equal shares to all 8 high schools based on the official reporting schedule."
            },
            {
              q: "Can businesses sponsor this fundraiser?",
              a: "Yes. Businesses can give one-time or recurring monthly support, and may include affiliation details for recognition."
            },
            {
              q: "Can I donate anonymously?",
              a: "Yes. Donor name is optional and recognition wall display is opt-in only."
            },
            {
              q: "What donation methods are accepted?",
              a: "Secure online donations are processed through Stripe Checkout, supporting standard card and wallet options available in your region."
            },
            {
              q: "Is there a minimum donation?",
              a: "Yes, the online minimum is $5 so payment processing remains efficient and secure."
            },
            {
              q: "Can monthly donors cancel later?",
              a: "Yes. Monthly supporters can manage or cancel recurring payments through Stripe billing tools."
            },
            {
              q: "What programs are covered by this fundraiser?",
              a: "Athletics and extracurricular clubs are included, such as team sports, band, robotics, debate, arts, and student leadership activities."
            }
          ].map((item) => (
            <Accordion.Item key={item.q} value={item.q} className="rounded-lg border border-slate-200 bg-white px-4">
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-left font-semibold text-brandBlue">
                  {item.q} <ChevronDown className="h-4 w-4" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="pb-4 text-slate-700">{item.a}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </section>

      <footer className="bg-brandBlue text-white">
        <div className="section-shell py-10">
          <p className="text-lg font-semibold">Forsyth County Schools Sports & Clubs Fundraiser</p>
          <p className="mt-2 text-sm text-blue-100">1120 Dahlonega Highway, Cumming, GA 30040</p>
          <p className="mt-1 text-sm text-blue-100">Contact: fundraising@forsythk12.tech</p>
          <div className="mt-4 flex gap-4 text-sm">
            <Link href="https://www.forsyth.k12.ga.us" target="_blank" className="underline">
              Official District Website
            </Link>
            <span>|</span>
            <span>Equal split model: all 8 high schools benefit equally</span>
          </div>
          <div className="mt-5 flex gap-2">
            <Button asChild variant="gold" size="sm">
              <a
                href="https://twitter.com/intent/tweet?text=Support%20Forsyth%20County%20Schools%20Sports%20%26%20Clubs%20Fundraiser%20-%20100%25%20split%20equally%20across%208%20high%20schools!&url=https://fundraiser.forsythk12.tech"
                target="_blank"
                rel="noreferrer"
              >
                <Twitter className="mr-2 h-4 w-4" /> Share on X
              </a>
            </Button>
            <Button asChild variant="gold" size="sm">
              <a href="https://www.facebook.com/sharer/sharer.php?u=https://fundraiser.forsythk12.tech" target="_blank" rel="noreferrer">
                <Facebook className="mr-2 h-4 w-4" /> Share on Facebook
              </a>
            </Button>
            <Button asChild variant="gold" size="sm">
              <a href="mailto:?subject=Support Forsyth County Schools Fundraiser&body=Donate at https://fundraiser.forsythk12.tech">
                <Mail className="mr-2 h-4 w-4" /> Share by Email
              </a>
            </Button>
          </div>
        </div>
      </footer>
    </main>
  );
}
