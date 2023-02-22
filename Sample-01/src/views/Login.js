import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
    //kimura: forInvitation https://github.com/auth0/auth0-react/blob/master/EXAMPLES.md

        const { loginWithRedirect } = useAuth0();
        const url = window.location.href;
        // const params = new URLSearchParams(url.search)
        const inviteMatches = url.match(/invitation=([^&]+)/);
        const orgMatches = url.match(/organization=([^&]+)/);
        if (inviteMatches && orgMatches) {
          loginWithRedirect({
            authorizationParams: {
              organization: orgMatches[1],
              invitation: inviteMatches[1],
            }
          });
        }

        //組織のサインアップ表示：エラーとなる
        // loginWithRedirect({
        //     authorizationParams: {
        //       screen_hint:"signup",
        //       organization: 'org_23TKPAv1T8ihNBol', //test-org-kimura
        //     }
        //   });

    }
  
  export default Login;