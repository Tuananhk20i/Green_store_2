import Link from 'next/link';
import { posts } from '@/lib/news-data';

export const metadata = {
  title: 'Tin tức - Green Store',
  description: 'Cập nhật tin tức, mẹo vặt và thông báo từ Green Store',
};

export default function NewsPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Tin tức</h1>
          <p className="text-gray-600 mb-6">Cập nhật tin tức, mẹo vặt và thông báo từ Green Store.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article key={post.slug} className="border rounded overflow-hidden shadow-sm bg-white">
                <div className="h-44 bg-gray-100 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-2">{new Date(post.date).toLocaleDateString('vi-VN')}</div>
                  <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                  <p className="text-sm text-gray-700 mb-4">{post.excerpt}</p>
                  <Link href={`/news/${post.slug}`} className="inline-block text-lime-600 font-semibold">Xem chi tiết →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
