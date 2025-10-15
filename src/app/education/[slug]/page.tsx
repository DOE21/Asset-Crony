import Link from 'next/link';
import { Building2, ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
  return [
    { slug: 'fractional-investing' },
    { slug: 'how-asset-crony-works' },
    { slug: 'secondary-market' },
    { slug: 'p2p-lending-explained' },
    { slug: 'blockchain-transparency' },
    { slug: 'investor-safety' },
    { slug: 'tax-implications' },
    { slug: 'getting-started' }
  ];
}

export default async function EducationTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Building2 className="h-8 w-8 text-navy" />
            <span className="ml-2 text-xl font-display font-bold text-navy">Asset Crony</span>
          </Link>
          <Link href="/education" className="flex items-center text-gray-600 hover:text-navy transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Education
          </Link>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">
            {slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
          </h1>
          <p className="text-gray-600 mb-6">This is a placeholder article for the selected topic. Replace this with real educational content tailored to Asset Crony investors.</p>
          <div className="prose max-w-none">
            <p>Coming soon: rich content, diagrams, examples, and videos to help you understand fractional real estate, blockchain transparency, secondary markets, and peer-to-peer lending.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
