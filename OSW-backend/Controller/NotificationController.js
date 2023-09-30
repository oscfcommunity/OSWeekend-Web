const cron = require("node-cron");
const Notification = require("../Models/Notification");
const User = require("../Models/Users");
const sendMail = require("../Services/mailService");
const Event = require("../Models/Event");
const { text } = require("express");

exports.GetUserNotification = async (req, res) => {
  try {
    const id = req.user._id;
    if (!id) {
      return res.status(400).send({ success: false, message: "Invalid ID" });
    }

    const notifications = await Notification.find(
      { "recipients.recipient": { $in: id } },
      {
        _id: 1,
        content: 1,
        timestamp: 1,
        link: 1,
        recipients: { $elemMatch: { recipient: id } },
      }
    );

    if (!notifications || notifications.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "No notifications found" });
    }

    const readStatus = notifications.map((notification) => ({
      _id: notification._id,
      content: notification.content,
      link: notification.link,
      timestamp: notification.timestamp,
      read: notification.recipients[0].read,
    }));

    return res.status(200).send({ success: true, notifications: readStatus });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

exports.updateReadStatus = async (req, res) => {
  try {
    const notificationID = req.body.notificationID;
    const recipientID = req.user._id;
    const notification = await Notification.findOneAndUpdate(
      {
        _id: notificationID,
        "recipients.recipient": recipientID,
      },
      {
        $set: {
          "recipients.$.read": true,
        },
      },
      { new: true }
    );

    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Read status updated successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update read status." });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const notificationID = req.body.notificationID;
    const recipientID = req.user._id;

    const notification = await Notification.findOneAndUpdate(
      {
        _id: notificationID,
        "recipients.recipient": recipientID,
      },
      {
        $pull: {
          recipients: { recipient: recipientID },
        },
      },
      { new: true }
    );

    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found." });
    }

    // Check if recipients array is empty then delete it
    if (notification.recipients.length === 0) {
      await Notification.findByIdAndDelete(notificationID);
      return res.status(200).json({
        success: true,
        message: "Notification and recipient deleted successfully.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipient removed from notification successfully.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete notification." });
  }
};

exports.markAllAsRead = async (req, res) => {
  try {
    const recipientID = req.user._id;

    await Notification.updateMany(
      { "recipients.recipient": recipientID },
      { $set: { "recipients.$.read": true } }
    );

    res.status(200).json({
      success: true,
      message: "All notifications marked as read successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to mark all notifications as read.",
    });
  }
};

exports.deleteAllNotifications = async (req, res) => {
  try {
    const recipientID = req.user._id;

    await Notification.deleteMany({ "recipients.recipient": recipientID });

    res.status(200).json({
      success: true,
      message: "All notifications deleted successfully.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete all notifications." });
  }
};

//Event notification creation
exports.NotifyUsersEvent = async (event, content, title, type) => {
  try {
    let users;
    if (event.hosted_by_user) {
      users = await User.find({ _id: { $ne: event.hosted_by_user } });
    } else {
      users = await User.find({});
    }
    console.log(type);
    CreateNotificationEvent(users, event, content);
    switch (type) {
      case "create":
        for (const user of users) {
          const text = `Dear ${
            user.profile.first_name + " " + user.profile.last_name
          },\n${content}`;
          try {
            const mailRes = await sendMail(user.email, title, text);
          } catch (error) {
            console.error("Error sending email:", error);
          }
        }
        break;
    }
  } catch (error) {
    console.error("Error sending emails to NGOs:", error);
  }
};

const CreateNotificationEvent = async (users, event, content) => {
  try {
    let recipients = [];
    if (!event.hosted_by_user) {
      for (const user of users) {
        recipients.push({ recipient: user._id });
      }
    } else {
      for (const user of users) {
        if (!user._id.equals(event.hosted_by_user)) {
          recipients.push({ recipient: user._id });
        }
      }
    }
    const newNotification = new Notification({
      content: content,
      recipients: recipients,
      link: `/event/details/${event._id}`,
    });

    await newNotification.save();
  } catch (error) {
    console.log("Some error in creating notification ", error);
  }
};

