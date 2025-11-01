import Link from 'next/link';
import Image from 'next/image';
import { posts } from '@/lib/news-data';

export const metadata = {
  title: 'Tin mới nhất - Green Store',
  description: 'Các tin tức mới nhất và bài viết nổi bật từ Green Store',
};

export default function LatestNewsPage() {
  const sorted = [...posts].sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative">
        <div
          className="h-56 sm:h-72 lg:h-96 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1400&q=60')" }}
        >
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white px-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">TIN MỚI NHẤT</h1>
              <p className="mt-2 text-sm sm:text-base opacity-90">Cập nhật tin tức, mẹo vặt và thông báo từ Green Store</p>
            </div>
          </div>
        </div>

  <div className="bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-600 flex items-center justify-between">
            <nav className="flex items-center gap-2">
              <Link href="/" className="hover:text-lime-600">HOME</Link>
              <span className="text-gray-300">&gt;</span>
              <Link href="/news" className="hover:text-lime-600">TIN TỨC</Link>
              <span className="text-gray-300">&gt;</span>
              <span className="text-lime-600 font-semibold">TIN MỚI NHẤT</span>
            </nav>
            <div className="text-sm text-gray-500">Có {posts.length} bài viết</div>
          </div>
        </div>
      </section>

      {/* List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {sorted.map((post) => (
                  <article key={post.slug} className="flex gap-6 items-start">
                    <div className="w-40 h-28 flex-shrink-0 overflow-hidden rounded">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">{new Date(post.date).toLocaleDateString('vi-VN')}</div>
                      <h2 className="text-xl font-semibold mb-2"><Link href={`/news/${post.slug}`} className="hover:text-lime-600">{post.title}</Link></h2>
                      <p className="text-gray-700 mb-2">{post.excerpt}</p>
                      <Link href={`/news/${post.slug}`} className="text-lime-600 font-semibold">Đọc tiếp →</Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-6">
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="font-semibold mb-3">Bài viết nổi bật</h3>
                  <ul className="space-y-3 text-sm">
                    {sorted.slice(0, 5).map((p) => (
                      <li key={p.slug}>
                        <Link href={`/news/${p.slug}`} className="hover:text-lime-600">{p.title}</Link>
                        <div className="text-xs text-gray-500">{new Date(p.date).toLocaleDateString('vi-VN')}</div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 bg-white p-4 rounded shadow">
                  <h4 className="font-semibold mb-2">Danh mục</h4>
                  <ul className="text-sm space-y-2">
                    <li><Link href="/news" className="hover:text-lime-600">Tin mới nhất</Link></li>
                    <li><Link href="/news" className="hover:text-lime-600">Hướng dẫn</Link></li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
