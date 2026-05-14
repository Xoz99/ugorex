import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { BrandStrip } from '@/components/sections/brand-strip'
import { ProblemSection } from '@/components/sections/problem-section'
import { ProductRevealSection } from '@/components/sections/product-reveal-section'
import { TechLayersSection } from '@/components/sections/tech-layers-section'
import { DurabilityTestSection } from '@/components/sections/durability-test-section'
import { CompatibilitySection } from '@/components/sections/compatibility-section'
import { LifestyleSection } from '@/components/sections/lifestyle-section'
import { SocialProofSection } from '@/components/sections/social-proof-section'
import { PackagingSection } from '@/components/sections/packaging-section'
import { SetupSection } from '@/components/sections/setup-section'
import { FinalCTASection } from '@/components/sections/final-cta-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div className="relative z-10 bg-background">
        <BrandStrip />
        <ProblemSection />
        <ProductRevealSection />
        <SetupSection />
        <TechLayersSection />
        <DurabilityTestSection />
        <CompatibilitySection />
        <LifestyleSection />
        <SocialProofSection />
        <PackagingSection />
        <FinalCTASection />
        <Footer />
      </div>
    </main>
  )
}
