package io.agileintelligence.ppmtool.web;

import io.agileintelligence.ppmtool.dto.JwtLoginDto;
import io.agileintelligence.ppmtool.dto.LoginDto;
import io.agileintelligence.ppmtool.dto.SignupDto;
import io.agileintelligence.ppmtool.security.JwtTokenProvider;
import io.agileintelligence.ppmtool.security.SecurityConstants;
import io.agileintelligence.ppmtool.services.UserService;
import io.agileintelligence.ppmtool.services.ValidationErrorService;
import io.agileintelligence.ppmtool.validator.SignupValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private ValidationErrorService validationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private SignupValidator signupValidator;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> register(final @Valid @RequestBody SignupDto user, final BindingResult result) {
        signupValidator.validate(user, result);
        final Optional<ResponseEntity<?>> responseEntity = this.validationErrorService.validationErrorMessage(result);
        return responseEntity.orElseGet(() -> {
            userService.createUser(user);
            return new ResponseEntity<>(HttpStatus.CREATED);
        });
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(final @Valid @RequestBody LoginDto login, final BindingResult result) {
        final Optional<ResponseEntity<?>> responseEntity = this.validationErrorService.validationErrorMessage(result);
        return responseEntity.orElseGet(() -> {
            final UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword());
            final Authentication authentication = authenticationManager.authenticate(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = SecurityConstants.TOKEN_PREFIX + tokenProvider.generateToken(authentication);
            return ResponseEntity.ok(new JwtLoginDto(true, jwt));
        });
    }
}
