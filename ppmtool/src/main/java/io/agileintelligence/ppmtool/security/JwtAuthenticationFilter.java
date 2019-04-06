package io.agileintelligence.ppmtool.security;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import io.agileintelligence.ppmtool.domain.UserPrincipal;
import io.agileintelligence.ppmtool.dto.JwtLoginDto;
import io.agileintelligence.ppmtool.dto.LoginDto;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    public JwtAuthenticationFilter(final AuthenticationManager authenticationManager){
        this.authenticationManager = authenticationManager;
        setFilterProcessesUrl("/api/user/login");
    }

    @Override
    public Authentication attemptAuthentication(final HttpServletRequest request, final HttpServletResponse response)  throws AuthenticationException {
        LoginDto login = null;
        try {
            login = new Gson().fromJson(new InputStreamReader(request.getInputStream()), LoginDto.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword()));
    }

    @Override
    protected void successfulAuthentication(final HttpServletRequest request, final HttpServletResponse response, final FilterChain chain, final Authentication authentication) throws IOException, ServletException {
        final UserPrincipal user = (UserPrincipal)authentication.getPrincipal();
        final Date now = new Date();
        final Date expiryDate = new Date(now.getTime() + SecurityConstants.EXPIRATION_TIME);
        final String username = user.getUsername();
        final String token =  Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SecurityConstants.SECRET)
                .compact();
        response.getWriter().write(new GsonBuilder().setPrettyPrinting().create().toJson(new JwtLoginDto(true, token)));
    }
}
