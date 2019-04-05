package io.agileintelligence.ppmtool.dto;

public class JwtLoginDto {
    private boolean success;
    private String token;

    public JwtLoginDto(final boolean success, final String token) {
        this.success = success;
        this.token = token;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(final boolean success) {
        this.success = success;
    }

    public String getToken() {
        return token;
    }

    public void setToken(final String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "JwtLoginDto{" +
                "success=" + success +
                ", token='" + token + '\'' +
                '}';
    }
}
