export const sendToken = (user, statuscode, res, message) => {
  const token = user.getJWT();

  const isProduction = process.env.NODE_ENV === "production";

  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: isProduction, // true for HTTPS (production), false for HTTP (localhost)
    sameSite: isProduction ? "None" : "Lax"
  };

  res
    .status(statuscode)
    .cookie("token", token, options)
    .json({
      success: true,
      user,
      message,
      token,
    });
};
