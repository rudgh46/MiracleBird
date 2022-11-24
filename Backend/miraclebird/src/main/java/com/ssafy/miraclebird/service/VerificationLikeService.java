package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.VerificationLikeDto;

import java.util.List;

public interface VerificationLikeService {
//    List<VerificationLikeDto> getVerificationLikeALL() throws Exception;
    VerificationLikeDto getVerificationLikeById(long verificationLikeId);
    boolean getVerificationLikeByUser(long verificationId, long userId);
    long getVerificationLikeByVerification(long verificationId);
    void createVerificationLike(long verificationId, long userId) throws Exception;
    void deleteVerificationLike(long verificationId, long userId) throws Exception;
}
