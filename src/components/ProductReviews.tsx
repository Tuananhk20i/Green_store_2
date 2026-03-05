// src/components/ProductReviews.tsx
"use client"
import { useState } from 'react';
import Image from 'next/image';

export default function ProductReviews({ productId, userId, isPurchased }: any) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [images, setImages] = useState<string[]>([]); // URL ảnh sau khi upload

  const handleSendReview = async () => {
    const response = await fetch('/api/products/reviews', {
      method: 'POST',
      body: JSON.stringify({
        product_id: productId,
        user_id: userId,
        rating: isPurchased ? rating : null,
        comment: comment,
        images: isPurchased ? images : [],
        is_purchased: isPurchased
      }),
    });
    if (response.ok) {
      alert("Cảm ơn bạn đã để lại đánh giá!");
      setComment('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-3xl border border-emerald-100 shadow-sm">
      <h3 className="text-2xl font-black text-emerald-950 mb-6">Phản hồi khách hàng</h3>

      {/* BOX VIẾT ĐÁNH GIÁ */}
      <div className="mb-10 p-4 bg-emerald-50/50 rounded-2xl">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Bạn thấy sản phẩm này thế nào?"
          className="w-full p-4 rounded-xl border-none focus:ring-2 focus:ring-emerald-500 mb-4"
          rows={3}
        />

        {isPurchased ? (
          /* GIAO DIỆN CHỦ ĐỘNG (ĐÃ MUA) */
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-emerald-800">Đánh giá:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)} className={`text-xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}>★</button>
              ))}
            </div>
            <div className="text-xs text-gray-500 italic">✨ Bạn có thể đăng kèm hình ảnh thực tế sản phẩm.</div>
            <button onClick={handleSendReview} className="bg-emerald-900 text-white px-8 py-2 rounded-full font-bold hover:bg-emerald-800 self-start transition-all">Gửi đánh giá xác thực</button>
          </div>
        ) : (
          /* GIAO DIỆN BỊ ĐỘNG (CHƯA MUA) */
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Bạn chưa mua sản phẩm? Hãy để lại góp ý tại đây.</span>
            <button onClick={handleSendReview} className="border border-emerald-900 text-emerald-900 px-8 py-2 rounded-full font-bold hover:bg-emerald-100 transition-all">Gửi bình luận</button>
          </div>
        )}
      </div>

      {/* DANH SÁCH HIỂN THỊ */}
      <div className="space-y-6">
        {/* Review Item Example */}
        <div className="pb-6 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-emerald-950">Khách hàng ẩn danh</span>
            {isPurchased && (
              <span className="bg-blue-100 text-blue-600 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Đã mua hàng</span>
            )}
          </div>
          
          {/* Chỉ hiện sao nếu có rating (chủ động) */}
          <div className="flex text-yellow-400 text-sm mb-2">★★★★★</div>
          
          <p className="text-gray-600 leading-relaxed text-sm">Sản phẩm rất tươi ngon, đúng chuẩn Green Store's!</p>
          
          {/* Chỉ hiện ảnh nếu có mảng images (chủ động) */}
          <div className="flex gap-2 mt-4">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-emerald-100">
               <Image src="https://images.unsplash.com/photo-1542838132-92c53300491e" alt="review" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}