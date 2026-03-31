export default function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div
      className={`fixed right-4 top-4 rounded px-4 py-2 text-white shadow ${
        toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-600'
      }`}
    >
      {toast.message}
    </div>
  );
}
