import { OAuth2Client } from "google-auth-library";

const oAuth2Client = new OAuth2Client({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

const scopes = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

const authorizeUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
});

export const authorize = (req, res) => {
  // res.status(200).json({ authorizeUrl });
  res.redirect(authorizeUrl);
};

export const callback = async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    console.log(tokens);

    oAuth2Client.setCredentials(tokens);

    res.send("Done!!");
  } catch (error) {
    console.error("Error retrieving access token:", error);
    res.status(500).send("Authentication failed");
  }
};
