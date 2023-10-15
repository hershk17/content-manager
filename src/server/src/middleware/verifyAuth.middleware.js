import jwt from "jsonwebtoken";

async function verifyAuth(request, response, next) {
  // cookie-parser to retrieve the JWT from cookies
  let token = request.cookies["jwt-auth"];

  // if there was no token saved then the route cannot be accesed
  if (!token) {
    return response.status(403).send("No access token provided");
  }

  // if token is good, add its data to the request
  try {
    request.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return response.status(403).send("Invalid access token");
  }

  // move on to the next function in the chain
  next();
}

export default verifyAuth;
