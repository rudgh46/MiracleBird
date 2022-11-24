package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.VerificationLike;

import java.util.List;

public interface VerificationLikeDao {
//    List<VerificationLike> getVerificationLikeALL();
    VerificationLike getVerificationLikeById(long verificationLikeIdx);
    boolean getVerificationLikeByUser(long verificationIdx, long userIdx);
    long getVerificationLikeByVerification(long verificationIdx);
    void saveVerificationLike(VerificationLike verificationLike) throws Exception;
    void deleteVerificationLike(long verificationIdx, long userIdx) throws Exception;
}
