export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="max-w-3xl mx-auto px-4 py-8 text-center text-sm text-gray-400">
        © 2026 TwiGram · Data dari{' '}
        <a
          href="https://jsonplaceholder.typicode.com"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 hover:underline"
        >
          JSONPlaceholder
        </a>
      </div>
    </footer>
  )
}