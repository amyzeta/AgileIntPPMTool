package io.agileintelligence.ppmtool.security;

import io.agileintelligence.ppmtool.domain.UserPrincipal;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Date;

@Component
public class JwtTokenProvider {

    public String generateToken(Authentication authentication) {
        final UserPrincipal user = (UserPrincipal)authentication.getPrincipal();
        final Date now = new Date();
        final Date expiryDate = new Date(now.getTime() + SecurityConstants.EXPIRATION_TIME);
        final String username = user.getUsername();
        return Jwts.builder()
                .setSubject(username)
                .addClaims(Collections.singletonMap("username", username))
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SecurityConstants.SECRET)
                .compact();
    }
}
