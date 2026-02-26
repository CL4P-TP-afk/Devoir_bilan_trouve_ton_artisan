export default function Footer() {
  return (
    <footer className="border-top mt-5">
      <div className="container py-4 text-muted small">
        © {new Date().getFullYear()} Trouve ton artisan
      </div>
    </footer>
  );
}