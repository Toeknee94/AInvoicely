import prisma from '../config/prisma'; // Adjust path if needed

export const notifyUsersBeforeTrialEnds = async () => {
  const twoDaysFromNow = new Date();
  twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);

  const users = await prisma.user.findMany({
    where: {
      trialEndsAt: {
        lte: twoDaysFromNow,
      },
      notifiedTrialEnding: false, // assuming this is a boolean
    },
  });

  for (const user of users) {
    // Ideally send email here via some mailer service
    console.log(`Notify user: ${user.email} - trial ending soon`);

    await prisma.user.update({
      where: { id: user.id },
      data: { notifiedTrialEnding: true },
    });
  }
};
