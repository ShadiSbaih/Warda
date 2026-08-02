const Reminder = require("../models/Reminder");

// GET /api/reminders — Get all reminders for current user
exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.user._id }).sort({ date: 1 });

    res.json({ success: true, data: reminders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/reminders — Create a new reminder
exports.createReminder = async (req, res) => {
  try {
    const { title, person, date, occasion, notifyDaysBefore } = req.body;

    const reminder = await Reminder.create({
      user: req.user._id,
      title,
      person,
      date,
      occasion,
      notifyDaysBefore: notifyDaysBefore ?? 1,
    });

    res.status(201).json({ success: true, data: reminder });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT /api/reminders/:id — Update a reminder
exports.updateReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!reminder) {
      return res.status(404).json({ success: false, message: "Reminder not found" });
    }

    res.json({ success: true, data: reminder });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE /api/reminders/:id — Delete a reminder
exports.deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!reminder) {
      return res.status(404).json({ success: false, message: "Reminder not found" });
    }

    res.json({ success: true, message: "Reminder deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
