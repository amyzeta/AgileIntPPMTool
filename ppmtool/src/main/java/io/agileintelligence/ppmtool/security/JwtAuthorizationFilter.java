package io.agileintelligence.ppmtool.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    public JwtAuthorizationFilter(final AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }
    @Override
    protected void doFilterInternal(final HttpServletRequest request, final HttpServletResponse response, final FilterChain chain) throws IOException, ServletException {
        Optional.ofNullable(request.getHeader("Authorization"))
                .filter(h -> h.startsWith(SecurityConstants.TOKEN_PREFIX))
                .map(h -> h.substring(SecurityConstants.TOKEN_PREFIX.length()))
                .flatMap(this::getAuthentication)
                .ifPresent(t -> SecurityContextHolder.getContext().setAuthentication(t));
        chain.doFilter(request, response);
    }

    private Optional<UsernamePasswordAuthenticationToken> getAuthentication(final String token) {
        try {
            final Claims claims = Jwts.parser().setSigningKey(SecurityConstants.SECRET).parseClaimsJws(token).getBody();
            return Optional.ofNullable(claims.getSubject()).map(JwtAuthorizationFilter::tokenForUserName);
        } catch (IllegalArgumentException e) {
            logger.error(e.getMessage(), e);
            return Optional.empty();
        }
    }

    private static UsernamePasswordAuthenticationToken tokenForUserName(final String username) {
        return new UsernamePasswordAuthenticationToken(username, null, Collections.singleton((GrantedAuthority) () -> "USER"));
    }
}
