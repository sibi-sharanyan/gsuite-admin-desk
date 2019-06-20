import GoogleOAuth2Provider from "torii/providers/google-oauth2";

export default GoogleOAuth2Provider.extend({
  fetch(data) {
    return data;
  }
});
