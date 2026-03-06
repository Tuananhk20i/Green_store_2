"use client"

export default function RatingSummary({ summary }: any) {

  const avg = Number(summary.avg_rating || 0).toFixed(1)

  return (
    <div className="flex gap-10 items-center bg-gray-50 p-6 rounded">

      <div className="text-center">
        <div className="text-4xl font-bold text-red-500">
          {avg}
        </div>

        <div className="text-yellow-400 text-xl">
          {"★★★★★".slice(0, Math.round(avg))}
        </div>

        <div className="text-gray-500 text-sm">
          {summary.total_reviews} đánh giá
        </div>
      </div>

    </div>
  )
}