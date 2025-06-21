import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import photoImg from "../../../../public/foto1.png";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Prisma, User } from "@/generated/prisma";
import { PremiumCardBadge } from "./premium-badge";

type UserWithSubscription = Prisma.UserGetPayload<{
  include: { subscription: true };
}>;

interface ProfessionalsProps {
  professionals: UserWithSubscription[];
}

export function Professionals({ professionals }: ProfessionalsProps) {
  return (
    <section className="bg-gray-50 py-16">
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8" // sm:px-6 = padding left and right 6 on small screens, lg:px-8 = padding left and right 8 on large screens
      >
        <h2 className="text-3xl text-center mb-12 font-bold select-none">
          Profissionais
        </h2>
        <section
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" // sm:grid-cols-2 = 2 columns on small screens, lg:grid-cols-4 = 4 columns on large screens
        >
          {professionals.map((clinic) => (
            <Card
              className="overflow-hidden p-0 hover:shadow-lg duration-300"
              key={clinic.id}
            >
              <CardContent className="p-0">
                <div>
                  <div className="relative h-48">
                    <Image
                      src={clinic.image ?? photoImg}
                      alt="Foto da clínica"
                      fill
                    />
                    {clinic?.subscription?.status === "active" &&
                      clinic?.subscription?.plan === "PROFESSIONAL" && (
                        <PremiumCardBadge />
                      )}
                  </div>
                </div>
                <div
                  className="p-4 space-y-4 min-h-[160px] flex flex-col justify-between" // space-y-4 = space between elements vertically 4
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{clinic.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {clinic.address ?? "Endereço não informado"}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/clinica/${clinic.id}`}
                    target="_blank"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center py-2 rounded-md text-sm md:text-base font-medium " // md:text-base = font size base on medium screens
                  >
                    Marcar consulta
                    <ArrowRight className="ml-2" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </section>
  );
}
