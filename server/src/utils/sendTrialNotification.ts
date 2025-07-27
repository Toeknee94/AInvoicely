import User from '../features/users/user.model';

export const notifyUsersBeforeTrialEnds = async () => {
  const twoDaysFromNow = new Date();
  twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);

  const users = await User.find({
    trialEndsAt: { $lte: twoDaysFromNow },
    notifiedTrialEnding: { $ne: true },
  });

  for (const user of users) {
    // Ideally send email here via some mailer service
    console.log(`Notify user: ${user.email} - trial ending soon`);

    user.notifiedTrialEnding = true;
    await user.save();
  }
};
