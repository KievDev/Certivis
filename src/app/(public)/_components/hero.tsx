import { Button } from "@/components/ui/button";
import Image from "next/image";
import doctorImg from "../../../../public/doctor-hero.png";

export function Hero() {
  return (
    <section className="bg-white">
      <div
        className="container mx-auto px-4 pt-20 pb-4 sm:pb-0 sm:px-6 lg:px-8" // sm:pb-0 = padding bottom 0 on small screens, sm:px-6 = padding left and right 6 on small screens, lg:px-8 = padding left and right 8 on large screens
      >
        <main className="flex items-center justify-center">
          <article
            className="flex-[2] max-w-3xl space-y-8 flex flex-col justify-center" // max-w-3xl = maximum width 3xl, space-y-8 = space between elements vertically 8
          >
            <h1
              className="text-4xl lg:text-5xl font-bold max-w-2xl tracking-tight select-none" // text-4xl = font size 4, lg:text-5xl = font size 5 on large screens, max-w-2xl = maximum width 2xl, tracking-tight = less space between letters, select-none = no selection
            >
              Encontre os melhores profissionais em um só lugar!
            </h1>
            <p
              className="text-base md:text-lg text-gray-600 select-none" // md:text-lg = font size large on medium screens
            >
              Somos uma plataforma para profissionais de saúde focada em
              agilizar seu atendimento de forma simplificada e organizada.
            </p>
            <Button className="bg-emerald-500 hover:bg-emerald-400 w-fit px-6 font-semibold">
              Encontre uma clínica
            </Button>
          </article>
          <div
            className="hidden lg:block" // hidden lg:block = hidden on small screens, display block on large screens
          >
            <Image
              src={doctorImg}
              alt="Foto ilustrativa de um profissional da saúde."
              width={340}
              height={400}
              className="object-contain"
              quality={100}
              priority
            />
          </div>
        </main>
      </div>
    </section>
  );
}
