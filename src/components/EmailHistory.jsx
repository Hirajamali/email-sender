export default function EmailHistory({ history }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
      <h2 className="text-lg font-semibold mb-3 text-zinc-200">
        Sent Emails History
      </h2>

      {history.length === 0 ? (
        <p className="text-sm text-zinc-500">
          No emails have been sent yet.
        </p>
      ) : (
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
          {history.map((item) => (
            <div
              key={item._id}
              className="border border-zinc-800 bg-zinc-950/50 rounded-xl p-3"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-emerald-400">
                  To: {item.to}
                </span>
                <span className="text-xs text-zinc-500">
                  {new Date(item.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm font-semibold text-zinc-200">
                {item.subject}
              </p>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}