const NotifyEventDeadline = async (req, res) => {
  const currentDate = new Date();

  try {
    const events = await Event.find({
      $or: [{ event_date: { $gte: currentDate + 6 } }],
      happened: { $ne: true },
    });

    // Calculate the specific date 5 days from now
    const specificDate = new Date();
    specificDate.setDate(specificDate.getDate() + 5);

    specificDate.setUTCHours(0, 0, 0, 0);

    // Filter events with event_date equal to specificDate
    let filteredEvents = [];
    for (const event of events) {
      const eventdate = new Date(event.event_date);
      if (eventdate.getDate() === specificDate.getDate()) {
        filteredEvents.push(event);
      }
    }
    for (const event of filteredEvents) {
      let users;
      if (event.hosted_by_user) {
        users = await User.find({ _id: { $ne: event.hosted_by_user } });
      } else {
        users = await User.find({});
      }
      let recipients = [];
      for (const user of users) {
        recipients.push({ recipient: user._id });
      }
      const newNotification = new Notification({
        content: `This Event "${event.event_name}" will be happening after 5 days from today register for it fast as the registration will be open for next 3 days only.`,
        recipients: recipients,
        link: `/event/details/${event._id}`,
      });

      await newNotification.save();
    }
  } catch (error) {
    console.error("Error sending event notifications:", error);
  }
};

const RegisteredEventRemainder = async (req, res) => {
  const currentDate = new Date();

  try {
    const specificDate = new Date();
    specificDate.setDate(specificDate.getDate() + 1);
    specificDate.setUTCHours(0, 0, 0, 0);
    console.log(currentDate, specificDate);
    const events = await Event.find({
      $or: [{ event_date: { $gte: currentDate } }],
      happened: { $ne: true },
    });
    let filteredEvents = [];
    for (const event of events) {
      const eventdate = new Date(event.event_date);
      if (eventdate.getDate() === specificDate.getDate()) {
        filteredEvents.push(event);
      }
    }
    for (const event of filteredEvents) {
      const attendees = event.attendees;
      const users = await User.find({ _id: { $in: attendees } });

      let recipients = [];
      for (const user of users) {
        recipients.push({ recipient: user._id });
      }

      const newNotification = new Notification({
        content: `The Event "${event.event_name}" will be happening tomorrow and you have registered for it so be prepared for this evnet!`,
        recipients: recipients,
        link: `/event/details/${event._id}`,
      });

      await newNotification.save();
    }
  } catch (error) {
    console.error("Error sending event notifications:", error);
  }
};

exports.AttendeeIncreaseNotification = async (attendees, event) => {
  try {
    let recipitents = [];
    recipitents.push({ recipient: event.hosted_by_user });
    const newNotification = new Notification({
      content: `Congratulations your event "${event.event_name}" now has ${attendees} attendees.`,
      recipients: recipitents,
      link: `/event/details/${event._id}`,
    });

    await newNotification.save();
  } catch (error) {
    console.error("Error sending event notifications:", error);
  }
};

// Schedule the function to run every day at 8:00 AM
cron.schedule("0 9 * * *", () => {
  console.log("Running NotifyEventDeadline function...");
  NotifyEventDeadline();
  RegisteredEventRemainder();
});

//Resource Library notification creation
exports.NotifyUsersProjects = async (project, content, title, type) => {
  try {
    let users;
    if (project.hosted_by_user) {
      users = await User.find({ _id: { $ne: project.hosted_by_user } });
    } else {
      users = await User.find({});
    }
    CreateNotificationProjects(users, project, content);
    switch (type) {
      case "create":
        for (const user of users) {
          const text = `Dear ${
            user.profile.first_name + " " + user.profile.last_name
          },\n${content}`;
          try {
            const mailRes = await sendMail(user.email, title, text);
          } catch (error) {
            console.error("Error sending email:", error);
          }
        }
        break;
    }
  } catch (error) {
    console.error("Error sending emails to NGOs:", error);
  }
};

const CreateNotificationProjects = async (users, project, content) => {
  try {
    let recipients = [];
    if (!project.hosted_by_user) {
      for (const user of users) {
        recipients.push({ recipient: user._id });
      }
    } else {
      for (const user of users) {
        if (!user._id.equals(project.hosted_by_user)) {
          recipients.push({ recipient: user._id });
        }
      }
    }
    const newNotification = new Notification({
      content: content,
      recipients: recipients,
      link: `/resourceLibrary`,
    });

    await newNotification.save();
  } catch (error) {
    console.log("Some error in creating notification ", error);
  }
};
