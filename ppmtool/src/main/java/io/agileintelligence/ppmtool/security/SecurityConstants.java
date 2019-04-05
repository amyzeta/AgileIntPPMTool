package io.agileintelligence.ppmtool.security;

public class SecurityConstants {
    private SecurityConstants() {}

    public static final String SECRET = "notThatSecretReally";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER = "Authorization;";
    public static final long EXPIRATION_TIME = 30000;
}
