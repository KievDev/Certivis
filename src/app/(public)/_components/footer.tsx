export function Footer() {
  return (
    <footer className="py-6 text-center text-gray-500 text-sm md:text-base">
      <p className="select-none">
        Todos os direitos reservados © {new Date().getFullYear()} -{" "}
        <span className="hover:text-emerald-500 duration-300">@Certivis</span>
      </p>
    </footer>
  );
}
