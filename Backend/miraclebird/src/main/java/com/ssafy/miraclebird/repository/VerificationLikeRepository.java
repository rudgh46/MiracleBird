package com.ssafy.miraclebird.repository;


import com.ssafy.miraclebird.entity.Verification;
import com.ssafy.miraclebird.entity.VerificationLike;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationLikeRepository extends JpaRepository<VerificationLike,Long> {
    boolean existsByVerificationAndUser(Verification verification, User user);
    void deleteByVerificationAndUser(Verification verification, User user);
    long countAllByVerification(Verification verification);
}
