package com.ssafy.miraclebird.securityOauth.advice.error;

import com.ssafy.miraclebird.securityOauth.advice.payload.ErrorCode;
import lombok.Getter;
import org.springframework.security.core.AuthenticationException;


@Getter
public class DefaultAuthenticationException extends AuthenticationException{

    private ErrorCode errorCode;

    public DefaultAuthenticationException(String msg, Throwable t) {
        super(msg, t);
        this.errorCode = ErrorCode.INVALID_REPRESENTATION;
    }

    public DefaultAuthenticationException(String msg) {
        super(msg);
    }

    public DefaultAuthenticationException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

}
