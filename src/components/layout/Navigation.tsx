import { navigation } from "@/data/navigation";

type NavigationProps = {
  light?: boolean;
};

export default function Navigation({
  light = false,
}: NavigationProps) {
  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {navigation.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`text-[15px] font-semibold tracking-wide transition ${
            light
              ? "text-white hover:text-white/70"
              : "text-dark hover:text-primary"
          }`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}