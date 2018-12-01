package io.agileintelligence.ppmtool.services;

import org.springframework.stereotype.Service;
import org.springframework.validation.FieldError;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ValidationErrorService {
    public Map<String, String> getErrorMap(final List<FieldError> errors) {
        //noinspection ConstantConditions
        return errors.stream().collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage, (s1, s2) -> s1));
    }
}
