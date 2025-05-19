import prisma from "@/lib/prisma";
import Stripe from "stripe";
import { stripe } from "@/utils/stripe";
import { Plan } from "@/generated/prisma";
import { sub } from "date-fns";

/**
 * Salvar, atualizar ou deletar informações das assinaturas no banco de dados, sincronizando com a Stripe.
 *
 * @async
 * @function manageSubscription
 * @param {string} subscriptionId - O ID da assinatura na Stripe que deseja gerenciar.
 * @param {string} customerId - O ID do cliente na Stripe associado à assinatura.
 * @param {boolean} createAction - Indica se uma nova assinatura deve ser criada ou atualizada.
 * @param {boolean} deleteAction - Indica se uma assinatura deve ser deletada.
 * @param {Plan} [type] - O plano associado à assinatura (opcional).
 * @returns {Promise<Response|void>} - Uma Promise que resolve para uma resposta ou void se a assinatura for deletada.
 */

export async function manageSubscription(
  subscriptionId: string,
  customerId: string,
  createAction: false,
  deleteAction: false,
  type?: Plan
) {
  // Buscar do banco de dados o usuário com esse customerId
  // Salvar os dados da assinatura feita no banco

  const findUser = await prisma.user.findFirst({
    where: {
      stripe_customer_id: customerId,
    },
  });

  if (!findUser) {
    return Response.json(
      {
        error: "Falha ao realizar a assinatura",
      },
      { status: 400 }
    );
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: findUser.id,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
    plan: type ?? "BASIC",
  };

  if (subscriptionId && deleteAction) {
    await prisma.subscription.delete({
      where: {
        id: subscriptionId,
      },
    });
    return;
  }

  if (createAction) {
    try {
      await prisma.subscription.create({
        data: subscriptionData,
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const findSubscription = await prisma.subscription.findFirst({
        where: {
          id: subscriptionId,
        },
      });

      if (!findSubscription) return;

      await prisma.subscription.update({
        where: {
          id: findSubscription.id,
        },
        data: {
          status: subscription.status,
          priceId: subscription.items.data[0].price.id,
          plan: type ?? "BASIC",
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
