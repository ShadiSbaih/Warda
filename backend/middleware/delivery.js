module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  if (!["delivery", "admin"].includes(req.user.role)) {
    return res.status(403).json({ success: false, message: "Delivery access required" });
  }

  next();
};
