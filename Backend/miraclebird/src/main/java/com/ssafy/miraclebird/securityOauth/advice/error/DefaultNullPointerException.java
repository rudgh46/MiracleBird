package com.ssafy.miraclebird.securityOauth.advice.error;

import com.ssafy.miraclebird.securityOauth.advice.payload.ErrorCode;
import lombok.Getter;

@Getter
public class DefaultNullPointerException extends NullPointerException{
    
    private ErrorCode errorCode;

    public DefaultNullPointerException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
