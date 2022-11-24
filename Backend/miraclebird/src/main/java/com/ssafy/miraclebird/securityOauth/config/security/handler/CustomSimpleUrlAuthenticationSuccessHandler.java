package com.ssafy.miraclebird.securityOauth.config.security.handler;

import com.ssafy.miraclebird.securityOauth.advice.assertThat.DefaultAssert;
import com.ssafy.miraclebird.securityOauth.config.security.OAuth2Config;
import com.ssafy.miraclebird.securityOauth.config.security.util.CustomCookie;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.Token;
import com.ssafy.miraclebird.securityOauth.domain.mapping.TokenMapping;
import com.ssafy.miraclebird.securityOauth.repository.auth.CustomAuthorizationRequestRepository;
import com.ssafy.miraclebird.securityOauth.repository.auth.TokenRepository;
import com.ssafy.miraclebird.securityOauth.service.auth.CustomTokenProviderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class CustomSimpleUrlAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler{

    private final CustomTokenProviderService customTokenProviderService;
    private final OAuth2Config oAuth2Config;
    private final TokenRepository tokenRepository;
    private final CustomAuthorizationRequestRepository customAuthorizationRequestRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        DefaultAssert.isAuthentication(!response.isCommitted());

        String targetUrl = determineTargetUrl(request, response, authentication);

        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Optional<String> redirectUri = CustomCookie.getCookie(request, CustomAuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME).map(Cookie::getValue);

        DefaultAssert.isAuthentication( !(redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) );

        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

        TokenMapping tokenMapping = customTokenProviderService.createToken(authentication);

        Cookie refreshToken = new Cookie("refreshToken", tokenMapping.getRefreshToken());
        Cookie accessToken = new Cookie("accessToken", tokenMapping.getAccessToken());
        refreshToken.setMaxAge(30 * 24 * 60 * 60);

        // optional properties
        refreshToken.setSecure(true);
        refreshToken.setHttpOnly(true);
        refreshToken.setPath("/");

        accessToken.setSecure(true);
        accessToken.setHttpOnly(true);
        accessToken.setPath("/");

        // add cookie to response
        response.addCookie(refreshToken);
        response.addCookie(accessToken);

        Token token = Token.builder()
                            .userEmail(tokenMapping.getUserEmail())
                            .refreshToken(tokenMapping.getRefreshToken())
                            .build();
        tokenRepository.save(token);

        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("token", tokenMapping.getAccessToken())
                .build().toUriString();
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        customAuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }

    private boolean isAuthorizedRedirectUri(String uri) {
        URI clientRedirectUri = URI.create(uri);

        return oAuth2Config.getOauth2().getAuthorizedRedirectUris()
                .stream()
                .anyMatch(authorizedRedirectUri -> {
                    URI authorizedURI = URI.create(authorizedRedirectUri);
                    if(authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
                            && authorizedURI.getPort() == clientRedirectUri.getPort()) {
                        return true;
                    }
                    return false;
                });
    }
}
